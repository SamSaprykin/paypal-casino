import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { newRandomizedSudoku } from "./sudokuPuzzles.js";

const RANKS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function useGetAudioContext() {
  const ctxRef = useRef(null);
  return useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      ctxRef.current = new Ctx();
    }
    if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
    return ctxRef.current;
  }, []);
}

function beep(getCtx, freq, dur, vol) {
  const ctx = getCtx();
  if (!ctx) return;
  const t0 = ctx.currentTime;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "sine";
  o.frequency.value = freq;
  g.gain.setValueAtTime(vol, t0);
  g.gain.exponentialRampToValueAtTime(0.01, t0 + dur);
  o.connect(g);
  g.connect(ctx.destination);
  o.start(t0);
  o.stop(t0 + dur);
}

function conflicts(grid, r, c, v) {
  if (v === 0) return false;
  for (let j = 0; j < 9; j++) {
    if (j !== c && grid[r * 9 + j] === v) return true;
  }
  for (let i = 0; i < 9; i++) {
    if (i !== r && grid[i * 9 + c] === v) return true;
  }
  const br = Math.floor(r / 3) * 3;
  const bc = Math.floor(c / 3) * 3;
  for (let i = br; i < br + 3; i++) {
    for (let j = bc; j < bc + 3; j++) {
      if (i === r && j === c) continue;
      if (grid[i * 9 + j] === v) return true;
    }
  }
  return false;
}

export default function Sudoku() {
  const getCtx = useGetAudioContext();
  const soundOnRef = useRef(true);
  const [soundOn, setSoundOn] = useState(true);
  soundOnRef.current = soundOn;

  const [game, setGame] = useState(() => newRandomizedSudoku());
  const [grid, setGrid] = useState(() => game.puzzle.slice());
  const [given, setGiven] = useState(() => game.puzzle.map((c) => c > 0));
  const [selected, setSelected] = useState(null);
  const [solved, setSolved] = useState(false);
  const winChimed = useRef(false);

  const solution = game.solution;

  const checkWin = useCallback(
    (g) => {
      const win = g.every((c, i) => c === solution[i]);
      setSolved(win);
      if (win && soundOnRef.current && !winChimed.current) {
        winChimed.current = true;
        [440, 554, 659, 880].forEach((f, k) => {
          setTimeout(() => beep(getCtx, f, 0.12, 0.08), k * 100);
        });
      }
      if (!win) winChimed.current = false;
    },
    [getCtx, solution],
  );

  const newGame = useCallback(() => {
    void getCtx();
    const ng = newRandomizedSudoku();
    setGame(ng);
    setGrid(ng.puzzle.slice());
    setGiven(ng.puzzle.map((c) => c > 0));
    setSelected(null);
    setSolved(false);
    winChimed.current = false;
  }, [getCtx]);

  const setCell = useCallback(
    (idx, v) => {
      if (given[idx]) return;
      setGrid((prev) => {
        const r = Math.floor(idx / 9);
        const c = idx % 9;
        const next = prev.slice();
        next[idx] = v;
        if (soundOnRef.current) {
          if (v > 0 && conflicts(next, r, c, v)) beep(getCtx, 200, 0.05, 0.06);
          else if (v > 0) beep(getCtx, 380, 0.04, 0.05);
          else beep(getCtx, 300, 0.03, 0.04);
        }
        checkWin(next);
        return next;
      });
    },
    [given, getCtx, checkWin],
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "n" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        newGame();
        return;
      }
      if (solved) return;
      if (selected === null) return;
      if (given[selected]) return;
      if (e.key >= "1" && e.key <= "9") {
        e.preventDefault();
        setCell(selected, parseInt(e.key, 10));
        return;
      }
      if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") {
        e.preventDefault();
        setCell(selected, 0);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, given, solved, newGame, setCell]);

  const conflictMask = useMemo(() => {
    const m = new Array(81).fill(false);
    for (let i = 0; i < 81; i++) {
      if (grid[i] === 0) continue;
      const r = Math.floor(i / 9);
      const c = i % 9;
      if (conflicts(grid, r, c, grid[i])) m[i] = true;
    }
    return m;
  }, [grid]);

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto">
      <div className="flex flex-wrap items-center justify-center gap-3 text-base">
        <button
          type="button"
          onClick={newGame}
          className="px-5 py-3 rounded-lg bg-blue-700 text-white font-medium hover:bg-blue-800 text-base"
        >
          New game
        </button>
        <label className="inline-flex items-center gap-3 cursor-pointer text-slate-700 text-base">
          <input
            type="checkbox"
            checked={soundOn}
            onChange={() => setSoundOn((s) => !s)}
            className="rounded scale-150"
          />
          Sound
        </label>
      </div>

      <div
        className="grid grid-cols-9 gap-0.5 sm:gap-px p-2 sm:p-3 bg-slate-800 rounded-xl shadow-md select-none"
        role="grid"
        aria-label="Sudoku grid"
      >
        {grid.map((v, i) => {
          const r = Math.floor(i / 9);
          const c = i % 9;
          const thickL = c % 3 === 0;
          const thickT = r % 3 === 0;
          return (
            <button
              key={i}
              type="button"
              role="gridcell"
              onClick={() => {
                void getCtx();
                if (!given[i]) setSelected(i);
              }}
              className={[
                "w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-xl sm:text-2xl font-medium rounded-sm border border-transparent",
                given[i] ? "bg-slate-200 text-slate-900" : "bg-white text-slate-900",
                selected === i ? "ring-2 ring-blue-500 ring-inset z-10" : "",
                conflictMask[i] && v > 0
                  ? "bg-rose-200 text-rose-900"
                  : "",
                !given[i] && v > 0 && !conflictMask[i] ? "text-blue-800" : "",
                thickL && c > 0 ? "border-l-2 !border-slate-800" : "",
                thickT && r > 0 ? "border-t-2 !border-slate-800" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              tabIndex={-1}
            >
              {v || ""}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
        {RANKS.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => {
              if (selected !== null && !given[selected] && !solved)
                setCell(selected, n);
            }}
            className="w-16 h-16 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold text-2xl"
            disabled={selected === null || given[selected] || solved}
          >
            {n}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            if (selected !== null && !given[selected] && !solved)
              setCell(selected, 0);
          }}
          className="w-16 h-16 rounded-lg border-2 border-slate-400 text-slate-600 text-base"
          disabled={selected === null || given[selected] || solved}
        >
          Clear
        </button>
      </div>

      {solved && (
        <p className="text-xl text-emerald-700 font-semibold" role="status">
          Solved! Try New game for a reshuffled copy.
        </p>
      )}

      <p className="text-sm text-slate-500 text-center max-w-xl">
        Click a cell, then a number (or 1–9 on the keyboard). Givens cannot
        change. <kbd className="px-2 py-0.5 bg-slate-100 rounded text-sm">Backspace</kbd> clears.
        Cmd/Ctrl+N new game.
      </p>
    </div>
  );
}
