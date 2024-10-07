"use client";
import { nullishDl } from "@/lib/global/declarations/types";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { registerRoot, syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { PersonProps } from "@/lib/global/declarations/interfacesCons";
import { handleFetch } from "@/lib/locals/panelPage/handlers/handlers";
import { useEffect, useMemo, useRef } from "react";
import { panelRoots } from "@/vars";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../error/GenericErrorComponent";
export default function ListEmailPacCons(): JSX.Element {
  const dlRef = useRef<nullishDl>(null);
  const pacs: PersonProps[] = useMemo(() => [], []);
  useEffect(() => {
    try {
      if (!(dlRef.current instanceof HTMLDataListElement))
        throw elementNotFound(dlRef.current, `Validation of Datalist instance`, extLine(new Error()));
      handleFetch("patients", "_table", true)
        .then(res => {
          res.forEach(pac => {
            !pacs.includes(pac as PersonProps) &&
              pacs.push({
                name: pac.name,
                tel: pac.tel,
                email: pac.email,
              });
          });
          if (!(dlRef.current instanceof HTMLDataListElement))
            throw elementNotFound(dlRef.current, `Validation of Datalist instance`, extLine(new Error()));
          if (panelRoots[`${dlRef.current.id}`] && !(panelRoots[`${dlRef.current.id}`] as any)["_internalRoot"]) {
            setTimeout(() => {
              try {
                if (!(dlRef.current instanceof HTMLElement))
                  throw elementNotFound(dlRef.current, `Validation of Datalist Reference`, extLine(new Error()));
                if (dlRef.current.querySelector("option")) return;
                panelRoots[`${dlRef.current.id}`]?.unmount();
                delete panelRoots[`${dlRef.current.id}`];
                dlRef.current.remove() as void;
                registerRoot(panelRoots[`${dlRef.current.id}`], `#${dlRef.current.id}`, dlRef);
                panelRoots[`${dlRef.current.id}`]?.render(
                  <ErrorBoundary
                    FallbackComponent={() => (
                      <GenericErrorComponent message='Error reloading replacement for data list' />
                    )}>
                    <></>
                  </ErrorBoundary>,
                );
                dlRef.current = document.getElementById("listEmailPacCons") as nullishDl;
                if (!(dlRef.current instanceof HTMLElement))
                  throw elementNotFound(dlRef.current, `Validation of replaced dl`, extLine(new Error()));
                registerRoot(panelRoots[`${dlRef.current.id}`], `#${dlRef.current.id}`, dlRef);
                if (!dlRef.current.querySelector("option"))
                  panelRoots[`${dlRef.current.id}`]?.render(
                    pacs.map((pac, i) => (
                      <option value={pac.email} key={`email-pac__${i}`}>
                        {pac.name}
                      </option>
                    )),
                  );
              } catch (e) {
                console.error(
                  `Error executing scheduled rendering of Data List Content Replacement:\n${(e as Error).message}`,
                );
              }
            }, 1000);
          } else registerRoot(panelRoots[`${dlRef.current.id}`], `#${dlRef.current.id}`, dlRef);
          if (!dlRef.current.querySelector("tr"))
            panelRoots[`${dlRef.current.id}`]?.render(
              pacs.map((pac, i) => (
                <option value={pac.email} key={`email-pac__${i}`}>
                  {pac.name}
                </option>
              )),
            );
        })
        .catch(e => console.error(`Failed to fetch from Patients Table for filling First Name DL: ${e.message}`))
        .finally(() => {
          setTimeout(() => syncAriaStates([...(dlRef.current?.querySelectorAll("*") ?? []), dlRef.current!]), 1200);
          setTimeout(() => syncAriaStates([...(dlRef.current?.querySelectorAll("*") ?? []), dlRef.current!]), 3000);
        });
    } catch (e) {
      console.error(
        `Error executing useEffect for ${ListEmailPacCons.prototype.constructor.name}:${(e as Error).message}`,
      );
    }
  }, []);
  return <datalist id='listEmailPacCons' ref={dlRef}></datalist>;
}
