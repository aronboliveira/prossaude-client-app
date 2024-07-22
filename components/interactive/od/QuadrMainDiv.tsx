"use client";

import { qrProps } from "@/lib/global/declarations/interfaces";
import { nullishDiv } from "@/lib/global/declarations/types";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import {
  dragEnd,
  dragEnter,
  dragHover,
  dragLeave,
  dragOver,
  dragStart,
  resetLabels,
} from "@/lib/locals/odPage/odHandler";
import { orderLabels } from "@/lib/locals/odPage/odModel";
import { useEffect, useRef } from "react";
import InpAvDent from "./InpAvDent";

export default function QuadrMainDiv({ qr }: qrProps): JSX.Element {
  const subDivRef = useRef<nullishDiv>(null);
  const teethList = (() => {
    if (qr === "SupEsq") return [21, 22, 23, 24, 25, 26, 27, 28];
    else if (qr === "InfEsq") return [31, 32, 33, 34, 35, 36, 37, 38];
    else if (qr === "InfDir") return [41, 42, 43, 44, 45, 46, 47, 48];
    else return [11, 12, 13, 14, 15, 16, 17, 18];
  })();
  useEffect(() => {
    try {
      if (!(subDivRef.current instanceof HTMLElement))
        throw elementNotFound(
          subDivRef.current,
          `Validation of Sub Div Instance`,
          extLine(new Error())
        );
      orderLabels(subDivRef.current);
    } catch (e) {
      console.error(
        `Error executing useEffect for QuadrMainDiv ${qr}:\n${
          (e as Error).message
        }`
      );
    }
  }, []);
  return (
    <div
      role="group"
      className="quadrAvDent quadrMainDiv form-control"
      id={`divMain${qr}`}
      itemProp="dentQuadr"
      draggable="true"
      onMouseMove={ev => dragHover(ev.currentTarget)}
      onDragStart={ev =>
        dragStart(
          ev,
          Array.from(document.getElementsByClassName("quadrMainDiv"))
        )
      }
      onTouchStart={ev =>
        dragStart(
          ev,
          Array.from(document.getElementsByClassName("quadrMainDiv"))
        )
      }
      onDragEnter={dragEnter}
      onDragOver={dragOver}
      onDragLeave={dragLeave}
      onDragEnd={ev => dragEnd(ev.currentTarget)}
      onTouchEnd={ev => dragEnd(ev.currentTarget)}
    >
      <div
        role="group"
        className="flexDiv headQuadr tabCelTop"
        id={`headDiv${qr}`}
      >
        <p className="pQuadr" id={`title${qr}`}>
          {(qr === "SupDir" && "Superior Direito") ||
            (qr === "SupEsq" && "Superior Esquerdo") ||
            (qr === "InfDir" && "Inferior Direito") ||
            (qr === "InfEsq" && "Inferior Esquerdo")}
        </p>
        <button
          type="button"
          className="resetBut btn btn-secondary"
          id={`reset${qr}`}
          onClick={ev => resetLabels(ev.currentTarget)}
        >
          Resetar
        </button>
      </div>
      <div
        role="group"
        className={`contInQuadrs divSub quadrAvDent quadrSubDiv tabCelBottom`}
        id={`divSub${qr}`}
        itemProp="dentQuadr"
        ref={subDivRef}
      >
        {teethList.map(teethNum => (
          <InpAvDent qr={qr} num={teethNum} key={`${qr}_${teethNum}`} />
        ))}
      </div>
    </div>
  );
}
