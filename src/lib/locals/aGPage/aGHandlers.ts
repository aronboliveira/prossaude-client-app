//nesse file estão presentes principalmente as funções de manipulação dinâmica de texto e layout
import { autoCapitalizeInputs, checkAutoCorrect } from "../../global/gModel";
import { targEl, targEv } from "../../global/declarations/types";
import { useCurrentDate } from "../../global/handlers/gHandlers";
export function searchCEPXML(cepElement: targEl): number {
  let initTime = Date.now(),
    reqAcc = 2,
    statusNum = 0;
  if (cepElement instanceof HTMLInputElement) {
    const progInts = displayCEPLoadBar(cepElement) ?? [0, 100, null];
    const [progMax, progValue, progBar] = progInts;
    const cepHifenOutValue = cepElement.value?.replaceAll("-", "") ?? "";
    const xmlReq1 = new XMLHttpRequest();
    xmlReq1.open("GET", `https://brasilapi.com.br/api/cep/v2/${cepHifenOutValue}`);
    xmlReq1.send();
    xmlReq1.onload = (): void => {
      statusNum = loadCEPXML(xmlReq1, reqAcc);
      if (statusNum === 200) {
        progBar && progMax && uploadCEPLoadBar(cepElement, progBar, initTime, progMax, progValue);
      } else {
        reqAcc--;
        initTime = Date.now();
        const xmlReq2 = new XMLHttpRequest();
        xmlReq2.open("GET", `https://brasilapi.com.br/api/cep/v1/${cepHifenOutValue}`);
        xmlReq2.send();
        xmlReq2.onload = (): void => {
          statusNum = loadCEPXML(xmlReq2, reqAcc);
          if (statusNum === 200)
            progBar && progMax && uploadCEPLoadBar(cepElement, progBar, initTime, progMax, progValue);
          else progBar && progMax && uploadCEPLoadBar(cepElement, progBar, initTime, progMax, progValue);
        };
      }
    };
  }
  return statusNum;
}
export function loadCEPXML(xmlReq: XMLHttpRequest = new XMLHttpRequest(), reqAcc: number = 1): number {
  try {
    if (xmlReq instanceof XMLHttpRequest && typeof reqAcc === "number") {
      const parsedAddress = JSON.parse(xmlReq.response);
      if (xmlReq.status === 200 && parsedAddress) {
        const uf = document.getElementById("UFId");
        const city = document.getElementById("cityId");
        const neighborhood = document.getElementById("neighbourhoodId");
        const street = document.getElementById("streetId");
        if (uf instanceof HTMLInputElement) uf.value = parsedAddress.state;
        if (city instanceof HTMLInputElement) city.value = parsedAddress.city;
        if (neighborhood instanceof HTMLInputElement) neighborhood.value = parsedAddress.neighborhood;
        if (street instanceof HTMLInputElement) street.value = parsedAddress.street;
      } else if (!xmlReq.status.toString().match(/^2/)) throw new Error(`Invalid status: ${xmlReq.status}`);
      else throw new Error(`Status not recognized.`);
    } else
      throw new Error(`Error on the values entry.
      Obtained values: ${JSON.stringify(xmlReq) || null}, ${reqAcc}`);
  } catch (loadError) {
    return xmlReq?.status || 404;
  }
  return xmlReq.status;
}
export async function searchCEP(cepElement: targEl): Promise<string> {
  let status = 404;
  try {
    const initTime = Date.now();
    if (!(cepElement instanceof HTMLInputElement)) return "fail";
    const progInts = displayCEPLoadBar(cepElement) ?? [0, 100, null];
    const [progMax, progValue, progBar] = progInts;
    const cepHifenOutValue = cepElement.value?.replaceAll("-", "") ?? "";
    try {
      const res = await Promise.any(
        [
          `https://brasilapi.com.br/api/cep/v2/${cepHifenOutValue}`,
          `https://brasilapi.com.br/api/cep/v1/${cepHifenOutValue}`,
        ].map(makeCEPRequest),
      );
      if (res.ok) {
        loadCEP(res);
        progBar && progMax && uploadCEPLoadBar(cepElement, progBar, initTime, progMax, progValue);
        return "success";
      } else {
        progBar && progMax && uploadCEPLoadBar(cepElement, progBar, initTime, progMax, progValue);
        status = res.status;
      }
    } catch (error) {
      if (document.getElementById("divCEPWarn")) {
        document.getElementById("divCEPWarn")!.textContent =
          "*Erro carregando informações a partir de CEP. \n Inclua manualmente";
        setTimeout(() => (document.getElementById("divCEPWarn")!.textContent = ""), 3000);
      }
      progBar && progMax && uploadCEPLoadBar(cepElement, progBar, initTime, progMax, progValue);
    }
  } catch (err) {
    return `${status}`;
  }
  return `${status}`;
}
export async function makeCEPRequest(url: string): Promise<Response> {
  const response = await fetch(url);
  try {
    if (!response.ok) throw new Error(`Error in CEP request. Status: ${response.status}`);
  } catch (error) {
    return response;
  }
  return response;
}
export async function loadCEP(res: Response): Promise<any> {
  try {
    if (res instanceof Response) {
      const parsedAddress = await res.json();
      if (res.ok && parsedAddress) {
        const uf = document.getElementById("UFId");
        const city = document.getElementById("cityId");
        const neighborhood = document.getElementById("neighbourhoodId");
        const street = document.getElementById("streetId");
        if (uf instanceof HTMLInputElement) uf.value = parsedAddress.state;
        if (city instanceof HTMLInputElement) city.value = parsedAddress.city;
        if (neighborhood instanceof HTMLInputElement) neighborhood.value = parsedAddress.neighborhood;
        if (street instanceof HTMLInputElement) street.value = parsedAddress.street;
        return parsedAddress;
      } else if (!res.status.toString().match(/^2/)) throw new Error(`Invalid status: ${res.status}`);
      else throw new Error(`Status not recognized.`);
    } else
      throw new Error(`Error on the values entry.
      Obtained values: ${JSON.stringify(res) || null}`);
  } catch (loadError) {
    return res.status || 404;
  }
}
export function displayCEPLoadBar(cepElement: targEl): [number, number, HTMLProgressElement] {
  const progressBar = document.createElement("progress");
  if (cepElement instanceof HTMLInputElement) {
    document.getElementById("divProgCEP")?.append(progressBar);
    Object.assign(progressBar, {
      id: "loadBarCepVars",
      max: 100,
      value: 0,
      style: { backgroundColor: "blue", color: "white" },
      width: cepElement.width,
    });
  }
  return [progressBar.max, progressBar.value, progressBar];
}
export function uploadCEPLoadBar(
  cepElement: targEl,
  progressBar: targEl = new HTMLProgressElement(),
  initTime: number = 0,
  progMaxInt: number = 100,
  progValueInt: number = 0,
): void {
  if (
    cepElement instanceof HTMLInputElement &&
    progressBar instanceof HTMLProgressElement &&
    typeof initTime === `number` &&
    typeof progMaxInt === `number` &&
    typeof progValueInt === `number`
  ) {
    const elapsedTime = Date.now() - initTime;
    const elapsedNDec = elapsedTime.toString().length - 1;
    const addedZerosMult = Array.from({ length: elapsedNDec }, () => "0").reduce((acc, curr) => acc + curr, "1");
    const indNDec = 1 * parseInt(addedZerosMult);
    const roundedElapsed = Math.round(elapsedTime / indNDec) * indNDec;
    if (progValueInt !== progMaxInt) {
      const loadingEvent = setInterval(() => {
        progValueInt += 5;
        progressBar.value = progValueInt;
        if (progValueInt === progMaxInt) clearInterval(loadingEvent);
      }, roundedElapsed / 20);
    }
    setTimeout(() => {
      document.getElementById("divProgCEP")?.removeChild(progressBar);
      document.getElementById("divProgCEP")!.style.minHeight = "1rem";
      document.getElementById("divProgCEP")!.style.height = "1rem";
    }, roundedElapsed);
  }
}
export function enableCEPBtn(cepBtn: targEl, cepLength: number = 0): boolean {
  let isCepElemenBtnOn = false;
  if (cepBtn instanceof HTMLButtonElement && typeof cepLength === "number") {
    if (cepLength === 9) {
      cepBtn.removeAttribute("disabled");
      isCepElemenBtnOn = true;
    } else cepBtn.setAttribute("disabled", "");
  }
  return isCepElemenBtnOn;
}
export function addMedHistHandler(click: targEv | React.MouseEvent, blockCount: number = 1): number {
  if (click?.currentTarget instanceof HTMLButtonElement && typeof blockCount === "number") {
    if (click.currentTarget instanceof HTMLElement && click.currentTarget.classList.contains("addAntMed")) {
      // Cria um novo conjunto de elementos HTML
      const newBlock = Object.assign(document.createElement("div") as HTMLDivElement, {
        className: "antMedBlock",
        id: `antMedBlock${blockCount}`,
        innerHTML: `
              <span role="group" class="divAntMedSpan spanMain spanAntMedText" id="antMedSpanInp${blockCount}">
                <label for="antMedId${blockCount}" class="antMedLabel">${blockCount}&#41
                  <input type="text" name="antMedName${blockCount}" id="antMedId${blockCount}" class="form-control autocorrect autocorrectFirst inpAntMed antMedText" data-title="desc_tratamento${blockCount}" data-xls="Descrição de Tratamento ${blockCount}" placeholder="Preencha aqui sobre o tratamento ${blockCount}" />
                </label>
              </span>
              <span role="group" class="divAntMedSpan spanMain spanAntMedDate" id="antMedSpanMainDate${blockCount}">
                <span role="group" class="divAntMedSubSpan spanSub spanSubAntMedDate" id="antMedSpanSubDate${blockCount}">
                  <fieldset role="group" class="antMedDiv">
                    <label for="antMedDateIniId${blockCount}" class="antMedLabel"></label>
                    <div role="group" class="antMedDateDiv flexDiv">
                      <input type="date" name="antMedDateIniName${blockCount}" id="antMedDateIniId${blockCount}" class="form-control inpDate antMedDate inpAntMed" data-title="data_ini_tratamento${blockCount}" data-xls="Início de Tratamento ${blockCount}" required /> 
                      <span role="textbox">até</span>
                      <input type="date" name="antMedDateEndName${blockCount}" id="antMedDateEndId${blockCount}" class="form-control inpDate antMedDate inpAntMed" data-title="data_end_tratamento${blockCount}" data-xls="Termino de Tratamento ${blockCount}" required />
                      <label for="antMedDateEndId${blockCount}" class="antMedLabel"></label>
                      <button type="button" class="datBtn atualTratBtn btn btn-secondary" id="atualTrat${blockCount}DatBtn">
                        Usar data atual
                      </button>
                    </div>
                  </fieldset>
                </span>
              </span>
          `,
        style: { width: "100%" },
      });
      // Adiciona o novo bloco ao contêiner
      document.getElementById("antMedContainer")?.appendChild(newBlock);
      newBlock.querySelectorAll('button[id$="DatBtn"]').forEach(dateBtn => {
        dateBtn.addEventListener("click", activation => useCurrentDate(activation, dateBtn as HTMLButtonElement));
      });
      newBlock.querySelectorAll('input[type="text"]').forEach(textEl => {
        textEl.addEventListener("input", () =>
          autoCapitalizeInputs(
            textEl,
            checkAutoCorrect(
              document.querySelector('button[id^="deactAutocorrectBtn"]') ||
                document.querySelector('input[id^="deactAutocorrectBtn"]'),
            ),
          ),
        );
      });
    } else if (click.currentTarget instanceof HTMLElement && click.currentTarget.classList.contains("removeAntMed")) {
      const divToRemove = Array.from(document.querySelectorAll(".antMedBlock")).at(-1);
      if (divToRemove && blockCount > 0 && divToRemove?.id !== "antMedBlock1") divToRemove.remove();
    }
  }
  return blockCount;
}
export function handleDivAddShow(targ: targEl): void {
  try {
    if (!(targ instanceof HTMLInputElement && (targ.type === "radio" || targ.type === "checkbox"))) return;
    const parentSpan =
      targ.closest(".spanSectAnt") || targ.closest(".input-group") || targ.closest('span[role="group"]');
    if (!(parentSpan instanceof HTMLElement)) return;
    let divAdd: targEl = parentSpan.nextElementSibling;
    if (!divAdd?.classList.contains(".divAdd")) divAdd = parentSpan.nextElementSibling?.nextElementSibling;
    if (!divAdd?.classList.contains(".divAdd"))
      divAdd = parentSpan.nextElementSibling?.nextElementSibling?.nextElementSibling;
    if (!divAdd?.classList.contains(".divAdd"))
      divAdd = parentSpan.nextElementSibling?.nextElementSibling?.nextElementSibling?.nextElementSibling;
    if (!(divAdd instanceof HTMLElement && (divAdd.classList.contains("divAdd") as boolean)))
      divAdd = document.getElementById(`divAdd${targ.id.replace("ant", "").replace("Id", "")}`) as HTMLDivElement;
    if (!(divAdd instanceof HTMLElement && (divAdd.classList.contains("divAdd") as boolean))) return;
    if (targ.checked) {
      divAdd.style.display = "grid";
      divAdd.style.opacity = "0.8";
      innerWidth > 460 ? (divAdd.style.minWidth = "70vw") : (divAdd.style.minWidth = "88vw");
      divAdd.querySelectorAll(".divAntFamCheck").forEach(d => {
        if (!(d instanceof HTMLElement)) return;
        d.style.display = "grid";
        setTimeout(() => {
          d.style.opacity = "1";
        }, 300);
        innerWidth > 460 ? (d.style.minWidth = "60vw !important") : (d.style.minWidth = "70vw !important");
      });
      for (const radio of [
        ...divAdd.querySelectorAll('input[type="radio"'),
        ...divAdd.querySelectorAll('input[type="number"]'),
        ...divAdd.querySelectorAll('input[type="date"]'),
      ])
        if (radio instanceof HTMLInputElement) radio.dataset.required = "true";
    } else {
      divAdd.style.display = "none";
      divAdd.style.opacity = "0";
      divAdd.style.minWidth = "0";
      divAdd.querySelectorAll(".divAntFamCheck").forEach(d => {
        if (!(d instanceof HTMLElement)) return;
        d.style.display = "none";
        d.style.opacity = "0";
        innerWidth > 460 ? (d.style.minWidth = "60vw !important") : (d.style.minWidth = "70vw !important");
      });
      for (const radio of [
        ...divAdd.querySelectorAll('input[type="radio"'),
        ...divAdd.querySelectorAll('input[type="number"]'),
        ...divAdd.querySelectorAll('input[type="date"]'),
      ])
        if (radio instanceof HTMLInputElement) delete radio.dataset.required;
    }
  } catch (e) {
    return;
  }
}
