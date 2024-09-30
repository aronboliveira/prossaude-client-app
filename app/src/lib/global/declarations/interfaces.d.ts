import { SetStateAction } from "react";
import { TabCelCtxs, ctxRot, looseNum, quadrCases, targEl, validTabLabs } from "./types";
export interface DocumentNodeProps {
  html: string;
  head?: (JSX.Element | null)[];
  styles?: JSX.Element | ReactElement<any, string | JSXElementConstructor<any>>[] | ReactFragment;
}
export interface ProSaudeAppProps extends AppProps {
  pageProps: Record<string, any>;
}
export interface AppRootContextType {
  roots: {
    [k: string]: Root | undefined;
  };
}
export interface CounterAction {
  type: "INCREMENT" | "DECREMENT";
}
export interface PayloadCounterAction extends CounterAction {
  payload: string;
}
export interface DlgProps {
  state: boolean;
  dispatch: Dispatch<SetStateAction<boolean>>;
}
export interface ENTabsProps {
  edIsAutoCorrectOn: boolean;
  isAutoFillActive: boolean;
  areColGroupsSimilar: boolean;
  areNumConsOpsValid: boolean;
  numColsCons: number;
  numCons: number;
  numConsLastOp: number;
  numCol: number;
  IMC: number;
  MLG: number;
  TMB: number;
  GET: number;
  PGC: number;
  factorAtvLvl: number;
  factorAtleta: string;
  edGenValue: string;
  targInpWeigth: targEl;
  targInpHeigth: targEl;
  targInpIMC: targEl;
  targInpMLG: targEl;
  targInpTMB: targEl;
  targInpGET: targEl;
  targInpPGC: targEl;
  targInpSumDCut: targEl;
}
export interface ChecksProps {
  name: string;
  fullName?: string;
}
export interface RadioPairPros extends ChecksProps {
  ctx?: boolean;
  add?: "div" | "ta" | "";
  altPh?: string;
  required?: boolean;
}
export interface DivAntFamProps extends ChecksProps {
  ta?: boolean;
  gen?: boolean;
  div?: boolean;
}
export interface InspProps {
  count: looseNum;
  ctx: "lab" | "jug" | "vest" | "pltd" | "pltm" | "of" | "lg" | "asb" | "mast" | "peri";
  fullName: string;
}
export interface InspDlgProps extends Omit<InspProps, "fullName">, DlgProps {}
export interface qrProps {
  qr: quadrCases;
}
export interface qrInpProps extends qrProps {
  num: looseNum;
}
export interface RotProps {
  quest:
    | "Faz quantas refeições por dia"
    | "Quantas das refeições diárias são completas"
    | "Ingere quantos litros de água por dia"
    | "Quantas micções por dia"
    | "Qual é o intervalo mínimo (em horas) entre cada micção?"
    | "Evacua quantas vezes por dia"
    | "Qual é o intervalo mínimo (em horas) entre evacuações?";
  ctx: ctxRot;
  grp?: "Alim";
  ur?: {
    ctx: "Elim" | "Interv";
  };
  ev?: {
    ctx: "Elim" | "Interv";
  };
}
export interface InpRotProps extends RotProps {
  maxLength: number;
  max: number;
  isMax?: boolean;
  minLength?: number;
  min?: number;
  pattern?: string;
  flags?: string;
}
export interface TabInpProps {
  nRow: number;
  nCol: number;
}
export interface TabBtnProps extends TabInpProps {
  lab: validTabLabs;
}
export interface TabCelProps extends TabInpProps {
  ctx: TabCelCtxs;
}
export interface ThProps extends TabCelProps {
  lab?: validTabLabs;
}
export interface TdProps extends TabCelProps {
  lab: validTabLabs;
}
export interface ColProps extends Omit<ThProps, "nRow"> {}
export interface SpinnerComponentProps {
  spinnerClass?: "spinner-border" | "spinner-grow";
  spinnerColor?:
    | "text-danger"
    | "text-primary"
    | "text-secondary"
    | "text-success"
    | "text-warning"
    | "text-info"
    | "text-light"
    | "text-dark"
    | "";
  message?: string;
  fs?: boolean;
}
