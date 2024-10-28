"use client";
import { ErrorBoundary } from "react-error-boundary";
import { InpRotProps } from "@/lib/global/declarations/interfaces";
import { handleEventReq } from "@/lib/global/handlers/gHandlers";
import { mainContextRot, nlInp } from "@/lib/global/declarations/types";
import { useEffect, useRef, useState } from "react";
import GenericErrorComponent from "../../../error/GenericErrorComponent";
import { applyFieldConstraints } from "@/lib/global/gModel";
import { tabProps } from "@/vars";
export default function InpRot(props: InpRotProps): JSX.Element {
  const inpRef = useRef<nlInp>(null),
    trusted = useRef<boolean>(false),
    [v, setValue] = useState<string>(""),
    title = ((): string => {
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
      if (!(inpRef.current instanceof HTMLInputElement)) return;
      if (props.flags && props.flags !== "") inpRef.current.dataset.flags = props.flags;
    } catch (e) {
      return;
    }
  }, [props.ctx, props.flags, props.grp]);
  useEffect(() => {
    try {
      if (!trusted.current) return;
      if (!(inpRef.current instanceof HTMLElement)) throw new Error(`Failed to validate current reference for input`);
      handleEventReq(inpRef.current);
    } catch (e) {
      return;
    }
  }, [inpRef, v, trusted]);
  return (
    <ErrorBoundary
      FallbackComponent={() => <GenericErrorComponent message={`Error rendering Input for ${props.quest}`} />}>
      <span>
        {props.ctx === "UrInterv" || props.ctx === "EvInterv"
          ? ((): string | undefined => {
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
          : ((): string | undefined => (props.isMax ? `${props.quest}, no máximo?` : `${props.quest}, no mínimo?`))()}
      </span>
      <input
        ref={inpRef}
        value={v}
        type='number'
        minLength={props.minLength ? props.minLength : 1}
        maxLength={props.maxLength}
        min={props.min ? props.min : ((): number => (props.isMax ? 1 : 0))()}
        max={props.max}
        className={`form-control noInvert min88_900 inp${props.grp}Rot inp${props.ctx.replace("Dia", "")} inp${
          props.ctx
        } minText maxText minNum maxNum patternText${/interv/gi.test(props.ctx) && " float sevenCharLongNum"}${
          props.ur ? " inpUr inpUrDia" : ""
        }${props.ev ? " inpEv inpEvDia" : ""}`}
        id={
          !props.ur && !props.ev
            ? `${props.isMax ? `inp${props.ctx}Max` : `inp${props.ctx}Min`}`
            : ((): any => {
                if (props.ur) {
                  return props.isMax ? `inp${props.ur.ctx}${props.ctx}Max` : `inp${props.ur.ctx}${props.ctx}Min`;
                } else if (props.ev) {
                  return props.isMax ? `inp${props.ev.ctx}${props.ctx}Max` : `inp${props.ev.ctx}${props.ctx}Min`;
                } else return props.isMax ? `inp${props.ctx}Max` : `inp${props.ctx}Min`;
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
        data-minnum={props.min ? props.min : ((): number => (props.isMax ? 1 : 0))()}
        data-maxnum={props.max}
        data-pattern={props.pattern ? props.pattern : "^[\\d,.]+$"}
        onInput={ev => {
          if (ev.isTrusted) trusted.current = true;
          if (!trusted.current) return;
          tabProps.edIsAutoCorrectOn && applyFieldConstraints(ev.currentTarget);
          setValue(ev.currentTarget.value);
        }}
      />
    </ErrorBoundary>
  );
}
