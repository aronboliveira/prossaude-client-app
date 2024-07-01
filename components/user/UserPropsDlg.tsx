import {
  nullishBtn,
  nullishDlg,
  nullishInp,
  nullishSel,
} from "@/lib/global/declarations/types";
import {
  addEmailExtension,
  autoCapitalizeInputs,
  formatTel,
} from "@/lib/global/gModel";
import { isClickOutside } from "@/lib/global/gStyleScript";
import {
  elementNotFound,
  extLine,
  multipleElementsNotFound,
} from "@/lib/global/handlers/errorHandler";
import { subForm, syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { UserPropsDlgProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../error/GenericErrorComponent";

export default function UserPropsDlg({
  setPropDlg,
  shouldDisplayPropDlg = true,
}: UserPropsDlgProps) {
  const userPropsDlgRef = useRef<nullishDlg>(null);
  const userPropsBtnRef = useRef<nullishBtn>(null);
  const newUserValueRef = useRef<nullishInp | HTMLSelectElement>(null);
  const userPropsSelRef = useRef<nullishSel>(null);
  const [, setPropValue] = useState<string>("userName");
  const changeUserProp = (value: string) => {
    if (!newUserValueRef.current)
      newUserValueRef.current = document.getElementById("userPropsNewValue") as
        | HTMLSelectElement
        | HTMLInputElement;
    if (
      userPropsSelRef.current instanceof HTMLSelectElement &&
      (newUserValueRef.current instanceof HTMLInputElement ||
        newUserValueRef.current instanceof HTMLSelectElement)
    ) {
      setPropValue(value);
      newUserValueRef.current.value = "";
      const replaceInp = (
        type: string = "text",
        placeholder: boolean = true,
        minText: boolean = true
      ) => {
        const newInp = document.createElement("input");
        newInp.classList.add(...["form-control"]);
        Object.assign(newInp, {
          id: "userPropsNewValue",
          type: type,
        });
        if (placeholder) newInp.placeholder = "Insira aqui o novo valor";
        if (minText) {
          newInp.classList.add("minText");
          newInp.minLength = 2;
        }
        newUserValueRef.current!.parentElement!.replaceChild(
          newInp,
          newUserValueRef.current!
        );
        newUserValueRef.current = newInp;
        return newInp;
      };
      const replaceSel = () => {
        const newSel = document.createElement("select");
        newSel.classList.add(...["form-select"]);
        newSel.id = "userPropsNewValue";
        newSel.style.maxWidth = getComputedStyle(
          newUserValueRef.current!
        ).width;
        newUserValueRef.current!.parentElement!.replaceChild(
          newSel,
          newUserValueRef.current!
        );
        newUserValueRef.current = newSel;
        return newSel;
      };
      switch (userPropsSelRef.current.value) {
        case "userName":
          const newNameInp = replaceInp();
          newNameInp.autocomplete = "given-name";
          newNameInp.autocapitalize = "true";
          newNameInp.addEventListener("input", () => {
            autoCapitalizeInputs(newNameInp);
          });
          break;
        case "userClass":
          const newClassSel = replaceSel();
          const opCoord = document.createElement("option");
          opCoord.value = "coord";
          opCoord.textContent = "Coordenador";
          const opProfExt = document.createElement("option");
          opProfExt.value = "profExt";
          opProfExt.textContent = "Membro Externo";
          const opProfInt = document.createElement("option");
          opProfInt.value = "profInt";
          opProfInt.textContent = "Membro Interno";
          const opStud = document.createElement("option");
          opStud.value = "stud";
          opStud.textContent = "Extensionista / Estudante";
          newClassSel.appendChild(opCoord);
          newClassSel.appendChild(opProfExt);
          newClassSel.appendChild(opProfInt);
          newClassSel.appendChild(opStud);
          break;
        case "userArea":
          const newAreaSel = replaceSel();
          const opEd = document.createElement("option");
          opEd.value = "edFis";
          opEd.textContent = "Educação Física";
          const opNut = document.createElement("option");
          opNut.value = "nutr";
          opNut.textContent = "Nutrição";
          const opOd = document.createElement("option");
          opOd.value = "odonto";
          opOd.textContent = "Odontologia";
          newAreaSel.appendChild(opEd);
          newAreaSel.appendChild(opNut);
          newAreaSel.appendChild(opOd);
          break;
        case "userEmail":
          const newEmailInp = replaceInp("email");
          newEmailInp.autocomplete = "email";
          newEmailInp.addEventListener("input", () => {
            addEmailExtension(newEmailInp);
          });
          newEmailInp.addEventListener("click", () => {
            addEmailExtension(newEmailInp);
          });
          break;
        case "userTel":
          const newTelInp = replaceInp("tel");
          newTelInp.autocomplete = "tel";
          newTelInp.addEventListener("input", () => {
            formatTel(newTelInp);
          });
          break;
        default:
          replaceInp();
      }
    }
    multipleElementsNotFound(
      extLine(new Error()),
      "Entry elements for changing type of user property input",
      userPropsSelRef.current,
      newUserValueRef.current
    );
  };
  useEffect(() => {
    if (userPropsDlgRef.current instanceof HTMLDialogElement) {
      userPropsDlgRef.current.showModal();
      syncAriaStates([
        ...userPropsDlgRef.current.querySelectorAll("*"),
        userPropsDlgRef.current,
      ]);
      const nameInp = document.getElementById("userPropsNewValue");
      nameInp?.addEventListener("input", () => {
        autoCapitalizeInputs(nameInp);
      });
    } else
      elementNotFound(
        userPropsDlgRef.current,
        "Dialog for userProps request",
        extLine(new Error())
      );
  }, [userPropsDlgRef]);
  useEffect(() => {
    if (
      userPropsBtnRef.current instanceof HTMLButtonElement &&
      userPropsDlgRef.current instanceof HTMLDialogElement
    ) {
      userPropsBtnRef.current.addEventListener("click", () => {
        if (subForm(userPropsBtnRef.current, userPropsDlgRef.current!))
          setPropDlg(!shouldDisplayPropDlg);
      });
    } else
      multipleElementsNotFound(
        extLine(new Error()),
        "Elements for useEffect() of submit entry for userProps",
        userPropsBtnRef.current,
        userPropsDlgRef.current
      );
  }, [userPropsBtnRef, userPropsDlgRef]);
  useEffect(() => {}, [newUserValueRef, userPropsDlgRef]);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Erro carregando modal de alteração de dados de usuário!" />
      )}
    >
      {shouldDisplayPropDlg && (
        <dialog
          ref={userPropsDlgRef}
          className="modal-content-fit flexAlItCt flexNoWC"
          id="alterUsePropDlg"
          onClick={ev => {
            if (
              isClickOutside(ev, ev.currentTarget).some(coord => coord === true)
            ) {
              setPropDlg(!shouldDisplayPropDlg);
              ev.currentTarget.closest("dialog")?.close();
            }
          }}
        >
          <section className="flexNoW cGap2v widFull mg-3b">
            <h3 className="bolded">Formulário de Alteração</h3>
            <button
              className="btn btn-close"
              onClick={() => {
                setPropDlg(!shouldDisplayPropDlg);
                userPropsDlgRef.current instanceof HTMLDialogElement &&
                  userPropsDlgRef.current?.close();
              }}
            ></button>
          </section>
          <fieldset className="flexNoWC widFull mg-2bv">
            <label className="bolded" htmlFor="userPropsOps">
              Opções de Alteração:
            </label>
            <select
              id="userPropsOps"
              className="form-select"
              onChange={() => changeUserProp(newUserValueRef.current!.value)}
              ref={userPropsSelRef}
            >
              <option value="userName">Nome</option>
              <option value="userClass">Classe</option>
              <option value="userArea">Área</option>
              <option value="userEmail">E-mail</option>
              <option value="userTel">Telefone</option>
            </select>
          </fieldset>
          <fieldset className="flexNoWC widFull mg-2bv">
            <label className="bolded" htmlFor="userPropsNewValue">
              Novo valor:
            </label>
            <input
              type="text"
              id="userPropsNewValue"
              className="form-control minText"
              placeholder="Insira aqui o novo valor"
              autoComplete="given-name"
              autoCapitalize="true"
              minLength={2}
              // @ts-ignore
              ref={newUserValueRef}
            ></input>
          </fieldset>
          <fieldset className="flexNoWC widFull mg-2bv">
            <label className="bolded" htmlFor="userPropJust">
              Razão:
            </label>
            <input
              type="text"
              id="userPropJust"
              className="form-control minText"
              minLength={2}
              placeholder="Insira aqui a justificativa"
            ></input>
          </fieldset>
          <button
            type="button"
            id="submitNewPropBtn"
            className="btn btn-info widHalf bolded mg-1t"
            ref={userPropsBtnRef}
          >
            Enviar
          </button>
        </dialog>
      )}
    </ErrorBoundary>
  );
}
