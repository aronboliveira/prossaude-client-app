import { aptTypes, looseNum, nlDsb, queryableNode, rMouseEvent, voidVal } from "./types";
import { WorkBook, utils, writeFile } from "xlsx";
import { textTransformPascal } from "../gModel";
import { exportSignaler } from "../gController";
import JSZip from "jszip";
import { maxProps, navigatorVars, person, tabProps } from "@/vars";
import { BodyType, GordLvl, Intensity, NafTypeValue, TMBFormula } from "@/lib/global/declarations/testVars";
import {
  evalFactorAtleta,
  evalBodyType,
  evalPseudoNum,
  evalActivityLvl,
  dispatchFactorAtvLvl,
} from "@/lib/locals/edFisNutPage/edFisNutModel";
import { toast } from "react-hot-toast";
import promptToast from "../../../../components/interactive/def/PromptToast";
import { HistoricInfo, PacInfo, PersonProps, ProfInfo, StudInfo, UserProps } from "./interfacesCons";
export interface UndefinedPerson {
  gen: string;
  age: number;
  sumDCut: number;
  weight: number;
  height: number;
  atvLvl: string;
}
export class Person {
  gen: BodyType;
  age: number;
  weight: number;
  height: number;
  sumDCut: number;
  atvLvl: Intensity;
  constructor(
    gen: BodyType = "masculino",
    age: number = 0,
    weight: number = 0,
    height: number = 0,
    sumDCut: number = 0,
    atvLvl: Intensity = "leve",
  ) {
    this.gen = evalBodyType(gen) ? gen : "masculino";
    this.age = evalPseudoNum(age);
    this.weight = evalPseudoNum(weight);
    this.height = evalPseudoNum(height);
    this.sumDCut = evalPseudoNum(sumDCut);
    this.atvLvl = evalActivityLvl() ? atvLvl : "leve";
  }
  public resetPerson(): void {
    person.gen = "masculino";
    person.age = 0;
    person.weight = 0;
    person.height = 0;
    person.sumDCut = 0;
    person.atvLvl = "leve";
  }
  public checkAtvLvl(personInfo: Person | string): number {
    if (
      (personInfo instanceof Person && "atvLvl" in personInfo && this.atvLvl !== ("" as any)) ||
      typeof personInfo === "string"
    ) {
      if (typeof personInfo === "string") this.dispatchAtvLvl(personInfo);
      switch (person.atvLvl) {
        case "sedentario":
          return 1.2;
        case "leve":
          return 1.4;
        case "moderado":
          return 1.6;
        case "intenso":
          return 1.9;
        case "muitoIntenso":
          return 2.2;
        default:
          return 1.4;
      }
    } else return 1.4;
  }
  public calcIMC(personInfo: Person | { weight: number; height: number }): {
    l: GordLvl;
    v: number;
  } {
    try {
      if (
        !(
          personInfo instanceof Person ||
          (typeof personInfo.weight !== "number" && typeof personInfo.height !== "number")
        )
      )
        throw new Error(`Failed to valid arguments for calcIMC`);
      let IMC = personInfo.weight / (personInfo.height / 100) ** 2;
      if (!Number.isFinite(IMC) || IMC < 0) IMC = 0;
      if (IMC >= 0) {
        if (IMC < 18.5) return { l: "abaixo", v: IMC };
        else if (IMC >= 18.5 && IMC < 25.0) return { l: "eutrofico", v: IMC };
        else if (IMC >= 25.0 && IMC < 30) return { l: "sobrepeso", v: IMC };
        else if (IMC >= 30 && IMC < 35) return { l: "obeso1", v: IMC };
        else if (IMC >= 35 && IMC < 40) return { l: "obeso2", v: IMC };
        else if (IMC > 40) return { l: "obeso3", v: IMC };
        else throw new Error(`Error classifying IMC. Obtained value: ${IMC ?? 0}; Values have to be positive.`);
      } else
        throw new Error(
          `Error calculating IMC. Used values: Weight ${this.weight ?? 0} and Height ${this.height ?? 0}`,
        );
    } catch (e) {
      return { l: "abaixo", v: tabProps.IMC ?? 0 };
    }
  }
  public calcPGC(person: Person): { pgc: number; mlg: number } {
    try {
      person.sumDCut = Math.abs(person.sumDCut);
      if (!("sumDCut" in person && typeof person.sumDCut === "number" && person.sumDCut >= 0))
        throw new Error(`Failed to validate person props:
        sumDCut in props: ${"sumDCut" in person}
        Type of sumDCut: ${typeof person.sumDCut === "number"}
        Value of sumDCut: ${person.sumDCut || "Falsish"}`);
      const sdc = person.sumDCut,
        g = person.gen;
      let DC = 0,
        PGC = 0,
        MLG = 0;
      if (g === "masculino") {
        DC = 1.10938 - 0.0008267 * sdc + 0.0000016 * sdc ** 2 - 0.0002574 * person.age;
        if (DC <= 0 || !Number.isFinite(DC)) DC = 0.01;
        PGC = 495 / DC - 450;
        if (PGC <= 0 || !Number.isFinite(PGC)) PGC = 0.01;
        if (PGC > 100) PGC = 100;
        MLG = 100 - PGC > 0 ? 100 - PGC : 0;
      } else if (g === "feminino") {
        DC = 1.0994921 - 0.0009929 * sdc + 0.0000023 * sdc ** 2 - 0.0001392 * person.age;
        if (DC <= 0 || !Number.isFinite(DC)) DC = 0.01;
        PGC = 495 / DC - 450;
        if (PGC <= 0 || !Number.isFinite(PGC)) PGC = 0.01;
        if (PGC > 100) PGC = 100;
        MLG = 100 - PGC > 0 ? 100 - PGC : 0;
      } else if (g === "neutro") {
        DC = 1.10443605 - 0.0009098 * sdc + 0.00000195 * sdc ** 2 - 0.0001983 * person.age;
        if (DC <= 0 || !Number.isFinite(DC)) DC = 0.01;
        PGC = 495 / DC - 450;
        if (PGC <= 0 || !Number.isFinite(PGC)) PGC = 0.01;
        if (PGC > 100) PGC = 100;
        MLG = 100 - PGC > 0 ? 100 - PGC : 0;
      }
      if (!Number.isFinite(MLG)) MLG = 0;
      return { pgc: PGC, mlg: MLG };
    } catch (e) {
      return { pgc: tabProps.PGC ?? 0, mlg: tabProps.MLG ?? 0 };
    }
  }
  public calcTMB(person: Person): { l: TMBFormula; v: number } {
    evalFactorAtleta();
    try {
      if (!(person instanceof Person)) throw new Error(`Failed to validate Person instance.`);
      const fa = tabProps.factorAtleta,
        atv = person.atvLvl,
        w = person.weight;
      if (atv === "muitoIntenso" && (fa === "mlg" || fa === "peso")) {
        if (fa === "mlg") {
          const MLG = tabProps.MLG;
          if (MLG && MLG >= 0) return { l: "tinsley", v: 25.9 * MLG + 284 };
          else
            throw new Error(`Error validating MLG.
            Obtained value: ${MLG ?? 0}`);
        } else if (fa === "peso") {
          if ("weight" in person && w >= 0) return { l: "tinsley", v: 24.8 * w + 10 };
          else
            throw new Error(`Error validating weight.
            Obtained value: ${w ?? 0}`);
        } else throw new Error(`Failed to validate Factor for Athletes.\nObtained value: ${fa || "falsish"}`);
      } else if (atv === "sedentario" || atv === "leve" || atv === "moderado" || atv === "intenso") {
        const IMC = tabProps.IMC ?? 0,
          a = person.age,
          g = person.gen,
          h = person.height;
        if (
          !(
            "weight" in person &&
            w >= 0 &&
            "height" in person &&
            h >= 0 &&
            "age" in person &&
            a >= 0 &&
            "gen" in person &&
            evalBodyType(g)
          )
        )
          throw new Error(
            `Failed to validate person props instance.\nObtained values: Age as ${a ?? "void"},\nWeight as ${
              w ?? "void"
            },\nHeight as ${h ?? "void"},\nGender: ${g || "falsish"}`,
          );
        switch (true) {
          case IMC < 25.0 && IMC >= 0:
            switch (g) {
              case "masculino":
                return { l: "harrisBenedict", v: 66 + (13.8 * w + 5.0 * h - 6.8 * a) };
              case "feminino":
                return { l: "harrisBenedict", v: 655 + (9.6 * w + 1.9 * h - 4.7 * a) };
              case "neutro":
                return { l: "harrisBenedict", v: 360.5 + (11.7 * w + 3.45 * h - 5.75 * a) };
              default:
                throw new Error(
                  `Error validating instance of Person. Obtained instance: ${
                    Object.prototype.toString.call(person).slice(8, -1) ?? "null"
                  }`,
                );
            }
          case IMC >= 25.0:
            switch (g) {
              case "masculino":
                return { l: "mifflinStJeor", v: 10 * w + 6.25 * h - 5.0 * a + 5 };
              case "feminino":
                return { l: "mifflinStJeor", v: 10 * w + 6.25 * h - 5.0 * a - 161 };
              case "neutro":
                return { l: "mifflinStJeor", v: 10 * w + 6.25 * h - 5.0 * a - 78 };
              default:
                throw new Error(
                  `Error validating instance of Person. Obtained instance: ${
                    Object.prototype.toString.call(person).slice(8, -1) ?? "null"
                  }`,
                );
            }
          default:
            throw new Error(
              `Error validating IMC. IMC obtained: ${IMC ?? 0}; Valor deve ser numérico, positivo e float`,
            );
        }
      } else throw new Error(`Failed to validate Physical Activity level of person:\nObtained value: ${fa}`);
    } catch (e) {
      return {
        l: (() =>
          tabProps.fct instanceof HTMLSelectElement || tabProps.fct instanceof HTMLInputElement
            ? (tabProps.fct.value as TMBFormula)
            : "harrisBenedict")(),
        v: tabProps.TMB ?? 0,
      };
    }
  }
  public calcGET(): number {
    dispatchFactorAtvLvl(tabProps.factorAtvLvl as NafTypeValue);
    return (tabProps.TMB ?? 0) * ((tabProps.factorAtvLvl ?? 0) as number);
  }
  public dispatchGen(g: string): void {
    person.gen = evalBodyType(g) ? g : person.gen || "masculino";
  }
  public dispatchAge(a: looseNum): void {
    const age = evalPseudoNum(a);
    person.age = age > maxProps.age ? maxProps.age : age;
  }
  public dispatchWeight(w: looseNum): void {
    const weight = Math.abs(evalPseudoNum(w));
    person.weight = weight > maxProps.weight ? maxProps.weight : weight;
  }
  public dispatchHeight(h: looseNum): void {
    const height = Math.abs(evalPseudoNum(h));
    person.height = height > maxProps.height ? maxProps.height : height;
  }
  public dispatchDC(d: looseNum): void {
    const dc = Math.abs(evalPseudoNum(d));
    person.sumDCut = dc > maxProps.dc ? maxProps.dc : dc;
  }
  public dispatchAtvLvl(a: string): void {
    person.atvLvl = ((a: string): a is Intensity =>
      ["sedentario", "leve", "moderado", "intenso", "muitoIntenso"].includes(a))(a)
      ? a
      : person.atvLvl || "leve";
  }
}
export class UniqueMap extends Map {
  set(key: any, value: any): this {
    try {
      if (this.has(key)) {
        if (Number.isNaN(key)) {
          if (typeof key === "object" && key[key]) {
            super.set(key, value);
          } else throw new Error(`Self-references are not qualified.`);
        } else throw new Error(`NaN values are not qualified.`);
      } else throw new Error(`Map already has specified key.`);
    } catch (err) {
      return this;
    }
    return this;
  }
}
export class User {
  readonly #userClass: string;
  readonly #userArea: string;
  readonly #userName: string;
  readonly #userEmail: string;
  readonly #userTel: string;
  constructor({
    privilege,
    name,
    area,
    email,
    telephone,
  }: {
    name: string;
    privilege: string;
    area: string;
    email?: string;
    telephone?: string;
  }) {
    this.#userName = name;
    if (privilege === "coordinator") privilege = "Coordenador";
    if (privilege === "student") privilege = "Estudante";
    if (privilege === "supervisor") privilege = "Supervisor";
    this.#userClass = privilege;
    if (area === "general") area = "Geral";
    if (area === "medicine") area = "Medicina";
    if (area === "nutrition") area = "Nutrição";
    if (area === "physical_education") area = "Educação Física";
    if (area === "psychology") area = "Psicologia";
    if (area === "odontology") area = "Odontologia";
    if (area === "technology") area = "Tecnologia";
    this.#userArea = area;
    this.#userEmail = email || "Não preenchido";
    this.#userTel = telephone || "Não preenchido";
  }
  get userClass(): string {
    return this.#userClass;
  }
  get userArea(): string {
    return this.#userArea;
  }
  get userName(): string {
    return this.#userName;
  }
  get userEmail(): string {
    return this.#userEmail;
  }
  get userTel(): string {
    return this.#userTel;
  }
}
export class ClickEvaluator {
  #shouldEvaluateTime: boolean = false;
  #shouldEvaluateClient: boolean = false;
  #clientAttempt: number = 0;
  #lastClickTime: number = 0;
  #lastClickX: number = 0;
  #lastClickY: number = 0;
  public get shouldEvaluateTime(): boolean {
    return this.#shouldEvaluateTime;
  }
  public get shouldEvaluateClient(): boolean {
    return this.#shouldEvaluateClient;
  }
  public get clientAttempt(): number {
    return this.#clientAttempt;
  }
  public get lastClickTime(): number {
    return this.#lastClickTime;
  }
  public get lastClickX(): number {
    return this.#lastClickX;
  }
  public get lastClickY(): number {
    return this.#lastClickY;
  }
  #setLastClickTime(time: number): void {
    this.#lastClickTime = time;
  }
  #setLastClickCoordinates(x: number, y: number): void {
    this.#lastClickX = x;
    this.#lastClickY = y;
  }
  #incrementClientAttempt(): void {
    this.#clientAttempt += 1;
  }
  #enableEvaluateTime(): void {
    this.#shouldEvaluateTime = true;
  }
  #enableEvaluateClient(): void {
    this.#shouldEvaluateClient = true;
  }
  #isTrustedEvent(ev: rMouseEvent): boolean {
    return ev.isTrusted;
  }
  #isMouseMovementZero(ev: rMouseEvent): boolean {
    return ev.movementX === 0 && ev.movementY === 0;
  }
  #isSuspiciousTimeInterval(): boolean {
    return new Date().getTime() - this.#lastClickTime < 100;
  }
  #isSuspiciousClientMovement(ev: rMouseEvent): boolean {
    return this.#clientAttempt > 1 && ev.clientX === this.#lastClickX && ev.clientY === this.#lastClickY;
  }
  public evaluateClickMovements(ev: rMouseEvent): [string, boolean] {
    let suspicious = true;
    try {
      if (!("movementX" in ev)) throw new Error("Invalid instance for Event");
      if (
        !this.#isTrustedEvent(ev) &&
        !(
          window &&
          localStorage.getItem("shouldTrustNavigate") &&
          localStorage.getItem("shouldTrustNavigate") === "true"
        )
      ) {
        return [
          navigatorVars.pt
            ? "Evento de mouse não confiável. Por favor aguarde para tentar novamente."
            : "Mouse event not trusted. Please wait and try again.",
          suspicious,
        ];
      }
      if (!this.#isMouseMovementZero(ev)) {
        return [
          navigatorVars.pt
            ? "Movimento de mouse não confiável. Por favor aguarde para tentar novamente."
            : "Mouse movement not trusted. Please wait and try again.",
          suspicious,
        ];
      }
      if (this.#shouldEvaluateTime && this.#isSuspiciousTimeInterval()) {
        return [
          navigatorVars.pt
            ? "Intervalo de movimento do mouse não confiável. Por favor aguarde para tentar novamente."
            : "Mouse interval tracked as suspicious. Please retry later.",
          suspicious,
        ];
      }
      this.#enableEvaluateTime();
      this.#setLastClickTime(new Date().getTime());
      if (this.#shouldEvaluateClient && this.#isSuspiciousClientMovement(ev)) {
        return [
          navigatorVars.pt
            ? "Deslocamento de mouse não confiável. Por favor aguarde para tentar novamente."
            : "Mouse pattern tracked as suspicious. Please wait and try again.",
          suspicious,
        ];
      }
      this.#enableEvaluateClient();
      this.#incrementClientAttempt();
      this.#setLastClickCoordinates(ev.clientX, ev.clientY);
      suspicious = false;
      localStorage.getItem("shouldTrustNavigate") && localStorage.removeItem("shouldTrustNavigate");
      return ["Attempt validated.", suspicious];
    } catch (e) {
      return [
        navigatorVars.pt
          ? "Não foi possível validar a solicitação. Por favor aguarde para tentar novamente."
          : "It wasn't possible to validate the request. Please wait for trying again.",
        suspicious,
      ];
    }
  }
}
export class ExportHandler {
  #exports: number = 0;
  #timer: number = 360000;
  #currTime: number = this.#timer;
  #abortControl: AbortController;
  constructor() {
    this.#abortControl = new AbortController();
  }
  public get exports(): number {
    return this.#exports;
  }
  #setExports(value: number): void {
    this.#exports = value;
  }
  #resetExports(): void {
    this.#setExports(0);
  }
  public autoResetTimer(n: number): NodeJS.Timeout {
    return setInterval((i: any) => {
      if (this) {
        this.#resetExports();
      } else clearInterval(i);
    }, n);
  }
  public get timer(): number {
    return this.#timer;
  }
  #setTimer(value: number): void {
    this.#timer = value;
  }
  public get currTime(): number {
    return this.#currTime;
  }
  #setCurrTime(value: number): void {
    this.#currTime = value;
  }
  public handleExportClick(
    ev: rMouseEvent,
    context: string = "undefined",
    scope: queryableNode = document,
    namer: HTMLElement | string | voidVal = "",
  ): void {
    const [message, suspicious] = new ClickEvaluator().evaluateClickMovements(ev);
    let idf = "";
    if (ev.currentTarget instanceof HTMLButtonElement || ev.currentTarget instanceof HTMLInputElement) {
      ev.currentTarget.disabled = true;
      idf = ev.currentTarget.id || ev.currentTarget.name;
      let targ: nlDsb = ev.currentTarget;
      setTimeout(() => {
        targ = this.#getTarget(targ, idf);
        if (targ && targ.disabled) targ.disabled = false;
      }, 3000);
    }
    this.#setExports(this.#exports + 1);
    if (this.exports > 10 || suspicious) {
      suspicious && toast.error(message);
      this.#setTimeoutForExport(ev, idf);
      return;
    }
    promptToast(
      navigatorVars.pt ? "Por favor insira a senha:" : "Please input the password:",
      "Digite aqui a senha",
    ).then(res => {
      const pw = res;
      if (!pw || btoa(pw) !== "cGFzc3dvcmQ=") {
        if (navigatorVars.pt) {
          toast.error("Senha incorreta");
          toast("Esta versão de teste de UX usa a seguinte senha: password", { icon: "🗝" });
        } else {
          toast.error("Wrong password");
          toast("This UX testing version uses the following password: password", { icon: "🗝" });
        }
        return;
      }
      navigatorVars.pt ? toast.success("Senha validada!") : toast.success("Password validated!");
      this.#processExportData(context, scope, namer);
    });
  }
  #getTarget(targ: nlDsb, idf: string): nlDsb {
    const el = targ || document.getElementById(idf) || document.getElementsByName(idf)[0];
    return el instanceof HTMLInputElement || el instanceof HTMLButtonElement ? el : null;
  }
  #setTimeoutForExport(ev: rMouseEvent, idf: string): void {
    const interv = setInterval(() => this.#setCurrTime(this.currTime - 1000), 1000);
    let targ = ev.currentTarget as nlDsb;
    setTimeout(() => {
      targ = this.#getTarget(targ as nlDsb, idf);
      if (targ && targ.disabled) targ.disabled = false;
      this.#setExports(0);
      this.#setTimer(360000);
      this.#setCurrTime(360000);
      clearInterval(interv);
    }, this.timer);
    navigatorVars.pt
      ? toast.error(`Você está em timeout para exportações. Por favor aguarde ${this.currTime} ou recarregue a página.`)
      : toast.error(`You are in a timeout for exporting. Please wait for ${this.currTime} or reload the page.`);
  }
  #processExportData(
    context: string = "undefined",
    scope: queryableNode = document,
    namer: HTMLElement | string | voidVal = "",
  ): void {
    const elsDefs: {
      [k: string]: {
        title: string | undefined;
        v: string | undefined;
        type: "s" | "b" | "n" | "d" | "i" | undefined;
      };
    } = {};
    try {
      let v: string | ArrayBuffer | null = "Não preenchido",
        type: "s" | "b" | "n" | "d" | "i" | undefined;
      const allEntryEls = [
        ...Array.from((scope ?? document).querySelectorAll("input")).filter(
          el =>
            !(
              el instanceof HTMLInputElement &&
              (el.type === "checkbox" || el.type === "radio") &&
              (el.role === "switch" ||
                el.parentElement?.classList.contains("form-switch") ||
                el.labels?.[0]?.innerText?.toLowerCase().includes("cálculo automático") ||
                el.labels?.[0]?.innerText?.toLowerCase().includes("autocorreção"))
            ),
        ),
        ...(scope ?? document).querySelectorAll("textarea"),
        ...(scope ?? document).querySelectorAll("select"),
        ...(scope ?? document).querySelectorAll("output"),
        ...(scope ?? document).querySelectorAll("canvas"),
      ];
      let acc = 1,
        imageEls: (HTMLCanvasElement | HTMLInputElement)[] = [];
      for (const el of allEntryEls) {
        const title =
          el?.dataset?.xls
            ?.split("")
            .map((c, i) => (i === 0 ? c.toUpperCase() : c))
            .join("")
            .replace(/_/g, " ") ||
          el?.dataset?.title
            ?.split("")
            .map((c, i) => (i === 0 ? c.toUpperCase() : c))
            .join("")
            .replace(/_/g, " ") ||
          textTransformPascal(
            el?.id
              .replace(/[_\-]/g, " ")
              .replace(/([A-Z])/g, m => (m === el?.id.charAt(0) ? m : ` ${m}`))
              .split("")
              .map((c, i) => (i === 0 ? c.toUpperCase() : c))
              .join("")
              .replace(/_/g, " "),
          ) ||
          (!(el instanceof HTMLCanvasElement) &&
            textTransformPascal(
              el?.name
                .replace(/[_\-]/g, " ")
                .replace(/([A-Z])/g, m => (m === el?.name.charAt(0) ? m : ` ${m}`))
                .split("")
                .map((c, i) => (i === 0 ? c.toUpperCase() : c))
                .join("")
                .replace(/_/g, " "),
            )) ||
          `Sem Título (${el?.id || (!(el instanceof HTMLCanvasElement) && el?.name) || el?.className || el?.tagName}`;
        if (el instanceof HTMLOutputElement) {
          v = el.innerText || "Não preenchido";
          type = "s";
        } else if (el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
          v = el.value || "Não preenchido";
          type = "s";
        } else if (el instanceof HTMLInputElement) {
          if (el.type === "checkbox" || el.type === "radio") {
            type = "b";
            v = el.checked ? "Sim" : "Não";
          } else if (el.type === "number") {
            type = "n";
            if (v !== "Não preenchido") {
              v = v?.replace(/[^0-9]/g, "") ?? "Não preenchido";
              if (v !== "" && !Number.isFinite(Number(v))) v = "#ERRO -> Número inválido";
            }
          } else if (el.type === "file") {
            type = "i";
            const file = el.files?.[0];
            if (file) {
              const rd = new FileReader();
              rd.onload = (): string | ArrayBuffer | null => (v = rd.result);
              rd.onerror = (): string => {
                toast?.error(
                  navigatorVars.pt
                    ? `Erro carregando arquivos para a planilha`
                    : `Error loading files to the spreadsheet`,
                );
                return (v = `#ERRO: ${rd.error?.name ?? "Nome indefinido"} — ${
                  rd.error?.message ?? "mensagem indefinida"
                }`);
              };
              rd.onloadend = () => {
                toast?.success(
                  navigatorVars.pt
                    ? `Sucesso carregando arquivos: ${file.name}`
                    : `Success loading files: ${file.name}`,
                  { duration: 1000 },
                );
              };
              rd.readAsDataURL(file);
              imageEls.push(el);
            } else v = "Não preenchido";
          } else if (el.type === "date") {
            type = "d";
            v = el.value;
          } else {
            type = "s";
            v = el.value;
          }
        } else if (el instanceof HTMLCanvasElement) {
          type = "i";
          v = el.toDataURL("image/png");
          imageEls.push(el);
        }
        elsDefs[
          el.id ||
            (!(el instanceof HTMLCanvasElement) && el.name) ||
            el.dataset.title?.replace(/\s/g, "__") ||
            el.className.replace(/\s/g, "__") ||
            el.tagName
        ] = { title, v, type };
        acc += 1;
      }
      const wb = utils.book_new(),
        dataJSON = Object.entries(elsDefs).map(([k, v], i) => ({
          Campo: v.title || k || `#ERRO -> Chave Elemento ${i + 1}`,
          Valor:
            (v.v === ""
              ? "Não preenchido"
              : v.v && v.v.length > 1 && v.type !== "i"
              ? v.v === "avancado"
                ? "Avançado"
                : v.v?.includes("avaliacao")
                ? v.v.replace(/avaliacao/gi, "Avaliação")
                : `${v.v.charAt(0).toUpperCase()}${v.v.slice(1)}`
              : v.v) ?? `#ERRO -> Valor Elemento ${i + 1}`,
          Tipo: (() => {
            switch (v.type) {
              case "b":
                return "Lógico";
              case "n":
                return "Número";
              case "d":
                return "Data";
              case "i":
                return "Imagem";
              default:
                return "Texto";
            }
          })(),
        })),
        worksheet = utils.json_to_sheet(dataJSON, { skipHeader: false, dateNF: "dd/mm/yyyy", cellDates: true }),
        maxLengths: { [k: string]: number } = {};
      Object.entries(worksheet).forEach(row => {
        row.forEach((c, i) => {
          const len = c?.toString().length;
          if (len) (!maxLengths[i] || maxLengths[i] < len) && (maxLengths[i] = len);
        });
      });
      worksheet["!cols"] = Object.keys(maxLengths).map(i => {
        return { width: maxLengths[i] + 50 };
      });
      utils.book_append_sheet(wb, worksheet, "Formulário Exportado", true);
      const date = new Date(),
        fullDate = `d${date.getDate()}m${date.getMonth() + 1}y${date.getFullYear()}`,
        baseUrl = `${
          !/localhost/g.test(location.origin) ? `${location.origin}/.` : "/"
        }netlify/functions/processWorkbook`,
        fetchProcess = async (wb: WorkBook): Promise<void> => {
          try {
            if (this.exports > 101) return;
            const res = await fetch(baseUrl, {
              method: "POST",
              mode: "same-origin",
              credentials: "same-origin",
              referrer: location.href,
              referrerPolicy: "same-origin",
              headers: new Headers([["Content-Type", "application/json"]]),
              body: JSON.stringify(wb),
              cache: "no-store",
              keepalive: false,
              signal: this.#abortControl.signal,
            });
            if (this.exports > 100) {
              exportSignaler.abort();
              this.#abortControl.abort();
            }
            if (!res.ok) return;
          } catch (e) {
            return;
          }
        };
      if (namer) {
        const writeNamedFile = (namer: Element | string): void => {
          if (
            namer instanceof HTMLInputElement ||
            namer instanceof HTMLSelectElement ||
            namer instanceof HTMLTextAreaElement
          ) {
            fetchProcess(wb);
            writeFile(
              wb,
              `data_${context}_${
                namer.value
                  .trim()
                  .replaceAll(/[ÁÀÄÂÃáàäâã]/g, "a")
                  .replaceAll(/[ÉÈËÊéèëê]/g, "e")
                  .replaceAll(/[ÓÒÖÔÕóòöôõ]/g, "o")
                  .replaceAll(/[ÚÙÜÛúùüû]/g, "u")
                  .toLowerCase() ?? "noName"
              }_form_${fullDate}.xlsx`,
              {
                bookType: "xlsx",
                bookSST: false,
                compression: false,
                cellStyles: true,
                type: "buffer",
              },
            );
          } else if (namer instanceof HTMLOutputElement) {
            fetchProcess(wb);
            writeFile(
              wb,
              `data_${context}_${
                namer.innerText
                  .trim()
                  .replaceAll(/[ÁÀÄÂÃáàäâã]/g, "a")
                  .replaceAll(/[ÉÈËÊéèëê]/g, "e")
                  .replaceAll(/[ÓÒÖÔÕóòöôõ]/g, "o")
                  .replaceAll(/[ÚÙÜÛúùüû]/g, "u")
                  .toLowerCase() ?? "noName"
              }_form_${fullDate}.xlsx`,
              {
                bookType: "xlsx",
                bookSST: false,
                compression: false,
                cellStyles: true,
                type: "buffer",
              },
            );
          } else if (namer instanceof HTMLElement) {
            fetchProcess(wb);
            writeFile(
              wb,
              `data_${context}_${
                namer.id?.trim() ||
                namer.dataset.xls?.replaceAll(/\s/g, "__") ||
                namer.dataset.title?.replaceAll(/\s/g, "__") ||
                namer.tagName
              }form_${fullDate}.xlsx`,
            );
          } else if (typeof namer === "string") {
            fetchProcess(wb);
            writeFile(wb, `data_${context}_${namer.trim().replace(/\s/g, "__")}_form_${fullDate}.xlsx`);
          }
        };
        if (typeof namer === "string") {
          if ((scope ?? document).querySelector(namer)) {
            fetchProcess(wb);
            writeNamedFile((scope ?? document).querySelector(namer)!);
          } else {
            fetchProcess(wb);
            writeNamedFile(namer);
          }
        }
        if (typeof namer === "object") {
          fetchProcess(wb);
          writeNamedFile(namer);
        }
      } else {
        fetchProcess(wb);
        writeFile(wb, `data_${context}form_${fullDate}.xlsx`, {
          bookType: "xlsx",
          bookSST: false,
          compression: false,
          cellStyles: true,
          type: "buffer",
        });
      }
      this.#processImages(imageEls, context);
    } catch (error) {
      return;
    }
  }
  async #processImages(els: (HTMLCanvasElement | HTMLInputElement)[], context: string = "") {
    let canvasBlobs: { [k: string]: Blob | null } = {};
    for (const el of els) {
      try {
        if (el instanceof HTMLCanvasElement) {
          const res = await fetch(el.toDataURL());
          canvasBlobs[el.id || el.className.replace(/\s/g, "__") || el.tagName] = await res.blob();
        } else if (el instanceof HTMLInputElement && el.type === "file") {
          const file = el.files?.[0];
          if (file) canvasBlobs[el.id || el.name || el.className.replace(/\s/g, "__") || el.tagName] = file;
        }
      } catch (e) {
        return;
      }
    }
    const zip = new JSZip();
    for (const [idf, blob] of Object.entries(canvasBlobs)) {
      try {
        if (!blob) continue;
        const fileName = `image_${context || idf}.png`;
        zip.file(fileName, blob);
      } catch (e) {
        continue;
      }
    }
    try {
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const zipLink = document.createElement("a");
      zipLink.href = URL.createObjectURL(zipBlob);
      zipLink.download = `images_${context}.zip`;
      document.body.appendChild(zipLink);
      zipLink.click();
      document.body.removeChild(zipLink);
    } catch (e) {
      return;
    }
  }
}
abstract class TypeValidator<T> {
  public abstract validate(data: Partial<T>): boolean;
}
export class PersonValidator extends TypeValidator<PersonProps> {
  public validate(data: Partial<PersonProps>): boolean {
    return typeof data.name === "string" && typeof data.email === "string" && typeof data.tel === "string";
  }
}
export class UserValidator extends PersonValidator {
  public validate(data: Partial<UserProps>): boolean {
    return (
      super.validate(data) &&
      typeof data.area === "string" &&
      typeof data.day === "string" &&
      typeof data.start_day === "string" &&
      typeof data.end_day === "string"
    );
  }
}
export class ProfInfoValidator extends UserValidator {
  public validate(data: Partial<ProfInfo>): boolean {
    return (
      super.validate(data) &&
      (data.idf === undefined || typeof data.idf === "string") &&
      (data.external === undefined || typeof data.external === "boolean")
    );
  }
}
export class StudInfoValidator extends UserValidator {
  public validate(data: Partial<StudInfo>): boolean {
    return (
      super.validate(data) &&
      (data.dre === undefined || typeof data.dre === "string") &&
      (data.cpf === undefined || typeof data.cpf === "string")
    );
  }
}
export class PacInfoValidator extends PersonValidator {
  public validate(data: Partial<PacInfo>): boolean {
    return (
      super.validate(data) &&
      typeof data.next_appointed_day === "string" &&
      typeof data.treatment_beg === "string" &&
      typeof data.treatment_end === "string" &&
      typeof data.current_status === "string" &&
      (data.signature instanceof File || !data.signature) &&
      (typeof data.idf === "string" || !data.idf) &&
      Array.isArray(data.historic) &&
      data.historic.every(item => PacInfoValidator.validateHistoric(item))
    );
  }
  public static validateHistoric(historic: HistoricInfo): boolean {
    const validTypes: aptTypes[] = [
      "anamnese",
      "retorno",
      "exodontia",
      "profilaxia",
      "raspagem",
      "rcarie",
      "acompanhamento",
      "analise",
      "diagnostico",
      "avaliacao",
      "recordatorio",
      "suplementacao",
    ];
    return (
      (historic.type.toLowerCase() === "indefinido" || validTypes.includes(historic.type.toLowerCase() as aptTypes)) &&
      typeof historic.day === "string" &&
      typeof historic.prof === "string" &&
      (typeof historic.stud === "string" || !historic.stud) &&
      (typeof historic.notes === "string" || !historic.notes)
    );
  }
}
