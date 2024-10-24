"use client";
import { DlgProps } from "@/lib/global/declarations/interfaces";
export default function BtnConform({ dispatch, state }: DlgProps): JSX.Element {
  return (
    <button
      type='button'
      className='btn btn-info bolded mg-1t widThird widHalf900Q widFull600Q'
      id='btnConform'
      style={{ cursor: "context-menu" }}
      onClick={() => dispatch(!state)}>
      Abrir Declaração de Concordância
    </button>
  );
}
