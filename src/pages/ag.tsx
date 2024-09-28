import { ErrorBoundary } from "react-error-boundary";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { handleSubmit } from "./api/ts/handlers";
import { memo } from "react";
import { targEl } from "@/lib/global/declarations/types";
import { validateForm } from "@/lib/global/handlers/gHandlers";
import AgTipsBtnWrapper from "../../components/interactive/ag/AgTipsBtnWrapper";
import AgeElement from "../../components/interactive/edfis/defaulted/AgeElement";
import AntMedFs from "../../components/interactive/ag/AntMedFs";
import BtnConformWrapper from "../../components/interactive/ag/BtnConformWrapper";
import CPFElement from "../../components/interactive/ag/CPFElement";
import CepElements from "../../components/interactive/ag/CepElements";
import City from "../../components/interactive/ag/City";
import ConfirmDate from "../../components/interactive/def/ConfirmDate";
import ConfirmLocId from "../../components/interactive/def/ConfirmLocId";
import DDDElementPrim from "../../components/interactive/ag/DDDElementPrim";
import DDDElementSec from "../../components/interactive/ag/DDDElementSec";
import Declaration from "../../components/interactive/def/Declaration";
import DivAntFam from "../../components/interactive/ag/DivAntFam";
import Email from "../../components/interactive/ag/Email";
import FamCard from "../../components/interactive/ag/FamCard";
import FamDiab from "../../components/interactive/ag/FamDiab";
import FamDislip from "../../components/interactive/ag/FamDislip";
import FamOnc from "../../components/interactive/ag/FamOnc";
import FamPulm from "../../components/interactive/ag/FamPulm";
import GenDiv from "../../components/interactive/def/GenDiv";
import GenericErrorComponent from "../../components/error/GenericErrorComponent";
import HASDivAdd from "../../components/interactive/ag/HASDivAdd";
import HeaderDate from "../../components/interactive/def/HeaderDate";
import LocComp from "../../components/interactive/ag/LocComp";
import Nac from "../../components/interactive/ag/Nac";
import Name from "../../components/interactive/def/Name";
import Nat from "../../components/interactive/ag/Nat";
import Nbh from "../../components/interactive/ag/Nbh";
import OtherD from "../../components/interactive/ag/OtherD";
import QxPrinc from "../../components/interactive/ag/QxPrinc";
import RadioPair from "../../components/interactive/ag/RadioPair";
import RadioPairDoces from "../../components/interactive/ag/RadioPairDoces";
import SectConfirmBtns from "../../components/interactive/def/SectConfirmBtns";
import Signature from "../../components/interactive/def/Signature";
import SocialName from "../../components/interactive/def/SocialName";
import Street from "../../components/interactive/ag/Street";
import StreetNum from "../../components/interactive/ag/StreetNum";
import SwitchDiv from "../../components/interactive/def/SwitchDiv";
import TelCodePrim from "../../components/interactive/ag/TelCodePrim";
import TelCodeSec from "../../components/interactive/ag/TelCodeSec";
import TelPrim from "../../components/interactive/ag/TelPrim";
import TelSec from "../../components/interactive/ag/TelSec";
import Uf from "../../components/interactive/ag/Uf";
import Watcher from "../../components/interactive/def/Watcher";
const MemoAge = memo(AgeElement),
  MemoLoc = memo(ConfirmLocId);
export const agProps = {
  agIsAutoCorrectOn: true,
};
export default function AGPage(): JSX.Element {
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent message='Error loading form for Anamnesis' />}>
      <div className='pad1pc' id='bgDiv' role='document'>
        <header>
          <div className='flexNoW flexDiv flexAlItT flexSimple flexQ900NoWC' id='hDiv' role='group'>
            <div role='group'>
              <div className='noInvert'>
                <h1 className='bolded flexJBt' id='hForm'>
                  Anamnese Geral
                </h1>
                <h2 className='bolded'>PROSSaúde, UFRJ</h2>
                <AgTipsBtnWrapper />
              </div>
              <SwitchDiv />
            </div>
            <HeaderDate />
          </div>
        </header>
        <main>
          <hr />
          <form
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
                  <Name />
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
                          className='form-select noInvert ssPersist'
                          id='statusPac'
                          name='statusPac-in'
                          data-title='Status Paciente'
                          required>
                          <option value='avaliacao'>Em Avaliação Inicial</option>
                          <option value='tratamento'>Em Tratamento Geral</option>
                          <option value='emergência'>Em Emergência</option>
                          <option value='altaOdontologia'>Alta — Odontologia</option>
                          <option value='altaEducacaoFisica'>Alta — Educação Física</option>
                          <option value='altaNutricao'>Alta — Nutrição</option>
                          <option value='altaOdontologiaEducacaoFisica'>Alta — Odontologia — Educação Física</option>
                          <option value='altaOdontologiaNutricao'>Alta — Odontologia — Nutrição</option>
                          <option value='altaEducacaoFisicaNutricao'>Alta — Educação Física — Nutrição</option>
                          <option value='altaOdontologiaEducacaoFisicaNutricao'>Alta Geral</option>
                        </select>
                      </label>
                    </span>
                  </div>
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
                  <hr />
                </div>
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
                    <span role='textbox'>Número:</span>
                    <span role='group' className='flexDiv spanLoc fitSpaced mg-07t'>
                      <StreetNum />
                      <span role='group' className='halfSpanCheck halfR flexAlItCt noInvert'>
                        <input
                          type='checkbox'
                          name='streetNumNullName'
                          id='streetNumNullId'
                          className='noInvert numNullId form-check-input'
                          role='switch'
                          data-title='switch_num_rua'
                        />
                      </span>
                    </span>
                  </span>
                  <span role='group' className='fsAnamGSpan locSpan form-switch flexColumn noInvert' id='fsAnamGSpan14'>
                    <span role='textbox'>Complemento:</span>
                    <span role='group' className='flexDiv spanLoc fitSpaced mg-07t'>
                      <LocComp />
                      <span role='group' className='halfSpanCheck halfR flexAlItCt noInvert'>
                        <input
                          type='checkbox'
                          name='compNumNullName'
                          id='compNumNullId'
                          className='noInvert numNullId form-check-input'
                          role='switch'
                          data-title='switch_comp_casa'
                        />
                      </span>
                    </span>
                  </span>
                </div>
                <hr />
                <div className='flexDiv fsAnamGDiv alItSt900Q flexQ900NoWC gridTwoCol' id='fsAnamGDiv4' role='group'>
                  <span role='group' className='fsAnamGSpan mgr-3v' id='fsAnamGSpan11'>
                    <label htmlFor='dateBdayId' className='labelIdentif'>
                      Data de Nascimento:
                      <input
                        type='date'
                        name='birth'
                        id='dateBdayId'
                        className='form-control inpIdentif noInvert maxCurrDate'
                        autoComplete='bday'
                        data-title='Nascimento'
                        required
                      />
                    </label>
                  </span>
                  <span role='group' className='fsAnamGSpan' id='fsAnamGSpan12'>
                    <label htmlFor='dateAgeId' className='labelIdentif'>
                      Idade:
                      <MemoAge />
                    </label>
                  </span>
                </div>
                <GenDiv />
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
                    data-title='historia_doencas'></textarea>
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
                  <RadioPair
                    name='hep'
                    fullName='Hepatite ou Outra(s) Doença(s) Hepática(s)'
                    ctx={true}
                    required={true}
                  />
                  <div className='divAdd gridTwoCol' id='divAddHep' role='list'>
                    <span role='listitem' className='cbDoencaSubt'>
                      <input
                        type='checkbox'
                        name='hep_a'
                        id='hepAId'
                        className='cpbOp indivOp opHep'
                        data-title='Hepatite A'
                      />{" "}
                      A
                    </span>
                    <span role='listitem' className='cbDoencaSubt'>
                      <input
                        type='checkbox'
                        name='hep_b'
                        id='hepBId'
                        className='cpbOp indivOp opHep'
                        data-title='Hepatite B'
                      />{" "}
                      B
                    </span>
                    <span role='listitem' className='cbDoencaSubt'>
                      <input
                        type='checkbox'
                        name='hep_c'
                        id='hepCId'
                        className='cpbOp indivOp opHep'
                        data-title='Hepatite C'
                      />{" "}
                      C
                    </span>
                    <span role='listitem' className='cbDoencaSubt'>
                      <input
                        type='checkbox'
                        name='hep_d'
                        id='hepDId'
                        className='cpbOp indivOp opHep'
                        data-title='Hepatite D'
                      />{" "}
                      D
                    </span>
                    <span role='listitem' className='cbDoencaSubt'>
                      <input
                        type='checkbox'
                        name='hep_e'
                        id='hepEId'
                        className='cpbOp indivOp opHep'
                        data-title='Hepatite E'
                      />{" "}
                      E
                    </span>
                    <span role='listitem' className='cbDoencaSubt'>
                      <input
                        type='checkbox'
                        name='hep_indirect'
                        id='hepInfcId'
                        className='cpbOp indivOp opHep'
                        data-title='Hepatite por outras infecções'
                      />{" "}
                      Induzida por Outras Infecções
                    </span>
                    <span role='listitem' className='cbDoencaSubt'>
                      <input
                        type='checkbox'
                        name='hep_imun'
                        id='hepImunId'
                        className='cpbOp indivOp opHep'
                        data-title='Hepatite Autoimune'
                      />{" "}
                      Autoimune
                    </span>
                    <span role='listitem' className='cbDoencaSubt'>
                      <input
                        type='checkbox'
                        name='hep_onc'
                        id='hepOncId'
                        className='cpbOp indivOp opHep'
                        data-title='Hepatite Oncológica'
                      />{" "}
                      Oncológica
                    </span>
                    <span role='listitem' className='cbDoencaSubt'>
                      <input
                        type='checkbox'
                        name='hep_alc'
                        id='hepAlcId'
                        className='cpbOp indivOp opHep'
                        data-title='Hepatite Alcoólica'
                      />{" "}
                      Alcoólica
                    </span>
                    <span role='listitem' className='cbDoencaSubt'>
                      <input
                        type='checkbox'
                        name='hep_tox'
                        id='hepDrgId'
                        className='cpbOp indivOp opHep'
                        data-title='Hepatite por intoxicação'
                      />{" "}
                      Induzida por Toxinas, Medicamentos ou Outra(s) Droga(s)
                    </span>
                  </div>
                  <RadioPair name='diab' fullName='Diabetes' ctx={true} required={true} />
                  <div className='divAdd gridTwoCol' id='divAddDiab' role='list'>
                    <span role='listitem' className='cbDoencaSubt'>
                      <input
                        type='checkbox'
                        name='diab_1'
                        id='diabTipo1Id'
                        className='cpbOp indivOp opDiab opDiabIndiv'
                        data-title='Diabetes tipo 1'
                      />{" "}
                      Tipo 1
                    </span>
                    <span role='listitem' className='cbDoencaSubt'>
                      <input
                        type='checkbox'
                        name='diab_2'
                        id='diabTipo2Id'
                        className='cpbOp indivOp opDiab opDiabIndiv'
                        data-title='Diabetes tipo 2'
                      />{" "}
                      Tipo 2
                    </span>
                    <span role='listitem' className='cbDoencaSubt'>
                      <input
                        type='checkbox'
                        name='diab_gest'
                        id='diabGestId'
                        className='cpbOp indivOp opDiab opDiabIndiv'
                        data-title='Diabetes Gestacional'
                      />{" "}
                      Gestacional
                    </span>
                    <span role='listitem' className='cbDoencaSubt'>
                      <input
                        type='checkbox'
                        name='diab_ins'
                        id='diabInsId'
                        className='cpbOp indivOp opDiab opDiabIndiv'
                        data-title='Diabetes Insipidus'
                      />{" "}
                      Insípido
                    </span>
                    <span role='listitem' className='cbDoencaSubt'>
                      <input
                        type='checkbox'
                        name='diab_lada'
                        id='diabLadaId'
                        className='cpbOp indivOp opDiab opDiabIndiv'
                        data-title='Diabetes LADA'
                      />{" "}
                      LADA
                    </span>
                    <span role='listitem' className='cbDoencaSubt'>
                      <input
                        type='checkbox'
                        name='diab_mody'
                        id='diabModyId'
                        className='cpbOp indivOp opDiab opDiabIndiv'
                        data-title='Diabetes MODY'
                      />{" "}
                      MODY
                    </span>
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
                  <RadioPair name='pb_card' fullName='Problema(s) Cardíaco(s)' add='ta' required={true} />
                  <RadioPair name='pb_ren' fullName='Problema(s) Renal(is)' add='ta' required={true} />
                  <RadioPair name='pb_gast' fullName='Problema(s) Gástrico(s)' add='ta' required={true} />
                  <RadioPair name='pb_resp' fullName='Problema(s) Respiratório(s)' add='ta' required={true} />
                  <RadioPair name='pb_alerg' fullName='Problema(s) Alérgico(s)' add='ta' required={true} />
                  <RadioPair
                    name='pb_art_reum'
                    fullName='Problema(s) Articular(es) ou Reumáticos'
                    add='ta'
                    required={true}
                  />
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
                      {" "}
                      <strong>Nível:</strong>
                      <br role='presentation' />
                      <span role='list' className='cbDoencaSubt' id='spanLvlFumo'>
                        <div role='listitem'>
                          <input
                            type='radio'
                            name='fumo_lvl'
                            id='fumoLeveId'
                            className='radOp radAdd radFumo'
                            data-title='fumo_leve'
                            data-value='leve'
                            data-group='true'
                            data-parent='#spanLvlFumo'
                          />{" "}
                          Leve
                        </div>
                        <div role='listitem'>
                          <input
                            type='radio'
                            name='fumo_lvl'
                            id='fumoModId'
                            className='radOp radAdd radFumo'
                            data-title='fumo_moderado'
                            data-value='moderado'
                            data-group='true'
                            data-parent='#spanLvlFumo'
                          />{" "}
                          Moderado
                        </div>
                        <div role='listitem'>
                          <input
                            type='radio'
                            name='fumo_lvl'
                            id='fumoAltoId'
                            className='radOp radAdd radFumo'
                            data-title='fumo_alto'
                            data-value='alto'
                            data-group='true'
                            data-parent='#spanLvlFumo'
                          />{" "}
                          Alto
                        </div>
                      </span>
                    </span>
                    <span role='list' className='spanSub spanSubFsAnamGRad form-check flexColumn' id='spanFumSubs'>
                      <strong>Substância de Consumo</strong>
                      <div role='listitem'>
                        <input
                          type='checkbox'
                          className='opFumSubs'
                          name='fumo_tab'
                          id='fumIdTab'
                          data-title='Fumo — Consumo de Tabaco'
                        />
                        <label htmlFor='fumIdTab' className='labOpFumSubs' id='labFumTab'>
                          Tabaco
                        </label>
                      </div>
                      <div role='listitem'>
                        <input
                          type='checkbox'
                          className='opFumSubs'
                          name='fumo_can'
                          id='fumIdCan'
                          data-title='Fumo — Consumo de Cannabis'
                        />
                        <label htmlFor='fumIdCan' className='labOpFumSubs' id='labFumCan'>
                          Cannabis
                        </label>
                      </div>
                      <div role='listitem'>
                        <input
                          type='checkbox'
                          className='opFumSubs'
                          name='fumo_other'
                          id='fumIdOther'
                          data-title='Fumo — Consumo de Outras Substâncias'
                        />
                        <label htmlFor='fumIdOther' className='labOpFumSubs' id='labFumOther'>
                          Outros
                        </label>
                      </div>
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
                    />{" "}
                    Atual
                    <input
                      type='checkbox'
                      name='GrvPasName'
                      id='GrvPasId'
                      className='radOp radAdd radGrv'
                      data-title='gravidez_passada'
                    />{" "}
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
                  <RadioPair
                    name='op'
                    fullName='Operação ou Extração de Dente(s)'
                    add='ta'
                    altPh='Qual ou quais Dente(s) Operado(s) e/ou Extraído(s)?'
                    required={true}
                  />
                  <RadioPair name='pb_cic' fullName='Problema(s) com Cicatrização' add='ta' required={true} />
                  <RadioPair name='pb_anst' fullName='Problema(s) com Anestesia(s)' add='ta' required={true} />
                  <RadioPair name='pb_hem' fullName='Problema(s) com Hemorragia' add='ta' required={true} />
                  <RadioPair
                    name='pb_intrn'
                    fullName='Internação Recente'
                    add='ta'
                    altPh='Tempo aproximado de Internação'
                    required={true}
                  />
                  <RadioPair
                    name='pb_med'
                    fullName='Uso Atual de Medicação Controlada'
                    add='ta'
                    altPh='Qual ou quais Medicações Controladas?'
                    required={true}
                  />
                </div>
              </section>
              <hr />
              <fieldset className='sectionMain sectionConfirm noInvert' id='fsAnamGRadODSectId'>
                <legend className='bolded' id='hOD'>
                  Outras Doenças
                </legend>
                <div className='divMain gridThreeCol' id='divOtherD' role='list'>
                  <span role='listem' className='spanMain sectODSpan input-group mb-3' id='spanCand'>
                    <div className='input-group-text' role='group'>
                      <input type='checkbox' name='cand' id='candId' className='radOD' data-title='Candidiase' />
                    </div>
                    <label htmlFor='candId' className='labelOD input-group-text' id='labCand'>
                      Candidíase
                    </label>
                  </span>
                  <span role='listem' className='spanMain sectODSpan input-group mb-3' id='spanGon'>
                    <div className='input-group-text' role='group'>
                      <input type='checkbox' name='gon' id='gonId' className='radOD' data-title='Gonorreia' />
                    </div>
                    <label htmlFor='gonId' className='labelOd input-group-text' id='labGon'>
                      Gonorreia
                    </label>
                  </span>
                  <span role='listem' className='spanMain sectODSpan input-group mb-3' id='spanHerp'>
                    <div className='input-group-text' role='group'>
                      <input type='checkbox' name='herp' id='herpId' className='radOD' data-title='Herpes' />
                    </div>
                    <label htmlFor='herpId' className='labelOd input-group-text' id='labHerp'>
                      Herpes
                    </label>
                  </span>
                  <span role='listem' className='spanMain sectODSpan input-group mb-3' id='spanHerpZ'>
                    <div className='input-group-text' role='group'>
                      <input type='checkbox' name='herp_z' id='herpZId' className='radOD' data-title='Herpes Zoster' />
                    </div>
                    <label htmlFor='herpZId' className='labelOd input-group-text' id='labHerpZ'>
                      Herpes Zoster
                    </label>
                  </span>
                  <span role='listem' className='spanMain sectODSpan input-group mb-3' id='spanPneu'>
                    <div className='input-group-text' role='group'>
                      <input type='checkbox' name='pneumonia' id='pneuId' className='radOD' data-title='Pneumonia' />
                    </div>
                    <label htmlFor='pneuId' className='labelOd input-group-text' id='labPneu'>
                      Pneumonia
                    </label>
                  </span>
                  <span role='listem' className='spanMain sectODSpan input-group mb-3' id='spanSif'>
                    <div className='input-group-text' role='group'>
                      <input type='checkbox' name='sif' id='sifId' className='radOD' data-title='Sífilis' />
                    </div>
                    <label htmlFor='sifId' className='labelOd input-group-text' id='labSif'>
                      Sífilis
                    </label>
                  </span>
                  <span role='listem' className='spanMain sectODSpan input-group mb-3 noExpandRad' id='spanToxop'>
                    <div className='input-group-text' role='group'>
                      <input
                        type='checkbox'
                        name='toxop'
                        id='toxopId'
                        className='radOD noExpandRad'
                        data-title='Toxoplasmose'
                      />
                    </div>
                    <label htmlFor='toxopId' className='labelOd input-group-text' id='labToxop'>
                      Toxoplasmose
                    </label>
                  </span>
                  <span role='listem' className='spanMain sectODSpan input-group mb-3 noExpandRad' id='spanTuberc'>
                    <div className='input-group-text' role='group'>
                      <input
                        type='checkbox'
                        name='tuberc'
                        id='tubercId'
                        className='radOD noExpandRad'
                        data-title='Tuberculose'
                      />
                    </div>
                    <label htmlFor='tubercId' className='labelOd input-group-text' id='labTuberc'>
                      Tuberculose
                    </label>
                  </span>
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
                        <span role='listitem' className='cbDoencaSubt'>
                          <input
                            type='checkbox'
                            name='diabFamTipo1Name'
                            id='diabFamTipo1Id'
                            className='cpbOp famOp opDiab opDiabFam opDiabTypeFam'
                            data-title='familia_diabetes1'
                          />{" "}
                          Tipo 1
                        </span>
                        <span role='listitem' className='cbDoencaSubt'>
                          <input
                            type='checkbox'
                            name='diabFamTipo2Name'
                            id='diabFamTipo2Id'
                            className='cpbOp famOp opDiab opDiabFam opDiabTypeFam'
                            data-title='familia_diabetes2'
                          />{" "}
                          Tipo 2
                        </span>
                        <span role='listitem' className='cbDoencaSubt'>
                          <input
                            type='checkbox'
                            name='diabFamGestName'
                            id='diabFamGestId'
                            className='cpbOp famOp opDiab opDiabFam opDiabTypeFam'
                            data-title='familia_diabetes_gestacional'
                          />{" "}
                          Gestacional
                        </span>
                        <span role='listitem' className='cbDoencaSubt'>
                          <input
                            type='checkbox'
                            name='diabFamInsName'
                            id='diabFamInsId'
                            className='cpbOp famOp opDiab opDiabFam opDiabTypeFam'
                            data-title='familia_diabetes_insipida'
                          />{" "}
                          Insípido
                        </span>
                        <span role='listitem' className='cbDoencaSubt'>
                          <input
                            type='checkbox'
                            name='diabFamLadaName'
                            id='diabFamLadaId'
                            className='cpbOp famOp opDiab opDiabFam opDiabTypeFam'
                            data-title='familia_diabetes_lada'
                          />{" "}
                          LADA
                        </span>
                        <span role='listitem' className='cbDoencaSubt'>
                          <input
                            type='checkbox'
                            name='diabFamModyName'
                            id='diabFamModyId'
                            className='cpbOp famOp opDiab opDiabFam opDiabTypeFam'
                            data-title='familia_diabetes_mody'
                          />{" "}
                          MODY
                        </span>
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
                          <span role='listitem' className='cbDoencaSubt'>
                            <input
                              type='checkbox'
                              name='dislipFamGeralName'
                              id='dislipFamGeralId'
                              className='cpbOp famOp opDislip opDislipFam opDislipTypeFam'
                              data-title='dislip_geral'
                            />{" "}
                            Geral
                          </span>
                          <span role='listitem' className='cbDoencaSubt'>
                            <input
                              type='checkbox'
                              name='dislipFamIsolName'
                              id='dislipFamIsolId'
                              className='cpbOp famOp opDislip opDislipFam opDislipTypeFam'
                              data-title='dislip_isolada'
                            />{" "}
                            Isolada
                          </span>
                          <span role='listitem' className='cbDoencaSubt'>
                            <input
                              type='checkbox'
                              name='dislipFamMixName'
                              id='dislipFamMixId'
                              className='cpbOp famOp opDislip opDislipFam opDislipTypeFam'
                              data-title='dislip_mista'
                            />{" "}
                            Mista | Combinada
                          </span>
                          <span role='listitem' className='cbDoencaSubt'>
                            <input
                              type='checkbox'
                              name='dislipFamHipoName'
                              id='dislipFamHipoId'
                              className='cpbOp famOp opDislip opDislipFam opDislipTypeFam'
                              data-title='dislip_hipoalfa'
                            />{" "}
                            Hipoalfalipoproteinemia
                          </span>
                          <span role='listitem' className='cbDoencaSubt'>
                            <input
                              type='checkbox'
                              name='dislipFamHiperName'
                              id='dislipFamHiperId'
                              className='cpbOp famOp opDislip opDislipFam opDislipTypeFam'
                              data-title='dislip_hipertrig'
                            />{" "}
                            Hipertrigliceridemia
                          </span>
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
                <AntMedFs />
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
                      <option value='1'></option>
                      <option value='2'></option>
                      <option value='3'></option>
                      <option value='4'></option>
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
                      <option value='1'></option>
                      <option value='2'></option>
                      <option value='3'></option>
                      <option value='4'></option>
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
                      Local:
                      <MemoLoc />
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
        </main>
      </div>
      <Watcher routeCase='ag' />
    </ErrorBoundary>
  );
}
export function handleDivAddShow(targ: targEl): void {
  try {
    if (!(targ instanceof HTMLInputElement && (targ.type === "radio" || targ.type === "checkbox")))
      throw elementNotFound(targ, `Validation of Event Current Target`, extLine(new Error()));
    const parentSpan =
      targ.closest(".spanSectAnt") || targ.closest(".input-group") || targ.closest('span[role="group"]');
    if (!(parentSpan instanceof HTMLElement))
      throw elementNotFound(parentSpan, `Validation of Parent Section Span`, extLine(new Error()));
    let divAdd: targEl = parentSpan.nextElementSibling;
    if (!divAdd?.classList.contains(".divAdd")) divAdd = parentSpan.nextElementSibling?.nextElementSibling;
    if (!divAdd?.classList.contains(".divAdd"))
      divAdd = parentSpan.nextElementSibling?.nextElementSibling?.nextElementSibling;
    if (!divAdd?.classList.contains(".divAdd"))
      divAdd = parentSpan.nextElementSibling?.nextElementSibling?.nextElementSibling?.nextElementSibling;
    if (!(divAdd instanceof HTMLElement && (divAdd.classList.contains("divAdd") as boolean)))
      divAdd = document.getElementById(`divAdd${targ.id.replace("ant", "").replace("Id", "")}`) as HTMLDivElement;
    if (!(divAdd instanceof HTMLElement && (divAdd.classList.contains("divAdd") as boolean)))
      throw elementNotFound(divAdd, `Validation of Div Add`, extLine(new Error()));
    if (targ.checked) {
      divAdd.style.display = "grid";
      divAdd.style.opacity = "0.8";
      divAdd.style.minWidth = "70vw";
      for (const radio of [
        ...(divAdd.querySelectorAll('input[type="radio"') as NodeListOf<HTMLInputElement>),
        ...(divAdd.querySelectorAll('input[type="number"]') as NodeListOf<HTMLInputElement>),
        ...(divAdd.querySelectorAll('input[type="date"]') as NodeListOf<HTMLInputElement>),
      ])
        if (radio instanceof HTMLInputElement) radio.dataset.required = "true";
    } else {
      divAdd.style.display = "none";
      divAdd.style.opacity = "0";
      divAdd.style.minWidth = "0";
      for (const radio of [
        ...(divAdd.querySelectorAll('input[type="radio"') as NodeListOf<HTMLInputElement>),
        ...(divAdd.querySelectorAll('input[type="number"]') as NodeListOf<HTMLInputElement>),
        ...(divAdd.querySelectorAll('input[type="date"]') as NodeListOf<HTMLInputElement>),
      ])
        if (radio instanceof HTMLInputElement) delete radio.dataset.required;
    }
  } catch (e) {
    console.error(
      `Error executing callback for ${
        targ instanceof HTMLElement ? targ.id || targ.className || targ.tagName : "undefined target"
      }:\n${(e as Error).message}
      Attempts for divAdd:
      1. ${(targ instanceof HTMLElement && targ.closest(".spanSectAnt")?.id) || "null"}
      2. ${(targ instanceof HTMLElement && targ.closest(".input-group")?.id) || "null"}
      3. ${(targ instanceof HTMLElement && targ.closest('span[role="group"]')?.id) || "null"}
      4. ${
        (targ instanceof HTMLElement &&
          document.getElementById(`divAdd${targ.id.replace("ant", "").replace("Id", "")}`)) ||
        "null"
      }`,
    );
  }
}
