"use client";
import { alignOpts, birthRelations, gens, person, transOpts } from "@/vars";
import { useContext, useEffect, useCallback, useMemo } from "react";
import { extLine, inputNotFound } from "@/lib/global/handlers/errorHandler";
import { nlInp } from "@/lib/global/declarations/types";
import { AlignType, BirthRelation, Gender, TransitionLevel } from "@/lib/global/declarations/testVars";
import { ENCtx } from "../edfis/client/ENForm";
import { ENCtxProps } from "@/lib/global/declarations/interfaces";
import useGenDiv from "@/lib/hooks/useGenDiv";
import { handleGenRender } from "@/lib/locals/edFisNutPage/edFisNutReactHandlers";
import { GenDivProps } from "@/lib/global/declarations/interfacesCons";
import { checkContext } from "@/lib/global/gModel";
import sEn from "@/styles/locals/modules/enStyles.module.scss";
export default function GenDivEN({ genRef, genAlinRef }: GenDivProps): JSX.Element {
  const {
      refs: { txbr, gbr },
    } = useContext<ENCtxProps>(ENCtx),
    {
      refs: { r, gtr },
      values: { gen, genBirthRel, genTrans, genFisAlin },
      setters: { setGen, setGenBirthRel, setGenTrans, setGenFisAlin, setTextBodytype },
    } = useGenDiv({}),
    memoizedResult = useMemo(
      () =>
        (gt: HTMLSelectElement | HTMLInputElement, ga: HTMLSelectElement | HTMLInputElement, selectedGen: Gender) => {
          const tbt = (txbr?.current ?? document.getElementById("textBodytype")) as nlInp;
          if ((gt.value !== "avancado" || selectedGen === "naoBinario") && !gt.hidden && !ga.hidden && tbt)
            return person.gen as Gender;
          else {
            inputNotFound(tbt, "textBodyType in callback for gender elements", extLine(new Error()));
            return "masculino";
          }
        },
      [txbr],
    ),
    handleGENCtx = useCallback(
      ({ gt, ga, selectedGen }: { gt: HTMLSelectElement; ga: HTMLSelectElement; selectedGen: string }) => {
        const res = memoizedResult(gt, ga, selectedGen as Gender);
        if (res) {
          const tbt = (txbr?.current ?? document.getElementById("textBodytype")) as nlInp;
          if (tbt) tbt.value = res;
          setTextBodytype(res);
        }
      },
      [setTextBodytype, txbr, memoizedResult],
    ),
    handleGenUpdate = useCallback(() => {
      const g = genRef?.current ?? (document.getElementById("genId") as HTMLSelectElement),
        gb = gbr?.current ?? (document.getElementById("genBirthRelId") as HTMLSelectElement),
        gt = gtr.current ?? (document.getElementById("genTransId") as HTMLSelectElement),
        ga = genAlinRef?.current ?? (document.getElementById("genFisAlinId") as HTMLSelectElement);
      handleGenRender({ g, gb, gt, ga, setGen, selectedGen: gen, setGenFisAlin });
    }, [gen, genRef, gbr, gtr, genAlinRef, setGen, setGenFisAlin]),
    handlePersonGenUpdate = useCallback(() => {
      const gt = gtr.current ?? (document.getElementById("genTransId") as HTMLSelectElement),
        ga = genAlinRef?.current ?? (document.getElementById("genFisAlinId") as HTMLSelectElement);
      handleGENCtx({ gt, ga, selectedGen: gen });
    }, [gtr, genFisAlin, gen, genAlinRef, handleGENCtx]);
  //TODO REMOVER APÓS TESTE
  const ctx = useContext(ENCtx);
  checkContext(ctx, "ENCtx", GenDivEN);
  useEffect(() => {
    if (/edfis/gi.test(location.pathname) || document.body.id.toLowerCase() === "edfisnutbody") {
      const genElement = genRef?.current ?? document.getElementById("genId");
      person.gen =
        genElement instanceof HTMLSelectElement ||
        genElement instanceof HTMLInputElement ||
        genElement instanceof HTMLTextAreaElement
          ? (genElement.value as Gender)
          : "masculino";
    }
  }, [genRef]);
  useEffect(handleGenUpdate, [gen, handleGenUpdate, genBirthRel, genTrans, genFisAlin]);
  useEffect(handlePersonGenUpdate, [person.gen, handlePersonGenUpdate]);
  return (
    <div
      className={`noInvert ${sEn.genDivEn}`}
      id='genDiv'
      role='group'
      ref={r}
      style={{ width: "100%", columnGap: "0" }}>
      <span role='group' className='fsAnamGSpan flexAlItCt genSpan' id='spanFsAnamG13'>
        <label htmlFor='genId' className='labelIdentif'>
          Gênero:
          <select
            ref={genRef}
            id='genId'
            className={`form-select inpIdentif noInvert min88_900 ${sEn.select} ${sEn.gEn}`}
            data-title='genero'
            data-xls='Gênero'
            required
            value={gen}
            onChange={ev => setGen(ev.currentTarget.value as Gender)}>
            {gens.map(({ v, l }, i) => (
              <option key={`gender__${i}`} value={v} className='genderOpt'>
                {l}
              </option>
            ))}
          </select>
        </label>
        <br role='presentation' />
      </span>
      <span role='group' className='fsAnamGSpan flexAlItCt genSpan' id='spanFsAnamG14'>
        <label htmlFor='genBirthRelId' className='labelIdentif'>
          Identidade de gênero:
          <select
            ref={gbr}
            id='genBirthRelId'
            className={`form-select inpIdentif noInvert min88_900 ${sEn.select} ${sEn.gbEn}`}
            required
            value={genBirthRel}
            onChange={ev => setGenBirthRel(ev.target.value as BirthRelation)}>
            {birthRelations.map(b => (
              <option key={`br___${b.v}`} value={b.v} className='birthRelationOpt'>
                {b.l}
              </option>
            ))}
          </select>
        </label>
        <br role='presentation' />
      </span>
      <span role='group' className='fsAnamGSpan flexAlItCt genSpan' id='spanFsAnamG15' hidden>
        <label htmlFor='genTransId' className='labelIdentif'>
          Estágio da Transição Hormonal:
          <select
            ref={gtr}
            id='genTransId'
            className={`form-select inpIdentif noInvert min88_900 ${sEn.select}`}
            value={genTrans}
            onChange={ev => setGenTrans(ev.target.value as TransitionLevel)}>
            {transOpts.map((o, i) => (
              <option key={`trans_lvl__${i}`} value={o.v} className='transOpt'>
                {o.l}
              </option>
            ))}
          </select>
        </label>
        <br role='presentation' />
      </span>
      <span role='group' className='fsAnamGSpan flexAlItCt genSpan' id='spanFsAnamG16' hidden>
        <label htmlFor='genFisAlinId' className={`labelIdentif ${sEn.labGa}`}>
          Alinhamento físico:
          <select
            ref={genAlinRef}
            id='genFisAlinId'
            className={`form-select inpIdentif noInvert min88_900 ${sEn.select}`}
            value={genFisAlin}
            onChange={ev => setGenFisAlin(ev.target.value as AlignType)}>
            {alignOpts.map(a => (
              <option key={`align__${a.v}`} value={a.v} className='alignOpt'>
                {a.l}
              </option>
            ))}
          </select>
        </label>
        <br role='presentation' />
      </span>
    </div>
  );
}
