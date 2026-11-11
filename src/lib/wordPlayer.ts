// "Typed ahead" playback for read-along copy: pale ghost text is already on the
// page, and ink types over it character by character with a cursor, driven by
// requestAnimationFrame so it stays smooth at any frame rate. Shared by inline
// statements and the pinned reader so pacing is identical everywhere.
//
// Markup contract: each word is `.w`, each character inside it `.c`
// (rendered server-side). Lit units get `className` (default "on"); a word also
// gets it once its last character is typed.

export type WordPlayer = {
  /** Jump to the end immediately (e.g. the visitor scrolled on). */
  finish(): void;
  readonly done: boolean;
};

type Options = {
  /** ms per character (or per word when `by: "word"`) */
  pace: number;
  /** extra pause after word i finishes (e.g. a flagged phrase completes) */
  pauseAfter?: (i: number) => number;
  /** delay before the first character */
  delay?: number;
  /** called when word i has been fully typed */
  onWord?: (i: number) => void;
  onDone?: () => void;
  /** class added to each unit as it plays (default "on") */
  className?: string;
  /** play per character (default) or per word */
  by?: "char" | "word";
  /** show a typing cursor on the newest character (default true for chars) */
  caret?: boolean;
};

type Unit = { el: HTMLElement; at: number; word: number | null };

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Short beat after sentence/clause punctuation so the typing has rhythm. */
export const punctuationPause = (el: HTMLElement) => {
  const t = el.textContent ?? "";
  return /[.:;]$/.test(t) ? 120 : /,$/.test(t) ? 50 : 0;
};

export function playWords(words: HTMLElement[], opts: Options): WordPlayer {
  const cls = opts.className ?? "on";
  const byChar = (opts.by ?? "char") === "char";
  const caret = byChar && (opts.caret ?? true);

  // Build the timeline once.
  const units: Unit[] = [];
  let t = opts.delay ?? 0;
  words.forEach((w, i) => {
    const chars = byChar ? Array.from(w.querySelectorAll<HTMLElement>(".c")) : [];
    const parts = chars.length ? chars : [w];
    parts.forEach((el, k) => {
      units.push({ el, at: t, word: k === parts.length - 1 ? i : null });
      t += opts.pace;
    });
    if (byChar) t += opts.pace; // the space
    t += opts.pauseAfter?.(i) ?? 0;
  });

  let next = 0;
  let raf = 0;
  let start = 0;
  let done = false;
  let head: HTMLElement | null = null;

  const light = (u: Unit) => {
    u.el.classList.add(cls);
    if (u.word !== null) {
      if (u.el !== words[u.word]) words[u.word].classList.add(cls);
      opts.onWord?.(u.word);
    }
  };

  const moveCaret = (el: HTMLElement | null) => {
    if (!caret) return;
    head?.classList.remove("caret");
    head = el;
    head?.classList.add("caret");
  };

  const finish = () => {
    if (done) return;
    done = true;
    cancelAnimationFrame(raf);
    for (; next < units.length; next++) light(units[next]);
    moveCaret(null);
    opts.onDone?.();
  };

  const frame = (now: number) => {
    if (!start) start = now;
    const elapsed = now - start;
    let moved = false;
    while (next < units.length && units[next].at <= elapsed) {
      light(units[next++]);
      moved = true;
    }
    if (moved) moveCaret(units[next - 1].el);
    if (next >= units.length) return finish();
    raf = requestAnimationFrame(frame);
  };

  if (prefersReducedMotion() || units.length === 0) finish();
  else raf = requestAnimationFrame(frame);

  return {
    finish,
    get done() {
      return done;
    },
  };
}
