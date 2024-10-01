"use client";
import { changeToAstDigit } from "@/lib/global/handlers/gHandlers";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { nullishCanvas } from "@/lib/global/declarations/types";
import { useEffect, useState, useRef, useCallback } from "react";
import { addCanvasListeners } from "@/lib/global/gController";
let ctx: CanvasRenderingContext2D | null = null;
export default function Signature(): JSX.Element {
  const canvasRef = useRef<nullishCanvas>(null);
  const [isDrawing, setDrawing] = useState<boolean>(false);
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void => {
    setDrawing(true);
    draw(e);
  };
  const startDrawingTouch = (e: React.TouchEvent<HTMLCanvasElement>): void => {
    setDrawing(true);
    drawTouch(e);
  };
  const draw = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void => {
      try {
        if (!(canvasRef.current instanceof HTMLCanvasElement))
          throw elementNotFound(canvasRef.current, `Validation of Canvas Ref Instance`, extLine(new Error()));
        if (!(ctx instanceof CanvasRenderingContext2D))
          throw new Error(`Error getting Canvas Context:
          Obtained Value: ${ctx ?? "nullish"}`);
        if (!isDrawing) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
      } catch (e) {
        console.error(`Error executing draw():
        ${(e as Error).message}`);
      }
    },
    [isDrawing],
  );
  const drawTouch = (e: React.TouchEvent<HTMLCanvasElement>): void => {
    try {
      if (!(canvasRef.current instanceof HTMLCanvasElement))
        throw elementNotFound(canvasRef.current, `Validation of Canvas Ref Instance`, extLine(new Error()));
      if (!(ctx instanceof CanvasRenderingContext2D))
        throw new Error(`Error getting Canvas Context:
        Obtained Value: ${ctx ?? "nullish"}`);
      if (!isDrawing) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const point = e.touches[0];
      const x = point.clientX - rect.left;
      const y = point.clientY - rect.top;
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    } catch (e) {
      console.error(`Error executing draw():
      ${(e as Error).message}`);
    }
  };
  const stopDrawing = (): void => {
    setDrawing(false);
    ctx?.beginPath();
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
          ctx = canvasRef.current.getContext("2d");
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
          className='astDigtBtn autocorrect confirmBtn btn btn-secondary'
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
                astEl.parentElement!.replaceChild(replaceInp, astEl);
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
