/** Scrolls the page so that the node at `index` becomes the active stop. */
export function scrollToNode(index: number, count: number): void {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const top = count > 1 ? (index / (count - 1)) * maxScroll : 0;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
}
