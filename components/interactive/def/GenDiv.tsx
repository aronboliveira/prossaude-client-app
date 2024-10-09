"use client";
import { fluxGen } from "@/lib/global/gModel";
import { person } from "@/vars";
import { useEffect } from "react";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { AlignType, BirthRelation, Gender, TransitionLevel } from "@/lib/tests/testVars";
import { GenDivProps } from "@/lib/global/declarations/interfacesCons";
import useGenDiv from "@/lib/hooks/useGenDiv";
import useResetPerson from "@/lib/hooks/useResetPerson";
export default function GenDiv({ onSetGen, genRef, genBirthRef }: GenDivProps): JSX.Element {
  const {
    refs: { r, gr, gbr, gtr, gar },
    values: { gen, genBirthRel, genTrans, genFisAlin },
    setters: { setGen, setGenBirthRel, setGenTrans, setGenFisAlin },
  } = useGenDiv({ onSetGen, genRef, genBirthRef });
  useResetPerson();
  useEffect(() => {
    try {
      const agBody = document.getElementById("agBody");
      if (agBody instanceof HTMLElement) {
        const agGenElement = gr.current ?? gr.current ?? document.getElementById("genId");
        if (
          agGenElement instanceof HTMLInputElement ||
          agGenElement instanceof HTMLTextAreaElement ||
          agGenElement instanceof HTMLSelectElement
        ) {
          person.gen = agGenElement.value;
          onSetGen && onSetGen(() => person.gen as Gender);
        } else elementNotFound(agGenElement, "instance of agGenElement for DOM initialization", extLine(new Error()));
      }
    } catch (e) {
      console.error(`Error executing procedure for agBody:\n${(e as Error).message}`);
    }
  }, [onSetGen]);
  useEffect(() => {
    const g = gr.current ?? (document.getElementById("genId") as HTMLSelectElement),
      gb = gbr.current ?? (document.getElementById("genBirthRelId") as HTMLSelectElement),
      gt = gtr.current ?? (document.getElementById("genTransId") as HTMLSelectElement),
      ga = gar.current ?? (document.getElementById("genFisAlinId") as HTMLSelectElement);
    fluxGen({ g, gb, gt, ga }, g.value, setGenFisAlin);
  }, [fluxGen]);
  useEffect(() => {
    const handleResize = (): void => {
      if (gbr.current instanceof HTMLElement && gtr.current instanceof HTMLElement) {
        try {
          gtr.current.style.maxWidth = getComputedStyle(gbr.current).width;
        } catch (e) {
          console.error(
            `Error executing equalization of widths for gender transition element:\n${(e as Error).message}`,
          );
        }
      }
    };
    handleResize();
    addEventListener("resize", handleResize);
    return (): void => removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const handleResize = (): void => {
      if (!(gar.current instanceof HTMLElement && gr.current instanceof HTMLElement)) return;
      gar.current.style.width = getComputedStyle(gr.current).width;
      gar.current.style.maxWidth = getComputedStyle(gr.current).width;
    };
    try {
      if (!(r.current instanceof HTMLElement))
        throw elementNotFound(r.current, `Validation of Gen Div Reference`, extLine(new Error()));
      if (!r.current.dataset.equalizing || r.current.dataset.equalizing !== "true") {
        addEventListener("resize", handleResize);
        document.body.dataset.equalizing = "true";
        handleResize();
      }
    } catch (e) {
      console.error(`Error executing addition of resizing listener to GenDiv:\n${(e as Error).message}`);
    }
    (): void => removeEventListener("resize", handleResize);
  }, [r]);
  useEffect(() => {
    if (genRef && gr.current) genRef.current = gr.current;
  }, [genRef, gr]);
  useEffect(() => {
    if (genBirthRef && gr.current) genBirthRef.current = gr.current;
  }, [genBirthRef, gr]);
  return (
    <div className='gridTwoCol noInvert' id='genDiv' role='group' ref={r}>
      <span role='group' className='fsAnamGSpan flexAlItCt genSpan' id='spanFsAnamG13'>
        <label htmlFor='genId' className='labelIdentif'>
          Gênero:
          <select
            ref={gr}
            id='genId'
            className='form-select inpIdentif noInvert'
            data-title='genero'
            data-xls='Gênero'
            required
            value={gen}
            onChange={ev => {
              const selectedGen = ev.target.value;
              setGen(() => selectedGen);
              try {
                const gb = gbr.current ?? (document.getElementById("genBirthRelId") as HTMLSelectElement),
                  gt = gtr.current ?? (document.getElementById("genTransId") as HTMLSelectElement),
                  ga = gar.current ?? (document.getElementById("genFisAlinId") as HTMLSelectElement);
                person.gen = fluxGen({ g: ev.target, gb, gt, ga }, selectedGen, setGenFisAlin) || "masculino";
                onSetGen && onSetGen(() => person.gen as Gender);
              } catch (e) {
                console.error(`Error executing callback for Gen Elements:\n${(e as Error).message}`);
              }
            }}>
            <option value='masculino'>Masculino | Homem binário</option>
            <option value='feminino'>Feminino | Mulher binária</option>
            <option value='naoBinario'>Não-Binário</option>
            <option value='outros'>Outros</option>
            <option value='undefined'>Não deseja declarar</option>
          </select>
        </label>
        <br role='presentation' />
      </span>
      <span role='group' className='fsAnamGSpan flexAlItCt genSpan' id='spanFsAnamG14'>
        <label htmlFor='genBirthRelId' className='labelIdentif'>
          Identidade em relação ao gênero designado na nascença:
          <select
            ref={gbr}
            id='genBirthRelId'
            className='form-select inpIdentif noInvert'
            required
            value={genBirthRel}
            onChange={ev => {
              setGenBirthRel(ev.target.value as BirthRelation);
              const g = gr.current ?? (document.getElementById("genId") as HTMLSelectElement),
                gt = gtr.current ?? (document.getElementById("genTransId") as HTMLSelectElement),
                ga = gar.current ?? (document.getElementById("genFisAlinId") as HTMLSelectElement);
              person.gen = fluxGen({ g, gb: ev.target, gt, ga }, g.value, setGenFisAlin) || "masculino";
              onSetGen && onSetGen(() => person.gen as Gender);
            }}>
            <option value='cis'>Cisgênero | Cissexual</option>
            <option value='trans'>Transgênero | Transsexual</option>
            <option value='outros'>Outros</option>
            <option value='undefined'>Não deseja declarar</option>
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
            className='form-select inpIdentif noInvert'
            value={genTrans}
            onChange={ev => {
              setGenTrans(ev.target.value as TransitionLevel);
              const g = gr.current ?? (document.getElementById("genId") as HTMLSelectElement),
                gb = gbr.current ?? (document.getElementById("genBirthRelId") as HTMLSelectElement),
                ga = gar.current ?? (document.getElementById("genFisAlinId") as HTMLSelectElement);
              person.gen = fluxGen({ g, gb, gt: ev.target, ga }, g.value, setGenFisAlin) || "masculino";
              onSetGen && onSetGen(() => person.gen as Gender);
            }}>
            <option value='avancado'>Avançado</option>
            <option value='undefined'>Indefinido</option>
            <option value='no'>Não está em transição</option>
            <option value='inicial'>Inicial</option>
            <option value='intermediario'>Intermediário</option>
          </select>
        </label>
        <br role='presentation' />
      </span>
      <span role='group' className='fsAnamGSpan flexAlItCt genSpan' id='spanFsAnamG16' hidden>
        <label htmlFor='genFisAlinId' className='labelIdentif'>
          Alinhamento de características físicas predominante:
          <select
            ref={gar}
            id='genFisAlinId'
            className='form-select inpIdentif noInvert'
            value={genFisAlin}
            onChange={ev => {
              const selectedGenFisAlin = ev.target.value;
              setGenFisAlin(selectedGenFisAlin as AlignType);
              const g = gr.current ?? (document.getElementById("genId") as HTMLSelectElement),
                gb = gbr.current ?? (document.getElementById("genBirthRelId") as HTMLSelectElement),
                gt = gtr.current ?? (document.getElementById("genTransId") as HTMLSelectElement);
              person.gen = fluxGen({ g, gb, gt, ga: ev.target }, g.value, setGenFisAlin) || "masculino";
              onSetGen && onSetGen(() => person.gen as Gender);
            }}>
            <option value='masculinizado'>Masculinizado</option>
            <option value='feminilizado'>Feminilizado</option>
            <option value='neutro'>Indeterminado | Neutro</option>
          </select>
        </label>
        <br role='presentation' />
      </span>
    </div>
  );
}
