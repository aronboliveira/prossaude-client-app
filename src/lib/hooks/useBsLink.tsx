import { useEffect } from "react";
export default function useBsLink() {
  useEffect(() => {
    const bsLink =
      document.getElementById("bootstrapLink") ??
      Array.from(document.querySelectorAll('link[rel="stylesheet"]')).find(
        l => l instanceof HTMLLinkElement && l.href.endsWith("bootstrap.min.css"),
      );
    if (!(bsLink instanceof HTMLLinkElement)) return;
    bsLink.media = "all";
  }, []);
}
