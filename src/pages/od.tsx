import { ErrorBoundary } from "react-error-boundary";
import { memo } from "react";
import TratFs from "../../components/interactive/od/TratFs";
import ConfirmLocId from "../../components/interactive/def/ConfirmLocId";
import Signature from "../../components/interactive/def/Signature";
import Name from "../../components/interactive/def/Name";
import SocialName from "../../components/interactive/def/SocialName";
import HeaderDate from "../../components/interactive/def/HeaderDate";
import ConfirmDate from "../../components/interactive/def/ConfirmDate";
import SectConfirmBtns from "../../components/interactive/def/SectConfirmBtns";
import SwitchDiv from "../../components/interactive/def/SwitchDiv";
import Declaration from "../../components/interactive/def/Declaration";
import Watcher from "../../components/interactive/def/Watcher";
import OdTipsBtnWrapper from "../../components/interactive/od/OdTipsBtnWrapper";
import OdBtnConformWrapper from "../../components/interactive/od/OdBtnConformWrapper";
import InspDlgElements from "../../components/interactive/od/InspDlgElements";
import GenericErrorComponent from "../../components/error/GenericErrorComponent";
import QuadrMainDiv from "../../components/interactive/od/QuadrMainDiv";
import { validateForm } from "@/lib/global/handlers/gHandlers";
import { handleSubmit } from "./api/ts/handlers";

const MemoLoc = memo(ConfirmLocId);
export const odProps = {
  odIsAutoCorrectOn: true,
};

export default function OdPage(): JSX.Element {
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading form for Odontology" />
      )}
    >
      <div role="group" className="pad1pc" id="bgDiv">
        <header>
          <div
            role="group"
            className="flexNoW flexDiv flexAlItT flexSimple flexQ900NoWC"
            id="hDiv"
          >
            <div role="group" id="hTextDiv">
              <div>
                <h1 className="bolded flexJBt" id="hForm">
                  <strong>Exame Clínico: Odontologia</strong>
                </h1>
                <p>
                  <strong>PROSSaúde — UFRJ</strong>
                </p>
              </div>
              <OdTipsBtnWrapper />
            </div>
            <HeaderDate />
          </div>
        </header>
        <main>
          <SwitchDiv />
          <hr />
          <form
            name="od_form"
            action="submit_od_form"
            encType="multipart/form-data"
            method="post"
            target="_top"
            id="formOdont"
            autoComplete="on"
            onSubmit={ev =>
              validateForm(ev.currentTarget).then(validation =>
                validation[0]
                  ? handleSubmit("od", validation[2], true)
                  : ev.preventDefault()
              )
            }
          >
            <fieldset name="fsAnamGName" id="fsAnamGId" className="fsMain">
              <legend id="fsAnamGLeg" className="legMain form-padded">
                Identificação
              </legend>
              <section className="sectionMain" id="fsAnamGSect">
                <div role="group" className="flexQ900NoWC" id="div1_div2flex">
                  <Name />
                  <SocialName />
                </div>
              </section>
              <hr />
            </fieldset>
            <fieldset
              name="fsInspBocFacName"
              id="fsInspBocFacId"
              className="fsMain"
            >
              <legend id="fsInspBocFacLeg" className="legMain inspLeg">
                Inspeção da Boca e da Face
              </legend>
              <InspDlgElements
                count={1}
                ctx="lab"
                fullName="Lábios e Mucosa Labial"
              />
              <InspDlgElements count={2} ctx="jug" fullName="Mucosa Jugal" />
              <InspDlgElements
                count={3}
                ctx="vest"
                fullName="Fundo do Vestíbulo"
              />
              <InspDlgElements count={4} ctx="pltd" fullName="Palato Duro" />
              <InspDlgElements
                count={5}
                ctx="pltm"
                fullName="Palato Mole e Úvula"
              />
              <InspDlgElements count={6} ctx="of" fullName="Orofaringe" />
              <InspDlgElements count={7} ctx="lg" fullName="Língua" />
              <InspDlgElements
                count={8}
                ctx="asb"
                fullName="Assoalho da Boca"
              />
              <InspDlgElements
                count={9}
                ctx="mast"
                fullName="Músculos da Mastigação — Palpação"
              />
              <InspDlgElements
                count={10}
                ctx="peri"
                fullName="Gengiva Marginal e Inserida (Periodonto)"
              />
            </fieldset>
            <hr />
            <fieldset name="fsAvDentName" id="fsAvDentId" className="fsMain">
              <legend className="legMain" id="fsAvDentLeg">
                <span className="mgr-1v bolded">Avaliação Dentária</span>
              </legend>
              <section
                className="sectionMain"
                id="sectAvDentId"
                itemScope
                itemProp="dentComp"
              >
                <QuadrMainDiv qr="SupDir" />
                <QuadrMainDiv qr="InfEsq" />
                <QuadrMainDiv qr="SupEsq" />
                <QuadrMainDiv qr="InfDir" />
              </section>
            </fieldset>
            <hr />
            <fieldset
              name="fsPlanName"
              id="fsPlanId"
              className="fsMain noInvert"
            >
              <legend className="legMain">Plano de Tratamento</legend>
              <textarea
                name="taPlanName"
                id="taPlanId"
                className="taPlan form-control"
                placeholder="Escreva o Plano de Tratamento aqui"
                data-title="Plano de Tratamento"
                required
              ></textarea>
            </fieldset>
            <br role="presentation" />
            <hr />
            <TratFs />
            <fieldset
              name="fsConfirmName"
              id="fsConfirmId"
              className="fsMain form-padded"
            >
              <section
                className="sectionMain sectionConfirm"
                id="sectConfirmCheck"
              >
                <Declaration text="&#34;DECLARO QUE CONCORDO COM OS TRATAMENTOS PROPOSTOS ACIMA&#34;" />
                <div className="divMain" id="divConfirm" role="group">
                  <OdBtnConformWrapper />
                  <div
                    className="divSub flexEl divConfirm flexQ900NoW"
                    id="divConfirm2"
                    role="group"
                  >
                    <label
                      htmlFor="confirmLocId"
                      className="labConfirm labDivConfirm2 pdT2pc900Q htFull900Q flexNoWC bolded widHalf900Q noInvert"
                      id="labConfirmLoc"
                    >
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
              <br role="presentation" />
              <SectConfirmBtns />
              <hr />
            </fieldset>
          </form>
        </main>
      </div>
      <Watcher routeCase="od" />
    </ErrorBoundary>
  );
}
