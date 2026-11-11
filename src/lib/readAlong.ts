// Read-along copy uses a tiny markup: `[[a flagged phrase|id]]` marks a span the
// "reader" highlights; everything else is split into words. Punctuation that
// directly follows a phrase (e.g. `[[CKD|c2]],`) stays attached to its last word.

export type ReadPiece =
  | { kind: "word"; text: string }
  | { kind: "phrase"; id: string; words: string[] };

const PATTERN = /\[\[(.+?)\|(\w+)\]\](\S*)|(\S+)/g;

export function parseReadAlong(text: string): ReadPiece[] {
  const pieces: ReadPiece[] = [];
  for (const m of text.matchAll(PATTERN)) {
    if (m[4]) {
      pieces.push({ kind: "word", text: m[4] });
      continue;
    }
    const words = m[1].split(" ");
    if (m[3]) words[words.length - 1] += m[3];
    pieces.push({ kind: "phrase", id: m[2], words });
  }
  return pieces;
}

/** Plain text, for screen readers and meta. */
export function plainReadAlong(text: string): string {
  return text.replace(/\[\[(.+?)\|\w+\]\]/g, "$1");
}

/** Deterministic stand-in ciphertext with the same length as `word`. */
export function fakeCipher(word: string, salt: number): string {
  const HEX = "0123456789abcdef";
  // mulberry32: cheap, well-mixed PRNG so the "ciphertext" doesn't visibly repeat.
  let a = (salt + 1) * 0x9e3779b9;
  const next = () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return Array.from(word, () => HEX[Math.floor(next() * 16)]).join("");
}
