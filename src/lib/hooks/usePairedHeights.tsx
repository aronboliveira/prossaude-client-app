import { useCallback, useEffect, useRef } from "react";
import { NlMRef } from "../global/declarations/types";
import { compProp, parseNotNaN } from "../global/gModel";
export default function usePairedHeights(): { left: NlMRef<any>; right: NlMRef<any> } {
  const left = useRef<any>(null),
    right = useRef<any>(null),
    handleResize = useCallback(() => {
      try {
        if (!(left.current instanceof HTMLElement)) return;
        if (!(right.current instanceof HTMLElement)) return;
        const width = parseNotNaN(compProp(left.current, "height"));
        if (!Number.isFinite(width) || width <= 0) return;
        right.current.style.height = `${width.toFixed(4)}px`;
      } catch (e) {
        return;
      }
    }, [left, right]);
  useEffect(() => {
    handleResize();
    addEventListener("resize", handleResize);
    return (): void => removeEventListener("resize", handleResize);
  }, [handleResize]);
  return { left, right };
}
