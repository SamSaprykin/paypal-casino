import { useCallback, useEffect, useRef, useState } from "react";

const COLS = 10;
const ROWS = 20;
const LINE_SCORES = [0, 100, 300, 500, 800];

function rotate4x4(m) {
  const n = 4;
  const r = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      r[x][n - 1 - y] = m[y][x];
    }
  }
  return r;
}

const BASE = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  O: [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  T: [
    [0, 1, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  S: [
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  Z: [
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  J: [
    [1, 0, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  L: [
    [0, 0, 1, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
};

const COLORS = {
  I: "bg-cyan-400",
  O: "bg-amber-300",
  T: "bg-violet-500",
  S: "bg-emerald-400",
  Z: "bg-rose-500",
  J: "bg-blue-500",
  L: "bg-orange-500",
};

const PIECE_IDS = Object.keys(BASE);

function buildRotations() {
  const out = {};
  for (const id of PIECE_IDS) {
    let m = BASE[id].map((row) => [...row]);
    out[id] = [];
    for (let i = 0; i < 4; i++) {
      out[id].push(m.map((row) => [...row]));
      m = rotate4x4(m);
    }
  }
  return out;
}

const ROTATIONS = buildRotations();

function emptyBoard() {
  return Array(ROWS)
    .fill(0)
    .map(() => Array(COLS).fill(0));
}

function makeBag() {
  const a = [...PIECE_IDS];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function canPlace(board, piece, rot, px, py) {
  const m = ROTATIONS[piece][rot];
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if (!m[y][x]) continue;
      const bx = px + x;
      const by = py + y;
      if (bx < 0 || bx >= COLS || by >= ROWS) return false;
      if (by >= 0 && board[by][bx]) return false;
    }
  }
  return true;
}

function mergeBoard(board, piece, rot, px, py, id) {
  const m = ROTATIONS[piece][rot];
  const next = board.map((r) => [...r]);
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if (!m[y][x]) continue;
      const by = py + y;
      const bx = px + x;
      if (by >= 0 && by < ROWS) next[by][bx] = id;
    }
  }
  return next;
}

function clearLines(board) {
  const kept = board.filter((row) => !row.every((c) => c));
  const n = board.length - kept.length;
  const pad = Array(n)
    .fill(0)
    .map(() => Array(COLS).fill(0));
  return { board: [...pad, ...kept], lines: n };
}

function levelFromTotalLines(total) {
  return Math.min(15, Math.floor(total / 10));
}

function speedMs(level) {
  return Math.max(120, 800 - level * 45);
}

function popFromBag(bag) {
  if (bag.length === 0) {
    bag.push(...makeBag());
  }
  return bag.pop();
}

function makeSound(soundOn, getCtx) {
  const beep = (freq, duration = 0.05, vol = 0.08) => {
    const ctx = getCtx();
    if (!ctx) return;
    const t0 = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(freq, t0);
    gain.gain.setValueAtTime(vol, t0);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + duration);
  };
  return {
    playMove: () => {
      if (soundOn) beep(220, 0.04);
    },
    playRotate: () => {
      if (soundOn) beep(380, 0.05);
    },
    playLock: () => {
      if (soundOn) beep(160, 0.06, 0.06);
    },
    playLineClear: () => {
      if (!getCtx() || !soundOn) return;
      [523, 659, 784, 1047].forEach((freq, i) => {
        setTimeout(() => beep(freq, 0.08, 0.07), i * 45);
      });
    },
    playGameOver: () => {
      if (!getCtx() || !soundOn) return;
      [110, 98, 87].forEach((freq, i) => {
        setTimeout(() => beep(freq, 0.2, 0.1), i * 120);
      });
    },
    playWin: () => {
      if (!getCtx() || !soundOn) return;
      [523, 659, 784, 1047, 1318].forEach((freq, i) => {
        setTimeout(() => beep(freq, 0.1, 0.09), i * 75);
      });
    },
  };
}

function useAudioContext() {
  const ctxRef = useRef(null);
  return useCallback(() => {
    if (!ctxRef.current) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      ctxRef.current = new Ctx();
    }
    if (ctxRef.current.state === "suspended") {
      void ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);
}

export default function Tetris({ lineGoal = null }) {
  const lineGoalRef = useRef(lineGoal);
  lineGoalRef.current = lineGoal;

  const [, setRenderId] = useState(0);
  const force = useCallback(() => setRenderId((x) => x + 1), []);

  const g = useRef({
    board: emptyBoard(),
    current: null,
    nextId: null,
    bag: makeBag(),
    score: 0,
    lines: 0,
    level: 0,
    gameOver: true,
    won: false,
    started: false,
    soft: false,
  });

  const [paused, setPaused] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const getCtx = useAudioContext();
  const soundOnRef = useRef(true);
  const pausedRef = useRef(false);
  soundOnRef.current = soundOn;
  pausedRef.current = paused;

  const gRef = g;
  const d = g.current;
  const lastDrop = useRef(0);

  const lockPiece = useCallback(() => {
    const gc = gRef.current;
    const p = gc.current;
    if (!p) return;
    const snd = makeSound(soundOnRef.current, getCtx);
    const merged = mergeBoard(gc.board, p.id, p.rot, p.x, p.y, p.id);
    snd.playLock();
    const { board: afterClear, lines: n } = clearLines(merged);
    gc.board = afterClear;
    if (n > 0) {
      const newTotal = gc.lines + n;
      const lvl = levelFromTotalLines(newTotal);
      gc.score += LINE_SCORES[n] * (lvl + 1);
      gc.lines = newTotal;
      gc.level = lvl;
      snd.playLineClear();
      const goal = lineGoalRef.current;
      if (goal && newTotal >= goal) {
        gc.won = true;
        gc.current = null;
        makeSound(soundOnRef.current, getCtx).playWin();
        lastDrop.current = 0;
        force();
        return;
      }
    }

    const incoming = gc.nextId;
    if (!canPlace(gc.board, incoming, 0, 3, 0)) {
      gc.current = null;
      gc.gameOver = true;
      makeSound(soundOnRef.current, getCtx).playGameOver();
      force();
      return;
    }
    gc.current = { id: incoming, rot: 0, x: 3, y: 0 };
    gc.nextId = popFromBag(gc.bag);
    lastDrop.current = 0;
    force();
  }, [getCtx, force, gRef]);

  const startGame = useCallback(() => {
    void getCtx();
    const bag = makeBag();
    const first = popFromBag(bag);
    const second = popFromBag(bag);
    gRef.current = {
      board: emptyBoard(),
      current: { id: first, rot: 0, x: 3, y: 0 },
      nextId: second,
      bag,
      score: 0,
      lines: 0,
      level: 0,
      gameOver: false,
      won: false,
      started: true,
      soft: false,
    };
    setPaused(false);
    force();
  }, [getCtx, force, gRef]);

  const gameActive = d.started && !d.gameOver && !d.won;

  useEffect(() => {
    if (!gameActive) {
      lastDrop.current = 0;
      return;
    }
    let active = true;
    let raf;
    const tick = (t) => {
      if (!active) return;
      raf = requestAnimationFrame(tick);
      if (pausedRef.current) {
        return;
      }
      const gc = gRef.current;
      if (!gc.started || gc.gameOver || gc.won) return;
      const p = gc.current;
      if (!p) return;
      if (!lastDrop.current) lastDrop.current = t;
      const interval = gc.soft
        ? Math.max(25, speedMs(gc.level) / 6)
        : speedMs(gc.level);
      if (t - lastDrop.current < interval) return;
      lastDrop.current = t;
      if (canPlace(gc.board, p.id, p.rot, p.x, p.y + 1)) {
        p.y += 1;
        force();
      } else {
        lockPiece();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      active = false;
      cancelAnimationFrame(raf);
    };
  }, [gameActive, lockPiece, force, gRef]);

  useEffect(() => {
    const onKey = (e) => {
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)
      ) {
        e.preventDefault();
      }
      if (!gRef.current.started) {
        if (e.key === " " || e.key === "Enter") {
          void getCtx();
          startGame();
        }
        return;
      }
      if (gRef.current.gameOver || gRef.current.won) {
        if (e.key === " " || e.key === "Enter") {
          void getCtx();
          startGame();
        }
        return;
      }
      if (e.key === "p" || e.key === "P") {
        setPaused((x) => !x);
        return;
      }
      if (pausedRef.current) return;
      const gc = gRef.current;
      const p = gc.current;
      if (!p) return;
      const snd = makeSound(soundOnRef.current, getCtx);
      if (e.key === "ArrowLeft") {
        if (canPlace(gc.board, p.id, p.rot, p.x - 1, p.y)) {
          p.x -= 1;
          snd.playMove();
          force();
        }
        return;
      }
      if (e.key === "ArrowRight") {
        if (canPlace(gc.board, p.id, p.rot, p.x + 1, p.y)) {
          p.x += 1;
          snd.playMove();
          force();
        }
        return;
      }
      if (e.key === "ArrowDown") {
        gc.soft = true;
        if (canPlace(gc.board, p.id, p.rot, p.x, p.y + 1)) {
          p.y += 1;
          snd.playMove();
          force();
        } else {
          lockPiece();
        }
        return;
      }
      if (e.key === "ArrowUp") {
        const nr = (p.rot + 1) % 4;
        if (canPlace(gc.board, p.id, nr, p.x, p.y)) {
          p.rot = nr;
        } else {
          let ok = false;
          for (const k of [1, -1, 2, -2]) {
            if (canPlace(gc.board, p.id, nr, p.x + k, p.y)) {
              p.rot = nr;
              p.x += k;
              ok = true;
              break;
            }
          }
          if (!ok) return;
        }
        snd.playRotate();
        force();
        return;
      }
      if (e.key === " ") {
        while (canPlace(gc.board, p.id, p.rot, p.x, p.y + 1)) {
          p.y += 1;
        }
        snd.playLock();
        lockPiece();
      }
    };
    const onKeyUp = (e) => {
      if (e.key === "ArrowDown") {
        gRef.current.soft = false;
        force();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [startGame, getCtx, lockPiece, force, gRef]);

  const grid = d.board.map((r) => [...r]);
  const cur = d.current;
  if (cur && !d.gameOver && !d.won) {
    const m = ROTATIONS[cur.id][cur.rot];
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        if (!m[y][x]) continue;
        const by = cur.y + y;
        const bx = cur.x + x;
        if (by >= 0 && by < ROWS && bx >= 0 && bx < COLS) {
          grid[by][bx] = cur.id;
        }
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-lg mx-auto">
      <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-slate-700">
        <button
          type="button"
          onClick={() => {
            void getCtx();
            startGame();
          }}
          className="px-4 py-2 rounded-lg bg-blue-700 text-white font-medium hover:bg-blue-800"
        >
          {d.started && !d.gameOver && !d.won ? "Restart" : "Start"}
        </button>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          disabled={!d.started || d.gameOver || d.won}
          className="px-4 py-2 rounded-lg border border-slate-300 font-medium disabled:opacity-40"
        >
          {paused ? "Resume" : "Pause"}
        </button>
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={soundOn}
            onChange={() => setSoundOn((s) => !s)}
            className="rounded"
          />
          Sound
        </label>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <div
          className="grid gap-px p-2 bg-slate-900 rounded-lg shadow-lg"
          style={{
            gridTemplateColumns: `repeat(${COLS}, minmax(0, 1.75rem))`,
          }}
        >
          {grid.map((row, y) =>
            row.map((cell, x) => (
              <div
                key={`${y}-${x}`}
                className={`w-7 h-7 rounded-sm ${cell ? COLORS[cell] : "bg-slate-950"}`}
              />
            )),
          )}
        </div>

        <div className="text-center sm:text-left space-y-2 min-w-[10rem]">
          <p className="text-slate-800">
            <span className="font-semibold">Score</span> {d.score}
          </p>
          <p className="text-slate-800">
            <span className="font-semibold">Lines</span>{" "}
            {lineGoal ? `${d.lines} / ${lineGoal}` : d.lines}
          </p>
          {lineGoal && !d.won && !d.gameOver && d.started && (
            <p className="text-slate-600 text-sm">
              Clear {lineGoal} lines to win
            </p>
          )}
          <p className="text-slate-800">
            <span className="font-semibold">Level</span> {d.level}
          </p>
          {d.nextId && !d.gameOver && !d.won && (
            <div>
              <p className="font-semibold text-slate-800 mb-1">Next</p>
              <div
                className="grid gap-px p-1 bg-slate-900 rounded inline-block mx-auto"
                style={{
                  gridTemplateColumns: "repeat(4, minmax(0, 1.25rem))",
                }}
              >
                {ROTATIONS[d.nextId][0].map((r, y) =>
                  r.map((c, x) => (
                    <div
                      key={`n-${y}-${x}`}
                      className={`w-5 h-5 rounded-sm ${c ? COLORS[d.nextId] : "bg-slate-950"}`}
                    />
                  )),
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {d.won && d.started && (
        <p className="text-lg font-semibold text-emerald-600" role="status">
          You cleared {lineGoal} lines. Nice run — press Start to play again
        </p>
      )}

      {d.gameOver && d.started && !d.won && (
        <p className="text-lg font-semibold text-rose-600" role="status">
          Game over — press Start to play again
        </p>
      )}

      <p className="text-sm text-slate-600 text-center max-w-md">
        ← → move · ↑ rotate · ↓ soft drop · Space hard drop · P pause
      </p>
    </div>
  );
}
