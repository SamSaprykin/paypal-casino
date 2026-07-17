import { useCallback, useEffect, useRef, useState } from "react";

const RANKL = "A 2 3 4 5 6 7 8 9 10 J Q K".split(" ");
const SUITC = ["♠", "♥", "♦", "♣"];

function isRed(c) {
  return c.suit === 1 || c.suit === 2;
}

function createDeck() {
  const d = [];
  let n = 0;
  for (let s = 0; s < 4; s++) {
    for (let r = 0; r < 13; r++) {
      d.push({ suit: s, rank: r, faceUp: false, id: `rs-${n++}` });
    }
  }
  return d;
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Build down, same suit (Russian). Empty column: only King. */
function canGoOnTableauRussian(moving, targetCol) {
  if (targetCol.length === 0) return moving.rank === 12;
  const t = targetCol[targetCol.length - 1];
  return t.suit === moving.suit && t.rank === moving.rank + 1;
}

function canGoOnFoundation(c, f) {
  if (f.length === 0) return c.rank === 0;
  const t = f[f.length - 1];
  return t.suit === c.suit && c.rank === t.rank + 1;
}

/** Russian: col counts 1,6,7,8,9,10,11. Col0 all up; other cols first (n-5) down, last 5 up. */
const RUSSIAN_COL_COUNTS = [1, 6, 7, 8, 9, 10, 11];

function initialRussianDeal() {
  const deck = shuffle(createDeck());
  const tableau = Array.from({ length: 7 }, () => []);
  let i = 0;
  for (let c = 0; c < 7; c++) {
    const n = RUSSIAN_COL_COUNTS[c];
    for (let r = 0; r < n; r++) {
      const faceUp = c === 0 ? true : r >= n - 5;
      tableau[c].push({ ...deck[i++], faceUp });
    }
  }
  return { tableau, foundations: [[], [], [], []] };
}

function maybeFlipExposed(nCol) {
  if (nCol.length === 0) return nCol;
  const o = nCol.map((c) => ({ ...c }));
  const last = o.length - 1;
  if (!o[last].faceUp) o[last] = { ...o[last], faceUp: true };
  return o;
}

function cloneState(g) {
  return JSON.parse(JSON.stringify(g));
}

function useGetAudioContext() {
  const ctxRef = useRef(null);
  return () => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      ctxRef.current = new Ctx();
    }
    if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
    return ctxRef.current;
  };
}

function beep(ctxFn, f, t, v) {
  const ctx = ctxFn();
  if (!ctx) return;
  const t0 = ctx.currentTime;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "sine";
  o.frequency.value = f;
  g.gain.setValueAtTime(v, t0);
  g.gain.exponentialRampToValueAtTime(0.01, t0 + t);
  o.connect(g);
  g.connect(ctx.destination);
  o.start(t0);
  o.stop(t0 + t);
}

function isWin(state) {
  return state.foundations.every((f) => f.length === 13);
}

/**
 * Russian: like Yukon for group moves, but contact uses same-suit / one rank down.
 * No moving from foundation to tableau.
 */
function attemptMove(state, from, toType, toIndex) {
  if (from.type === "tableau" && toType === "tableau" && toIndex === from.col) {
    return null;
  }

  if (from.type === "tableau") {
    const fromI = from.fromIndex;
    if (fromI == null) return null;
    const col = state.tableau[from.col];
    if (!col || fromI < 0 || fromI >= col.length) return null;
    for (let j = fromI; j < col.length; j++) {
      if (!col[j].faceUp) return null;
    }
    const run = col.slice(fromI);

    if (toType === "foundation") {
      if (fromI !== col.length - 1) return null;
      const c = col[col.length - 1];
      if (!canGoOnFoundation(c, state.foundations[toIndex])) return null;
      const nCol = maybeFlipExposed(col.slice(0, -1));
      return {
        ...state,
        tableau: state.tableau.map((t, j) => (j === from.col ? nCol : t)),
        foundations: state.foundations.map((p, j) =>
          j === toIndex ? [...p, c] : p,
        ),
      };
    }
    if (toType === "tableau") {
      if (!canGoOnTableauRussian(run[0], state.tableau[toIndex] ?? []))
        return null;
      const nCol = maybeFlipExposed(col.slice(0, fromI));
      const tcol = [...(state.tableau[toIndex] ?? []), ...run];
      return {
        ...state,
        tableau: state.tableau.map((t, j) => {
          if (j === from.col) return nCol;
          if (j === toIndex) return tcol;
          return t;
        }),
      };
    }
  }
  return null;
}

function tryMoveToFirstFoundation(state, from) {
  for (let i = 0; i < 4; i++) {
    const n = attemptMove(state, from, "foundation", i);
    if (n) return n;
  }
  return null;
}

function findHint(g) {
  for (let col = 0; col < 7; col++) {
    const t = g.tableau[col];
    if (t.length === 0) continue;
    const fromI = t.length - 1;
    const from = { type: "tableau", col, fromIndex: fromI };
    for (let i = 0; i < 4; i++) {
      if (attemptMove(g, from, "foundation", i)) {
        return { from, toType: "foundation", toIndex: i };
      }
    }
  }
  for (let col = 0; col < 7; col++) {
    const t = g.tableau[col];
    for (let fromI = 0; fromI < t.length; fromI++) {
      if (!t[fromI].faceUp) continue;
      const from = { type: "tableau", col, fromIndex: fromI };
      for (let tc = 0; tc < 7; tc++) {
        if (attemptMove(g, from, "tableau", tc)) {
          return { from, toType: "tableau", toIndex: tc };
        }
      }
    }
  }
  return null;
}

const HINT_MS = 2800;
const MAX_UNDO = 40;

function formatTime(s) {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

export default function RussianSolitaire() {
  const getCtx = useGetAudioContext();
  const [soundOn, setSoundOn] = useState(true);
  const sound = useRef(true);
  sound.current = soundOn;
  const [g, setG] = useState(initialRussianDeal);
  const [sel, setSel] = useState(null);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [hint, setHint] = useState(null);
  const [undoSize, setUndoSize] = useState(0);
  const undoStack = useRef([]);
  const movesRef = useRef(0);

  useEffect(() => {
    movesRef.current = moves;
  }, [moves]);

  const play = (f) => {
    if (sound.current) beep(getCtx, f, 0.05, 0.06);
  };
  const playErr = () => {
    if (sound.current) beep(getCtx, 150, 0.12, 0.05);
  };
  const playWin = () => {
    if (sound.current) {
      [440, 523, 659].forEach((f, k) => {
        setTimeout(() => beep(getCtx, f, 0.1, 0.07), k * 90);
      });
    }
  };

  const pushUndo = (snapshot) => {
    undoStack.current.push(snapshot);
    if (undoStack.current.length > MAX_UNDO) undoStack.current.shift();
    setUndoSize(undoStack.current.length);
  };

  const newGame = () => {
    void getCtx();
    undoStack.current = [];
    setUndoSize(0);
    setG(initialRussianDeal());
    setSel(null);
    setMoves(0);
    setSeconds(0);
    setHint(null);
  };

  const won = isWin(g);
  useEffect(() => {
    if (won) return undefined;
    const id = setInterval(() => setSeconds((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [won]);

  const tryMove = (from, toType, toIndex) => {
    setG((state) => {
      if (isWin(state)) return state;
      const n = attemptMove(state, from, toType, toIndex);
      if (!n) {
        playErr();
        return state;
      }
      pushUndo({ g: cloneState(state), moves: movesRef.current, passthrus: 0 });
      setMoves((m) => m + 1);
      queueMicrotask(() => setSel(null));
      if (isWin(n)) playWin();
      else play(400);
      return n;
    });
  };

  const onFoundationClick = (i) => {
    if (sel?.type !== "tableau") {
      if (g.foundations[i].length > 0) playErr();
      return;
    }
    tryMove(sel, "foundation", i);
  };

  const onTableauCardClick = (col, idx, e) => {
    if (e && e.detail > 1) return;
    const colA = g.tableau[col];
    if (colA.length === 0) {
      if (sel) tryMove(sel, "tableau", col);
      return;
    }
    if (!colA[idx].faceUp) {
      playErr();
      return;
    }
    if (sel?.type === "tableau" && sel.col === col && sel.fromIndex === idx) {
      setSel(null);
      return;
    }
    if (sel) {
      if (
        sel.type === "tableau" &&
        (sel.col !== col || sel.fromIndex !== idx)
      ) {
        setG((state) => {
          if (isWin(state)) return state;
          const n = attemptMove(state, sel, "tableau", col);
          if (!n) {
            playErr();
            queueMicrotask(() =>
              setSel({ type: "tableau", col, fromIndex: idx }),
            );
            return state;
          }
          pushUndo({
            g: cloneState(state),
            moves: movesRef.current,
            passthrus: 0,
          });
          setMoves((m) => m + 1);
          queueMicrotask(() => setSel(null));
          if (isWin(n)) playWin();
          else play(400);
          return n;
        });
        return;
      }
    }
    setSel({ type: "tableau", col, fromIndex: idx });
  };

  const onTableauDoubleToFoundation = (col, idx) => {
    setG((state) => {
      const colA = state.tableau[col];
      if (!colA || !colA[idx] || !colA[idx].faceUp) {
        playErr();
        return state;
      }
      if (idx !== colA.length - 1) {
        playErr();
        return state;
      }
      if (isWin(state)) return state;
      const n = tryMoveToFirstFoundation(state, {
        type: "tableau",
        col,
        fromIndex: idx,
      });
      if (!n) {
        playErr();
        return state;
      }
      pushUndo({ g: cloneState(state), moves: movesRef.current, passthrus: 0 });
      setMoves((m) => m + 1);
      queueMicrotask(() => setSel(null));
      if (isWin(n)) playWin();
      else play(400);
      return n;
    });
  };

  const doUndo = () => {
    const frame = undoStack.current.pop();
    if (!frame) {
      playErr();
      return;
    }
    setG(frame.g);
    setMoves(frame.moves);
    setUndoSize(undoStack.current.length);
    setSel(null);
    setHint(null);
    play(240);
  };

  const doHint = useCallback(() => {
    if (isWin(g)) {
      playErr();
      return;
    }
    const h = findHint(g);
    if (!h) {
      playErr();
      return;
    }
    setHint(h);
    play(500);
    window.setTimeout(() => setHint(null), HINT_MS);
  }, [g]);

  const isHintFromTableau = (c, idx) => {
    if (hint?.from?.type !== "tableau") return false;
    if (hint.from.col !== c) return false;
    if (hint.toType === "foundation")
      return idx === g.tableau[c].length - 1 && hint.from.fromIndex === idx;
    return idx >= (hint.from.fromIndex ?? 0);
  };

  const isHintToFoundation = (i) =>
    hint?.toType === "foundation" && hint.toIndex === i;
  const isHintToTableau = (ci) =>
    hint?.toType === "tableau" && hint.toIndex === ci;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4 select-none text-slate-100">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-y-2 rounded-xl border border-slate-600/50 bg-slate-900/90 px-3 py-3 sm:px-4">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <button
            type="button"
            onClick={newGame}
            className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold shadow hover:bg-emerald-500"
          >
            New game
          </button>
          <button
            type="button"
            onClick={doHint}
            disabled={won}
            className="px-3 py-2 rounded-lg border border-amber-500/50 bg-amber-900/30 text-amber-100 text-sm font-medium hover:bg-amber-900/50 disabled:opacity-40"
          >
            Hint
          </button>
          <button
            type="button"
            onClick={doUndo}
            disabled={won || undoSize === 0}
            className="px-3 py-2 rounded-lg border border-slate-500 bg-slate-800 text-sm font-medium text-slate-200 hover:bg-slate-700 disabled:opacity-40"
          >
            Undo
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-slate-300 font-mono tabular-nums">
          <span>
            <span className="text-slate-500">Time</span> {formatTime(seconds)}
          </span>
          <span>
            <span className="text-slate-500">Moves</span> {moves}
          </span>
        </div>
        <label className="inline-flex items-center justify-center sm:justify-end gap-2 text-sm text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={soundOn}
            onChange={() => setSoundOn((s) => !s)}
            className="rounded border-slate-500"
          />
          Sound
        </label>
      </div>

      <div
        className="rounded-2xl border border-emerald-950/50 shadow-[inset_0_2px_24px_rgba(0,0,0,0.35)] px-2 py-4 sm:px-4 sm:py-6"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% 20%, rgba(16, 185, 129, 0.15), transparent 50%),
            linear-gradient(180deg, #0f3d2e 0%, #0a2e22 40%, #062a1d 100%)
          `,
        }}
      >
        <div className="flex flex-wrap gap-3 items-start justify-center mb-2">
          {g.foundations.map((pile, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onFoundationClick(i)}
              className={`w-20 h-24 rounded-md border border-amber-900/30 bg-amber-950/20 flex flex-col items-center justify-center text-lg shadow-md transition ${
                isHintToFoundation(i)
                  ? "ring-4 ring-amber-300 ring-offset-2 ring-offset-[#0a2e22] animate-pulse"
                  : ""
              }`}
              aria-label={`Foundation ${i + 1}`}
            >
              {pile.length > 0 ? (
                <span
                  className={
                    isRed(pile[pile.length - 1])
                      ? "text-rose-500"
                      : "text-slate-100"
                  }
                >
                  {RANKL[pile[pile.length - 1].rank]}
                  {SUITC[pile[pile.length - 1].suit]}
                </span>
              ) : (
                <span className="text-amber-700/50 text-3xl font-serif leading-none">
                  {SUITC[i]}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 sm:gap-2 items-start justify-center max-w-[56rem] mx-auto pt-1">
          {g.tableau.map((col, ci) => (
            <div
              key={ci}
              className={`flex flex-col items-center w-full min-w-0 ${
                isHintToTableau(ci) && col.length === 0
                  ? "ring-2 ring-amber-300/80 rounded-md p-0.5"
                  : ""
              }`}
            >
              {col.length === 0 && (
                <button
                  type="button"
                  onClick={() => {
                    if (sel) tryMove(sel, "tableau", ci);
                  }}
                  className="min-h-[5rem] w-18 sm:w-20 rounded-md border-2 border-dashed border-emerald-600/30 bg-black/20 mb-2"
                  aria-label={`Empty column, Kings only, column ${ci + 1}`}
                />
              )}
              {col.map((c, idx) => (
                <div
                  key={c.id}
                  className="relative w-18 sm:w-20 -mt-3 first:mt-0"
                  style={{ zIndex: idx + 1 }}
                >
                  <button
                    type="button"
                    onClick={(e) => onTableauCardClick(ci, idx, e)}
                    onDoubleClick={() => onTableauDoubleToFoundation(ci, idx)}
                    className={`w-full min-h-[4.5rem] rounded-md border text-sm sm:text-base p-1 shadow-md ${
                      c.faceUp
                        ? "bg-white border-slate-200 text-slate-900"
                        : "bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 border-indigo-950"
                    } ${
                      hint && isHintFromTableau(ci, idx)
                        ? "ring-2 ring-amber-300 ring-offset-1 ring-offset-emerald-950"
                        : ""
                    }`}
                  >
                    {c.faceUp ? (
                      <span
                        className={
                          isRed(c)
                            ? "text-rose-600 font-bold"
                            : "text-slate-900 font-bold"
                        }
                      >
                        {RANKL[c.rank]}
                        <br />
                        {SUITC[c.suit]}
                      </span>
                    ) : (
                      <span
                        className="text-[10px] text-emerald-200/20 select-none"
                        aria-hidden
                      >
                        ·
                      </span>
                    )}
                    {sel?.type === "tableau" &&
                      sel.col === ci &&
                      idx >= sel.fromIndex && (
                        <span
                          className="absolute inset-0 border-2 border-amber-300 rounded pointer-events-none"
                          aria-hidden
                        />
                      )}
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {won && (
        <p
          className="text-center text-lg text-amber-200 font-semibold drop-shadow"
          role="status"
        >
          You won — all suits built to King.
        </p>
      )}

      <p className="text-xs sm:text-sm text-slate-500 text-center max-w-2xl mx-auto leading-relaxed">
        <strong className="text-slate-400">Russian solitaire</strong> (Yukon
        family): no stock. Tableau builds <strong>down in the same suit</strong>{" "}
        (e.g. 5♣ on 6♣). You can move a face-up <em>group</em> if the lead card
        fits in rank and suit; cards under it in the run need not be ordered.
        There are <strong>face-down</strong> cards until uncovered. Only a{" "}
        <strong>King</strong> (or a stack with a King on the contact) can fill a
        gap. Foundations are A→K by suit; once on a foundation, a card is not
        taken back. Rules follow common descriptions such as on{" "}
        <a
          href="https://solitaired.com/russian-solitaire"
          className="text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Solitaired
        </a>
        .
      </p>
    </div>
  );
}
