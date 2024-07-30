"use client";
import { nullishDl } from "@/lib/global/declarations/types";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { PacInfo } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { handleFetch } from "@/pages/api/ts/handlers";
import { useEffect, useRef } from "react";
import { panelRoots } from "../panelForms/defs/client/SelectPanel";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../error/GenericErrorComponent";

export default function ListCPFPacCons(): JSX.Element {
  const dlRef = useRef<nullishDl>(null);
  const pacs: PacInfo[] = [];
  useEffect(() => {
    try {
      if (!(dlRef.current instanceof HTMLDataListElement))
        throw elementNotFound(
          dlRef.current,
          `Validation of Datalist instance`,
          extLine(new Error())
        );
      handleFetch("patients", "_table", true)
        .then(res => {
          res.forEach(pac => {
            !pacs.includes(pac as PacInfo) &&
              pacs.push({
                name: pac.name,
                tel: pac.tel,
                email: pac.email,
                next_appointed_day: (pac as PacInfo)["next_appointed_day"],
                treatment_beg: (pac as PacInfo)["treatment_beg"],
                treatment_end: (pac as PacInfo)["treatment_end"],
                current_status: (pac as PacInfo)["current_status"],
                signature: (pac as PacInfo)["signature"],
                historic: (pac as PacInfo)["historic"],
                idf: (pac as PacInfo)["idf"],
              });
          });
          if (!(dlRef.current instanceof HTMLDataListElement))
            throw elementNotFound(
              dlRef.current,
              `Validation of Datalist instance`,
              extLine(new Error())
            );
          if (
            panelRoots[`${dlRef.current.id}`] &&
            !(panelRoots[`${dlRef.current.id}`] as any)["_internalRoot"]
          ) {
            setTimeout(() => {
              try {
                if (!(dlRef.current instanceof HTMLElement))
                  throw elementNotFound(
                    dlRef.current,
                    `Validation of Datalist Reference`,
                    extLine(new Error())
                  );
                if (dlRef.current.querySelector("option")) return;
                panelRoots[`${dlRef.current.id}`]?.unmount();
                delete panelRoots[`${dlRef.current.id}`];
                dlRef.current.remove();
                if (!panelRoots[`${dlRef.current.id}`])
                  panelRoots[`${dlRef.current.id}`] = createRoot(dlRef.current);
                panelRoots[`${dlRef.current.id}`]?.render(
                  <ErrorBoundary
                    FallbackComponent={() => (
                      <GenericErrorComponent message="Error reloading replacement for data list" />
                    )}
                  >
                    <></>
                  </ErrorBoundary>
                );
                dlRef.current = document.getElementById(
                  "listCPFPacCons"
                ) as nullishDl;
                if (!(dlRef.current instanceof HTMLElement))
                  throw elementNotFound(
                    dlRef.current,
                    `Validation of replaced dl`,
                    extLine(new Error())
                  );
                if (!panelRoots[`${dlRef.current.id}`])
                  panelRoots[`${dlRef.current.id}`] = createRoot(dlRef.current);
                if (!dlRef.current.querySelector("option"))
                  panelRoots[`${dlRef.current.id}`]?.render(
                    pacs.map((pac, i) => (
                      <option value={pac.idf} key={`cpf-pac__${i}`}>
                        {pac.idf}
                      </option>
                    ))
                  );
              } catch (e) {
                console.error(
                  `Error executing scheduled rendering of Data List Content Replacement:\n${
                    (e as Error).message
                  }`
                );
              }
            }, 1000);
          } else panelRoots[`${dlRef.current.id}`] = createRoot(dlRef.current);
          if (!dlRef.current.querySelector("tr"))
            panelRoots[`${dlRef.current.id}`]?.render(
              pacs.map((pac, i) => (
                <option value={pac.idf} key={`cpf-pac__${i}`}>
                  {pac.idf}
                </option>
              ))
            );
        })
        .catch(e =>
          console.error(
            `Failed to fetch from Patients Table for filling First Name DL: ${e.message}`
          )
        )
        .finally(() => {
          setTimeout(
            () =>
              syncAriaStates([
                ...(dlRef.current?.querySelectorAll("*") ?? []),
                dlRef.current!,
              ]),
            1200
          );
          setTimeout(
            () =>
              syncAriaStates([
                ...(dlRef.current?.querySelectorAll("*") ?? []),
                dlRef.current!,
              ]),
            3000
          );
        });
    } catch (e) {
      console.error(
        `Error executing useEffect for ${
          ListCPFPacCons.prototype.constructor.name
        }:${(e as Error).message}`
      );
    }
  }, []);
  return <datalist id="listFirstNameCons" ref={dlRef}></datalist>;
}
