import { Root } from "react-dom/client";
import { ExportHandler, Person } from "./lib/global/declarations/classes";
import { ENTabsProps } from "./lib/global/declarations/interfaces";
import { UserState } from "./lib/locals/basePage/declarations/serverInterfaces";
import { defUser } from "./redux/slices/userSlice";
import { DataProvider } from "./lib/global/declarations/classesCons";
import { voidVal } from "./lib/global/declarations/types";
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
  factorAtleta: "Peso",
  edGenValue: "masculino",
  targInpWeigth: undefined,
  targInpHeigth: undefined,
  targInpIMC: undefined,
  targInpMLG: undefined,
  targInpTMB: undefined,
  targInpGET: undefined,
  targInpPGC: undefined,
  targInpSumDCut: undefined,
};
export const person = new Person("masculino", 0, 0, 0, 0, "leve");
export const experimentalProps: { experimentalUser: UserState } & { [k: string]: object } = {
  experimentalUser: defUser as UserState,
};
export const providers: { [k: string]: DataProvider | voidVal } = {
  globalDataProvider: undefined,
};
export const panelRoots: { [k: string]: Root | undefined } = {
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
