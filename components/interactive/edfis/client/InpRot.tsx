"use client";
import { ErrorBoundary } from "react-error-boundary";
import { InpRotProps } from "@/lib/global/declarations/interfaces";
import { extLine, inputNotFound } from "@/lib/global/handlers/errorHandler";
import { handleEventReq } from "@/lib/global/handlers/gHandlers";
import { mainContextRot, nullishInp } from "@/lib/global/declarations/types";
import { useEffect, useRef } from "react";
import GenericErrorComponent from "../../../error/GenericErrorComponent";
export default function InpRot(props: InpRotProps): JSX.Element {
  const inpRef = useRef<nullishInp>(null);
  const title = (() => {
    let mainCtx: mainContextRot = "Diário";
    switch (props.ctx) {
      case "RefDia":
        mainCtx = "Refeições Diárias";
        break;
      case "RefCompDia":
        mainCtx = "Refeições Completas Diárias";
        break;
      case "AguaDia":
        mainCtx = "Litros de Água Diários";
        break;
      case "UrDia":
        mainCtx = "Micções Diárias";
        break;
      case "UrInterv":
        mainCtx = "Intervalo entre Micções";
        break;
      case "EvDia":
        mainCtx = "Evacuações Diárias";
        break;
      case "EvInterv":
        mainCtx = "Intervalo entre Evacuações";
        break;
      default:
        mainCtx = "Diário";
        break;
    }
    return `${mainCtx} ${props.isMax ? "(Máximo)" : "(Mínimo)"}`;
  })();
  useEffect(() => {
    try {
      if (!(inpRef.current instanceof HTMLInputElement))
        throw inputNotFound(
          inpRef.current,
          `Validation of Input Reference for ${
            props.grp || "Undefined Group"
          } ${props.ctx || "Undefined Context"}`,
          extLine(new Error())
        );
      if (props.flags && props.flags !== "")
        inpRef.current.dataset.flags = props.flags;
    } catch (e) {
      console.error(`Error executing useEffect:\n${(e as Error).message}`);
    }
  }, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent
          message={`Error rendering Input for ${props.quest}`}
        />
      )}
    >
      <span>
        {props.ctx === "UrInterv" || props.ctx === "EvInterv"
          ? (() => {
              if (props.ctx === "UrInterv") {
                return props.isMax
                  ? "Qual é o intervalo máximo (em horas) entre cada micção?"
                  : "Qual é o intervalo mínimo (em horas) entre cada micção?";
              } else if (props.ctx === "EvInterv") {
                return props.isMax
                  ? "Qual é o intervalo máximo (em horas) entre evacuações?"
                  : "Qual é o intervalo mínimo (em horas) entre evacuações?";
              }
            })()
          : (() =>
              props.isMax
                ? `${props.quest}, no máximo?`
                : `${props.quest}, no mínimo?`)()}
      </span>
      <input
        type="number"
        minLength={props.minLength ? props.minLength : 1}
        maxLength={props.maxLength}
        min={props.min ? props.min : (() => (props.isMax ? 1 : 0))()}
        max={props.max}
        className={`form-control noInvert inp${
          props.grp
        }Rot inp${props.ctx.replace("Dia", "")} inp${
          props.ctx
        } minText maxText minNum maxNum patternText${
          /interv/gi.test(props.ctx) && " float sevenCharLongNum"
        }${props.ur ? " inpUr inpUrDia" : ""}${
          props.ev ? " inpEv inpEvDia" : ""
        }`}
        id={
          !props.ur && !props.ev
            ? `${props.isMax ? `inp${props.ctx}Max` : `inp${props.ctx}Min`}`
            : (() => {
                if (props.ur) {
                  return props.isMax
                    ? `inp${props.ur.ctx}${props.ctx}Max`
                    : `inp${props.ur.ctx}${props.ctx}Min`;
                } else if (props.ev) {
                  return props.isMax
                    ? `inp${props.ev.ctx}${props.ctx}Max`
                    : `inp${props.ev.ctx}${props.ctx}Min`;
                } else
                  return props.isMax
                    ? `inp${props.ctx}Max`
                    : `inp${props.ctx}Min`;
              })()
        }
        name={`${props.ctx.slice(0, 1).toLowerCase()}${props.ctx
          .slice(1)
          .replaceAll(/([A-Z])/g, "_$1")
          .toLowerCase()}_${props.isMax ? "max" : "min"}`}
        required
        data-title={title}
        data-reqlength={props.minLength ? props.minLength : 1}
        data-maxlength={props.maxLength}
        data-minnum={props.min ? props.min : (() => (props.isMax ? 1 : 0))()}
        data-maxnum={props.max}
        data-pattern={props.pattern ? props.pattern : "^[\\d,.]+$"}
        onInput={ev => handleEventReq(ev.currentTarget)}
      />
    </ErrorBoundary>
  );
}
