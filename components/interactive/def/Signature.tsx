"use client";
import { changeToAstDigit } from "@/lib/global/handlers/gHandlers";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { nullishCanvas } from "@/lib/global/declarations/types";
import { useEffect, useState, useRef } from "react";
let ctx: CanvasRenderingContext2D | null = null;
export default function Signature(): JSX.Element {
  const canvasRef = useRef<nullishCanvas>(null);
  const [isDrawing, setDrawing] = useState<boolean>(false);
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setDrawing(true);
    draw(e);
  };
  const startDrawingTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setDrawing(true);
    drawTouch(e);
  };
  const draw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
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
  };
  const drawTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
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
  const stopDrawing = () => {
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
        <button type='button' className='btn btn-secondary' id='resetAstBtn'>
          Resetar
        </button>
      </span>
    </div>
  );
}
