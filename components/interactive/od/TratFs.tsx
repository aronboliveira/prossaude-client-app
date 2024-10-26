"use client";
import { CounterAction } from "@/lib/global/declarations/interfaces";
import { addSubDivTrat } from "@/lib/locals/odPage/odHandler";
import { useEffect, useReducer, useRef } from "react";
import { nlBtn, nlFs, nlInp } from "@/lib/global/declarations/types";
import { elementNotFound, extLine, inputNotFound } from "@/lib/global/handlers/errorHandler";
import { changeToAstDigit, syncAriaStates } from "@/lib/global/handlers/gHandlers";
import sEn from "@/styles//modules/enStyles.module.scss";
import { compProp } from "@/lib/global/gModel";
export default function TratFs(props: { phCb?: () => void }): JSX.Element {
  const mainRef = useRef<nlFs>(null);
  const btnRef = useRef<nlBtn>(null);
  const inpRef = useRef<nlInp>(null);
  const [blockCount, setBlockCount] = useReducer((s: number, a: CounterAction) => {
    switch (a.type) {
      case "INCREMENT":
        return s + 1;
      case "DECREMENT":
        return s > 2 ? s - 1 : s;
      default:
        return s;
    }
  }, 2);
  useEffect(() => {
    try {
      if (!(mainRef.current instanceof HTMLElement))
        throw elementNotFound(mainRef.current, `Main reference for TratFs`, extLine(new Error()));
      syncAriaStates([mainRef.current, ...mainRef.current.querySelectorAll("*")]);
      props.phCb && props.phCb();
      if (!(btnRef.current instanceof HTMLButtonElement))
        throw elementNotFound(btnRef.current, `Validation of Button Reference for Signature`, extLine(new Error()));
      if (!(inpRef.current instanceof HTMLInputElement))
        throw inputNotFound(inpRef.current, `Validation of Input Reference for Signature`, extLine(new Error()));
      inpRef.current.style.width = `${compProp(btnRef.current, "width")}px`;
    } catch (e) {
      console.error(`Error executing useEffect for blockCount:\n${(e as Error).message}`);
    }
  }, [blockCount]);
  return (
    <fieldset name='fsTratName' id='fsTratId' className='fsMain noInvert' ref={mainRef}>
      <legend className='legMain' id='fsRelTratLeg'>
        Relação de Tratamentos
        <span role='group' className='spanMain tratMainSpan tratButSpan' id='tratButSpan1'>
          <button
            type='button'
            name='addTratName1'
            id='addTratId1'
            style={{ transform: "scale(0.7)", cursor: "cell" }}
            className='addTrat countTrat biBtn'
            defaultValue='addTrat'
            onClick={ev => {
              addSubDivTrat(ev, ev.currentTarget, blockCount);
              setBlockCount({ type: "INCREMENT" });
            }}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className={`bi bi-plus ${sEn.bi} ${sEn.biPlus}`}
              viewBox='0 0 16 16'>
              <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4' />
            </svg>
          </button>
          <button
            type='button'
            name='removeTratName1'
            id='removeTratId1'
            className='removeTrat countTrat biBtn'
            defaultValue='removeTrat'
            style={{ transform: "translateY(-0.03rem) scale(0.8)", marginLeft: "0.5rem", cursor: "vertical-text" }}
            onClick={ev => {
              addSubDivTrat(ev, ev.currentTarget, blockCount);
              setBlockCount({ type: "DECREMENT" });
            }}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className={`bi bi-dash ${sEn.bi} ${sEn.biDash}`}
              viewBox='0 0 16 16'>
              <path d='M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8' />
            </svg>
          </button>
        </span>
      </legend>
      <div role='group' className='tratDiv noInvert'>
        <table id='tratContainer'>
          <colgroup>
            {Array.from({ length: 4 }, (_, i) => (
              <col key={`trat_col__${i}`} id={`tratCol${i + 1}`}></col>
            ))}
          </colgroup>
          <thead className='tratHead'>
            <tr className='tratHeader'>
              <th className='tratMainSpan hiddenLab'>1)</th>
              <th className='tratMainSpan tratLabel tratTaLab noInvert' id='labTratTip1'>
                Tipo de Tratamento
              </th>
              <th className='tratMainSpan tratLabel tratDateLab noInvert'>Data</th>
              <th id='spanAstTratId1' className='tratMainSpan tratLabel tratAstLab noInvert'>
                Assinatura
              </th>
            </tr>
          </thead>
          <tbody className='tratTBody'>
            <tr className='divSub divSubTrat' id='divSubTrat1'>
              <th className='spanMain tratMainSpan tratNumSpan noInvert' id='tratNumSpan1'>
                1)
              </th>
              <td className='spanMain tratMainSpan tratTypeSpan' id='tratTypeSpan1'>
                <textarea
                  name={`trat_${blockCount - 1}`}
                  id='taTratId1'
                  className='inlinebTa taTrat'
                  data-title='Tratamento 1'
                  required></textarea>
              </td>
              <td className='spanMain tratMainSpan tratDateSpan' id='tratDateSpan1'>
                <input
                  type='date'
                  name={`date_${blockCount - 1}`}
                  id='tratDateInpId1'
                  className='inpDate inpTrat tratDate'
                  data-title='Data do Tratamento 1'
                  required
                />
                <button type='button' className='tratBtn datBtn btn btn-secondary' id='trat2DatBtn'>
                  Usar data atual
                </button>
              </td>
              <td className='spanMain tratMainSpan tratFileSpan' id='tratFileSpan1'>
                <input
                  type='text'
                  name={`sig_${blockCount - 1}`}
                  id='inpAstTratId1'
                  className='inpTrat inpAst mg__07t tratAst form-control'
                  data-title='Assinatura do Tratamento 1'
                  ref={inpRef}
                />
                <button
                  type='button'
                  className='tratBtn confirmBtn btn btn-secondary'
                  id='trat1AstDigtBtn'
                  ref={btnRef}
                  onClick={ev => changeToAstDigit(ev.currentTarget)}>
                  Usar Assinatura Digital
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr />
    </fieldset>
  );
}
