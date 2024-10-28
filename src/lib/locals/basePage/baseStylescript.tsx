import { parseNotNaN } from "../../global/gModel";
import { targEl } from "../../global/declarations/types";
export function equalizeParagraphs(textEls: Array<targEl>): void {
  if (Array.isArray(textEls) && textEls.length > 0 && textEls.every(textEl => textEl instanceof HTMLElement)) {
    const rem = parseNotNaN(window.getComputedStyle(document.documentElement).fontSize);
    const minTextWid = Math.min(...textEls.map(textEl => parseNotNaN(getComputedStyle(textEl as HTMLElement).width)));
    textEls.forEach(textEl => {
      if (minTextWid / rem !== 0) (textEl as HTMLElement).style.width = (minTextWid / rem).toFixed(3);
    });
  }
}
