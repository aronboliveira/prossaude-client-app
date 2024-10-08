import { ContactDlgProps } from "@/lib/global/declarations/interfacesCons";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { isClickOutside } from "@/lib/global/gStyleScript";
import { nlBtn, nullishDlg } from "@/lib/global/declarations/types";
import { useEffect, useRef } from "react";
import { validateForm, syncAriaStates } from "@/lib/global/handlers/gHandlers";
export default function ContactDlg({ setContact, shouldDisplayContact = true }: ContactDlgProps): JSX.Element {
  const contactDlgRef = useRef<nullishDlg>(null);
  const contacBtnRef = useRef<nlBtn>(null);
  useEffect(() => {
    if (contactDlgRef.current instanceof HTMLDialogElement) {
      contactDlgRef.current.showModal();
      syncAriaStates([...contactDlgRef.current.querySelectorAll("*"), contactDlgRef.current]);
    } else elementNotFound(contactDlgRef.current, "Dialog for contact request", extLine(new Error()));
  }, [contactDlgRef]);
  return (
    <>
      {shouldDisplayContact && (
        <dialog
          ref={contactDlgRef}
          className='modal-content-fit flexAlItCt flexNoWC'
          id='contactDlg'
          onClick={ev => {
            if (isClickOutside(ev, ev.currentTarget).some(coord => coord === true)) {
              setContact(!shouldDisplayContact);
              ev.currentTarget.closest("dialog")?.close();
            }
          }}>
          <div className='flexNoW cGap2v widFull mg-3b'>
            <h3 className='bolded'>Formulário de Contato</h3>
            <button
              className='btn btn-close'
              onClick={() => {
                setContact(!shouldDisplayContact);
                contactDlgRef.current instanceof HTMLDialogElement && contactDlgRef.current?.close();
              }}></button>
          </div>
          <div className='flexNoWC widFull mg-2bv'>
            <label className='bolded' htmlFor='contactOps'>
              Razão de contato
            </label>
            <select id='contactOps' className='form-select'>
              <option value='problema'>Problemas na Aplicação</option>
              <option value='duvida'>Dúvidas sobre o Sistema</option>
              <option value='outro'>Outros</option>
            </select>
          </div>
          <div className='flexNoWC widFull mg-2bv'>
            <label className='bolded' htmlFor='contactObs'>
              Detalhes
            </label>
            <textarea id='contactObs' className='form-control minText' minLength={2}></textarea>
          </div>
          <button
            type='button'
            id='submitContactBtn'
            className='btn btn-info widHalf bolded mg-1t'
            ref={contacBtnRef}
            onClick={ev => {
              validateForm(ev, ev.currentTarget.closest("dialog")!).then(
                validation => validation[0] && setContact(!shouldDisplayContact),
              );
            }}>
            Enviar
          </button>
        </dialog>
      )}
    </>
  );
}
