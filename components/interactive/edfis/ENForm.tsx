"use client";
import { handleCondtReq, registerPersistInputs, syncAriaStates, validateForm } from "@/lib/global/handlers/gHandlers";
import { handleSubmit } from "@/lib/locals/panelPage/handlers/handlers";
import { Fragment, createContext, lazy, useEffect, useRef, useState } from "react";
import Name from "../def/Name";
import SocialName from "../def/SocialName";
import AgeElement from "./defaulted/AgeElement";
import TabComorb from "./TabComorb";
import DivRot from "./DivRot";
import InpCorUr from "./client/InpCorUr";
import InpDiur from "./client/InpDiur";
import OpProtUr from "./OpProtUr";
import ProtUrLvl from "./client/ProtUrLvl";
import SelectLvlAtFis from "./client/SelectLvlAtFis";
import TabAtFirsProp from "./TabAtFisProp";
import TabAtFirsRot from "./TabAtFisRot";
import Declaration from "../def/Declaration";
import ENBtnConformWrapper from "./ENBtnConformWrapper";
import ConfirmLocId from "../def/ConfirmLocId";
import ConfirmDate from "../def/ConfirmDate";
import Signature from "../def/Signature";
import SectConfirmBtns from "../def/SectConfirmBtns";
import { entryEl, looseNum, nlFm, nullishFs, nlInp, nlSel } from "@/lib/global/declarations/types";
import useDataProvider from "@/lib/hooks/useDataProvider";
import ReactSpinner from "../../icons/ReactSpinner";
import { Suspense } from "react";
import { Gender } from "../../../src/lib/tests/testVars";
import { ENContextProps } from "../../../src/lib/global/declarations/interfaces";
import { elementNotFound, extLine, inputNotFound, maxNumberError } from "@/lib/global/handlers/errorHandler";
import { person, tabProps } from "@/vars";
import { parseNotNaN } from "@/lib/global/gModel";
import { addListenerInnerTabs, validateTitlesForTargs } from "@/lib/locals/edFisNutPage/edFisNutController";
import { clearPhDates, equalizeFlexSibilings } from "@/lib/global/gStyleScript";
import { watchLabels } from "@/lib/global/gController";
import GenDivED from "../def/GenDivED";
const FsProgCons = lazy(() => import("./FsProgCons")),
  TbodyComorb = lazy(() => import("./TbodyComorb")),
  TbodyAtFisRot = lazy(() => import("./TbodyAtFisRot")),
  TbodyAtFisProps = lazy(() => import("./TbodyAtFisProps"));
export const ENContext = createContext<ENContextProps>({
  age: 0,
  gen: "masculino",
  numCons: 1,
  IMC: 0,
  MLG: 0,
  TMB: 0,
  GET: 0,
  PGC: 0,
  factorAtvLvl: 1.4,
  factorAtleta: "Peso",
  targInpWeigth: undefined,
  targInpHeigth: undefined,
  targInpIMC: undefined,
  targInpMLG: undefined,
  targInpTMB: undefined,
  targInpGET: undefined,
  targInpPGC: undefined,
  targInpSumDCut: undefined,
  refs: {
    f: null,
    af: null,
    gr: null,
    gar: null,
    fspr: null,
    fct: null,
    snr: null,
    sar: null,
    afr: null,
    txbr: null,
    gl: null,
  },
});
export default function ENForm(): JSX.Element {
  const f = useRef<nlFm>(null),
    af = useRef<nlInp>(null),
    gr = useRef<nlSel>(null),
    gar = useRef<nlSel>(null),
    fspr = useRef<nullishFs>(null),
    fct = useRef<nlSel>(null),
    snr = useRef<nlSel>(null),
    sar = useRef<nlSel>(null),
    afr = useRef<nlSel>(null),
    txbr = useRef<nlSel>(null),
    gl = useRef<nlSel>(null),
    [age, setAge] = useState<looseNum>("0"),
    [gen, setGen] = useState<Gender>("masculino"),
    [mounted, setMount] = useState<boolean>(false);
  useEffect(() => {
    if (!mounted) return;
    console.log([
      f.current?.id ?? "NOT FOUND",
      af.current?.id ?? "NOT FOUND",
      gr.current?.id ?? "NOT FOUND",
      gar.current?.id ?? "NOT FOUND",
      fspr.current?.id ?? "NOT FOUND",
      fct.current?.id ?? "NOT FOUND",
      snr.current?.id ?? "NOT FOUND",
      sar.current?.id ?? "NOT FOUND",
      afr.current?.id ?? "NOT FOUND",
      txbr.current?.id ?? "NOT FOUND",
    ]);
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
  useDataProvider(f.current);
  useEffect(() => setMount(true), [setMount]);
  useEffect(() => {
    if (!mounted || document.querySelectorAll("table").length <= 3) return;
    gr.current ??= document.getElementById("genId") as HTMLSelectElement;
    const selectNumCons = snr.current ?? document.getElementById("selectNumCons"),
      consTablesFs = fspr.current ?? document.getElementById("fsProgConsId"),
      genElement = gr.current,
      atvLvlElement = sar.current ?? document.getElementById("selectLvlAtFis");
    document.querySelectorAll(".tabInpProg").forEach((inp, i) => {
      try {
        if (!(inp instanceof HTMLInputElement && (inp.type === "number" || inp.type === "text")))
          throw inputNotFound(inp, `Validation of Input instance and type`, extLine(new Error()));
        if (inp.dataset.conditioned && inp.dataset.conditioned === "true") return;
        if (inp.required) {
          inp.minLength = 1;
          inp.maxLength = 99;
          inp.pattern = "^[\\d,.]+$";
          inp.classList.add("minText", "maxText", "pattern");
          if (inp.type === "number") {
            inp.min = "0.05";
            inp.max = "999999";
            inp.classList.add("minNum", "maxNum");
          }
        }
        inp.type === "number"
          ? inp.addEventListener("input", ev =>
              handleCondtReq(ev.currentTarget as HTMLInputElement, {
                minNum: 0.05,
                maxNum: 999999,
                min: 1,
                max: 99,
                pattern: ["^[\\d,.]+$", ""],
              }),
            )
          : inp.addEventListener("input", ev =>
              handleCondtReq(ev.currentTarget as HTMLInputElement, {
                min: 1,
                max: 99,
                pattern: ["^[\\d,.]+$", ""],
              }),
            );
        inp.dataset.conditioned = "true";
      } catch (e) {
        console.error(
          `Error executing iteration ${i} for Tab Inp Prog application of requirements:\n${(e as Error).message}`,
        );
      }
    });
    for (const { p, t } of [
      { p: "IMC", t: tabProps.targInpIMC },
      { p: "MLG", t: tabProps.targInpMLG },
      { p: "TMB", t: tabProps.targInpTMB },
      { p: "GET", t: tabProps.targInpGET },
      { p: "PGC", t: tabProps.targInpPGC },
    ])
      (tabProps as any)[p] = parseNotNaN(parseNotNaN((t as entryEl)?.value ?? "0").toFixed(4)) ?? 0;
    tabProps.factorAtvLvl = parseNotNaN((afr.current ?? (document.getElementById("nafType") as entryEl))?.value) || 1.4;
    try {
      if (!(selectNumCons instanceof HTMLSelectElement || selectNumCons instanceof HTMLDataListElement))
        throw elementNotFound(selectNumCons, `Select Num Cons instance`, extLine(new Error()));
      tabProps.numCons = parseNotNaN((selectNumCons as entryEl)?.value || "1") || 1;
      if (!(selectNumCons.lastElementChild instanceof HTMLOptionElement))
        throw elementNotFound(
          selectNumCons.lastElementChild,
          `Last Element of Select for Número de Consulta`,
          extLine(new Error()),
        );
      tabProps.numConsLastOp = parseNotNaN(selectNumCons?.lastElementChild?.value ?? "1", 1);
      tabProps.numColsCons = Math.min(
        ...Array.from(document.querySelectorAll("table")).map(tab => {
          return tab instanceof HTMLTableElement ? tab.querySelectorAll("col").length : 0;
        }),
      );
      if (!(tabProps.numConsLastOp === tabProps.numColsCons && tabProps.numConsLastOp >= 3)) {
        console.error(`
          numConsLastOp: ${tabProps.numConsLastOp};
          numColsCons: ${tabProps.numColsCons};
          numConsLastOp: ${tabProps.numConsLastOp};
          `);
        throw maxNumberError(
          (selectNumCons?.lastElementChild as HTMLOptionElement)?.value ?? "1",
          "Options para Consultas",
          extLine(new Error()),
        );
      }
      tabProps.areNumConsOpsValid = true;
    } catch (e) {
      console.error(`Error executing procedure for determining Número de Consulta:\n${(e as Error).message}`);
    }
    person.gen = (genElement as entryEl)?.value || "masculino";
    person.age = parseNotNaN((af.current ?? (document.getElementById("dateAgeId") as entryEl))?.value ?? "0") || 0;
    tabProps.numCons = parseNotNaN((selectNumCons as entryEl)?.value || "1") || 1;
    person.sumDCut =
      parseNotNaN(
        (document.getElementById(`tabInpRowDCut9_${tabProps.numCons + 1}`) as entryEl)?.value ?? "0",
        0,
        "float",
      ) || 0;
    person.weight =
      parseNotNaN(
        (document.getElementById(`tabInpRowMedAnt2_${tabProps.numCons + 1}`) as entryEl)?.value ?? "0",
        0,
        "float",
      ) || 0;
    person.height =
      parseNotNaN(
        (document.getElementById(`tabInpRowMedAnt3_${tabProps.numCons + 1}`) as entryEl)?.value ?? "0",
        0,
        "float",
      ) || 0;
    person.atvLvl = (atvLvlElement as entryEl)?.value ?? "leve";
    [tabProps.numColsCons, tabProps.areColGroupsSimilar] = addListenerInnerTabs(
      consTablesFs,
      tabProps.numColsCons,
      tabProps.areColGroupsSimilar,
    );
    [
      tabProps.targInpWeigth,
      tabProps.targInpHeigth,
      tabProps.targInpIMC,
      tabProps.targInpMLG,
      tabProps.targInpTMB,
      tabProps.targInpGET,
      tabProps.targInpSumDCut,
      tabProps.targInpPGC,
    ] = validateTitlesForTargs(tabProps.numCons);
  }, [mounted, gr]);
  useEffect(() => {
    if (!mounted) return;
    setTimeout(() => {
      clearPhDates(Array.from(document.querySelectorAll('input[type="date"]')));
      equalizeFlexSibilings(document.querySelectorAll("[class*='flexTwin']"), [["width", "px"]]);
      syncAriaStates(document.querySelectorAll("*"));
      watchLabels();
    }, 500);
  }, [mounted]);
  //TODO EFEITO DE TESTE
  useEffect(() => {
    if (!mounted) return;
    const inp2_2 = document.getElementById("tabInpRowMedAnt2_2");
    if (inp2_2 instanceof HTMLInputElement) inp2_2.value = "70";
    const inp2_3 = document.getElementById("tabInpRowMedAnt2_3");
    if (inp2_3 instanceof HTMLInputElement) inp2_3.value = "30";
    const inp2_4 = document.getElementById("tabInpRowMedAnt2_4");
    if (inp2_4 instanceof HTMLInputElement) inp2_4.value = "200";
    const inp3_2 = document.getElementById("tabInpRowMedAnt3_2");
    if (inp3_2 instanceof HTMLInputElement) inp3_2.value = "2";
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
  }, [mounted]);
  return (
    <Suspense fallback={<ReactSpinner scale={0.8} key={crypto.randomUUID()} />}>
      <ENContext.Provider
        value={{
          age,
          gen,
          //ESSES NO PROVEDOR DAS TABELAS NO GERAL
          numCons: 1,
          factorAtvLvl: 1.4,
          factorAtleta: "Peso",
          //ESSES INTERESSAM SOMENTE A SI MESMOS E À TABELA DE ÍNDICES
          IMC: 0,
          MLG: 0,
          TMB: 0,
          GET: 0,
          PGC: 0,
          targInpIMC: undefined,
          targInpMLG: undefined,
          targInpTMB: undefined,
          targInpGET: undefined,
          targInpPGC: undefined,
          targInpSumDCut: undefined,
          targInpWeigth: undefined,
          targInpHeigth: undefined,
          refs: {
            f,
            af,
            gr,
            gar,
            fspr,
            fct,
            snr,
            sar,
            afr,
            txbr,
          },
        }}>
        <form
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
          <fieldset name='fsAnamGName' id='fsAnamGId' className='fsMain'>
            <legend className='legMain form-padded' id='fsAnamGLeg'>
              Identificação
            </legend>
            <section className='sectionMain' id='fsAnamGSect'>
              <Name />
              <SocialName />
              <span role='group' className='fsAnamGSpan' id='fsAnamGSpan12'>
                <label htmlFor='dateAgeId' className='labelIdentif'>
                  <span>Idade:</span>
                  <AgeElement onSetAge={setAge} inpRef={af} />
                </label>
              </span>
              <GenDivED onSetGen={setGen} genRef={gr} />
            </section>
          </fieldset>
          <hr />
          <TabComorb>
            <Suspense fallback={<ReactSpinner scale={0.3} display='table-row-group' key={crypto.randomUUID()} />}>
              <TbodyComorb />
            </Suspense>
          </TabComorb>
          <hr />
          <fieldset name='fsHabRotName' id='fsHabRotId' className='fsMain'>
            <legend className='hRot legMain forceInvert' id='fsHabRotLeg'>
              Hábitos Rotineiros — Alimentação
            </legend>
            <section className='sectionMain sectHabRot' id='sectAlimRot'>
              <DivRot quest='Faz quantas refeições por dia' grp='Alim' ctx='RefDia' />
              <DivRot quest='Quantas das refeições diárias são completas' grp='Alim' ctx='RefCompDia' />
              <hr />
              <h2 className='hRot legMain noInvert'>Hábitos Rotineiros — Hidratação</h2>
              <DivRot quest='Ingere quantos litros de água por dia' grp='Alim' ctx='AguaDia' />
              <hr />
              <h2 className='hRot legMain noInvert'>Hábitos Rotineiros — Excreção</h2>
              <DivRot
                quest='Quantas micções por dia'
                grp='Alim'
                ctx='UrDia'
                ur={{
                  ctx: "Elim",
                }}
              />
              <DivRot quest='Qual é o intervalo mínimo (em horas) entre cada micção?' grp='Alim' ctx='UrInterv' />
              <div role='group' className='flexDiv divRot widMax900q80vw'>
                <label htmlFor='inpCorUrDef' className='labAlimRot fitSpaced labUr widMax900q80vw'>
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
                <span role='group' id='spanDiur' className='labAlimRot fitSpaced labUr labUrInterval widMax900q80vw'>
                  <span>Diurese:</span>
                  <label
                    htmlFor='inpDiur'
                    id='labDiur'
                    className='form-control noInvert labAlimRot fitSpaced labUr labUrInterval widMax900q80vw noInvert'>
                    <InpDiur />
                    <p className='msrProgCons noInvert'>ml/dia</p>
                  </label>
                </span>
                <div role='group' className='form-padded noInvert' id='protUrDiv'>
                  <span role='group' id='inpElimUrDiaMax' className='spanAlimRot spanbUr spanProtUr'>
                    <span style={{ marginBottom: "0.1rem" }}>Proteinúria</span>
                    <br role='presentation' />
                    <input
                      type='radio'
                      className='inpAlimRot inpUr inpUrRadio noInvert'
                      id='CpbinpProtUrRadioYes'
                      name='protur'
                      data-title='Proteinuria_Sim'
                      style={{ marginTop: "0.7rem" }}
                    />
                    <label htmlFor='CpbinpProtUrRadioYes' id='labCpbinpProtUrRadioYes'>
                      <span>Sim</span>
                    </label>
                    <input
                      type='radio'
                      className='inpAlimRot inpUr inpUrRadio'
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
                  <div role='group' className='divMain divAdd' id='divAddProtUr'>
                    {["Persist", "Ort", "Tr"].map((ctx, i) => (
                      <Fragment key={`prot_ur_${i}`}>
                        <OpProtUr ctx={ctx as any} />
                        <br role='presentation' />
                      </Fragment>
                    ))}
                    <OpProtUr ctx='Persist' />
                    <br role='presentation' />
                    <OpProtUr ctx='Ort' />
                    <br role='presentation' />
                    <OpProtUr ctx='Tr' />
                    <br role='presentation' />
                    <label htmlFor='protUrLvl' id='labProtUrLvl' className='form-control noInvert labUr'>
                      <ProtUrLvl />
                      <p className='msrProgCons noInvert'>mg/dL</p>
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
            <div role='group' id='divAtFisRot'>
              <span role='group' className='spanMain atvSpan fitSpaced flexQ900NoWC' id='divLvlAtFis'>
                <strong>Nível de Atividade Física:</strong>
                <SelectLvlAtFis />
              </span>
              <TabAtFirsRot>
                <Suspense fallback={<ReactSpinner scale={0.3} display='table-row-group' key={crypto.randomUUID()} />}>
                  <TbodyAtFisRot />
                </Suspense>
              </TabAtFirsRot>
              <br role='presentation' />
              <hr />
              <TabAtFirsProp>
                <Suspense fallback={<ReactSpinner scale={0.3} display='table-row-group' key={crypto.randomUUID()} />}>
                  <TbodyAtFisProps />
                </Suspense>
              </TabAtFirsProp>
            </div>
            <br role='presentation' />
          </fieldset>
          <hr />
          <Suspense fallback={<ReactSpinner scale={0.5} key={crypto.randomUUID()} />}>
            <FsProgCons />
          </Suspense>
          <fieldset name='fsConfirmName' id='fsConfirmId' className='fsMain form-padded'>
            <section className='sectionMain sectionConfirm' id='sectConfirmCheck'>
              <Declaration text='"DECLARO QUE CONCORDO COM AS AVALIAÇÕES DESCRITAS ACIMA"' />
              <div className='divMain' id='divConfirm' role='group'>
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
              <hr />
            </section>
            <br role='presentation' />
            <SectConfirmBtns />
            <hr />
          </fieldset>
        </form>
      </ENContext.Provider>
    </Suspense>
  );
}
