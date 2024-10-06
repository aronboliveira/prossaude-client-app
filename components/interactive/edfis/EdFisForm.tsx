"use client";
import { registerPersistInputs, validateForm } from "@/lib/global/handlers/gHandlers";
import { handleSubmit } from "@/lib/locals/panelPage/handlers/handlers";
import { Fragment, useEffect, useRef } from "react";
import Name from "../def/Name";
import SocialName from "../def/SocialName";
import AgeElement from "./defaulted/AgeElement";
import GenDiv from "../def/GenDiv";
import TbodyComorb from "./TbodyComorb";
import TabComorb from "./TabComorb";
import DivRot from "./DivRot";
import InpCorUr from "./client/InpCorUr";
import InpDiur from "./client/InpDiur";
import OpProtUr from "./OpProtUr";
import ProtUrLvl from "./client/ProtUrLvl";
import SelectLvlAtFis from "./client/SelectLvlAtFis";
import TbodyAtFisRot from "./TbodyAtFisRot";
import TbodyAtFisProps from "./TbodyAtFisProps";
import SelectNumCons from "./client/SelectNumCons";
import TrioReadNumCons from "./TrioReadNumCons";
import TextBodyType from "./client/TextBodyType";
import GordCorpLvl from "./client/GordCorpLvl";
import LockTabInd from "./tabs/LobTackInd";
import NafType from "./client/NafType";
import FormCalcTmbType from "./client/FormCalcTmbType";
import SelFactorAtleta from "./client/SelFactorAtleta";
import TabProgSVi from "./TabProgSVi";
import TabMedAnt from "./TabMedAnt";
import Protocolo from "./client/Protocolo";
import TabDCut from "./TabDCut";
import TabAtFirsProp from "./TabAtFisProp";
import TabAtFirsRot from "./TabAtFisRot";
import TabIndPerc from "./TabIndPerc";
import Declaration from "../def/Declaration";
import ENBtnConformWrapper from "./ENBtnConformWrapper";
import ConfirmLocId from "../def/ConfirmLocId";
import ConfirmDate from "../def/ConfirmDate";
import Signature from "../def/Signature";
import SectConfirmBtns from "../def/SectConfirmBtns";
import { nullishForm } from "@/lib/global/declarations/types";
import useDataProvider from "@/lib/hooks/useDataProvider";
export default function EdFisForm(): JSX.Element {
  const f = useRef<nullishForm>(null);
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
  return (
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
              <AgeElement />
            </label>
          </span>
          <GenDiv flux={true} />
        </section>
      </fieldset>
      <hr />
      <TabComorb>
        <TbodyComorb />
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
            <TbodyAtFisRot />
          </TabAtFirsRot>
          <br role='presentation' />
          <hr />
          <TabAtFirsProp>
            <TbodyAtFisProps />
          </TabAtFirsProp>
        </div>
        <br role='presentation' />
      </fieldset>
      <hr />
      <fieldset name='fsProgConsName' id='fsProgConsId' className='fsMain divTab'>
        <h4 className='bolded' id='hProgCons'>
          Progresso em Consultas
        </h4>
        <div role='group' id='divProgSels'>
          <div role='group' className='flexDiv flexDivProg' id='divProgCons'>
            <label htmlFor='selectNumCons' id='labSelectNumCons' className='consLab'>
              <span>Consulta em Leitura:</span>
              <SelectNumCons />
            </label>
            <TrioReadNumCons />
          </div>
          <div role='group' className='flexDiv flexDivProg' id='divProgType'>
            <div role='group' className='divLab'>
              <span>Tipo corporal aplicado:</span>
              <TextBodyType />
            </div>
            <div role='group' className='spanForm divLab'>
              <span>Nível de Gordura Corporal aplicado:</span>
              <span role='group' className='form-control noInvert spanSubForm consInp'>
                <GordCorpLvl />
                <LockTabInd ctx='GordCorpLvl' addGroup={["spanLock"]} isSpan={true} />
              </span>
            </div>
          </div>
          <div role='group' className='flexDiv flexDivProg' id='divProgFactor'>
            <div role='group' className='divLab'>
              <span>Fator de Nível de Atividade Física:</span>
              <NafType />
            </div>
            <div role='group' className='divLab spanForm'>
              <span>Fórmula aplicada para Cálculo de TMB:</span>
              <span role='group' className='form-control noInvert spanSubForm consInp'>
                <FormCalcTmbType />
                <LockTabInd ctx='formCalcTMB' addGroup={["spanLock"]} isSpan={true} />
              </span>
            </div>
            <div role='group' className='divLab' id='spanFactorAtleta' hidden>
              <span>Fator para Calcúlo de TMB em Atletas:</span>
              <SelFactorAtleta />
            </div>
          </div>
        </div>
        <hr />
        <fieldset className='fsSub' name='fsSubProgConsName' id='fsSubProgConsId'>
          <TabProgSVi />
          <hr />
          <TabMedAnt />
          <hr />
          <div role='group' className='spanMain spanMainTabProgCons divLab' id='tabSpanDCut'>
            <span className='forceInvert'>Protocolo:</span>
            <Protocolo />
          </div>
          <TabDCut />
          <hr />
          <TabIndPerc />
          <br role='presentation' />
          <hr
            style={{
              opacity: 0.15,
              marginLeft: "0.5rem",
            }}
          />
        </fieldset>
      </fieldset>
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
  );
}
