import { ErrorBoundary } from "react-error-boundary";
import { RotProps } from "@/lib/global/declarations/interfaces";
import GenericErrorComponent from "../../error/GenericErrorComponent";
import InpRot from "./client/InpRot";
import sEn from "@/styles//modules/enStyles.module.scss";
export default function DivRot({ quest, ctx, ur, ev, grp = "Alim" }: RotProps): JSX.Element {
  const maxes = ((): { max: number; maxLength: number } => {
    switch (ctx) {
      case "UrDia":
        return {
          max: 96,
          maxLength: 4,
        };
      case "UrInterv":
        return {
          max: 96,
          maxLength: 4,
        };
      case "EvDia":
        return {
          max: 96,
          maxLength: 4,
        };
      case "EvInterv":
        return {
          max: 96,
          maxLength: 4,
        };
      default:
        return {
          max: 99,
          maxLength: 4,
        };
    }
  })();
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent message='Error rendering Div for Routine' />}>
      <div role='group' className={`flexDiv divRot widMax900q80vw div${ctx} ${sEn.flexDivEn} ${sEn.divRot}`}>
        <label
          htmlFor={
            !ur && !ev
              ? `inp${ctx}Min`
              : ((): string => {
                  if (ur) return `inp${ur.ctx}${ctx}Min`;
                  else if (ev) return `inp${ev.ctx}${ctx}Min`;
                  else return `inp${ctx}Min`;
                })()
          }
          className={`lab${grp}Rot fitSpaced labRef lab${ctx}${ur ? " labUr labUrDia" : ""}${
            ev ? " labEv labEvDia" : ""
          }${
            quest === "Evacua quantas vezes por dia" ||
            quest === "Qual é o intervalo mínimo (em horas) entre evacuações?"
              ? ` ${sEn.evacDMinLab}`
              : ""
          }`}>
          <InpRot quest={quest} grp={grp} ctx={ctx} max={maxes.max} maxLength={maxes.maxLength} ur={ur} ev={ev} />
        </label>
        <label
          htmlFor={
            !ur && !ev
              ? `inp${ctx}Max`
              : ((): string => {
                  if (ur) return `inp${ur.ctx}${ctx}Max`;
                  else if (ev) return `inp${ev.ctx}${ctx}Max`;
                  else return `inp${ctx}Max`;
                })()
          }
          className={`lab${grp}Rot fitSpaced labRef lab${ctx}${ur ? " labUr labUrDia" : ""}${
            ev ? " labEv labEvDia" : ""
          }`}>
          <InpRot
            quest={quest}
            grp={grp}
            ctx={ctx}
            max={maxes.max}
            maxLength={maxes.maxLength}
            isMax={true}
            ur={ur}
            ev={ev}
          />
        </label>
      </div>
    </ErrorBoundary>
  );
}
