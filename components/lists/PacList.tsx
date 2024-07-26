import {
  nullishBtn,
  nullishHtEl,
  nullishTab,
  nullishTabSect,
} from "@/lib/global/declarations/types";
import { equalizeTabCells } from "@/lib/global/gStyleScript";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { strikeEntries } from "@/lib/locals/panelPage/consStyleScript";
import {
  PacInfo,
  PacListProps,
} from "@/lib/locals/panelPage/declarations/interfacesCons";
import {
  addListenerAlocation,
  checkLocalIntervs,
  fillTabAttr,
} from "@/lib/locals/panelPage/handlers/consHandlerList";
import {
  useEffect,
  useRef,
  useState,
  useCallback,
  MutableRefObject,
} from "react";
import PrevConsList from "./PrevConsList";
import AlterFieldList from "./AlterFieldList";
import FormExcludeBtn from "../panelForms/defs/FormExcludeBtn";
import { handleFetch } from "@/pages/api/ts/handlers";

export default function PacList({
  setDisplayRowData,
  shouldDisplayRowData,
  shouldShowAlocBtn = true,
  onClick,
  shouldDisplayPacList = true,
  userClass = "estudante",
}: PacListProps): JSX.Element {
  //TODO USAR ARRAY PARA RENDERIZAÇÃO DINÂMICA APÓS TESTES COM API
  const pacs: PacInfo[] = [];
  const toggleDisplayRowData = (shouldDisplayRowData: boolean = true) => {
    setDisplayRowData(!shouldDisplayRowData);
  };
  const tabPacRef = useRef<nullishTab>(null);
  const sectTabRef = useRef<nullishHtEl>(null);
  const tbodyRef = useRef<nullishTabSect>(null);
  const btnPrevListRef = useRef<nullishBtn>(null);
  const alocBtnRef = useRef<nullishBtn>(null);
  const [shouldDisplayPrevList, setDisplayPrevList] = useState<boolean>(false);
  useEffect(() => {
    if (sectTabRef?.current instanceof HTMLElement) {
      syncAriaStates([
        ...sectTabRef.current.querySelectorAll("*"),
        sectTabRef.current,
      ]);
      checkLocalIntervs(sectTabRef.current);
      strikeEntries(sectTabRef.current);
      const handleKeyDown = (press: KeyboardEvent) => {
        if (press.key === "Escape") {
          setDisplayRowData(!shouldDisplayRowData);
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    } else
      elementNotFound(
        sectTabRef.current,
        "sectTabRef in useEffect()",
        extLine(new Error())
      );
  }, [sectTabRef]);
  useEffect(() => {
    if (tabPacRef?.current instanceof HTMLTableElement) {
      equalizeTabCells(tabPacRef.current);
      fillTabAttr(tabPacRef.current);
    } else
      elementNotFound(
        tabPacRef.current,
        `tabPacRef id ${
          (tabPacRef?.current as any)?.id || "UNIDENTIFIED"
        } in useEffect() for tableRef`,
        extLine(new Error())
      );
  }, [tabPacRef]);
  const togglePacPrevList = (shouldDisplayPrevList: boolean = false) => {
    btnPrevListRef.current instanceof HTMLButtonElement
      ? setDisplayPrevList(!shouldDisplayPrevList)
      : elementNotFound(
          btnPrevListRef.current,
          "<button> for toggling Pacient previous appointments in Pacient Table",
          extLine(new Error())
        );
  };
  useEffect(() => {
    const ancestral = document.getElementById("regstPacDlg");
    ancestral instanceof HTMLElement
      ? gatherPacData(alocBtnRef, ancestral)
      : elementNotFound(
          ancestral,
          "Dialog for registering new appointment when alocating patient",
          extLine(new Error())
        );
  }, [alocBtnRef]);
  const gatherPacData = useCallback(
    (alocBtnRef: MutableRefObject<nullishBtn>, ancestral: HTMLElement) => {
      addListenerAlocation(
        alocBtnRef.current,
        ancestral,
        ancestral,
        "Pac",
        shouldDisplayPacList,
        onClick,
        userClass
      );
    },
    [alocBtnRef]
  );
  useEffect(() => {
    document.querySelectorAll(".outpPacStatus").forEach((status, i) => {
      try {
        if (!(status instanceof HTMLElement))
          throw elementNotFound(
            status,
            `Validation of output for patient status`,
            extLine(new Error())
          );
        if (status.innerText.toLowerCase().trim() === "em emergência")
          status.style.color = `red`;
      } catch (e) {
        console.error(
          `Error executing iteration ${i} for checking Patient Status:\n${
            (e as Error).message
          }`
        );
      }
    });
  }, []);
  useEffect(() => {
    try {
      if (!(tbodyRef.current instanceof HTMLTableSectionElement))
        throw elementNotFound(
          tbodyRef.current,
          `Validation of Table Body instance`,
          extLine(new Error())
        );
      handleFetch("patients", "_table", true).then(res =>
        res.forEach(pac => {
          pacs.push({
            name: pac.name,
            tel: pac.tel,
            email: pac.email,
            next_appointed_day: (pac as PacInfo)["next_appointed_day"],
            treatment_period: (pac as PacInfo)["treatment_period"],
            current_status: (pac as PacInfo)["current_status"],
            signature: (pac as PacInfo)["signature"],
            historic: (pac as PacInfo)["historic"],
          });
        })
      );
    } catch (e) {
      console.error(
        `Error executing useEffect for Table Body Reference:\n${
          (e as Error).message
        }`
      );
    }
  }, [tbodyRef]);
  return (
    <section className="form-padded" id="sectPacsTab" ref={sectTabRef}>
      <table
        className="table table-striped table-responsive table-hover tabPacs"
        id="avPacsTab"
        ref={tabPacRef}
      >
        <caption className="caption-t">
          <strong>
            <small role="textbox" className="noInvert">
              <em className="noInvert">
                Lista Recuperada da Ficha de Pacientes registrados. Acesse
                <samp>
                  <a> ROTA_PLACEHOLDER </a>
                </samp>
                para cadastrar
              </em>
            </small>
          </strong>
        </caption>
        <colgroup>
          <col></col>
          <col></col>
          <col></col>
          <col></col>
          <col></col>
          <col></col>
          <col></col>
          {userClass === "coordenador" && <col></col>}
          {userClass === "coordenador" && <col></col>}
          {userClass === "coordenador" && <col></col>}
          {userClass === "coordenador" && <col></col>}
          {shouldShowAlocBtn && <col></col>}
        </colgroup>
        <thead className="thead-dark">
          <tr id={`avPacs-rowUnfilled0`}>
            {userClass === "coordenador" && <th scope="col">CPF</th>}
            <th scope="col">Nome</th>
            <th scope="col">E-mail</th>
            <th scope="col">Telefone</th>
            <th scope="col">Próximo Dia de Consulta</th>
            <th scope="col">Período de Acompanhamento</th>
            {userClass === "coordenador" && <th scope="col">Assinatura</th>}
            <th scope="col">Status</th>
            <th scope="col">Histórico</th>
            {userClass === "coordenador" && <th scope="col">Alteração</th>}
            {userClass === "coordenador" && <th scope="col">Exclusão</th>}
            {shouldShowAlocBtn && (
              <th className="alocCel" scope="col">
                Alocação
              </th>
            )}
          </tr>
        </thead>
        <tbody className="pacTbody" ref={tbodyRef}>
          <tr id={`avPacs-rowUnfilled0`}>
            {userClass === "coordenador" && (
              <th scope="row" className={`tagPhUnfilledTextPac`}>
                <output
                  className={`tagPhAvPac tagPhAvPacUnfilled0`}
                  id={`tagPhUnfilledTextPac-rowUnfilled0`}
                  data-title={`UnfilledText Paciente Linha Unfilled0`}
                  data-aloc={`UnfilledText-pac`}
                >
                  123.456.789-10
                </output>
              </th>
            )}
            <td className={`celUnfilled0Pac`}>
              <output
                className={`tagPhAvPac tagPhAvPacUnfilled0`}
                id={`outpUnfilledTextPac-rowUnfilled0`}
                data-title={`UnfilledText Paciente Linha Unfilled0`}
                data-aloc={`UnfilledText-pac`}
              >
                José Oliveira Mariano
              </output>
            </td>
            <td className={`celUnfilled0Pac`}>
              <output
                className={`tagPhAvPac tagPhAvPacUnfilled0`}
                id={`outpUnfilledTextPac-rowUnfilled0`}
                data-title={`UnfilledText Paciente Linha Unfilled0`}
                data-aloc={`UnfilledText-pac`}
              >
                <address>
                  <a
                    href={`mailto:jfulaninhom@gmail.com`}
                    target="_blank"
                    rel="nofollow"
                    id={`emaila-Pac-rowUnfilled0`}
                  >
                    jfulaninhom@gmail.com
                  </a>
                </address>
              </output>
            </td>
            <td className="celTelPac">
              <output
                className={`tagPhAvPac tagPhAvPacUnfilled0`}
                id="tagP4TelPacUnfilled0"
                data-title="Telefone Paciente Linha Unfilled0"
                data-aloc={`UnfilledText-pac`}
              >
                +55 21 90000-0000
              </output>
            </td>
            <td className="celUnfilledTextPac">
              <output
                className="tagPhAvPac tagPhAvPacUnfilled0"
                id="tagP4UnfilledTextPacUnfilled0"
                data-title={`Próximo dia de atendimento de Paciente Linha Unfilled0`}
                data-aloc={`UnfilledText-pac`}
              >
                05/05/2024
              </output>
            </td>
            <td className="celIntervPac">
              <div role="group" className="flexAlItCt cGap1v noInvert">
                <output
                  className="tagPhAvPac tagPhAvPacUnfilled0"
                  id="tagP4IntervPacUnfilled0"
                  data-title="Intervalo de Atendimento Paciente Linha Unfilled0"
                  data-aloc={`UnfilledText-pac`}
                >
                  08/01/2020 – 08/01/2028
                </output>
              </div>
            </td>
            {userClass === "coordenador" && (
              <td className="celSignPac">
                <div role="group" className="flexAlItCt flexJC cGap1v noInvert">
                  <output
                    className="tagPhAvPac tagPhAvPacUnfilled0"
                    id="tagP4AstPacUnfilled0"
                    data-title="Assinatura de Paciente Linha Unfilled0"
                    data-aloc={`UnfilledText-pac`}
                  >
                    <a
                      className="astAnchor"
                      id="tagPhAstPacUnfilled0"
                      href="../img/teste-exame-clinico.pdf"
                      download
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-filetype-pdf"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM1.6 11.85H0v3.999h.791v-1.342h.803q.43 0 .732-.173.305-.175.463-.474a1.4 1.4 0 0 0 .161-.677q0-.375-.158-.677a1.2 1.2 0 0 0-.46-.477q-.3-.18-.732-.179m.545 1.333a.8.8 0 0 1-.085.38.57.57 0 0 1-.238.241.8.8 0 0 1-.375.082H.788V12.48h.66q.327 0 .512.181.185.183.185.522m1.217-1.333v3.999h1.46q.602 0 .998-.237a1.45 1.45 0 0 0 .595-.689q.196-.45.196-1.084 0-.63-.196-1.075a1.43 1.43 0 0 0-.589-.68q-.396-.234-1.005-.234zm.791.645h.563q.371 0 .609.152a.9.9 0 0 1 .354.454q.118.302.118.753a2.3 2.3 0 0 1-.068.592 1.1 1.1 0 0 1-.196.422.8.8 0 0 1-.334.252 1.3 1.3 0 0 1-.483.082h-.563zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638z"
                        />
                      </svg>
                    </a>
                  </output>
                </div>
              </td>
            )}
            <td>
              <div role="group" className="flexAlItCt cGap1v noInvert">
                <output
                  className="outpPacStatus tagPhAvPac tagPhAvPacUnfilled0"
                  id="tagP4StatusUnfilled0"
                  data-title="Status de Paciente Linha Unfilled0"
                  data-aloc={`UnfilledText-pac`}
                >
                  Em emergência
                </output>
              </div>
            </td>
            <td className="previousRegstPac">
              <button
                type="button"
                id="btnPacPrevCons-rowUnfilled0"
                className="btn btn-info flexJC flexAlItCt wsNoW opaquelightEl"
                ref={btnPrevListRef}
                onClick={() => {
                  if (typeof shouldDisplayPrevList === "boolean")
                    togglePacPrevList(shouldDisplayPrevList);
                }}
              >
                <small role="textbox" className="bolded">
                  Atendimentos Anteriores
                </small>
              </button>
              {shouldDisplayPrevList && (
                <PrevConsList
                  setDisplayPrevList={setDisplayPrevList}
                  shouldDisplayPrevList={shouldDisplayPrevList}
                />
              )}
            </td>
            {userClass === "coordenador" && (
              <td className="celAlterProf">
                <button
                  type="button"
                  id="btnAlterRegstStud"
                  className="btn btn-info btnAffectRegst btnAlterRegst opaquelightEl widFull"
                  onClick={() => toggleDisplayRowData(shouldDisplayRowData)}
                >
                  <span role="textbox" className="bolded fontLightWt">
                    Alterar
                  </span>
                </button>
                {shouldDisplayRowData && (
                  <AlterFieldList
                    setDisplayRowData={setDisplayRowData}
                    tabRef={tabPacRef}
                    shouldDisplayRowData={shouldDisplayRowData}
                  />
                )}
              </td>
            )}
            {userClass === "coordenador" && (
              <td>
                <FormExcludeBtn context="Pac" />
              </td>
            )}
            {shouldShowAlocBtn && (
              <td className="alocCel">
                <div role="group" className="widFull flexAlItCt flexJC">
                  <button
                    type="button"
                    className="btnAlocPac btn btn-success widFull flexJC flexAlItCt wsNoW opaquelightEl"
                    id="btnAlocPacUnfilled0"
                    ref={alocBtnRef}
                  >
                    <span role="textbox">Alocar</span>
                  </button>
                </div>
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </section>
  );
}
