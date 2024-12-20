"use client";
import { formCases, nullishOptGrp, validAreas } from "@/lib/global/declarations/types";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { UserProps } from "@/lib/global/declarations/interfacesCons";
import { handleFetch } from "@/lib/global/data-service";
import { useEffect, useRef } from "react";
import { panelRoots } from "@/vars";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../error/GenericErrorComponent";
import { textTransformPascal } from "@/lib/global/gModel";
export default function OptGrpUsers({ grp, area }: { grp: formCases; area: validAreas }): JSX.Element {
  const optGrpRef = useRef<nullishOptGrp>(null);
  const users: UserProps[] = [];
  useEffect(() => {
    try {
      if (!(optGrpRef.current instanceof HTMLOptGroupElement)) return;
      handleFetch(grp, "_table", true)
        .then(res => {
          res?.forEach(user => {
            !users.includes(user as UserProps) &&
              users.push({
                name: user.name,
                tel: user.tel,
                email: user.email,
                area: (user as UserProps)["area"],
                start_day: (user as UserProps)["start_day"],
                end_day: (user as UserProps)["end_day"],
                day: (user as UserProps)["day"],
              });
          });
          if (!(optGrpRef.current instanceof HTMLOptGroupElement)) return;
          if (
            panelRoots[`${optGrpRef.current.id}`] &&
            !(panelRoots[`${optGrpRef.current.id}`] as any)["_internalRoot"]
          ) {
            setTimeout(() => {
              try {
                if (!(optGrpRef.current instanceof HTMLElement)) return;
                if (optGrpRef.current.querySelector("option")) return;
                panelRoots[`${optGrpRef.current.id}`]?.unmount();
                delete panelRoots[`${optGrpRef.current.id}`];
                optGrpRef.current.remove() as void;
                if (!panelRoots[`${optGrpRef.current.id}`])
                  panelRoots[`${optGrpRef.current.id}`] = createRoot(optGrpRef.current);
                panelRoots[`${optGrpRef.current.id}`]?.render(
                  <ErrorBoundary
                    FallbackComponent={() => (
                      <GenericErrorComponent message='Error reloading replacement for opt group' />
                    )}>
                    <></>
                  </ErrorBoundary>,
                );
                optGrpRef.current = document.getElementById(
                  `OptGrp${textTransformPascal(grp)}${area}`,
                ) as nullishOptGrp;
                if (!(optGrpRef.current instanceof HTMLElement)) return;
                if (!panelRoots[`${optGrpRef.current.id}`])
                  panelRoots[`${optGrpRef.current.id}`] = createRoot(optGrpRef.current);
                if (!optGrpRef.current.querySelector("option"))
                  panelRoots[`${optGrpRef.current.id}`]?.render(
                    users.map(
                      (user, i) =>
                        new RegExp(area.slice(0, area.indexOf(" ")), "gi").test(user.area) && (
                          <option value={user.name} key={`${area}-${grp}__${i}`}>
                            {user.area}
                          </option>
                        ),
                    ),
                  );
              } catch (e) {
                console.error(
                  `Error executing scheduled rendering of Optgroup Content Replacement:\n${(e as Error).message}`,
                );
              }
            }, 1000);
          } else panelRoots[`${optGrpRef.current.id}`] = createRoot(optGrpRef.current);
          if (!optGrpRef.current.querySelector("option"))
            panelRoots[`${optGrpRef.current.id}`]?.render(
              users.map(
                (user, i) =>
                  new RegExp(area.slice(0, area.indexOf(" ")), "gi").test(user.area) && (
                    <option value={user.name} key={`${area}-${grp}__${i}`}>
                      {user.area}
                    </option>
                  ),
              ),
            );
        })
        .catch(e => console.error(`Failed to fetch from Patients Table for filling First Name DL: ${e.message}`))
        .finally(() => {
          setTimeout(
            () => syncAriaStates([...(optGrpRef.current?.querySelectorAll("*") ?? []), optGrpRef.current!]),
            1200,
          );
          setTimeout(
            () => syncAriaStates([...(optGrpRef.current?.querySelectorAll("*") ?? []), optGrpRef.current!]),
            3000,
          );
        });
    } catch (e) {
      console.error(`Error executing useEffect for ${OptGrpUsers.prototype.constructor.name}:${(e as Error).message}`);
    }
  }, [area, grp]);
  return <optgroup id={`OptGrp${textTransformPascal(grp)}${area}`} label={area} ref={optGrpRef}></optgroup>;
}
