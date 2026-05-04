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
      d.push({ suit: s, rank: r, faceUp: false, id: `c-${n++}` });
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

function canGoOnTableau(moving, targetCol) {
  if (targetCol.length === 0) return moving.rank === 12;
  const t = targetCol[targetCol.length - 1];
  return t.rank === moving.rank + 1 && isRed(moving) !== isRed(t);
}

function canGoOnFoundation(c, f) {
  if (f.length === 0) return c.rank === 0;
  const t = f[f.length - 1];
  return t.suit === c.suit && c.rank === t.rank + 1;
}

function runIsValid(cards) {
  for (let j = 0; j < cards.length - 1; j++) {
    const a = cards[j];
    const b = cards[j + 1];
    if (!a.faceUp || !b.faceUp) return false;
    if (a.rank !== b.rank + 1) return false;
    if (isRed(a) === isRed(b)) return false;
  }
  return true;
}

function initialDeal() {
  const deck = shuffle(createDeck());
  const tableau = Array.from({ length: 7 }, () => []);
  let i = 0;
  for (let c = 0; c < 7; c++) {
    for (let r = 0; r <= c; r++) {
      const card = { ...deck[i++], faceUp: r === c };
      tableau[c].push(card);
    }
  }
  return {
    tableau,
    stock: deck.slice(i).map((c) => ({ ...c, faceUp: false })),
    waste: [],
    foundations: [[], [], [], []],
  };
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

function attemptMove(state, from, toType, toIndex) {
  if (from.type === "tableau" && toType === "tableau" && toIndex === from.col)
    return null;

  if (from.type === "waste") {
    if (state.waste.length === 0) return null;
    const c = state.waste[state.waste.length - 1];
    if (toType === "foundation") {
      if (!canGoOnFoundation(c, state.foundations[toIndex])) return null;
      return {
        ...state,
        waste: state.waste.slice(0, -1),
        foundations: state.foundations.map((p, j) =>
          j === toIndex ? [...p, c] : p,
        ),
      };
    }
    if (toType === "tableau") {
      if (!canGoOnTableau(c, state.tableau[toIndex])) return null;
      return {
        ...state,
        waste: state.waste.slice(0, -1),
        tableau: state.tableau.map((t, j) =>
          j === toIndex ? [...t, c] : t,
        ),
      };
    }
  }

  if (from.type === "tableau") {
    const fromI = from.fromIndex ?? from.from;
    if (fromI == null) return null;
    const col = state.tableau[from.col];
    if (!col) return null;
    if (fromI < 0 || fromI >= col.length) return null;
    if (!col[fromI].faceUp) return null;
    const run = col.slice(fromI);
    if (run.length === 0) return null;
    if (!runIsValid(run)) return null;
    if (toType === "foundation") {
      if (fromI !== col.length - 1) return null;
      const c = col[col.length - 1];
      if (!canGoOnFoundation(c, state.foundations[toIndex])) return null;
      const nCol = col.slice(0, -1);
      if (nCol.length > 0) {
        nCol[nCol.length - 1] = { ...nCol[nCol.length - 1], faceUp: true };
      }
      return {
        ...state,
        tableau: state.tableau.map((t, j) => (j === from.col ? nCol : t)),
        foundations: state.foundations.map((p, j) =>
          j === toIndex ? [...p, c] : p,
        ),
      };
    }
    if (toType === "tableau") {
      if (!canGoOnTableau(run[0], state.tableau[toIndex] ?? [])) return null;
      const nCol = col.slice(0, fromI);
      if (nCol.length > 0) {
        nCol[nCol.length - 1] = { ...nCol[nCol.length - 1], faceUp: true };
      }
      const tcol = [...state.tableau[toIndex], ...run];
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

/**
 * Return first legal move for hint (Solitaired-style: show a legal play).
 */
function findHint(g) {
  if (g.waste.length > 0) {
    for (let i = 0; i < 4; i++) {
      if (attemptMove(g, { type: "waste" }, "foundation", i)) {
        return { from: { type: "waste" }, toType: "foundation", toIndex: i };
      }
    }
    for (let c = 0; c < 7; c++) {
      if (attemptMove(g, { type: "waste" }, "tableau", c)) {
        return { from: { type: "waste" }, toType: "tableau", toIndex: c };
      }
    }
  }
  for (let col = 0; col < 7; col++) {
    const tcol = g.tableau[col];
    for (let fromI = 0; fromI < tcol.length; fromI++) {
      if (!tcol[fromI].faceUp) continue;
      const from = { type: "tableau", col, fromIndex: fromI };
      for (let i = 0; i < 4; i++) {
        if (attemptMove(g, from, "foundation", i)) {
          return { from, toType: "foundation", toIndex: i };
        }
      }
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

export default function Solitaire() {
  const getCtx = useGetAudioContext();
  const [soundOn, setSoundOn] = useState(true);
  const sound = useRef(true);
  sound.current = soundOn;
  const [g, setG] = useState(initialDeal);
  const [sel, setSel] = useState(null);
  const [moves, setMoves] = useState(0);
  const [passthrus, setPassthrus] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [drawCount, setDrawCount] = useState(1);
  const [hint, setHint] = useState(null);
  const [undoSize, setUndoSize] = useState(0);
  const undoStack = useRef([]);
  const movesRef = useRef(0);
  const passthrusRef = useRef(0);

  useEffect(() => {
    movesRef.current = moves;
  }, [moves]);
  useEffect(() => {
    passthrusRef.current = passthrus;
  }, [passthrus]);

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
    setG(initialDeal());
    setSel(null);
    setMoves(0);
    setPassthrus(0);
    setSeconds(0);
    setHint(null);
  };

  const won = isWin(g);
  useEffect(() => {
    if (won) return undefined;
    const id = setInterval(() => setSeconds((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [won]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== " " && e.key !== "Spacebar") return;
      const t = e.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "SELECT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      e.preventDefault();
      clickStockRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const clickStockRef = useRef(() => {});

  const clickStock = useCallback(() => {
    setG((state) => {
      if (isWin(state)) return state;
      pushUndo({
        g: cloneState(state),
        moves: movesRef.current,
        passthrus: passthrusRef.current,
      });
      if (state.stock.length > 0) {
        const n = Math.min(drawCount, state.stock.length);
        const taken = state.stock.slice(0, n).map((c) => ({ ...c, faceUp: true }));
        play(320);
        setMoves((m) => m + 1);
        return {
          ...state,
          stock: state.stock.slice(n),
          waste: [...state.waste, ...taken],
        };
      }
      if (state.waste.length > 0) {
        const rev = state.waste.map((c) => ({ ...c, faceUp: false })).reverse();
        play(200);
        setMoves((m) => m + 1);
        setPassthrus((p) => p + 1);
        return { ...state, stock: rev, waste: [] };
      }
      playErr();
      undoStack.current.pop();
      setUndoSize(undoStack.current.length);
      return state;
    });
  }, [drawCount]);

  clickStockRef.current = clickStock;

  const tryMove = (from, toType, toIndex) => {
    setG((state) => {
      if (isWin(state)) return state;
      const n = attemptMove(state, from, toType, toIndex);
      if (!n) {
        playErr();
        return state;
      }
      pushUndo({
        g: cloneState(state),
        moves: movesRef.current,
        passthrus: passthrusRef.current,
      });
      setMoves((m) => m + 1);
      queueMicrotask(() => setSel(null));
      if (isWin(n)) playWin();
      else play(400);
      return n;
    });
  };

  const onWasteClick = (e) => {
    if (e.detail > 1) return;
    if (g.waste.length === 0) {
      playErr();
      return;
    }
    if (sel?.type === "waste") {
      setSel(null);
    } else {
      setSel({ type: "waste" });
    }
  };

  const onWasteDoubleClick = (e) => {
    e.preventDefault();
    setG((state) => {
      if (state.waste.length === 0) {
        playErr();
        return state;
      }
      if (isWin(state)) return state;
      const n = tryMoveToFirstFoundation(state, { type: "waste" });
      if (!n) {
        playErr();
        return state;
      }
      pushUndo({
        g: cloneState(state),
        moves: movesRef.current,
        passthrus: passthrusRef.current,
      });
      setMoves((m) => m + 1);
      queueMicrotask(() => setSel(null));
      if (isWin(n)) playWin();
      else play(400);
      return n;
    });
  };

  const onTableauCardClick = (col, idx, e) => {
    if (e && e.detail > 1) return;
    if (sel?.type === "waste") {
      tryMove(sel, "tableau", col);
      return;
    }
    const colA = g.tableau[col];
    if (colA.length === 0) {
      if (sel) tryMove(sel, "tableau", col);
      return;
    }
    if (!colA[idx].faceUp) {
      if (idx === colA.length - 1) {
        setG((s) => {
          if (isWin(s)) return s;
          pushUndo({
            g: cloneState(s),
            moves: movesRef.current,
            passthrus: passthrusRef.current,
          });
          setMoves((m) => m + 1);
          const t = s.tableau.map((c) => c.slice());
          t[col][idx] = { ...t[col][idx], faceUp: true };
          play(280);
          return { ...s, tableau: t };
        });
      }
      return;
    }
    if (sel?.type === "tableau" && sel.col === col && sel.fromIndex === idx) {
      setSel(null);
      return;
    }
    if (sel) {
      if (sel.type === "tableau" && (sel.col !== col || sel.fromIndex !== idx)) {
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
            passthrus: passthrusRef.current,
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
      const n = tryMoveToFirstFoundation(state, { type: "tableau", col, fromIndex: idx });
      if (!n) {
        playErr();
        return state;
      }
      pushUndo({
        g: cloneState(state),
        moves: movesRef.current,
        passthrus: passthrusRef.current,
      });
      setMoves((m) => m + 1);
      queueMicrotask(() => setSel(null));
      if (isWin(n)) playWin();
      else play(400);
      return n;
    });
  };

  const onFoundationClick = (i) => {
    if (sel) tryMove(sel, "foundation", i);
  };

  const doUndo = () => {
    const frame = undoStack.current.pop();
    if (!frame) {
      playErr();
      return;
    }
    setG(frame.g);
    setMoves(frame.moves);
    setPassthrus(frame.passthrus);
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

  const isHintWasteSource = Boolean(hint?.from?.type === "waste");
  const isHintFromTableau = (col, idx) => {
    if (hint?.from?.type !== "tableau") return false;
    if (hint.from.col !== col) return false;
    if (hint.toType === "foundation")
      return idx === g.tableau[col].length - 1 && hint.from.fromIndex === idx;
    return idx >= (hint.from.fromIndex ?? 0);
  };

  const isHintToFoundation = (i) => hint?.toType === "foundation" && hint.toIndex === i;
  const isHintToTableau = (ci) => hint?.toType === "tableau" && hint.toIndex === ci;

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
          <div
            className="inline-flex rounded-lg border border-slate-500/80 p-0.5 bg-slate-800/80"
            role="group"
            aria-label="Draw from stock"
          >
            <button
              type="button"
              onClick={() => setDrawCount(1)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                drawCount === 1
                  ? "bg-emerald-600 text-white"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Turn 1
            </button>
            <button
              type="button"
              onClick={() => setDrawCount(3)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                drawCount === 3
                  ? "bg-emerald-600 text-white"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Turn 3
            </button>
          </div>
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
          <span>
            <span className="text-slate-500">Restocks</span> {passthrus}
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
        <div className="flex flex-wrap gap-3 items-start justify-center mb-1">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={clickStock}
              className="w-20 h-24 rounded-md border-2 border-dashed border-emerald-400/30 bg-slate-900/40 text-2xl shadow-inner hover:border-emerald-300/50"
              aria-label="Draw from stock. Space to flip."
            >
              {g.stock.length ? "🂠" : "↻"}
            </button>
            <button
              type="button"
              onClick={onWasteClick}
              onDoubleClick={onWasteDoubleClick}
              className={`relative w-20 h-24 rounded-md border-2 border-white/20 bg-white text-lg shadow-md flex items-center justify-center ${
                isHintWasteSource
                  ? "ring-4 ring-amber-300 ring-offset-2 ring-offset-[#0a2e22] animate-pulse"
                  : ""
              }`}
              aria-label="Waste pile"
            >
              {g.waste.length > 0 && (
                <span
                  className={
                    isRed(g.waste[g.waste.length - 1]) ? "text-rose-600" : "font-bold text-slate-900"
                  }
                >
                  {RANKL[g.waste[g.waste.length - 1].rank]}
                  {SUITC[g.waste[g.waste.length - 1].suit]}
                </span>
              )}
              {sel?.type === "waste" && (
                <span
                  className="absolute inset-0 border-2 border-amber-300 rounded pointer-events-none"
                  aria-hidden
                />
              )}
            </button>
          </div>
          {g.foundations.map((pile, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onFoundationClick(i)}
              className={`w-20 h-24 rounded-md border border-amber-900/30 bg-amber-950/20 flex flex-col items-center justify-center text-lg shadow-md transition ${
                isHintToFoundation(i) ? "ring-4 ring-amber-300 ring-offset-2 ring-offset-emerald-950" : ""
              }`}
              aria-label={`Foundation, suit pile ${i + 1}`}
            >
              {pile.length > 0 ? (
                <span
                  className={isRed(pile[pile.length - 1]) ? "text-rose-500" : "text-slate-100"}
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

        <div className="grid grid-cols-7 gap-1 sm:gap-2 items-start justify-center max-w-[56rem] mx-auto pt-2">
          {g.tableau.map((col, ci) => (
            <div
              key={ci}
              className={`flex flex-col items-center w-full min-w-0 ${
                isHintToTableau(ci) && col.length === 0 ? "ring-2 ring-amber-300/80 rounded-md p-0.5" : ""
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
                          isRed(c) ? "text-rose-600 font-bold" : "text-slate-900 font-bold"
                        }
                      >
                        {RANKL[c.rank]}
                        <br />
                        {SUITC[c.suit]}
                      </span>
                    ) : (
                      <span className="text-[10px] text-emerald-200/20 select-none" aria-hidden>
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
        <strong className="text-slate-400">Klondike:</strong> build down in columns
        (alternating colors), up on foundations by suit. Space flips the stock.{" "}
        <span className="whitespace-nowrap">Turn 3</span> draws three cards; only the
        top waste card plays. Double-click a playable card to send it to a
        foundation. Hint and Undo work like on{" "}
        <a
          href="https://solitaired.com/"
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
