"use client";

import { InpRotProps } from "@/lib/global/declarations/interfaces";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../error/GenericErrorComponent";
import { handleEventReq } from "@/lib/global/handlers/gHandlers";
import { useEffect, useRef } from "react";
import { mainContextRot, nullishInp } from "@/lib/global/declarations/types";
import { extLine, inputNotFound } from "@/lib/global/handlers/errorHandler";

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
        {props.ctx === "UrInterv"
          ? props.quest
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
          props.ur && " inpUr inpUrDia"
        }`}
        id={
          !props.ur
            ? `${props.isMax ? `inp${props.ctx}Max` : `inp${props.ctx}Min`}`
            : `${
                props.isMax
                  ? `inp${props.ur.ctx}${props.ctx}Max`
                  : `inp${props.ur.ctx}${props.ctx}Min`
              }`
        }
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
