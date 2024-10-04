import { nlDsb, queryableNode, rMouseEvent, voidVal } from "./types";
import { WorkBook, utils, writeFile } from "xlsx";
import { textTransformPascal } from "../gModel";
import { exportSignaler } from "../gController";
import JSZip from "jszip";
export interface UndefinedPerson {
  gen: string;
  age: number;
  sumDCut: number;
  weight: number;
  height: number;
  atvLvl: string;
}
export class Person {
  gen;
  age;
  weight;
  height;
  sumDCut;
  atvLvl;
  constructor(
    gen: string = "masculino",
    age: number = 0,
    weight: number = 0,
    height: number = 0,
    sumDCut: number = 0,
    atvLvl: string = "leve",
  ) {
    this.gen = gen;
    this.age = age;
    this.weight = weight;
    this.height = height;
    this.sumDCut = sumDCut;
    this.atvLvl = atvLvl;
  }
  checkAtvLvl(personInfo: Person | string): number {
    if (
      (personInfo instanceof Person && "atvLvl" in personInfo && this.atvLvl !== "") ||
      typeof personInfo === "string"
    ) {
      if (typeof personInfo === "string") this.atvLvl = personInfo;
      switch (this.atvLvl) {
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
          console.error(
            `Error validating case. Obtained this.atvLvl: ${
              this.atvLvl ?? "null"
            }; Accepted values: sedentário || leve || moderado || intenso || muitoIntenso`,
          );
      }
    } else {
      console.error(
        `Error validating instance of person. Obtained value: ${personInfo ?? "null"}; instance ${
          Object.prototype.toString.call(personInfo).slice(8, -1) ?? "null"
        }; Value of Nível of Atividade Física obtained: ${this.atvLvl ?? "null"}`,
      );
      return 0;
    }
    return 0;
  }
  calcIMC(personInfo: Person | [number, number]): [string, number] {
    try {
      if (
        (personInfo instanceof Person &&
          "weight" in personInfo &&
          typeof this.weight === "number" &&
          this.weight >= 0 &&
          "height" in this &&
          typeof this.height === "number" &&
          this.height >= 0) ||
        (Array.isArray(personInfo) && typeof personInfo[0] === "number" && typeof personInfo[1] === "number")
      ) {
        if (Array.isArray(personInfo)) {
          [this.weight, this.height] = personInfo;
        }
        let IMC = this.weight / this.height ** 2;
        if (Number.isNaN(IMC) || IMC === Math.abs(Infinity)) IMC = 0;
        if (IMC >= 0) {
          if (IMC < 18.5) return ["abaixo", IMC];
          else if (IMC >= 18.5 && IMC < 25.0) return ["eutrofico", IMC];
          else if (IMC >= 25.0 && IMC < 30) return ["sobrepeso", IMC];
          else if (IMC >= 30 && IMC < 35) return ["obeso1", IMC];
          else if (IMC >= 35 && IMC < 40) return ["obeso2", IMC];
          else if (IMC > 40) return ["obeso3", IMC];
          else throw new Error(`Error classifying IMC. Obtained value: ${IMC ?? 0}; Values have to be positive.`);
        } else
          throw new Error(
            `Error calculating IMC. Used values: Weight ${this.weight ?? 0} and Height ${this.height ?? 0}`,
          );
      } else
        throw new Error(
          `Error validating data for person. 
          Element person: ${Object.prototype.toString.call(personInfo).slice(8, -1) ?? "null"}; 
          Weight present: ${"weight" in personInfo || false};
          Weight obtained: ${this.weight ?? 0};
          Height present: ${"height" in personInfo || false};
          Height obtained: ${this.height ?? 0}`,
        );
    } catch (IMCError) {
      console.error((IMCError as Error).message);
    }
    return ["", 0];
  }
  calcPGC(person: Person): [number, number] {
    if (person instanceof Person && "sumDCut" in person && typeof this.sumDCut === "number" && this.sumDCut >= 0) {
      if (person.gen === "masculino") {
        let DC = 1.10938 - 0.0008267 * this.sumDCut + 0.0000016 * this.sumDCut ** 2 - 0.0002574 * person.age;
        if (DC <= 0 || Number.isNaN(DC)) DC = 0.01;
        let PGC = 495 / DC - 450;
        if (PGC <= 0 || Number.isNaN(PGC)) PGC = 0.01;
        if (PGC > 100) PGC = 100;
        let MLG = 100 - PGC > 0 ? 100 - PGC : 0;
        if (Number.isNaN(MLG) || MLG === Math.abs(Infinity)) MLG = 0;
        return [PGC, MLG];
      } else if (person.gen === "feminino") {
        let DC = 1.0994921 - 0.0009929 * this.sumDCut + 0.0000023 * this.sumDCut ** 2 - 0.0001392 * person.age;
        if (DC <= 0 || Number.isNaN(DC)) DC = 0.01;
        let PGC = 495 / DC - 450;
        if (PGC <= 0 || Number.isNaN(PGC)) PGC = 0.01;
        if (PGC > 100) PGC = 100;
        let MLG = 100 - PGC > 0 ? 100 - PGC : 0;
        if (Number.isNaN(MLG) || MLG === Math.abs(Infinity)) MLG = 0;
        return [PGC, MLG];
      } else if (person.gen === "neutro") {
        let DC = 1.10443605 - 0.0009098 * this.sumDCut + 0.00000195 * this.sumDCut ** 2 - 0.0001983 * person.age;
        if (DC <= 0 || Number.isNaN(DC)) DC = 0.01;

        let PGC = 495 / DC - 450;
        if (PGC <= 0 || Number.isNaN(PGC)) PGC = 0.01;
        if (PGC > 100) PGC = 100;
        let MLG = 100 - PGC > 0 ? 100 - PGC : 0;
        if (Number.isNaN(MLG) || MLG === Math.abs(Infinity)) MLG = 0;
        return [PGC, MLG];
      } else
        console.error(
          `Invalid instance of object. Obtained instance: ${
            Object.prototype.toString.call(person).slice(8, -1) ?? "null"
          }`,
        );
    } else
      console.warn(`Error validating .sumDCut:
      It is present: ${"sumDCut" in person || false};
      Obtained primitive type for .sumDCut: ${typeof this.sumDCut};
      Obtained value: ${this.sumDCut ?? 0}`);
    return [0, 0];
  }
  calcTMB(person: Person, IMC: number = 0, MLG: number = 0, factorAtleta: string = "Peso"): [string, number] {
    if (factorAtleta === "peso") factorAtleta = "Peso";
    if (factorAtleta === "mlg") factorAtleta = "MLG";
    try {
      if (
        person instanceof Person &&
        "atvLvl" in person &&
        this.atvLvl &&
        typeof this.atvLvl === "string" &&
        typeof IMC === "number" &&
        typeof MLG === "number" &&
        typeof factorAtleta === "string"
      ) {
        if (this.atvLvl === "muitoIntenso" && (factorAtleta === "MLG" || factorAtleta === "Peso")) {
          if (factorAtleta === "MLG") {
            if (MLG && MLG >= 0) return ["tinsley", 25.9 * MLG + 284];
            else
              throw new Error(`Error validating MLG.
              Obtained value: ${MLG ?? 0}`);
          } else if (factorAtleta === "Peso") {
            if ("weight" in person && this.weight >= 0) return ["tinsley", 24.8 * this.weight + 10];
            else
              throw new Error(`Error validating weight.
              Obtained value: ${this.weight ?? 0}`);
          }
        } else if (
          this.atvLvl === "sedentario" ||
          this.atvLvl === "leve" ||
          this.atvLvl === "moderado" ||
          this.atvLvl === "intenso"
        ) {
          if ("weight" in person && this.weight >= 0 && "height" in person && this.height >= 0 && "age" in person) {
            if (IMC < 25.0 && IMC >= 0) {
              if (person.gen === "masculino")
                return ["harrisBenedict", 66 + (13.8 * this.weight + 5.0 * this.height - 6.8 * this.age)];
              else if (person.gen === "feminino")
                return ["harrisBenedict", 655 + (9.6 * this.weight + 1.9 * this.height - 4.7 * this.age)];
              else if (person.gen === "neutro")
                return ["harrisBenedict", 360.5 + (11.7 * this.weight + 3.45 * this.height - 5.75 * this.age)];
              else
                throw new Error(
                  `Error validating instance of Person. Obtained instance: ${
                    Object.prototype.toString.call(person).slice(8, -1) ?? "null"
                  }`,
                );
            } else if (IMC >= 25.0) {
              if (person.gen === "masculino")
                return ["mifflinStJeor", 10 * this.weight + 6.25 * this.height - 5.0 * this.age + 5];
              else if (person.gen === "feminino")
                return ["mifflinStJeor", 10 * this.weight + 6.25 * this.height - 5.0 * this.age - 161];
              else if (person.gen === "neutro")
                return ["mifflinStJeor", 10 * this.weight + 6.25 * this.height - 5.0 * this.age - 78];
              else
                throw new Error(
                  `Error validating instance of Person. Obtained instance: ${Object.prototype.toString
                    .call(person)
                    .slice(8, -1)}`,
                );
            } else
              throw new Error(
                `Error validating IMC. IMC obtained: ${IMC ?? 0}; Valor deve ser númerico, positivo e float`,
              );
          } else
            throw new Error(`Error validating properties of person.
            Weight present: ${"weight" in person || false};
            Value of weight obtained: ${this.weight ?? 0};
            Height present: ${"height" in person || false};
            Value of height obtained: ${this.height ?? 0};
            age present: ${"age" in person || false};
            `);
        } else {
          throw new Error(
            `Error validating atvLvl and/or factorAtleta.
            atvLvl obtained: ${this.atvLvl ?? "null"}
            Fator obtained: ${factorAtleta ?? "null"}; Fatores válidos: "MLG" || "Peso"`,
          );
        }
      } else {
        throw new Error(`Error validating person.
        Elemento: ${person ?? "null"};
        instance: ${Object.prototype.toString.call(person).slice(8, -1) ?? "null"};
        atvLvl present: ${"atvLvl" in person || false};
        Value of atvLvl obtained: ${this.atvLvl ?? "null"};
        Primitive type of .atvLvl: ${typeof this.atvLvl};
        Primitive type of IMC: ${typeof IMC};
        Primitive type of MLG: ${typeof MLG};
        Primitive type of factorAtleta: ${typeof factorAtleta}.`);
      }
    } catch (TMBError) {
      console.error((TMBError as Error).message);
    }
    return ["", 0];
  }
  calcGET(TMB: number = 0, factorAtvLvl: number = 1.4): number {
    if (TMB && factorAtvLvl) return TMB * factorAtvLvl;
    else
      console.error(`Error validating arguments.
      TMB obtained: ${TMB ?? 0};
      factorAtvLvl obtained: ${factorAtvLvl ?? 0}`);
    return 0;
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
      console.error(`Error adding entry to UniqueMap: ${(err as Error).message}`);
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
      if (!this.#isTrustedEvent(ev)) {
        return [
          navigator.language.startsWith("pt-")
            ? "Evento de mouse não confiável. Por favor aguarde para tentar novamente."
            : "Mouse event not trusted. Please wait and try again.",
          suspicious,
        ];
      }
      if (!this.#isMouseMovementZero(ev)) {
        return [
          navigator.language.startsWith("pt-")
            ? "Movimento de mouse não confiável. Por favor aguarde para tentar novamente."
            : "Mouse movement not trusted. Please wait and try again.",
          suspicious,
        ];
      }
      if (this.#shouldEvaluateTime && this.#isSuspiciousTimeInterval()) {
        return [
          navigator.language.startsWith("pt-")
            ? "Intervalo de movimento do mouse não confiável. Por favor aguarde para tentar novamente."
            : "Mouse interval tracked as suspicious. Please retry later.",
          suspicious,
        ];
      }
      this.#enableEvaluateTime();
      this.#setLastClickTime(new Date().getTime());
      if (this.#shouldEvaluateClient && this.#isSuspiciousClientMovement(ev)) {
        return [
          navigator.language.startsWith("pt-")
            ? "Deslocamento de mouse não confiável. Por favor aguarde para tentar novamente."
            : "Mouse pattern tracked as suspicious. Please wait and try again.",
          suspicious,
        ];
      }
      this.#enableEvaluateClient();
      this.#incrementClientAttempt();
      this.#setLastClickCoordinates(ev.clientX, ev.clientY);
      suspicious = false;
      return ["Attempt validated.", suspicious];
    } catch (e) {
      console.error(`Error executing evaluateClickMovements: ${(e as Error).message}`);
      return [
        navigator.language.startsWith("pt-")
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
      suspicious && alert(message);
      this.#setTimeoutForExport(ev, idf);
      return;
    }
    const pw = navigator.language.startsWith("pt-")
      ? prompt("Por favor insira a senha:")
      : prompt("Please input the password:");
    if (!pw || btoa(pw) !== "cGFzc3dvcmQ=") {
      if (navigator.language.startsWith("pt-")) {
        alert("Senha incorreta");
        alert("Esta versão de teste de UX usa a seguinte senha: password");
      } else {
        alert("Wrong password");
        alert("This UX testing version uses the following password: password");
      }
      return;
    }
    this.#processExportData(context, scope, namer);
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
    navigator.language.startsWith("pt-")
      ? alert(`Você está em timeout para exportações. Por favor aguarde ${this.currTime} ou recarregue a página.`)
      : alert(`You are in a timeout for exporting. Please wait for ${this.currTime} or reload the page.`);
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
              rd.readAsDataURL(file);
              imageEls.push(el);
            } else v = "Não preenchido";
          } else if (el.type === "date") type = "d";
          else type = "s";
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
      for (let i = 0; i < Object.values(elsDefs).length; i++) {
        const cellAddress = utils.encode_cell({ r: 0, c: i });
        if (worksheet[cellAddress]?.s)
          worksheet[cellAddress].s = {
            font: { bold: true },
          };
      }
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
            if (!res.ok) {
              console.warn(`This is a UX testing only version:
              Reaching: ${res.url}
              Redirected: ${res.redirected}
              Type: ${res.type}
              Status: ${res.status} => ${res.ok ? "OK" : "NOT OK"}
              Text: ${res.statusText}
              `);
              return;
            }
          } catch (e) {
            console.error(`Error executing fetchProcess:\n${(e as Error).message}`);
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
      console.error("Error generating spreadsheet:", error);
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
        console.error(`Failed fetching Canvas: ${e}`);
      }
    }
    const zip = new JSZip();
    for (const [idf, blob] of Object.entries(canvasBlobs)) {
      try {
        if (!blob) {
          console.warn(`No blob available for ${idf}`);
          continue;
        }
        const fileName = `image_${context || idf}.png`;
        zip.file(fileName, blob);
      } catch (e) {
        console.error(`Error executing iteration for ${idf}:\n${e}`);
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
      console.error(`Error placing link for .zip of images: ${e}`);
    }
  }
}
