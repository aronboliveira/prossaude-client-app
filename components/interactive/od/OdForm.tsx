"use client";
import { nlFm, quadrCases } from "@/lib/global/declarations/types";
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
import { registerPersistInputs, validateForm } from "@/lib/global/handlers/gHandlers";
import { handleSubmit } from "@/lib/global/data-service";
import InspDlgElements from "./InspDlgElements";
import { useRef, useEffect } from "react";
import useDataProvider from "@/lib/hooks/useDataProvider";
import { odProps } from "@/vars";
import { toast } from "react-hot-toast";
export default function OdForm(): JSX.Element {
  const f = useRef<nlFm>(null),
    toasted = useRef<boolean>(false);
  useEffect(() => {
    registerPersistInputs({
      f: f.current,
      textareas: true,
      selects: true,
      inputTypes: ["date", "number", "text", "checkbox", "radio"],
      queriesToExclude: ['[role="switch"]'],
    });
  }, []);
  useEffect(() => {
    odProps.odIsAutoCorrectOn = true;
    return (): void => {
      odProps.odIsAutoCorrectOn = true;
    };
  }, []);
  useEffect(() => {
    if (!toasted.current)
      toast(t => (
        <fieldset style={{ lineHeight: "1.6rem" }}>
          <b>Dica!</b>
          <hr />
          <span>Você pode desativar ou ativar</span>
          <br />a Autocorreção nos alternadores.
          <br />
          <span>Arraste os quadrantes para movê-los!</span>
          <hr />
          <button
            style={{ height: "2.1rem", fontSize: "0.8rem" }}
            className='btn btn-secondary'
            onClick={() => toast.dismiss(t.id)}>
            Fechar
          </button>
        </fieldset>
      ));
    toasted.current = true;
    const untoast = (): void => toast.dismiss();
    addEventListener("popstate", untoast);
    return (): void => removeEventListener("popstate", untoast);
  }, []);
  useDataProvider(f.current);
  return (
    <form
      ref={f}
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
        <legend id='fsAnamGLeg' className='legMain formPadded'>
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
          <span className='mgr__1v bolded'>Avaliação Dentária</span>
        </legend>
        <section className='sectionMain' id='sectAvDentId' itemScope>
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
      <fieldset name='fsConfirmName' id='fsConfirmId' className='fsMain formPadded'>
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
