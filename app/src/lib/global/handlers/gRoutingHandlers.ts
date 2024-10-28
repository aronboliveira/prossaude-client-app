import { pageCases, pageStyleCases } from "../declarations/types";
import { decodeToken } from "../auth";
import { LinkTag, MetaTag } from "../declarations/testVars";
export function handleLinkChanges(
  componentCase: pageCases,
  styleFlag: pageStyleCases,
): {
  metas: MetaTag[];
  links: LinkTag[];
} {
  let metaTags: MetaTag[] = [],
    linkTags: LinkTag[] = [];
  try {
    if (window && document) {
      if (!decodeToken("", true).ok) location.replace(location.origin);
      if (typeof componentCase !== "string")
        throw new Error(`invalid componentCase argument given to handleLinkChanges`);
      if (typeof styleFlag !== "string") return { metas: metaTags, links: linkTags };
      const head = document.querySelector("head");
      if (!(head instanceof HTMLHeadElement)) return { metas: metaTags, links: linkTags };
      const heads = document.querySelectorAll("head");
      if (heads.length > 1) for (let i = 0; i < heads.length; i++) i > 0 && (heads[i].remove() as void);
      const noscript = document.querySelector("noscript");
      if (noscript instanceof HTMLElement && noscript.tagName === "NOSCRIPT" && noscript.innerText === "")
        noscript.innerText = "You need JavaScript to run this application.";
      (() => {
        try {
          if (!head.querySelector('meta[charset="utf-8"]') && !head.querySelector('meta[charset="UTF-8"]'))
            head.prepend(
              Object.assign(document.createElement("meta"), {
                charSet: "UTF-8",
                id: "charsetMeta",
              }),
            );
          if (!head.querySelector('meta[name="viewport"]'))
            head.prepend(
              Object.assign(document.createElement("meta"), {
                name: "viewport",
                content:
                  "width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=3.0, user-scalable=yes",
                id: "viewportMeta",
              }),
            );
          if (!head.querySelector('meta[content="IE=edge"]') && !head.querySelector('meta[content="IE=Edge"]')) {
            head.prepend(
              Object.assign(document.createElement("meta"), {
                httEquip: "X-UA-Compatible",
                content: "IE=edge",
                id: "edgeMeta",
              }),
            );
          }
        } catch (e) {
          return;
        }
      })();
    }
    ({ metaTags, linkTags } = switchRouteHeads(componentCase));
    return { metas: metaTags, links: linkTags };
  } catch (e) {
    return { metas: metaTags, links: linkTags };
  }
}
export function switchRouteHeads(componentCase: pageCases): {
  metaTags: MetaTag[];
  linkTags: LinkTag[];
} {
  let metaTags: MetaTag[] = [],
    linkTags: LinkTag[] = [];
  switch (componentCase) {
    case "login": {
      document.body.className = "loginBody";
      break;
    }
    case "base": {
      document.body.className = "baseBody";
      break;
    }
    case "ag": {
      document.body.className = "agBody";
      break;
    }
    case "ed": {
      document.body.className = "edfisNutBody";
      break;
    }
    case "od": {
      document.body.className = "odBody";
      break;
    }
    case "panel": {
      document.body.className = "panelBody";
      break;
    }
    case "recover": {
      document.body.className = "recoverBody";
      break;
    }
    default:
      break;
  }
  return { metaTags, linkTags };
}
export function headCleanup() {
  if (window && document) {
    try {
      const head = document.querySelector("head");
      if (!head) throw new Error(`Failed to query for head element`);
      const headElements = head.children;
      const elementsById = new Map();
      for (let i = 0; i < headElements.length; i++) {
        const element = headElements[i];
        let elementId = element.id;
        if (!elementId) {
          if (element instanceof HTMLScriptElement && element.src !== "") elementId = element.src;
          else if (element instanceof HTMLLinkElement && element.href !== "") elementId = element.href;
          else if (element instanceof HTMLMetaElement) {
            if (element.name !== "") elementId = element.name;
            else if (element.httpEquiv !== "") elementId = element.httpEquiv;
            else if (element.content !== "") elementId = element.content;
          }
        }
        if (!elementId) continue;
        if (elementsById.has(elementId)) {
          const existingElement = elementsById.get(elementId);
          const currentAttrCount = element.attributes.length;
          const existingAttrCount = existingElement.attributes.length;
          if (currentAttrCount > existingAttrCount) {
            elementsById.set(elementId, element);
            existingElement.remove() as void;
          } else if (currentAttrCount === existingAttrCount) {
            existingElement.remove() as void;
            elementsById.set(elementId, element);
          } else element.remove() as void;
        } else elementsById.set(elementId, element);
      }
    } catch (e) {
      return;
    }
  }
}
