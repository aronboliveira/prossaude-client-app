"use client";
import ConfirmDate from "../def/ConfirmDate";
import ConfirmLocId from "../def/ConfirmLocId";
import Declaration from "../def/Declaration";
import SectConfirmBtns from "../def/SectConfirmBtns";
import Signature from "../def/Signature";
import AntMedContainer from "./AntMedContainer";
import BtnConformWrapper from "./BtnConformWrapper";
import DivAntFam from "./DivAntFam";
import FamCard from "./FamCard";
import FamOnc from "./FamOnc";
import FamPulm from "./FamPulm";
import RadioPairDoces from "./RadioPairDoces";
import AntMedFs from "./AntMedFs";
import { registerPersistInputs, validateForm } from "@/lib/global/handlers/gHandlers";
import { handleSubmit } from "@/lib/global/data-service";
import Name from "../def/Name";
import SocialName from "../def/SocialName";
import CPFElement from "./CPFElement";
import DDDElementPrim from "./DDDElementPrim";
import DDDElementSec from "./DDDElementSec";
import TelPrim from "./TelPrim";
import TelSec from "./TelSec";
import TelCodePrim from "./TelCodePrim";
import TelCodeSec from "./TelCodeSec";
import Email from "./Email";
import Nac from "./Nac";
import City from "./City";
import Nat from "./Nat";
import Street from "./Street";
import CepElements from "./CepElements";
import Nbh from "./Nbh";
import Uf from "./Uf";
import StreetNum from "./StreetNum";
import LocComp from "./LocComp";
import AgeElement from "../edfis/defaulted/AgeElement";
import GenDiv from "../def/GenDiv";
import QxPrinc from "./QxPrinc";
import RadioPair from "./RadioPair";
import HASDivAdd from "./HASDivAdd";
import OtherD from "./OtherD";
import FamDiab from "./FamDiab";
import FamDislip from "./FamDislip";
import { useRef, useEffect } from "react";
import { nlFm, nlInp, nlSel } from "@/lib/global/declarations/types";
import useDataProvider from "@/lib/hooks/useDataProvider";
import { agProps } from "@/vars";
import { toast } from "react-hot-toast";
import sAg from "@/styles/locals/modules/agStyles.module.scss";
export default function AgForm(): JSX.Element {
  const f = useRef<nlFm>(null),
    dnr = useRef<nlInp>(null),
    ar = useRef<nlInp>(null),
    sr = useRef<nlSel>(null),
    lnr = useRef<nlInp>(null),
    gr = useRef<nlSel>(null),
    gbr = useRef<nlSel>(null),
    toasted = useRef<boolean>(false);
  useEffect(() => {
    registerPersistInputs({
      f: f.current,
      textareas: true,
      selects: true,
      inputTypes: ["date", "number", "text", "checkbox", "radio"],
      queriesToExclude: ['[role="switch"]'],
    });
  }, [f]);
  useEffect(() => {
    const handleResize = (): void => {
      if (!(dnr.current instanceof HTMLElement && ar.current instanceof HTMLElement)) return;
      dnr.current.style.width = getComputedStyle(ar.current).width;
      dnr.current.style.maxWidth = getComputedStyle(ar.current).width;
      handleResize();
    };
    if (!document.body.dataset.equalizing || document.body.dataset.equalizing !== "true") {
      addEventListener("resize", handleResize);
      document.body.dataset.equalizing = "true";
    }
    (): void => removeEventListener("resize", handleResize);
  }, [dnr, ar]);
  useEffect(() => {
    const handleResize = (): void => {
      if (!(sr.current instanceof HTMLElement && lnr.current instanceof HTMLElement)) return;
      if (gr.current && ar.current && dnr.current) {
        dnr.current.style.width = getComputedStyle(gr.current).width;
        dnr.current.style.maxWidth = getComputedStyle(gr.current).width;
        if (gbr.current) {
          ar.current.style.width = getComputedStyle(gbr.current).width;
          ar.current.style.maxWidth = getComputedStyle(gbr.current).width;
        } else {
          ar.current.style.width = getComputedStyle(gr.current).width;
          ar.current.style.maxWidth = getComputedStyle(gr.current).width;
        }
      }
      sr.current.style.width = getComputedStyle(lnr.current).width;
      sr.current.style.maxWidth = getComputedStyle(lnr.current).width;
    };
    if (sr.current && (!sr.current?.dataset.equalizing || sr.current.dataset.equalizing !== "true")) {
      addEventListener("resize", handleResize);
      sr.current.dataset.equalizing = "true";
      handleResize();
    }
    (): void => removeEventListener("resize", handleResize);
  }, [sr, ar, gr]);
  useEffect(() => {
    agProps.agIsAutoCorrectOn = true;
    return (): void => {
      agProps.agIsAutoCorrectOn = true;
    };
  }, []);
  useEffect(() => {
    if (!toasted.current)
      toast(t => (
        <div style={{ lineHeight: "1.6rem" }}>
          <b>Dica!</b>
          <hr />
          <span>Você pode desativar ou ativar</span>
          <br />a Autocorreção nos alternadores.
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
  }, []);
  useDataProvider(f.current);
  return (
    <form
      ref={f}
      name='ag_form'
      id='formAnamGId'
      method='post'
      target='_top'
      action='submit_ag_form'
      data-ep='ag'
      encType='multipart/form-data'
      autoComplete='on'
      onSubmit={ev =>
        validateForm(ev).then(validation =>
          validation[0] ? handleSubmit("ag", validation[2], true) : ev.preventDefault(),
        )
      }>
      <fieldset name='fsAnamGName' id='fsAnamGIdId' className='fsMain'>
        <legend id='fsAnamGLeg' className='legMain form-padded'>
          Identificação
        </legend>
        <section className='sectionMain' id='fsAnamGSect'>
          <div className='flexQ900NoWC' id='div1_div2flex' role='group'>
            <Name lastNameRef={lnr} />
            <div
              className='fsAnamGDiv alItSt900Q flexQ900NoWC flexAlItE noAdj flexNoWR flexTwin-width'
              role='group'
              id='divIdentif_2'>
              <SocialName />
              <span role='group' className='fsAnamGSpan flexAlItCt col' id='fsAnamGSpanCPF'>
                <label htmlFor='inpCPF' className='labelIdentif'>
                  <span>CPF:</span>
                  <CPFElement />
                </label>
              </span>
              <span role='group' className='fsAnamGSpan flexAlItCt col'>
                <label className='labelIdentif'>
                  Status:
                  <select
                    ref={sr}
                    className='form-select noInvert ssPersist'
                    id='statusPac'
                    name='statusPac-in'
                    data-title='Status Paciente'
                    required>
                    {[
                      { v: "avaliacao", l: "Em Avaliação Inicial" },
                      { v: "tratamento", l: "Em Tratamento Geral" },
                      { v: "emergência", l: "Em Emergência" },
                      { v: "altaOdontologia", l: "Alta — Odontologia" },
                      { v: "altaEducacaoFisica", l: "Alta — Educação Física" },
                      { v: "altaNutricao", l: "Alta — Nutrição" },
                      { v: "altaOdontologiaEducacaoFisica", l: "Alta — Odontologia — Educação Física" },
                      { v: "altaOdontologiaNutricao", l: "Alta — Odontologia — Nutrição" },
                      { v: "altaEducacaoFisicaNutricao", l: "Alta — Educação Física — Nutrição" },
                      { v: "altaOdontologiaEducacaoFisicaNutricao", l: "Alta Geral" },
                    ].map((op, i) => (
                      <option key={`status_op_${i}`} value={op.v}>
                        {op.l}
                      </option>
                    ))}
                  </select>
                </label>
              </span>
            </div>
            <hr />
            <div className='flexDiv fsAnamGDiv alItSt900Q flexQ900NoWC gridTwoCol' id='fsAnamGDiv4' role='group'>
              <span role='group' className='fsAnamGSpan mgr-3v' id='fsAnamGSpan11'>
                <label htmlFor='dateBdayId' className='labelIdentif'>
                  Data de Nascimento:
                  <input
                    ref={dnr}
                    type='date'
                    name='birth'
                    id='dateBdayId'
                    className={`form-control inpIdentif noInvert maxCurrDate ${sAg.birthInp}`}
                    autoComplete='bday'
                    data-title='Nascimento'
                    required
                  />
                </label>
              </span>
              <span role='group' className='fsAnamGSpan' id='fsAnamGSpan12'>
                <label htmlFor='ageId' className={`labelIdentif ${sAg.ageInp}`}>
                  <span>Idade:</span>
                  <AgeElement inpRef={ar} />
                </label>
              </span>
            </div>
            <GenDiv />
            <hr />
            <div
              className='divMain fsAnamGDiv alItSt900Q flexQ900NoWC gridAlItE gridTwoCol noGapDiv noEqualize'
              id='fsAnamGDiv2'
              role='group'>
              <span role='group' className='spanMain fsAnamGSpan' id='fsAnamGSpan16'>
                <label htmlFor='telAreaCodeId' className='labelIdentif'>
                  <span>DDD:</span>
                  <DDDElementPrim />
                </label>
                <br role='presentation' />
              </span>
              <span role='group' className='spanMain fsAnamGSpan' id='fsAnamGSpan19'>
                <label htmlFor='tel2AreaCodeId' className='labelIdentif'>
                  <span>DDD do Telefone Secundário:</span>
                  <DDDElementSec />
                </label>
                <br role='presentation' />
              </span>
              <span role='group' className='spanMain fsAnamGSpan' id='fsAnamGSpan17'>
                <label htmlFor='telId' className='labelIdentif'>
                  <span>Telefone:</span>
                  <TelPrim />
                </label>
                <br role='presentation' />
              </span>
              <span role='group' className='spanMain fsAnamGSpan' id='fsAnamGSpan20'>
                <label htmlFor='tel2Id' className='labelIdentif'>
                  <span>Telefone Secundário:</span>
                  <TelSec />
                </label>
                <br role='presentation' />
              </span>
              <span role='group' className='spanMain fsAnamGSpan' id='fsAnamGSpan18'>
                <label htmlFor='telCountryCodeId' className='labelIdentif'>
                  <span>Se estrangeiro, informe o código do País:</span>
                  <TelCodePrim />
                </label>
                <br role='presentation' />
              </span>
              <span role='group' className='spanMain fsAnamGSpan' id='fsAnamGSpan21'>
                <label htmlFor='tel2CountryCodeId' className='labelIdentif'>
                  <span>Se estrangeiro, informe o código do País:</span>
                  <TelCodeSec />
                </label>
                <br role='presentation' />
              </span>
              <span role='group' className='spanMain fsAnamGSpan' id='fsAnamGSpan22'>
                <label htmlFor='email1Id' className='labelIdentif'>
                  <span>E-mail:</span>
                  <Email />
                </label>
                <br role='presentation' />
              </span>
              <span role='group' className='spanMain fsAnamGSpan' id='fsAnamGSpan22'>
                <label htmlFor='email2Id' className='labelIdentif noInvert'>
                  <span>E-mail secundário:</span>
                  <Email name='email_sec' id='email2Id' title='E-mail Secundário' />
                </label>
              </span>
            </div>
          </div>
          <hr />
          <div
            className='divMain fsAnamGDiv alItSt900Q flexQ900NoWC gridAlItE gridTwoCol widFull900Q noEqualize'
            id='fsAnamGDiv3'
            role='group'>
            <span role='group' className='fsAnamGSpan' id='fsAnamGSpan6'>
              <label htmlFor='countryId' className='labelIdentif noInvert'>
                <span>Nacionalidade:</span>
                <Nac />
              </label>
              <br role='presentation' />
            </span>
            <span role='group' className='fsAnamGSpan' id='fsAnamGSpan10'>
              <label htmlFor='streetId' className='labelIdentif noInvert'>
                <span>Cidade:</span>
                <City />
              </label>
              <br role='presentation' />
            </span>
            <span role='group' className='fsAnamGSpan' id='fsAnamGSpan7'>
              <label htmlFor='munId' className='labelIdentif noInvert' id='labMunId'>
                <span>Naturalidade:</span>
                <Nat />
              </label>
              <br role='presentation' />
            </span>
            <span role='group' className='fsAnamGSpan' id='fsAnamGSpan12'>
              <label htmlFor='streetId' className='labelIdentif noInvert'>
                <span>Endereço | Logradouro | Rua:</span>
                <Street />
              </label>
              <br role='presentation' />
            </span>
            <span role='group' className='fsAnamGSpan' id='fsAnamGSpan8'>
              <CepElements />
              <br role='presentation' />
            </span>
            <span role='group' className='fsAnamGSpan' id='fsAnamGSpan11'>
              <label htmlFor='streetId' className='labelIdentif noInvert'>
                <span>Bairro:</span>
                <Nbh />
              </label>
              <br role='presentation' />
            </span>
            <span role='group' className='fsAnamGSpan' id='fsAnamGSpan9'>
              <label htmlFor='UFId' className='labelIdentif forceInvert'>
                Unidade Federativa (Residência Atual):
                <Uf />
              </label>
              <br role='presentation' />
            </span>
            <span role='group' className='fsAnamGSpan locSpan form-switch flexColumn noInvert' id='fsAnamGSpan13'>
              <span role='textbox' style={{ marginLeft: "0.5rem" }}>
                Número:
              </span>
              <span role='group' className='flexDiv spanLoc fitSpaced mg-07t'>
                <StreetNum />
              </span>
            </span>
            <span role='group' className='fsAnamGSpan locSpan form-switch flexColumn noInvert' id='fsAnamGSpan14'>
              <span role='textbox' style={{ marginLeft: "0.5rem" }}>
                Complemento:
              </span>
              <span role='group' className='flexDiv spanLoc fitSpaced mg-07t'>
                <LocComp />
              </span>
            </span>
          </div>
        </section>
        <hr />
      </fieldset>
      <fieldset name='fsSdGeralName' id='fsSdGeralId' className='fsMain form-padded'>
        <legend id='fsSdGeralLeg' className='legMain'>
          Dados de Saúde Geral
        </legend>
        <section className='sectionMain' id='fsSdGeralSect'>
          <span role='group' className='fsSdGeralSpan' id='fsSdGeralSpan1'>
            <label htmlFor='qxPrinc' className='labelSdGeral'>
              Queixa Principal
            </label>
            <QxPrinc />
            <br role='presentation' />
          </span>
          <span role='group' className='fsSdGeralSPan' id='fsSdGeralSpan2'>
            <label htmlFor='histDc' className='labelSdGeral'>
              História da(s) Doença(s)
            </label>
            <textarea
              className='form-control autocorrect autocorrectFirst ttaSdGeral'
              id='histDc'
              name='history'
              maxLength={1000}
              placeholder='Escreva aqui a história'
              data-title='historia_doencas'
              data-xls='História de Queixas'></textarea>
          </span>
          <hr />
        </section>
      </fieldset>
      <fieldset name='fsAnamGRadName' id='fsAnamGRadId' className='fsMain form-padded'>
        <legend id='fsAnamGRadLegId' className='legMain'>
          Possíveis Doenças
        </legend>
        <section className='sectionMain sectionConfirm flexDiv flexColumn flexQ900NoWC' id='fsAnamGRadSectId'>
          <div id='fsAGRadDiv1' className='flexDiv flexColumn fsAGRadDiv' role='group'>
            <RadioPair name='febr_r' fullName='Febre Reumática' required={true} />
            <RadioPair name='hep' fullName='Hepatite ou Outra(s) Doença(s) Hepática(s)' ctx={true} required={true} />
            <div className='divAdd gridTwoCol' id='divAddHep' role='list'>
              {[
                { name: "hep_a", id: "hepAId", label: "A", title: "Hepatite A" },
                { name: "hep_b", id: "hepBId", label: "B", title: "Hepatite B" },
                { name: "hep_c", id: "hepCId", label: "C", title: "Hepatite C" },
                { name: "hep_d", id: "hepDId", label: "D", title: "Hepatite D" },
                { name: "hep_e", id: "hepEId", label: "E", title: "Hepatite E" },
                {
                  name: "hep_indirect",
                  id: "hepInfcId",
                  label: "Induzida por Outras Infecções",
                  title: "Hepatite por outras infecções",
                },
                { name: "hep_imun", id: "hepImunId", label: "Autoimune", title: "Hepatite Autoimune" },
                { name: "hep_onc", id: "hepOncId", label: "Oncológica", title: "Hepatite Oncológica" },
                { name: "hep_alc", id: "hepAlcId", label: "Alcoólica", title: "Hepatite Alcoólica" },
                {
                  name: "hep_tox",
                  id: "hepDrgId",
                  label: "Induzida por Toxinas, Medicamentos ou Outra(s) Droga(s)",
                  title: "Hepatite por intoxicação",
                },
              ].map((hep, i) => (
                <span role='listitem' className='cbDoencaSubt' key={`hep__${i}`}>
                  <input
                    type='checkbox'
                    name={hep.name}
                    id={hep.id}
                    className='cpbOp indivOp opHep'
                    data-title={hep.title}
                  />
                  {hep.label}
                </span>
              ))}
            </div>
            <RadioPair name='diab' fullName='Diabetes' ctx={true} required={true} />
            <div className='divAdd gridTwoCol' id='divAddDiab' role='list'>
              {[
                { name: "diab_1", id: "diabTipo1Id", label: "Tipo 1", title: "Diabetes tipo 1" },
                { name: "diab_2", id: "diabTipo2Id", label: "Tipo 2", title: "Diabetes tipo 2" },
                { name: "diab_gest", id: "diabGestId", label: "Gestacional", title: "Diabetes Gestacional" },
                { name: "diab_ins", id: "diabInsId", label: "Insípido", title: "Diabetes Insipidus" },
                { name: "diab_lada", id: "diabLadaId", label: "LADA", title: "Diabetes LADA" },
                { name: "diab_mody", id: "diabModyId", label: "MODY", title: "Diabetes MODY" },
              ].map((diab, i) => (
                <span role='listitem' className='cbDoencaSubt' key={`cb__${i}`}>
                  <input
                    type='checkbox'
                    name={diab.name}
                    id={diab.id}
                    className='cpbOp indivOp opDiab opDiabIndiv'
                    data-title={diab.title}
                  />
                  {diab.label}
                </span>
              ))}
            </div>
            <RadioPair name='hiv' fullName='Portador de HIV' ctx={true} required={true} />
            <div className='divAdd gridTwoCol' id='divAddHiv' role='group'>
              <div role='group'>
                <span role='group' className='spanSub spanSubFsAnamGRad spanDivAddHiv' id='spanCargHiv'>
                  Carga Viral:
                </span>
                <div className='flexDiv fsAnamGSpan labFlexDiv' role='group'>
                  <input
                    type='number'
                    name='hiv_copies'
                    id='hivCargId'
                    className='form-control cpbOp indivOp opHiv'
                    data-title='HIV — Carga Viral (cópias/ml)'
                  />
                  <label htmlFor='hivCargId' className='LbCpbOp' id='labHivCarg'>
                    cópias/ml
                  </label>
                </div>
              </div>
              <br role='presentation' />
              <div role='group'>
                <span
                  role='group'
                  className='spanSub spanSubFsAnamGRad spanDivAddHiv spanDivAddDatHiv'
                  id='spanDatDiagHiv'>
                  Data do Diagnóstico:
                </span>
                <input
                  type='date'
                  name='hiv_diagnosis'
                  id='hivDateDiagId'
                  className='form-control cpbOp indivOp opHiv maxCurrDate'
                  data-title='HIV — Data do Diagnóstico'
                />
              </div>
              <div role='group'>
                <span
                  role='group'
                  className='spanSub spanSubFsAnamGRad spanDivAddHiv spanDivAddDatHiv'
                  id='spanExamHiv'>
                  Data do Último Exame:
                </span>
                <input
                  type='date'
                  name='hiv_last_exam'
                  id='hivDateExamId'
                  className='form-control cpbOp indivOp opHiv maxCurrDate'
                  data-title='HIV — Data do Último Exame'
                />
              </div>
            </div>
            <RadioPair name='t_sang' fullName='Transfusão de Sangue' required={true} />
            <RadioPair name='pr_alta' fullName='Hipertensão Arterial Sistêmica' ctx={true} required={true} />
            <HASDivAdd />
          </div>
          <div id='fsAGRadDiv2' className='flexDiv flexColumn fsAGRadDiv' role='group'>
            {[
              { name: "pb_card", fullName: "Problema(s) Cardíaco(s)" },
              { name: "pb_ren", fullName: "Problema(s) Renal(is)" },
              { name: "pb_gast", fullName: "Problema(s) Gástrico(s)" },
              { name: "pb_resp", fullName: "Problema(s) Respiratório(s)" },
              { name: "pb_alerg", fullName: "Problema(s) Alérgico(s)" },
              { name: "pb_art_reum", fullName: "Problema(s) Articular(es) ou Reumáticos" },
            ].map((pair, i) => (
              <RadioPair key={`pb__${i}`} name={pair.name} fullName={pair.fullName} add='ta' required={true} />
            ))}
          </div>
          <div id='fsAGRadDiv3' className='flexDiv flexColumn fsAGRadDiv' role='group'>
            <RadioPair
              name='pb_sist'
              fullName='Alguma Outra Doença Sistêmica'
              add='ta'
              altPh='Escreva aqui sobre as Doenças Sistêmicas específicas'
              required={true}
            />
            <RadioPair
              name='pb_alc'
              fullName='Uso de Bebidas Alcoólicas'
              add='ta'
              altPh='Escreva aqui sobre os problemas com uso de Bebidas alcoólicas'
              required={true}
            />
            <RadioPair name='fumo' fullName='É fumante' ctx={true} required={true} />
            <div className='divAdd gridTwoCol switchedDiv' id='divAddFumo' role='group'>
              <span role='group' className='spanSub spanSubFsAnamGRad form-check' id='spanFumSubs'>
                <strong>Nível:</strong>
                <br role='presentation' />
                <span role='list' className='cbDoencaSubt' id='spanLvlFumo'>
                  {[
                    { id: "fumoLeveId", dataTitle: "fumo_leve", dataValue: "leve", label: "Leve" },
                    { id: "fumoModId", dataTitle: "fumo_moderado", dataValue: "moderado", label: "Moderado" },
                    { id: "fumoAltoId", dataTitle: "fumo_alto", dataValue: "alto", label: "Alto" },
                  ].map((level, i) => (
                    <div role='listitem' key={`fum_lvl_${i}`}>
                      <input
                        type='radio'
                        name='fumo_lvl'
                        id={level.id}
                        className='radOp radAdd radFumo'
                        data-title={level.dataTitle}
                        data-value={level.dataValue}
                        data-group='true'
                        data-parent='#spanLvlFumo'
                      />
                      {level.label}
                    </div>
                  ))}
                </span>
              </span>
              <span role='list' className='spanSub spanSubFsAnamGRad form-check flexColumn' id='spanFumSubs'>
                <strong>Substância de Consumo</strong>
                {[
                  {
                    name: "fumo_tab",
                    id: "fumIdTab",
                    dataTitle: "Fumo — Consumo de Tabaco",
                    labelText: "Tabaco",
                    labelId: "labFumTab",
                  },
                  {
                    name: "fumo_can",
                    id: "fumIdCan",
                    dataTitle: "Fumo — Consumo de Cannabis",
                    labelText: "Cannabis",
                    labelId: "labFumCan",
                  },
                  {
                    name: "fumo_other",
                    id: "fumIdOther",
                    dataTitle: "Fumo — Consumo de Outras Substâncias",
                    labelText: "Outros",
                    labelId: "labFumOther",
                  },
                ].map((op, i) => (
                  <div role='listitem' key={`fum_t_${i}`}>
                    <input type='checkbox' className='opFumSubs' name={op.name} id={op.id} data-title={op.dataTitle} />
                    <label htmlFor={op.id} className='labOpFumSubs' id={op.labelId}>
                      {op.labelText}
                    </label>
                  </div>
                ))}
              </span>
              <label htmlFor='tempApFumoId' className='labFum form-check' id='tempFum'>
                <strong>Tempo aproximado do hábito, em meses:</strong>
                <input
                  type='number'
                  name='fumo_months'
                  className='form-control'
                  id='tempApFumoId'
                  min='0'
                  data-title='Fumo — Tempo aproximado (meses)'
                />
              </label>
              <br role='presentation' />
            </div>
            <RadioPair
              name='pb_drg'
              fullName='Uso de Outras Drogas'
              add='ta'
              altPh='Escreva aqui sobre os problemas com uso de drogas'
              required={true}
            />
            <RadioPair name='grv' fullName='Gravidez' ctx={true} />
            <div className='divMain divAdd' id='divAddGrv' role='group'>
              <input
                type='checkbox'
                name='GrvAtName'
                id='GrvAtId'
                className='radOp radAdd radGrv'
                data-title='gravidez_atual'
              />
              Atual
              <input
                type='checkbox'
                name='GrvPasName'
                id='GrvPasId'
                className='radOp radAdd radGrv'
                data-title='gravidez_passada'
              />
              Passada
            </div>
            <RadioPair
              name='ant_c'
              fullName='Uso de Anticoncepcional(is)'
              add='ta'
              altPh='Escreva aqui sobre o uso de Anticoncepcionais'
              required={true}
            />
          </div>
          <div id='fsAGRadDiv4' className='flexDiv flexColumn fsAGRadDiv' role='group'>
            {[
              {
                name: "op",
                fullName: "Operação ou Extração de Dente(s)",
                add: "ta",
                altPh: "Qual ou quais Dente(s) Operado(s) e/ou Extraído(s)?",
                required: true,
              },
              {
                name: "pb_cic",
                fullName: "Problema(s) com Cicatrização",
                add: "ta",
                required: true,
              },
              {
                name: "pb_anst",
                fullName: "Problema(s) com Anestesia(s)",
                add: "ta",
                required: true,
              },
              {
                name: "pb_hem",
                fullName: "Problema(s) com Hemorragia",
                add: "ta",
                required: true,
              },
              {
                name: "pb_intrn",
                fullName: "Internação Recente",
                add: "ta",
                altPh: "Tempo aproximado de Internação",
                required: true,
              },
              {
                name: "pb_med",
                fullName: "Uso Atual de Medicação Controlada",
                add: "ta",
                altPh: "Qual ou quais Medicações Controladas?",
                required: true,
              },
            ].map((pair, i) => (
              <RadioPair
                key={`pb_radio_${i}`}
                name={pair.name}
                fullName={pair.fullName}
                add={pair.add as any}
                altPh={pair.altPh}
                required={pair.required}
              />
            ))}
          </div>
        </section>
        <hr />
        <fieldset className='sectionMain sectionConfirm noInvert' id='fsAnamGRadODSectId'>
          <legend className='bolded' id='hOD'>
            Outras Doenças
          </legend>
          <div className='divMain gridThreeCol' id='divOtherD' role='list'>
            {[
              { name: "cand", id: "candId", title: "Candidíase", labelId: "labCand", spanId: "spanCand" },
              { name: "gon", id: "gonId", title: "Gonorreia", labelId: "labGon", spanId: "spanGon" },
              { name: "herp", id: "herpId", title: "Herpes", labelId: "labHerp", spanId: "spanHerp" },
              { name: "herp_z", id: "herpZId", title: "Herpes Zoster", labelId: "labHerpZ", spanId: "spanHerpZ" },
              { name: "pneumonia", id: "pneuId", title: "Pneumonia", labelId: "labPneu", spanId: "spanPneu" },
              { name: "sif", id: "sifId", title: "Sífilis", labelId: "labSif", spanId: "spanSif" },
              {
                name: "toxop",
                id: "toxopId",
                title: "Toxoplasmose",
                labelId: "labToxop",
                spanId: "spanToxop",
                noExpand: true,
              },
              {
                name: "tuberc",
                id: "tubercId",
                title: "Tuberculose",
                labelId: "labTuberc",
                spanId: "spanTuberc",
                noExpand: true,
              },
            ].map((condition, i) => (
              <span
                key={`condit__${i}`}
                role='listitem'
                className={`spanMain sectODSpan input-group mb-3 ${condition.noExpand ? "noExpandRad" : ""}`}
                id={condition.spanId}>
                <div className='input-group-text' role='group'>
                  <input
                    type='checkbox'
                    name={condition.name}
                    id={condition.id}
                    className={`radOD ${condition.noExpand ? "noExpandRad" : ""}`}
                    data-title={condition.title}
                  />
                </div>
                <label htmlFor={condition.id} className='labelOD input-group-text' id={condition.labelId}>
                  {condition.title}
                </label>
              </span>
            ))}
            <span role='listem' className='spanMain sectODSpan input-group mb-3' id='spanOtherD'>
              <div className='input-group-text' role='group'>
                <OtherD />
              </div>
              <label htmlFor='pbOtherDIdYes' className='labelOd input-group-text' id='labPbOtherIdYes'>
                Outra(s)
              </label>
              <textarea
                id='textAddOtherDId'
                className='form-control tAOD textAdd'
                name='other_d'
                maxLength={1000}
                placeholder='Qual ou quais?'
                data-title='Descrição – Outras Doenças'></textarea>
            </span>
          </div>
        </fieldset>
        <hr />
        <section className='sectionMain sectionConfirm' id='fsAnamGCBAntSectId'>
          <fieldset name='fsAntFamName' id='fsAntFamId' className='fsSub'>
            <legend id='fsAntFamLeg' className='bolded'>
              Antecedentes Familiares
            </legend>
            <section id='fsAntFamSect' className='sectionSub'>
              <span role='group' className='spanMain spanSectAnt input-group mb-3' id='spanMainAddDiabFam'>
                <div className='input-group-text' id='divCheckDiabFam' role='group'>
                  <FamDiab />
                </div>
                <label htmlFor='antFamDiabId' className='famLabel input-group-text' id='labAntFamDiab'>
                  Diabetes
                </label>
              </span>
              <div className='divAdd divAntFam' id='divAddFamDiab' role='group'>
                <strong style={{ marginLeft: "0.5rem" }}>Subtipo:</strong>
                <div
                  className='divAdd gridThreeCol divAntFamCheck'
                  role='list'
                  style={{ marginBlock: "0.5rem", padding: "0.5rem" }}>
                  {[
                    { name: "diabFamTipo1Name", id: "diabFamTipo1Id", title: "familia_diabetes1", label: "Tipo 1" },
                    { name: "diabFamTipo2Name", id: "diabFamTipo2Id", title: "familia_diabetes2", label: "Tipo 2" },
                    {
                      name: "diabFamGestName",
                      id: "diabFamGestId",
                      title: "familia_diabetes_gestacional",
                      label: "Gestacional",
                    },
                    {
                      name: "diabFamInsName",
                      id: "diabFamInsId",
                      title: "familia_diabetes_insipida",
                      label: "Insípido",
                    },
                    { name: "diabFamLadaName", id: "diabFamLadaId", title: "familia_diabetes_lada", label: "LADA" },
                    { name: "diabFamModyName", id: "diabFamModyId", title: "familia_diabetes_mody", label: "MODY" },
                  ].map((type, i) => (
                    <span role='listitem' className='cbDoencaSubt' key={`diab__${i}`}>
                      <input
                        type='checkbox'
                        name={type.name}
                        id={type.id}
                        className='cpbOp famOp opDiab opDiabFam opDiabTypeFam'
                        data-title={type.title}
                      />
                      {type.label}
                    </span>
                  ))}
                </div>
                <DivAntFam name='diab' fullName='Diabetes' div={false} />
              </div>
              <span role='group' className='spanMain spanSectAnt input-group mb-3' id='spanMainAddDislipFam'>
                <div className='input-group-text' id='divCheckDislipFam' role='group'>
                  <FamDislip />
                </div>
                <label htmlFor='antFamDislipId' className='famLabel input-group-text' id='labAntFamDislip'>
                  Dislipidemia(s)
                </label>
              </span>
              <div className='divAdd divAntFam' id='divAddFamDislip' role='group'>
                <div className='divSubtype container-lg' id='divSubtypeDislip' role='group'>
                  <strong>Subtipo:</strong>
                  <br role='presentation' />
                  <div className='divAdd gridThreeCol divAntFamCheck' role='list'>
                    {[
                      {
                        name: "dislipFamGeralName",
                        id: "dislipFamGeralId",
                        xls: "Dislipidemia geral",
                        title: "dislip_geral",
                        label: "Geral",
                      },
                      {
                        name: "dislipFamIsolName",
                        id: "dislipFamIsolId",
                        xls: "Dislipidemia isolada",
                        title: "dislip_isolada",
                        label: "Isolada",
                      },
                      {
                        name: "dislipFamMixName",
                        id: "dislipFamMixId",
                        xls: "Dislipidemia Mista",
                        title: "dislip_mista",
                        label: "Mista | Combinada",
                      },
                      {
                        name: "dislipFamHipoName",
                        id: "dislipFamHipoId",
                        xls: "Dislipidemia por hipoalfalipoproteinemia",
                        title: "dislip_hipoalfa",
                        label: "Hipoalfalipoproteinemia",
                      },
                      {
                        name: "dislipFamHiperName",
                        id: "dislipFamHiperId",
                        xls: "Dislipidemia por Hipertrigliceridemia",
                        title: "dislip_hipertrig",
                        label: "Hipertrigliceridemia",
                      },
                    ].map((type, i) => (
                      <span role='listitem' className='cbDoencaSubt' key={`dislip_${i}`}>
                        <input
                          type='checkbox'
                          name={type.name}
                          id={type.id}
                          className='cpbOp famOp opDislip opDislipFam opDislipTypeFam'
                          data-xls={type.xls}
                          data-title={type.title}
                        />
                        {type.label}
                      </span>
                    ))}
                  </div>
                </div>
                <DivAntFam name='dislip' fullName='Dislipidemia' gen={true} />
              </div>
              <span role='group' className='spanMain spanSectAnt input-group mb-3' id='spanMainAddCardFam'>
                <div className='input-group-text' id='divCheckCardFam' role='group'>
                  <FamCard />
                </div>
                <label htmlFor='antFamCardId' className='famLabel input-group-text' id='labAntFamCard'>
                  Doença(s) Cardíaca(s)
                </label>
              </span>
              <DivAntFam name='card' fullName='Doenças Cardíacas(s)' ta={true} />
              <span role='group' className='spanMain spanSectAnt input-group mb-3'>
                <div className='input-group-text' id='divCheckPulmFam' role='group'>
                  <FamPulm />
                </div>
                <label htmlFor='antFamPulmId' className='famLabel input-group-text' id='labAntFamPulm'>
                  Doença(s) Pulmonar(es)
                </label>
                <br role='presentation' />
              </span>
              <DivAntFam name='pulm' fullName='Doença(s) Pulmonar(es)' ta={true} />
              <span role='group' className='spanMain spanSectAnt input-group mb-3'>
                <div className='input-group-text' id='divCheckOncFam' role='group'>
                  <FamOnc />
                </div>
                <label htmlFor='antFamOncId' className='famLabel input-group-text' id='labAntFamOnc'>
                  Doença(s) Oncológica(s)
                </label>
              </span>
              <DivAntFam name='onc' fullName='Doença(s) Oncológica(s)' ta={true} />
            </section>
            <hr />
          </fieldset>
          <AntMedFs>
            <AntMedContainer />
          </AntMedFs>
        </section>
        <hr />
        <fieldset className='sectionMain sectionConfirm noInvert' id='fsAnamGFreqSectId'>
          <legend className='bolded' id='hFreq'>
            Frequências de Rotina
          </legend>
          <div className='divMain divFreq gridTwoCol' id='divFreqOdont' role='group'>
            <span role='group' className='sectFreqSpan' id='spanFreqEscov'>
              <label htmlFor='escovNId' className='labDlist' id='labEscovN'>
                Escovações por dia:
              </label>
              <input
                type='number'
                list='escovN'
                name='escov_n_day'
                id='escovNId'
                className='form-control freqInpList'
                data-title='Escovações por dia'
                autoCapitalize='on'
              />
              <datalist id='escovN'>
                {[1, 2, 3, 4].map(n => (
                  <option value={n} key={`escov__${n}`}></option>
                ))}
              </datalist>
              <br role='presentation' />
            </span>
            <span role='group' className='sectFreqSpan' id='spanFreqFio'>
              <label htmlFor='fioNId' className='labDlist' id='labFioN'>
                Uso de Fio Dental por dia:
              </label>
              <input
                type='number'
                list='fioN'
                name='fio_n_day'
                id='fioNId'
                className='form-control freqInpList'
                data-title='Uso de Fio Dental por dia'
                autoCapitalize='on'
              />
              <datalist id='fioN'>
                {[1, 2, 3, 4].map(n => (
                  <option value={n} key={`fio__${n}`}></option>
                ))}
              </datalist>
              <br role='presentation' />
            </span>
            <span role='group' className='sectFreqSpan' id='spanFreqEnxg'>
              <label htmlFor='enxgNId' className='labDlist' id='labEnxgN'>
                Uso de Enxaguante Bucal por dia:
              </label>
              <input
                type='number'
                list='enxgN'
                name='enxg_n_day'
                id='enxgNId'
                className='form-control freqInpList'
                data-title='Uso de Enxaguante Bucal por dia'
                autoCapitalize='on'
              />
              <datalist className='dlistFreq' id='enxgN'>
                <option className='optDlist optDlistEnxg' value='1'></option>
                <option className='optDlist optDlistEnxg' value='2'></option>
                <option className='optDlist optDlistEnxg' value='3+'></option>
              </datalist>
              <br role='presentation' />
            </span>
            <span role='group' className='sectFreqSpan' id='spanDoce'>
              <span role='group' className='sectFreqSubSpan' id='pbAlmSpan'>
                <span>Consumo de Corantes ou Doces:</span>
                <br role='presentation' />
                <span role='group' className='sectFreqSubSpan form-check' id='pbAlmSubSubSpan'>
                  <RadioPairDoces />
                </span>
              </span>
              <textarea
                id='textAddAlm'
                name='notes_cor_doces'
                maxLength={1000}
                placeholder='Qual ou quais?'
                className='divAdd form-control'
                data-title='Descrição — Doces e/ou Corantes'></textarea>
              <br role='presentation' />
            </span>
          </div>
        </fieldset>
        <hr />
      </fieldset>
      <fieldset name='fsConfirmName' id='fsConfirmId' className='fsMain form-padded'>
        <section className='sectionMain sectionConfirm' id='sectConfirmCheck'>
          <Declaration text='&#34;DECLARO SEREM VERDADEIRAS AS INFORMAÇÕES ACIMA&#34;' />
          <div className='divMain' id='divConfirm' role='group'>
            <BtnConformWrapper />
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
        <SectConfirmBtns />
        <hr />
      </fieldset>
    </form>
  );
}
