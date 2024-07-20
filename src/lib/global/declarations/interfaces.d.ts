import { SetStateAction } from "react";
import { targEl } from "./types";

export interface DocumentNodeProps {
  html: string;
  head?: (JSX.Element | null)[];
  styles?:
    | JSX.Element
    | ReactElement<any, string | JSXElementConstructor<any>>[]
    | ReactFragment;
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
  isAutoFillActive: boolean;
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
