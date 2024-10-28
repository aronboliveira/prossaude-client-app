import { nlBtn } from "@/lib/global/declarations/types";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { textTransformPascal } from "@/lib/global/gModel";
import { PanelCtx } from "../defs/client/SelectLoader";
import { handleAptBtnClick, replaceRegstSlot } from "@/lib/locals/panelPage/handlers/consHandlerCmn";
import { elementNotFound, extLine, inputNotFound } from "@/lib/global/handlers/errorHandler";
import { sessionScheduleState } from "@/vars";
import { AptBtnProps } from "@/lib/global/declarations/interfaces";
let isDragging = false,
  fbTouch: Touch | React.Touch,
  initialX = 0,
  initialY = 0,
  offsetX = 0,
  offsetY = 0;
export default function AptBtn({ formData, providerFormData }: AptBtnProps): JSX.Element {
  const userClass = useContext(PanelCtx).userClass,
    [aptText, setAptText] = useState<string>("Anônimo"),
    [consText, setConsText] = useState<string>("Consulta"),
    aptRef = useRef<nlBtn>(null);
  const calculateSlotsCoords = useCallback((slots: Element[]) => {
    const slotsCoords = slots.map(slot => {
      const rect = slot.getBoundingClientRect();
      return Object.assign(
        {},
        {
          upperLeftVert: [rect.x, rect.y],
          upperRightVert: [rect.x + rect.width, rect.y],
          lowerLeftVert: [rect.x, rect.y + rect.height],
          lowerRightVert: [rect.x + rect.width, rect.y + rect.height],
        },
      );
    });
    return slotsCoords;
  }, []);
  useEffect(() => {
    setAptText(
      `${
        formData.cons.match(/\s/g)
          ? `${formData.cons.slice(0, 1).toUpperCase() || "C"}${
              formData.cons.slice(1, formData.cons.indexOf(" ") + 1) || "onsulta"
            }`
          : `${formData.cons.slice(0, 1).toUpperCase()}${formData.cons.slice(1)}`
      }: ${formData.cons.slice(0, 1).toUpperCase() || "C"}${formData.cons.slice(1) || "onsulta"}`,
    );
  }, [formData, setAptText]);
  useEffect(() => {
    setConsText(
      `${
        formData.cons.match(/\s/g)
          ? ` : ${formData.name || "noName"}`
          : ` : ${textTransformPascal(formData.name) || "noName"}`
      }`,
    );
  }, [formData, setConsText]);
  return (
    <button
      ref={aptRef}
      style={{
        display: "flex",
        flexWrap: "nowrap",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        verticalAlign: "text-top",
        textAlign: "center",
        fontSize: "0.5rem",
      }}
      type='button'
      data-title={`Botão para o paciente ${providerFormData.name || "Anônimo"}`}
      title='Consulte a ficha da consulta recém-cadastrada, arraste o botão para a agenda'
      id={`appointmentBtn-${providerFormData.time}`}
      className='btn btn-info appointmentBtn forceInvert'
      formMethod='get'
      draggable={true}
      contentEditable={true}
      onClick={ev => handleAptBtnClick(ev, userClass)}
      onDragEnd={end => {
        try {
          const slots = Array.from(document.getElementsByClassName("consSlot")).filter(
            slot => slot instanceof HTMLSlotElement,
          );
          const slotsCoords = calculateSlotsCoords(slots);
          for (let c = 0; c < slotsCoords.length; c++) {
            let isSlotMatch = false;
            end.clientX >= slotsCoords[c].upperLeftVert[0] &&
            end.clientX <= slotsCoords[c].upperRightVert[0] &&
            end.clientY >= slotsCoords[c].upperLeftVert[1] &&
            end.clientY <= slotsCoords[c].lowerLeftVert[1]
              ? (isSlotMatch = true)
              : (isSlotMatch = false);
            const [matchedSlot] = document
              .elementsFromPoint(end.clientX, end.clientY)
              .filter(el => el.classList.contains("consSlot"));
            matchedSlot instanceof HTMLElement ? (isSlotMatch = true) : (isSlotMatch = false);
            if (isSlotMatch) {
              if (
                !(end.currentTarget instanceof HTMLButtonElement) &&
                ((end.currentTarget as any).tagName === "STRONG" ||
                  (end.currentTarget as any).tagName === "EM" ||
                  (end.currentTarget as any).tagName === "SPAN") &&
                (end.currentTarget as any).closest("button")
              )
                end.currentTarget = (end.currentTarget as HTMLElement).closest("button") as HTMLButtonElement;
              if (!(end.currentTarget instanceof HTMLButtonElement))
                throw elementNotFound(
                  end.currentTarget,
                  `New Appointment Button in touchstart callback`,
                  extLine(new Error()),
                );
              replaceRegstSlot(matchedSlot, end.currentTarget, slots, userClass);
              try {
                //TODO PEGAR REF
                const monthSelector = document.getElementById("monthSelector");
                if (!(monthSelector instanceof HTMLSelectElement || monthSelector instanceof HTMLInputElement))
                  throw inputNotFound(
                    monthSelector,
                    `monthSelector for updating session schedule state after dragend`,
                    extLine(new Error()),
                  );
                //TODO PEGAR REF
                const tbody = document.getElementById("tbSchedule");
                if (!(tbody instanceof HTMLElement))
                  throw elementNotFound(
                    tbody,
                    `tbody for updating session schedule state after dragend`,
                    extLine(new Error()),
                  );
                //atualização no drop (associada com replaceregstslot)
                sessionScheduleState[monthSelector.value] = tbody.innerHTML;
              } catch (e) {
                console.error(`Error updation session schedule state after dragend:
								${(e as Error).message}`);
              }
              break;
            } else console.warn(`No slot match found for dragend.`);
          }
        } catch (e) {
          console.error(`Error executing dragEnd callback:${(e as Error).message}`);
        }
      }}
      onTouchStart={ev => {
        isDragging = true;
        fbTouch = Array.from(ev.touches).find(
          touch => touch.target instanceof HTMLElement && touch.target.classList.contains("appointmentBtn"),
        ) as any;
        const slots = Array.from(document.getElementsByClassName("consSlot")).filter(
          slot => slot instanceof HTMLSlotElement,
        );
        const slotsCoords = calculateSlotsCoords(slots);
        if (
          !(ev.currentTarget instanceof HTMLButtonElement) &&
          ((ev.currentTarget as any).tagName === "STRONG" ||
            (ev.currentTarget as any).tagName === "EM" ||
            (ev.currentTarget as any).tagName === "SPAN") &&
          (ev.currentTarget as any).closest("button")
        )
          ev.currentTarget = (ev.currentTarget as HTMLElement).closest("button") as HTMLButtonElement;
        if (!(ev.currentTarget instanceof HTMLButtonElement))
          throw elementNotFound(
            ev.currentTarget,
            `New Appointment Button in touchstart callback`,
            extLine(new Error()),
          );
        if (!("clientX" in fbTouch)) fbTouch = ev.touches[0];
        if (fbTouch) {
          const touch = fbTouch;
          initialX = touch.clientX - offsetX;
          initialY = touch.clientY - offsetY;
          (ev.currentTarget as HTMLButtonElement).style.position = "absolute";
          (ev.currentTarget as HTMLButtonElement).style.zIndex = "50";
        }
        const handleTouchDrag = (ev: TouchEvent): void => {
            if (!isDragging) return;
            ev.preventDefault();
            const touch = ev.targetTouches[0];
            offsetX = touch.clientX - initialX;
            offsetY = touch.clientY - initialY;
            (ev.currentTarget as HTMLButtonElement).style.transform = `translate(${offsetX}px, ${offsetY}px)`;
          },
          handleTouchEnd = (end: TouchEvent): void => {
            console.log(end);
            if (isDragging) {
              try {
                const targ = fbTouch;
                if (!(targ instanceof Touch)) throw new Error(`Failed to fetch touch target`);
                for (let c = 0; c < slotsCoords.length; c++) {
                  let isSlotMatch = false;
                  targ.clientX >= slotsCoords[c].upperLeftVert[0] &&
                  targ.clientX <= slotsCoords[c].upperRightVert[0] &&
                  targ.clientY >= slotsCoords[c].upperLeftVert[1] &&
                  targ.clientY <= slotsCoords[c].lowerLeftVert[1]
                    ? (isSlotMatch = true)
                    : (isSlotMatch = false);
                  const [matchedSlot] = document
                    .elementsFromPoint(targ.clientX, targ.clientY)
                    .filter(el => el.classList.contains("consSlot"));
                  matchedSlot instanceof HTMLElement ? (isSlotMatch = true) : (isSlotMatch = false);
                  if (
                    !(ev.currentTarget instanceof HTMLButtonElement) &&
                    ((ev.currentTarget as any).tagName === "STRONG" ||
                      (ev.currentTarget as any).tagName === "EM" ||
                      (ev.currentTarget as any).tagName === "SPAN") &&
                    (ev.currentTarget as any).closest("button")
                  )
                    ev.currentTarget = (ev.currentTarget as HTMLElement).closest("button") as HTMLButtonElement;
                  if (isSlotMatch) {
                    (ev.currentTarget as HTMLButtonElement).style.position = "static";
                    (ev.currentTarget as HTMLButtonElement).style.zIndex = "10";
                    replaceRegstSlot(matchedSlot, ev.currentTarget as HTMLButtonElement, slots, userClass);
                    (ev.currentTarget as HTMLButtonElement).style.transform = `translate(0, 0)`;
                    try {
                      const monthSelector = document.getElementById("monthSelector");
                      if (!(monthSelector instanceof HTMLSelectElement || monthSelector instanceof HTMLInputElement))
                        throw inputNotFound(
                          monthSelector,
                          `monthSelector for updating session schedule state after dragend`,
                          extLine(new Error()),
                        );
                      const tbody = document.getElementById("tbSchedule");
                      if (!(tbody instanceof HTMLElement))
                        throw elementNotFound(
                          tbody,
                          `tbody for updating session schedule state after dragend`,
                          extLine(new Error()),
                        );
                      sessionScheduleState[monthSelector.value] = tbody.innerHTML;
                    } catch (e) {
                      console.error(`Error updation session schedule state after dragend:
									${(e as Error).message}`);
                    }
                    break;
                  } else console.warn(`No slot match found for dragend.`);
                }
              } catch (e) {
                console.error(`Error executing handleToucEnd:\n${(e as Error).message}`);
              }
              isDragging = false;
            }
            document.removeEventListener("touchmove", handleTouchDrag);
            document.removeEventListener("touchend", handleTouchEnd);
          };
        document.addEventListener("touchmove", handleTouchDrag, {
          passive: false,
        });
        document.addEventListener("touchend", handleTouchEnd, { once: true });
      }}>
      <span role='textbox' id={`appointmentBtn-${providerFormData.time}_pac`}>
        <strong>{aptText}</strong>
      </span>
      <em id={`appointmentBtn-${providerFormData.time}_type`}>{consText}</em>
    </button>
  );
}
