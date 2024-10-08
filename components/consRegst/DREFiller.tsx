"use client";
import { FillerProps } from "@/lib/global/declarations/interfacesCons";
import { addListenerAvMembers } from "@/lib/locals/panelPage/handlers/consHandlerList";
import { providers } from "@/vars";
("../panelForms/defs/client/SelectPanel");
import { nlBtn, nlDiv } from "@/lib/global/declarations/types";
import { useEffect, useRef, useState } from "react";
import AvStudListDlg from "../lists/AvStudListDlg";
import { handleCondtReq, syncAriaStates } from "@/lib/global/handlers/gHandlers";
export default function DREFiller({ forwardedRef }: FillerProps): JSX.Element {
  const btnStudListRef = useRef<nlBtn>(null);
  const fillerDivRef = useRef<nlDiv>(null);
  const [shouldDisplayStudList, setStudListDisplay] = useState<boolean>(false);
  const toggleStudListDisplay = (s: boolean = false): void => setStudListDisplay(!s);
  useEffect(() => {
    /av-stud=open/gi.test(location.search) && setStudListDisplay(true);
  }, []);
  useEffect(() => {
    if (fillerDivRef.current instanceof HTMLDivElement) {
      addListenerAvMembers(forwardedRef || fillerDivRef, false);
      //storage
      providers.globalDataProvider &&
        providers.globalDataProvider.initPersist(fillerDivRef.current, providers.globalDataProvider);
      //estilo e aria
      syncAriaStates([...fillerDivRef.current!.querySelectorAll("*"), fillerDivRef.current]);
    }
  }, [fillerDivRef, forwardedRef]);
  return (
    <>
      <div role='group' className='flexNoWC flexBasis100 widFull mg-1b' id='CPFFillerDiv' ref={fillerDivRef}>
        <label className='stLab' id='hRelStud'>
          CPF do Estudante Alocado:
        </label>
        <div role='group' className='flexNoWRSwitch cGap5' id='firstNamePacBody'>
          <input
            className='form-control ssPersist'
            id='inpCPFStudFiller'
            list='listCPFStudsCons'
            data-title='CPF de Estudante Alocado'
            maxLength={16}
            placeholder='Preencha com o CPF do Estudante Alocado'
            onInput={ev =>
              handleCondtReq(ev.currentTarget, {
                min: 1,
                max: 16,
                pattern: ["^(d{3}.){2}d{3}-d{2}$", ""],
              })
            }
          />
          <datalist id='listCPFStudsCons'>
            <optgroup label='Odontologia'>
              <option value='123.456.789-12 — Odontologia'>Maria Eduarda Augusta</option>
              <option value='123.789.456-22 — Odontologia'>Josefina Guedes Pereira</option>
            </optgroup>
            <optgroup label='Educação Física & Nutrição'>
              <option value='789.123.456-78 — Educação Física'>Augusto Duarte Fonseca</option>
            </optgroup>
          </datalist>
        </div>
      </div>
      <div role='group' className='flexNoWC flexBasis100 widFull mg-1b' id='DREFillerDiv'>
        <label className='stLab' id='hRelStud'>
          DRE do Estudante Alocado:
        </label>
        <div role='group' className='flexNoWRSwitch cGap5' id='firstNamePacBody'>
          <input
            className='form-control'
            id='inpDREStudFiller ssPersist'
            list='listDREStudsCons'
            data-title='DRE de Estudante Alocado'
            maxLength={12}
            placeholder='Preencha com o DRE do Estudante Alocado'
            onInput={ev => {
              handleCondtReq(ev.currentTarget, {
                min: 1,
                max: 12,
                pattern: ["^d{9,}$", ""],
              });
            }}
          />
          <datalist id='listDREStudsCons'>
            <optgroup label='Odontologia'>
              <option value='123456789 — Odontologia'>Maria Eduarda Augusta</option>
              <option value='987654321 — Odontologia'>Josefina Guedes Pereira</option>
            </optgroup>
            <optgroup label='Educação Física & Nutrição'>
              <option value='111222333 — Educação Física'>Augusto Duarte Fonseca</option>
            </optgroup>
          </datalist>
          <button
            type='button'
            formMethod='get'
            formAction='#'
            id='btnShowAvProfs'
            className='btn btn-primary hBsFormLike'
            ref={btnStudListRef}
            onClick={() => toggleStudListDisplay(shouldDisplayStudList)}
            style={{ fontSize: "0.9rem" }}>
            Consultar Lista de Estudantes
          </button>
          {shouldDisplayStudList ? (
            <AvStudListDlg forwardedRef={forwardedRef} dispatch={setStudListDisplay} state={shouldDisplayStudList} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
