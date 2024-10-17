"use client";
import { changeToAstDigit } from "@/lib/global/handlers/gHandlers";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { nullishCanvas, rMouseEvent } from "@/lib/global/declarations/types";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { addCanvasListeners, getCanvasCoords } from "@/lib/global/gController";
import { useRouter } from "next/router";
import s from "@/styles/locals/modules/sharedComponents.module.scss";
export default function Signature(): JSX.Element {
  const canvasRef = useRef<nullishCanvas>(null),
    ctxRef = useRef<CanvasRenderingContext2D | null>(null),
    [isDrawing, setDrawing] = useState<boolean>(false),
    router = useRouter(),
    startDrawing = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void => {
      e.preventDefault();
      setDrawing(true);
      draw(e);
    },
    startDrawingTouch = (e: React.TouchEvent<HTMLCanvasElement>): void => {
      e.preventDefault();
      setDrawing(true);
      drawTouch(e);
    },
    memoizedCoords = useMemo(
      () => (canvas: HTMLCanvasElement, e: React.Touch | Touch | rMouseEvent) => {
        if (!(canvas instanceof HTMLCanvasElement)) return { x: e.clientX, y: e.clientY };
        return getCanvasCoords(e.clientX, e.clientY, canvas);
      },
      [],
    ),
    draw = useCallback(
      (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void => {
        try {
          const canvas = canvasRef.current;
          if (!(canvas instanceof HTMLCanvasElement))
            throw elementNotFound(canvas, `Validation of Canvas Ref Instance`, extLine(new Error()));
          const ctx = ctxRef.current ?? canvas.getContext("2d");
          if (!ctx) throw new Error("Canvas context could not be obtained");
          if (!isDrawing) return;
          const { x, y } = memoizedCoords(canvas, e);
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x, y);
        } catch (e) {
          console.error(`Error executing draw():\n${(e as Error).message}`);
        }
      },
      [isDrawing, canvasRef, memoizedCoords],
    ),
    drawTouch = useCallback(
      (e: React.TouchEvent<HTMLCanvasElement>): void => {
        try {
          const canvas = canvasRef.current;
          if (!(canvas instanceof HTMLCanvasElement))
            throw elementNotFound(canvas, `Validation of Canvas Ref Instance`, extLine(new Error()));
          const ctx = ctxRef.current ?? canvas.getContext("2d");
          if (!(ctx instanceof CanvasRenderingContext2D))
            throw new Error(`Error getting Canvas Context:\nObtained Value: ${ctx ?? "nullish"}`);
          if (!isDrawing) return;
          const { x, y } = memoizedCoords(canvas, e.touches[0]);
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x, y);
        } catch (e) {
          console.error(`Error executing draw():\n${(e as Error).message}`);
        }
      },
      [isDrawing, canvasRef, memoizedCoords],
    ),
    stopDrawing = (): void => {
      setDrawing(false);
      ctxRef.current?.beginPath();
    };
  useEffect(() => {
    const equalizeCanvas = (): void => {
      try {
        if (!(canvasRef.current instanceof HTMLCanvasElement))
          throw elementNotFound(canvasRef.current, `Validation of Canvas Instance`, extLine(new Error()));
        try {
          if (!(canvasRef.current instanceof HTMLCanvasElement))
            throw elementNotFound(canvasRef.current, `Validation of Canvas Reference Instance`, extLine(new Error()));
          canvasRef.current.height = 80;
          const ctx = ctxRef.current ?? canvasRef.current.getContext("2d");
          if (!ctx)
            throw new Error(`Error validating canvasRef.current context:
              Obtained value: ${ctx ?? "nullish"}`);
          ctx.fillRect(10, canvasRef.current.height - 10, canvasRef.current.width - 20, 1.5);
          ctx.lineWidth = 4;
          ctx.lineCap = "round";
          ctx.strokeStyle = "#222";
        } catch (e) {
          console.error(`Error executing procedure for defining context for Canvas:\n${(e as Error).message}`);
        }
      } catch (e) {
        console.error(
          `Error executing equalizeCanvas for ${Signature.prototype.constructor.name}:${(e as Error).message}`,
        );
      }
    };
    equalizeCanvas();
    addEventListener("resize", equalizeCanvas);
    return removeEventListener("resize", equalizeCanvas);
  }, []);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) ctxRef.current = ctx;
    }
  }, []);
  return (
    <div className='divSub divConfirm flexEl' id='divConfirm3' role='group'>
      <span role='group' id='spanAstPct' className='labConfirm labAst widHalf bolded'>
        <span>Assinatura do Paciente:</span>
        <canvas
          data-xls='Assinatura de Concordância do Paciente:'
          id='inpAstConfirmId'
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={startDrawingTouch}
          onTouchMove={drawTouch}
          onTouchEnd={stopDrawing}
          data-name='signature'></canvas>
        <button
          type='button'
          className={`astDigtBtn autocorrect confirmBtn btn btn-secondary ${
            /edfis/gi.test(router.pathname) ? s.confirmAstDigtBtnEn : ""
          }`}
          id='confirmAstDigtBtn'
          onClick={ev => changeToAstDigit(ev.currentTarget)}>
          Usar Assinatura Digital
        </button>
        <button
          type='button'
          className='btn btn-secondary'
          id='resetAstBtn'
          onClick={ev => {
            try {
              const divConfirm = ev.currentTarget.closest(".divConfirm");
              if (!(divConfirm instanceof HTMLElement))
                throw elementNotFound(divConfirm, `Main ancestral div for resetAstBtn`, extLine(new Error()));
              const astEl = divConfirm.querySelector("#inpAstConfirmId");
              if (!(astEl instanceof HTMLCanvasElement || astEl instanceof HTMLInputElement))
                throw elementNotFound(astEl, `Element for patient signing`, extLine(new Error()));
              if (astEl instanceof HTMLCanvasElement) {
                const replaceCanvas = Object.assign(document.createElement("canvas"), {
                  id: "inpAstConfirmId",
                });
                replaceCanvas.dataset.title = "Assinatura do Paciente";
                astEl.parentElement!.replaceChild(replaceCanvas, astEl);
                addCanvasListeners();
              }
              if (astEl instanceof HTMLInputElement) {
                const replaceInp = Object.assign(
                  Object.assign(document.createElement("input") as HTMLInputElement, {
                    type: "file",
                    id: "inpAstConfirmId",
                    accept: "image/*",
                  }),
                );
                replaceInp.dataset.title = "Assinatura do Paciente";
                replaceInp.classList.add("inpAst", "mg-07t", "form-control");
                astEl.parentElement?.replaceChild(replaceInp, astEl);
              }
            } catch (e2) {
              console.error(`Error handling click on Reset signature button`);
            }
          }}>
          Resetar
        </button>
      </span>
    </div>
  );
}
