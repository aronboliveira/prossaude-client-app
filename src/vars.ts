import { ExportHandler, Person } from "./lib/global/declarations/classes";
import { ENTabsProps } from "./lib/global/declarations/interfaces";
import { UserState } from "./lib/locals/basePage/declarations/serverInterfaces";
import { defUser } from "./redux/slices/userSlice";
import { DataProvider } from "./lib/global/declarations/classesCons";
import { voidVal, vRoot } from "./lib/global/declarations/types";
import {
  AlignType,
  AlignTypeLab,
  BirthRelation,
  BirthRelationLab,
  Gender,
  GenderLabs,
  TransitionLevel,
  TransitionLevelLab,
} from "./lib/global/declarations/testVars";
export const ERROR_LIMIT = 3;
export const inpProgWidFix = "14.7rem";
export const inpGenWidFix = "calc(0.4rem + 76.5vw)";
export const errorLabels: { [k: string]: number } = {};
export const pageProps = {
  base: "https://prossaude-client.netlify.app",
  origin: "",
  name: "PROSSaúde — UFRJ",
  firstPub: "2024-07-02T18:00:00Z",
};
export const basePath = {
  path: "",
  ph: "undefined",
};
export const fillScheduleState = { acc: 0 };
export const formData: { [key: string]: string } = {};
export const odProps = {
  odIsAutoCorrectOn: true,
};
export const agProps = {
  agIsAutoCorrectOn: true,
};
export const tabProps: ENTabsProps = {
  edIsAutoCorrectOn: true,
  isAutoFillActive: true,
  areColGroupsSimilar: false,
  areNumConsOpsValid: false,
  numColsCons: 1,
  numCons: 1,
  numConsLastOp: 1,
  numCol: 1,
  IMC: 0,
  MLG: 0,
  TMB: 0,
  GET: 0,
  PGC: 0,
  factorAtvLvl: 1.4,
  factorAtleta: "peso",
  tiw: undefined,
  tih: undefined,
  tiimc: undefined,
  timlg: undefined,
  titmb: undefined,
  tiget: undefined,
  tipgc: undefined,
  tidc: undefined,
  fct: undefined,
  fsp: undefined,
  gl: undefined,
  naf: undefined,
  sa: undefined,
  spanFa: undefined,
  lockGl: undefined,
};
export let person: Person = {} as any;
import("./lib/global/declarations/classes").then(({ Person }) => {
  person = new Person("masculino", 0, 0, 0, 0, "leve");
});
export const MAX_SMALLINT = 65535;
export const maxProps = {
  age: 255,
  weight: 635,
  height: 300,
  imc: 99,
  perc: 99,
  tmb: 4500,
  get: 11000,
  dc: 999,
};
export const experimentalProps: { experimentalUser: UserState } & { [k: string]: object } = {
  experimentalUser: defUser as UserState,
};
export const providers: { [k: string]: DataProvider | voidVal } = {
  globalDataProvider: undefined,
};
export const panelRoots: { [k: string]: vRoot } = {
  mainRoot: undefined,
};
export const scheduleProps: { autoSaving: boolean } = {
  autoSaving: true,
};
export const exporters: { [k: string]: ExportHandler | undefined } = {
  formDlgExporter: undefined,
  agExporter: undefined,
  edExporter: undefined,
  odExporter: undefined,
  aptExporter: undefined,
  pacExporter: undefined,
  profExporter: undefined,
  studExporter: undefined,
  tabProfExporter: undefined,
  tabStudExporter: undefined,
  scheduleExporter: undefined,
};
export const timers = {
  personENTimer: 4500,
};
export const gens: { v: Gender; l: GenderLabs }[] = [
  { v: "masculino", l: "Masculino | Homem binário" },
  { v: "feminino", l: "Feminino | Mulher binária" },
  { v: "naoBinario", l: "Não-Binário" },
  { v: "outros", l: "Outros" },
  { v: "undefined", l: "Não deseja declarar" },
];
export const birthRelations: { v: BirthRelation; l: BirthRelationLab }[] = [
  { v: "cis", l: "Cisgênero | Cissexual" },
  { v: "trans", l: "Transgênero | Transsexual" },
  { v: "outros", l: "Outros" },
  { v: "undefined", l: "Não deseja declarar" },
];
export const transOpts: { v: TransitionLevel; l: TransitionLevelLab }[] = [
  { v: "avancado", l: "Avançado" },
  { v: "undefined", l: "Indefinido" },
  { v: "no", l: "Não está em transição" },
  { v: "inicial", l: "Inicial" },
  { v: "intermediario", l: "Intermediário" },
];
export const alignOpts: { v: AlignType; l: AlignTypeLab }[] = [
  { v: "masculinizado", l: "Masculino | Masculinizado" },
  { v: "feminilizado", l: "Feminino | Feminilizado" },
  { v: "neutro", l: "Neutro" },
];
export const navigatorVars = {
  pt: false,
};
export const reloader: {
  canReloadLogin: boolean;
  canReloadBase: boolean;
} = {
  canReloadLogin: true,
  canReloadBase: true,
};
