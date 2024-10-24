"use client";
import { lazy } from "react";
import TrioReadNumCons from "./TrioReadNumCons";
import FormCalcTmbType from "./client/FormCalcTmbType";
import GordCorpLvl from "./client/GordCorpLvl";
import NafType from "./client/NafType";
import SelFactorAtleta from "./client/SelFactorAtleta";
import SelectNumCons from "./client/SelectNumCons";
import TextBodyType from "./client/TextBodyType";
import LockTabInd from "./tabs/LobTackInd";
import { Suspense } from "react";
import ReactSpinner from "../../icons/ReactSpinner";
const FsTabs = lazy(() => import("./FsTabs"));
export default function FsProgCons(): JSX.Element {
  return (
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
      <Suspense fallback={<ReactSpinner scale={0.5} />}>
        <FsTabs />
      </Suspense>
    </fieldset>
  );
}
