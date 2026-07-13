/* Tiny subsequence fuzzy scorer for the command palette — no dependency.
   Returns 0 when the needle isn't a subsequence; higher is better.
   Bonuses: consecutive matches, word-start hits, early first match. */
export function fuzzyScore(needle: string, haystack: string): number {
  const n = needle.toLowerCase().trim();
  const h = haystack.toLowerCase();
  if (!n) return 1;
  let score = 0;
  let hi = 0;
  let prevHit = -2;
  for (let ni = 0; ni < n.length; ni++) {
    const c = n[ni];
    if (c === " ") continue;
    let found = -1;
    while (hi < h.length) {
      if (h[hi] === c) {
        found = hi;
        break;
      }
      hi++;
    }
    if (found === -1) return 0;
    score += 1;
    if (found === prevHit + 1) score += 2; // consecutive
    if (found === 0 || h[found - 1] === " " || h[found - 1] === ".") score += 3; // word start
    prevHit = found;
    hi = found + 1;
  }
  return score + Math.max(0, 6 - h.indexOf(n[0]));
}
