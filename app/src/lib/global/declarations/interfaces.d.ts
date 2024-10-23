import { Dispatch, MutableRefObject, SetStateAction } from "react";
import {
  TabCelCtxs,
  ctxRot,
  looseNum,
  quadrCases,
  targEl,
  validTabLabs,
  vRoot,
  nlSel,
  nlHtEl,
  nlFm,
  NlMRef,
  nlInp,
  nlFs,
  nlTab,
  nlDiv,
  NlrDispatch,
  elCollection,
} from "./types";
import { BodyType, FactorAtletaValue, Gender, Intensity, NafTypeValue } from "@/lib/global/declarations/testVars";
export interface DocumentNodeProps {
  html: string;
  head?: (JSX.Element | null)[];
  styles?: JSX.Element | ReactElement<any, string | JSXElementConstructor<any>>[] | ReactFragment;
}
export type MetaTag = {
  content?: string;
  id?: string;
  name?: string;
  property?: string;
};
export interface LinkTag {
  rel?: string;
  href?: string;
  id?: string;
  sizes?: string;
}
export interface ProSaudeAppProps extends AppProps {
  pageProps: Record<string, any>;
}
export interface RootCtxType {
  divModal: NlMRef<nlDiv | HTMLSpanElement>;
  divModalSec: NlMRef<nlDiv | HTMLSpanElement>;
  divModalTerc: NlMRef<nlDiv | HTMLSpanElement>;
  roots: {
    [k: string]: vRoot;
  };
}
export interface ENCtxProps {
  refs: {
    af: NlMRef<nlInp>;
    f: NlMRef<nlFm>;
    gar: NlMRef<nlSel>;
    gbr: NlMRef<nlSel>;
    gr: NlMRef<nlSel>;
    fct: NlMRef<nlSel>;
    fspr: NlMRef<nlFs>;
    gl: NlMRef<nlSel>;
    nafr: NlMRef<nlSel>;
    sar: NlMRef<nlSel>;
    txbr: NlMRef<nlSel>;
  };
  bt: {
    s: BodyType;
    d: NlrDispatch<BodyType>;
  };
}
export interface FspCtxProps {
  cons: {
    numCons: number;
    setNumCons: NlrDispatch<number>;
  };
  refs: {
    snc: NlMRef<nlSel>;
    prt: NlMRef<nlSel>;
    td: NlMRef<nlTab>;
    tsv: NlMRef<nlTab>;
    tma: NlMRef<nlTab>;
    tip: NlMRef<nlTab>;
  };
}
export interface UserPanelCtxProps {
  setDropdown: NlrDispatch<boolean>;
  shouldShowDropdown: boolean;
}
export interface UserProfileCtxProps {
  user: UserState | null;
  router: NextRouter | null;
  shouldDisplayPropDlg: boolean;
  shouldDisplayContact: boolean;
  setPropDlg: NlrDispatch<boolean>;
  setContact: NlrDispatch<boolean>;
}
export interface CacheENProps {
  ncthc: Element[];
  tip: Element[];
  fsptb: Element[];
  fsptrs: Element[];
  fspcols: Element[];
  tsvis: Element[];
  tmais: Element[];
  dcis: Element[];
  indis: Element[];
  locksinds: Element[];
  indisDoc: Element[];
  dcisDoc: Element[];
  his: Element[];
  wis: Element[];
  dctrs: Element[];
  lists: { [k: string]: elCollection };
  targs: { [k: string]: HTMLElement[] };
}
export interface ActiveTargInps {
  tiw: targEl;
  tih: targEl;
  tidc: targEl;
  tiimc: targEl;
  timlg: targEl;
  titmb: targEl;
  tiget: targEl;
  tipgc: targEl;
}
export interface TargInps {
  firstCol: {
    tiw1: NlMRef<nlInp>;
    tih1: NlMRef<nlInp>;
    tiimc1: NlMRef<nlInp>;
    timlg1: NlMRef<nlInp>;
    titmb1: NlMRef<nlInp>;
    tiget1: NlMRef<nlInp>;
    tipgc1: NlMRef<nlInp>;
    tidc1: NlMRef<nlInp>;
  };
  secondCol: {
    tiw2: NlMRef<nlInp>;
    tih2: NlMRef<nlInp>;
    tiimc2: NlMRef<nlInp>;
    timlg2: NlMRef<nlInp>;
    titmb2: NlMRef<nlInp>;
    tiget2: NlMRef<nlInp>;
    tipgc2: NlMRef<nlInp>;
    tidc2: NlMRef<nlInp>;
  };
  thirdCol: {
    tiw3: NlMRef<nlInp>;
    tih3: NlMRef<nlInp>;
    tiimc3: NlMRef<nlInp>;
    timlg3: NlMRef<nlInp>;
    titmb3: NlMRef<nlInp>;
    tiget3: NlMRef<nlInp>;
    tipgc3: NlMRef<nlInp>;
    tidc3: NlMRef<nlInp>;
  };
}
export interface ENTabsCtxProps {
  targs: TargInps;
}
export interface DTsCtxProps {
  exeAutoFillCtx: ((targ: targEl, context: "cons" | "col") => autofillResult) | null;
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
  numConsLastOp: number;
  numCol: number;
  numCons?: number;
  IMC?: number;
  MLG?: number;
  TMB?: number;
  GET?: number;
  PGC?: number;
  factorAtvLvl?: NafTypeValue;
  factorAtleta?: FactorAtletaValue;
  tiw?: targEl;
  tih?: targEl;
  tiimc?: targEl;
  timlg?: targEl;
  titmb?: targEl;
  tiget?: targEl;
  tipgc?: targEl;
  tidc?: targEl;
  fsp?: targEl;
  gl?: targEl;
  fct?: targEl;
  sa?: targEl;
  naf?: targEl;
  spanFa?: targEl;
  lockGl?: targEl;
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
/* eslint-disable */
export interface ColProps extends Omit<ThProps, "nRow"> {}
/* eslint-enable */
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
