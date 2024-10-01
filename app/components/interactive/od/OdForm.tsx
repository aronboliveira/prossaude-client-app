"use client";
import { quadrCases } from "@/lib/global/declarations/types";
import ConfirmDate from "../def/ConfirmDate";
import ConfirmLocId from "../def/ConfirmLocId";
import Declaration from "../def/Declaration";
import SectConfirmBtns from "../def/SectConfirmBtns";
import Signature from "../def/Signature";
import OdBtnConformWrapper from "./OdBtnConformWrapper";
import QuadrMainDiv from "./QuadrMainDiv";
import TratFs from "./TratFs";
import SocialName from "../def/SocialName";
import Name from "../def/Name";
import { validateForm } from "@/lib/global/handlers/gHandlers";
import { handleSubmit } from "@/lib/locals/panelPage/handlers/handlers";
import InspDlgElements from "./InspDlgElements";
export default function OdForm(): JSX.Element {
  return (
    <form
      name='od_form'
      action='submit_od_form'
      data-ep='od'
      encType='multipart/form-data'
      method='post'
      target='_top'
      id='formOdont'
      autoComplete='on'
      onSubmit={ev =>
        validateForm(ev).then(validation =>
          validation[0] ? handleSubmit("od", validation[2], true) : ev.preventDefault(),
        )
      }>
      <fieldset name='fsAnamGName' id='fsAnamGId' className='fsMain'>
        <legend id='fsAnamGLeg' className='legMain form-padded'>
          Identificação
        </legend>
        <section className='sectionMain' id='fsAnamGSect'>
          <div role='group' className='flexQ900NoWC' id='div1_div2flex'>
            <Name />
            <SocialName />
          </div>
        </section>
        <hr />
      </fieldset>
      <fieldset name='fsInspBocFacName' id='fsInspBocFacId' className='fsMain'>
        <legend id='fsInspBocFacLeg' className='legMain inspLeg'>
          Inspeção da Boca e da Face
        </legend>
        {[
          { ctx: "lab", fullName: "Lábios e Mucosa Labial" },
          { ctx: "jug", fullName: "Mucosa Jugal" },
          { ctx: "vest", fullName: "Fundo do Vestíbulo" },
          { ctx: "pltd", fullName: "Palato Duro" },
          { ctx: "pltm", fullName: "Palato Mole e Úvula" },
          { ctx: "of", fullName: "Orofaringe" },
          { ctx: "lg", fullName: "Língua" },
          { ctx: "asb", fullName: "Assoalho da Boca" },
          { ctx: "mast", fullName: "Músculos da Mastigação — Palpação" },
          { ctx: "peri", fullName: "Gengiva Marginal e Inserida (Periodonto)" },
        ].map(({ ctx, fullName }, i) => (
          <InspDlgElements key={i} count={i + 1} ctx={ctx as any} fullName={fullName} />
        ))}
      </fieldset>
      <hr />
      <fieldset name='fsAvDentName' id='fsAvDentId' className='fsMain'>
        <legend className='legMain' id='fsAvDentLeg'>
          <span className='mgr-1v bolded'>Avaliação Dentária</span>
        </legend>
        <section className='sectionMain' id='sectAvDentId' itemScope itemProp='dentComp'>
          {["SupDir", "InfEsq", "SupEsq", "InfDir"].map((qr, i) => (
            <QuadrMainDiv qr={qr as quadrCases} key={`qr__${i}`} />
          ))}
        </section>
      </fieldset>
      <hr />
      <fieldset name='fsPlanName' id='fsPlanId' className='fsMain noInvert'>
        <legend className='legMain'>Plano de Tratamento</legend>
        <textarea
          name='taPlanName'
          id='taPlanId'
          className='taPlan form-control'
          placeholder='Escreva o Plano de Tratamento aqui'
          data-title='Plano de Tratamento'
          required></textarea>
      </fieldset>
      <br role='presentation' />
      <hr />
      <TratFs />
      <fieldset name='fsConfirmName' id='fsConfirmId' className='fsMain form-padded'>
        <section className='sectionMain sectionConfirm' id='sectConfirmCheck'>
          <Declaration text='&#34;DECLARO QUE CONCORDO COM OS TRATAMENTOS PROPOSTOS ACIMA&#34;' />
          <div className='divMain' id='divConfirm' role='group'>
            <OdBtnConformWrapper />
            <div className='divSub flexEl divConfirm flexQ900NoW' id='divConfirm2' role='group'>
              <label
                htmlFor='confirmLocId'
                className='labConfirm labDivConfirm2 pdT2pc900Q htFull900Q flexNoWC bolded widHalf900Q noInvert'
                id='labConfirmLoc'>
                Local:
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
