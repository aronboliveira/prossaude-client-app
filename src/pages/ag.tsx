import { ErrorBoundary } from "react-error-boundary";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { Suspense, lazy } from "react";
import { targEl } from "@/lib/global/declarations/types";
import AgTipsBtnWrapper from "../../components/interactive/ag/AgTipsBtnWrapper";
import GenericErrorComponent from "../../components/error/GenericErrorComponent";
import HeaderDate from "../../components/interactive/def/HeaderDate";
import Watcher from "../../components/interactive/def/Watcher";
import SwitchDiv from "../../components/interactive/def/SwitchDiv";
import Spinner from "../../components/icons/Spinner";
const Form = lazy(() => import("../../components/interactive/ag/AgForm"));
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
          <Suspense fallback={<Spinner fs={true} />}>
            <Form />
          </Suspense>
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
