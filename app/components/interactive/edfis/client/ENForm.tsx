"use client";
import { registerPersistInputs, syncAriaStates, validateForm } from "@/lib/global/handlers/gHandlers";
import { handleSubmit } from "@/lib/global/data-service";
import { Fragment, createContext, lazy, useEffect, useRef, useState } from "react";
import Name from "../../def/Name";
import SocialName from "../../def/SocialName";
import AgeElement from "../defaulted/AgeElement";
import TabComorb from "./tabs/TabComorb";
import DivRot from "../DivRot";
import InpCorUr from "./InpCorUr";
import InpDiur from "./InpDiur";
import OpProtUr from "../OpProtUr";
import ProtUrLvl from "./ProtUrLvl";
import SelectLvlAtFis from "./SelectLvlAtFis";
import TabAtFirsProp from "./tabs/TabAtFisProp";
import TabAtFisRot from "./tabs/TabAtFisRot";
import Declaration from "../../def/Declaration";
import ENBtnConformWrapper from "./ENBtnConformWrapper";
import ConfirmLocId from "../../def/ConfirmLocId";
import ConfirmDate from "../../def/ConfirmDate";
import Signature from "../../def/Signature";
import SectConfirmBtns from "../../def/SectConfirmBtns";
import { nlFm, nlFs, nlInp, nlSel } from "@/lib/global/declarations/types";
import useDataProvider from "@/lib/hooks/useDataProvider";
import ReactSpinner from "../../../icons/ReactSpinner";
import { Suspense } from "react";
import { ENCtxProps } from "../../../../src/lib/global/declarations/interfaces";
import { clearPhDates, equalizeFlexSibilings } from "@/lib/global/gStyleScript";
import { watchLabels } from "@/lib/global/gController";
import GenDivEN from "../../def/GenDivEN";
import useMount from "@/lib/hooks/useMount";
import { styled } from "styled-components";
import sEn from "@/styles//modules/enStyles.module.scss";
import { BodyType } from "@/lib/global/declarations/testVars";
import { applyConstraintsTitle } from "@/lib/global/gModel";
import { toast } from "react-hot-toast";
import { timers } from "@/vars";
const FsProgCons = lazy(() => import("./FsProgCons")),
  TbodyComorb = lazy(() => import("../tabs/TbodyComorb")),
  TbodyAtFisRot = lazy(() => import("./tabs/TbodyAtFisRot")),
  TbodyAtFisProps = lazy(() => import("./tabs/TbodyAtFisProps")),
  DivAtFisRot = styled.div`
    .bi {
      &.bi-plus {
        transform: scale(1.2) translate(-0.2rem, 0.14rem);
      }
      &.bi-dash {
        transform: scale(1.2) translate(-0.5rem, 0.14rem);
      }
    }
  `,
  FsG = styled.fieldset`
    margin-left: 0;
    input,
    select {
      min-width: 28vw !important;
    }
    @media screen and (max-width: 900px) {
      #genDiv {
        input,
        select {
          min-width: 86.5vw !important;
        }
      }
    }
  `,
  StyledFormEd = styled.form`
    :first-child {
      :last-child:is(section) {
        :last-child:is(div) {
          &:last-child {
            padding-bottom: 2vh;
          }
        }
      }
    }
  `;
export const ENCtx = createContext<ENCtxProps>({
  refs: {
    af: null,
    f: null,
    fct: null,
    fspr: null,
    gr: null,
    gar: null,
    gbr: null,
    gl: null,
    nafr: null,
    sar: null,
    txbr: null,
  },
  bt: {
    s: "masculino",
    d: null,
  },
});
export default function ENForm(): JSX.Element {
  const f = useRef<nlFm>(null),
    af = useRef<nlInp>(null),
    gr = useRef<nlSel>(null),
    gar = useRef<nlSel>(null),
    gbr = useRef<nlSel>(null),
    gl = useRef<nlSel>(null),
    fspr = useRef<nlFs>(null),
    fct = useRef<nlSel>(null),
    nafr = useRef<nlSel>(null),
    sar = useRef<nlSel>(null),
    txbr = useRef<nlSel>(null),
    toasted = useRef<boolean>(false),
    [bodyType, setBodyType] = useState<BodyType>("masculino"),
    [mounted] = useMount();
  useDataProvider(f.current);
  useEffect(() => {
    if (!mounted) return;
    setTimeout(() => {
      registerPersistInputs({
        f: f.current ?? (document.getElementById("formEdFis") as HTMLFormElement),
        textareas: true,
        selects: true,
        inputTypes: ["date", "number", "text", "checkbox", "radio"],
        queriesToExclude: ['[role="switch"]'],
      });
    }, 300);
  }, [f, mounted]);
  useEffect(() => {
    if (!mounted) return;
    setTimeout(() => {
      clearPhDates(Array.from(document.querySelectorAll('input[type="date"]')));
      equalizeFlexSibilings(document.querySelectorAll("[class*='flexTwin']"), [["width", "px"]]);
      syncAriaStates(document.querySelectorAll("*"));
      watchLabels();
    }, 500);
  }, [mounted]);
  //teste de pré-preenchimento
  useEffect(() => {
    if (!mounted) return;
    setTimeout(() => {
      const inp2_2 = document.getElementById("tabInpRowMedAnt2_2");
      if (inp2_2 instanceof HTMLInputElement) inp2_2.value = "70";
      const inp2_3 = document.getElementById("tabInpRowMedAnt2_3");
      if (inp2_3 instanceof HTMLInputElement) inp2_3.value = "30";
      const inp2_4 = document.getElementById("tabInpRowMedAnt2_4");
      if (inp2_4 instanceof HTMLInputElement) inp2_4.value = "200";
      const inp3_2 = document.getElementById("tabInpRowMedAnt3_2");
      if (inp3_2 instanceof HTMLInputElement) inp3_2.value = "200";
      const inp3_3 = document.getElementById("tabInpRowMedAnt3_3");
      if (inp3_3 instanceof HTMLInputElement) inp3_3.value = "1";
      const inp3_4 = document.getElementById("tabInpRowMedAnt3_4");
      if (inp3_4 instanceof HTMLInputElement) inp3_4.value = "1.8";
      const inp4_2 = document.getElementById("tabInpRowDCut4_2");
      if (inp4_2 instanceof HTMLInputElement) inp4_2.value = "18";
      const inp7_2 = document.getElementById("tabInpRowDCut7_2");
      if (inp7_2 instanceof HTMLInputElement) inp7_2.value = "18";
      const inp8_2 = document.getElementById("tabInpRowDCut8_2");
      if (inp8_2 instanceof HTMLInputElement) inp8_2.value = "18";
      const inp4_3 = document.getElementById("tabInpRowDCut4_3");
      if (inp4_3 instanceof HTMLInputElement) inp4_3.value = "10";
      const inp7_3 = document.getElementById("tabInpRowDCut7_3");
      if (inp7_3 instanceof HTMLInputElement) inp7_3.value = "10";
      const inp8_3 = document.getElementById("tabInpRowDCut8_3");
      if (inp8_3 instanceof HTMLInputElement) inp8_3.value = "10";
      const inp4_4 = document.getElementById("tabInpRowDCut4_4");
      if (inp4_4 instanceof HTMLInputElement) inp4_4.value = "40";
      const inp7_4 = document.getElementById("tabInpRowDCut7_4");
      if (inp7_4 instanceof HTMLInputElement) inp7_4.value = "40";
      const inp8_4 = document.getElementById("tabInpRowDCut8_4");
      if (inp8_4 instanceof HTMLInputElement) inp8_4.value = "40";
    }, timers.personENTimer);
  }, [mounted]);
  useEffect(() => {
    if (!mounted) return;
    try {
      setTimeout(() => {
        if (!(f.current instanceof HTMLElement)) return;
        applyConstraintsTitle(f.current);
      }, 1000);
    } catch (e) {
      console.error(`Error executing effect for filling input titles:\n${(e as Error).message}`);
    }
  }, [f, mounted]);
  useEffect(() => {
    if (!toasted.current)
      toast(t => (
        <div style={{ lineHeight: "1.6rem" }}>
          <b>Dica!</b>
          <hr />
          <span>Você pode desativar ou ativar</span>
          <br />o Cálculo Automático e a Autocorreção nos alternadores.
          <hr />
          <button
            style={{ height: "2.1rem", fontSize: "0.8rem" }}
            className='btn btn-secondary'
            onClick={() => toast.dismiss(t.id)}>
            Fechar
          </button>
        </div>
      ));
    toasted.current = true;
    const untoast = (): void => toast.dismiss();
    addEventListener("popstate", untoast);
    return (): void => removeEventListener("popstate", untoast);
  }, []);
  return mounted ? (
    <Suspense fallback={<ReactSpinner scale={0.8} key={crypto.randomUUID()} />}>
      <ENCtx.Provider
        value={{
          refs: {
            af,
            f,
            fspr,
            fct,
            gl,
            gar,
            gbr,
            gr,
            nafr,
            sar,
            txbr,
          },
          bt: {
            s: bodyType,
            d: setBodyType,
          },
        }}>
        <StyledFormEd
          ref={f}
          name='ed_form'
          action='submit_ed_form'
          encType='multipart/form-data'
          method='post'
          target='_top'
          id='formEdFis'
          autoComplete='on'
          onSubmit={ev =>
            validateForm(ev).then(validation =>
              validation[0] ? handleSubmit("ed", validation[2], true) : ev.preventDefault(),
            )
          }>
          <FsG name='fsAnamGName' id='fsAnamGId' className='fsMain'>
            <legend className={`legMain formPadded ${sEn.legMainEn} ${sEn.fsAnamGLeg}`} id='fsAnamGLeg'>
              Identificação
            </legend>
            <section className='sectionMain' id='fsAnamGSect'>
              <Name />
              <SocialName />
              <span role='group' className='fsAnamGSpan' id='fsAnamGSpan12'>
                <label htmlFor='ageId' className='labelIdentif'>
                  <span>Idade:</span>
                  <AgeElement inpRef={af} />
                </label>
              </span>
              <GenDivEN genRef={gr} genAlinRef={gar} />
            </section>
          </FsG>
          <hr />
          <TabComorb>
            <Suspense fallback={<ReactSpinner scale={0.3} display='table-row-group' key={crypto.randomUUID()} />}>
              <TbodyComorb />
            </Suspense>
          </TabComorb>
          <hr />
          <fieldset name='fsHabRotName' id='fsHabRotId' className='fsMain'>
            <legend className={`hRot legMain forceInvert ${sEn.h2} ${sEn.legMainEn} ${sEn.hRot}`} id='fsHabRotLeg'>
              Hábitos Rotineiros — Alimentação
            </legend>
            <section className='sectionMain sectHabRot' id='sectAlimRot'>
              <DivRot quest='Faz quantas refeições por dia' grp='Alim' ctx='RefDia' />
              <DivRot quest='Quantas das refeições diárias são completas' grp='Alim' ctx='RefCompDia' />
              <hr />
              <h2 className={`hRot legMain noInvert ${sEn.h2} ${sEn.legMainEn} ${sEn.hRot}`}>
                Hábitos Rotineiros — Hidratação
              </h2>
              <DivRot quest='Ingere quantos litros de água por dia' grp='Alim' ctx='AguaDia' />
              <hr />
              <h2 className={`hRot legMain noInvert ${sEn.h2} ${sEn.legMainEn} ${sEn.hRot}`}>
                Hábitos Rotineiros — Excreção
              </h2>
              <DivRot
                quest='Quantas micções por dia'
                grp='Alim'
                ctx='UrDia'
                ur={{
                  ctx: "Elim",
                }}
              />
              <DivRot quest='Qual é o intervalo mínimo (em horas) entre cada micção?' grp='Alim' ctx='UrInterv' />
              <div role='group' className={`flexDiv divRot widMax900q80vw ${sEn.flexDivEn} ${sEn.divRot}`}>
                <label htmlFor='inpCorUrDef' className={`labAlimRot fitSpaced labUr widMax900q80vw ${sEn.labAlimRot}`}>
                  <span>Qual é a coloração da urina?</span>
                  <InpCorUr />
                  <datalist id='corUr'>
                    {[
                      "Transparente",
                      "Verde-claro",
                      "Verde-escuro",
                      "Amarelo-claro",
                      "Amarelo-escuro",
                      "Âmbar",
                      "Laranja",
                      "intenso",
                      "Rosada",
                      "Avermelhada",
                      "Marrom",
                      "Azul",
                      "Arroxeada",
                      "Preta",
                    ].map((color, i) => (
                      <option key={`ur_cor__${i}`} className='opCorUr' value={color}>
                        {color}
                      </option>
                    ))}
                  </datalist>
                </label>
                <span
                  role='group'
                  id='spanDiur'
                  className={`labAlimRot fitSpaced labUr labUrInterval widMax900q80vw ${sEn.labAlimRot} ${sEn.spanDiur}`}>
                  <span>Diurese:</span>
                  <label
                    htmlFor='inpDiur'
                    id='labDiur'
                    className={`form-control noInvert labAlimRot fitSpaced labUr labUrInterval widMax900q80vw noInvert ${sEn.labAlimRot}`}>
                    <InpDiur />
                    <p className={`noInvert ${sEn.msrProgCons}`}>ml/dia</p>
                  </label>
                </span>
                <div role='group' className={`formPadded noInvert ${sEn.protUrDiv} ${sEn.formPadded}`} id='protUrDiv'>
                  <span
                    role='group'
                    id='inpElimUrDiaMax'
                    className={`spanAlimRot spanbUr spanProtUr ${sEn.spanAlimRot}`}>
                    <span style={{ marginBottom: "0.1rem" }}>Proteinúria</span>
                    <br role='presentation' />
                    <input
                      type='radio'
                      className={`inpAlimRot inpUr inpUrRadio noInvert ${sEn.input}`}
                      id='CpbinpProtUrRadioYes'
                      name='protur'
                      data-title='Proteinuria_Sim'
                      data-required='true'
                      style={{ marginTop: "0.7rem" }}
                    />
                    <label htmlFor='CpbinpProtUrRadioYes' id='labCpbinpProtUrRadioYes'>
                      <span>Sim</span>
                    </label>
                    <input
                      type='radio'
                      className={`inpAlimRot inpUr inpUrRadio ${sEn.input}`}
                      id='CpbinpProtUrRadioNo'
                      name='protur'
                      data-title='Proteinuria_Nao'
                      style={{ marginTop: "0.7rem" }}
                    />
                    <label htmlFor='CpbinpProtUrRadioNo' id='labCpbinpProtUrRadioNo'>
                      Não
                    </label>
                  </span>
                  <br role='presentation' />
                  <div role='group' className={`divMain divAdd ${sEn.divAddProtUr} ${sEn.divAdd}`} id='divAddProtUr'>
                    {["Persist", "Ort", "Tr"].map((ctx, i) => (
                      <Fragment key={`prot_ur_${i}`}>
                        <OpProtUr ctx={ctx as any} />
                        <br role='presentation' />
                      </Fragment>
                    ))}
                    <label
                      htmlFor='protUrLvl'
                      id='labProtUrLvl'
                      className={`form-control noInvert labUr ${sEn.labProtUrLvl}`}>
                      <ProtUrLvl />
                      <p className={`noInvert ${sEn.msrProgCons}`}>mg/dL</p>
                    </label>
                  </div>
                </div>
              </div>
              <DivRot quest='Evacua quantas vezes por dia' ctx='EvDia' ev={{ ctx: "Elim" }} />
              <DivRot
                quest='Qual é o intervalo mínimo (em horas) entre evacuações?'
                ctx='EvInterv'
                ev={{ ctx: "Interv" }}
              />
              <hr />
            </section>
            <DivAtFisRot role='group' id='divAtFisRot'>
              <span
                role='group'
                className={`spanMain atvSpan fitSpaced flexQ900NoWC ${sEn.atvSpan} ${sEn.divLvlAtFis}`}
                id='divLvlAtFis'>
                <strong>Nível de Atividade Física:</strong>
                <SelectLvlAtFis />
              </span>
              <TabAtFisRot>
                <TbodyAtFisRot />
              </TabAtFisRot>
              <br role='presentation' />
              <hr />
              <TabAtFirsProp>
                <TbodyAtFisProps />
              </TabAtFirsProp>
            </DivAtFisRot>
            <br role='presentation' />
          </fieldset>
          <hr />
          <Suspense fallback={<ReactSpinner scale={0.5} key={crypto.randomUUID()} />}>
            <FsProgCons />
          </Suspense>
          <fieldset name='fsConfirmName' id='fsConfirmId' className='fsMain formPadded'>
            <section className='sectionMain sectionConfirm' id='sectConfirmCheck'>
              <Declaration text='"DECLARO QUE CONCORDO COM AS AVALIAÇÕES DESCRITAS ACIMA"' />
              <div className={`divMain`} id='divConfirm' role='group'>
                <ENBtnConformWrapper />
                <div className='divSub flexEl divConfirm flexQ900NoW' id='divConfirm2' role='group'>
                  <label
                    htmlFor='confirmLocId'
                    className='labConfirm labDivConfirm2 pdT2pc900Q htFull900Q flexNoWC bolded widHalf900Q noInvert'
                    id='labConfirmLoc'>
                    <span>Local:</span>
                    <ConfirmLocId />
                  </label>
                  <ConfirmDate />
                  <hr />
                </div>
                <Signature />
              </div>
              <hr style={{ minWidth: "93vw" }} />
            </section>
            <br role='presentation' />
            <SectConfirmBtns />
            <hr />
          </fieldset>
        </StyledFormEd>
      </ENCtx.Provider>
    </Suspense>
  ) : (
    <></>
  );
}
