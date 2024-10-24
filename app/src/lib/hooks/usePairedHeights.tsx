import { useCallback, useEffect, useRef } from "react";
import { NlMRef } from "../global/declarations/types";
import { compProp, limitedError, parseNotNaN } from "../global/gModel";

export default function usePairedHeights(): { left: NlMRef<any>; right: NlMRef<any> } {
  const left = useRef<any>(null),
    right = useRef<any>(null),
    handleResize = useCallback(() => {
      try {
        if (!(left.current instanceof HTMLElement)) return;
        if (!(right.current instanceof HTMLElement)) return;
        const width =
          getComputedStyle(left.current).boxSizing === "border-box"
            ? [
                "marginTopWidth",
                "borderTopWidth",
                "paddingTop",
                "height",
                "paddingBottom",
                "borderBottomWidth",
                "marginBottomWidth",
              ].reduce((acc, prop) => acc + parseNotNaN(compProp(left.current, prop as keyof CSSStyleDeclaration)), 0)
            : parseNotNaN(compProp(left.current, "height"));
        if (!Number.isFinite(width) || width <= 0) return;
        right.current.style.height = `${width.toFixed(4)}px`;
      } catch (e) {
        limitedError(
          `Error executing callback:\n${(e as Error).message}`,
          `Resize pair for ${left.current?.id ?? "undefined"}`,
        );
      }
    }, [left, right]);
  useEffect(() => {
    handleResize();
    addEventListener("resize", handleResize);
    return (): void => removeEventListener("resize", handleResize);
  }, [handleResize]);
  return { left, right };
}
