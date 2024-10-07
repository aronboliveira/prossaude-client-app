"use client";
import { registerPersistInputs, validateForm } from "@/lib/global/handlers/gHandlers";
import { handleSubmit } from "@/lib/locals/panelPage/handlers/handlers";
import { Fragment, createContext, lazy, useEffect, useRef, useState } from "react";
import Name from "../def/Name";
import SocialName from "../def/SocialName";
import AgeElement from "./defaulted/AgeElement";
import GenDiv from "../def/GenDiv";
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
import { looseNum, nullishForm, nullishInp } from "@/lib/global/declarations/types";
import useDataProvider from "@/lib/hooks/useDataProvider";
import ReactSpinner from "../../icons/ReactSpinner";
import { Suspense } from "react";
import { Gender } from "../../../src/lib/tests/testVars";
import { ENContextProps } from "../../../src/lib/global/declarations/interfaces";
const FsProgCons = lazy(() => import("./FsProgCons")),
  TbodyComorb = lazy(() => import("./TbodyComorb")),
  TbodyAtFisRot = lazy(() => import("./TbodyAtFisRot")),
  TbodyAtFisProps = lazy(() => import("./TbodyAtFisProps"));
export const ENContext = createContext<ENContextProps>({
  age: "0",
  gen: "masculino",
});
export default function ENForm(): JSX.Element {
  const f = useRef<nullishForm>(null),
    af = useRef<nullishInp>(null),
    [age, setAge] = useState<looseNum>("0"),
    [gen, setGen] = useState<Gender>("masculino");
  useEffect(() => {
    registerPersistInputs({
      f: f.current,
      textareas: true,
      selects: true,
      inputTypes: ["date", "number", "text", "checkbox", "radio"],
      queriesToExclude: ['[role="switch"]'],
    });
  }, []);
  useDataProvider(f.current);
  useEffect(() => {
    setTimeout(() => {}, 300);
  }, []);
  return (
    <Suspense fallback={<ReactSpinner scale={0.8} />}>
      <ENContext.Provider value={{ age, gen }}>
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
              <GenDiv onSetGen={setGen} />
            </section>
          </fieldset>
          <hr />
          <TabComorb>
            <Suspense fallback={<ReactSpinner scale={0.3} />}>
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
                <Suspense fallback={<ReactSpinner scale={0.3} />}>
                  <TbodyAtFisRot />
                </Suspense>
              </TabAtFirsRot>
              <br role='presentation' />
              <hr />
              <TabAtFirsProp>
                <Suspense fallback={<ReactSpinner scale={0.3} />}>
                  <TbodyAtFisProps />
                </Suspense>
              </TabAtFirsProp>
            </div>
            <br role='presentation' />
          </fieldset>
          <hr />
          <Suspense fallback={<ReactSpinner scale={0.5} />}>
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
