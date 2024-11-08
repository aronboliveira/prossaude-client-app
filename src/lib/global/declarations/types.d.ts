import { MutableRefObject, SetStateAction } from "react";
import { Root } from "react-dom/client";
export type voidVal = null | undefined;
export type looseNum = string | number;
export type primitiveType = looseNum | boolean | voidVal;
export type textEl = HTMLInputElement | HTMLTextAreaElement;
export type entryEl = textEl | HTMLSelectElement;
export type elCollection = Element[] | NodeListOf<Element> | HTMLCollectionOf<Element>;
//targets
export type targNum = number | voidVal;
export type targStr = string | voidVal;
export type targLooseNum = looseNum | voidVal;
export type targEl = Element | voidVal;
export type targHTMLEl = HTMLElement | voidVal;
export type targTextEl = textEl | null;
export type targNumArr = number[] | voidVal;
export type targStrArr = string[] | voidVal;
export type targlooseNumArr = looseNum[] | voidVal;
export type targElArr = targEl[];
export type targElList = targElArr | NodeListOf<Element>;
export type targEntryEl = entryEl | voidVal;
export type targEv = Event | voidVal;
export type targObj = object | voidVal;
export type targMatchText = RegExpMatchArray | string | null;
export type trioNumTargEl = [number, targEl, targEl];
export type trioTargEl = [targEl, targEl, targEl];
export type sixTargEl = [targEl, targEl, targEl, targEl, targEl, targEl];
export type fiveNums = [number, number, number, number, number];
export type contextAutofill = {
  gl: targEl;
  fct: targEl;
  naf: targEl;
};
export type autofillResult = {
  ncl: number;
  ps: {
    w: number;
    h: number;
    sd: number;
  };
  i: {
    imc: number;
    mlg: number;
    tmb: number;
    get: number;
    pgc: number;
  };
  ts: {
    tiw: targEl;
    tih: targEl;
    tii: targEl;
    tim: targEl;
    tit: targEl;
    tidc: targEl;
    tip: targEl;
  };
};
export type btnFillResult = [number[], number[], targEl[]];
export type btnContext = [[number, string, fiveNums], contextAutofill];
//errors
export type errorHandleElType = Element | EventTarget | string | voidVal;
export type errorHandleArrayType = (Element | primitiveType)[] | NodeList | HTMLCollection | string | voidVal;
export type errorHandleSpreadType = (Element | EventTarget | primitiveType | voidVal)[];
export type errorLineExp = targStr | (() => string | undefined);
export interface objInnerTabs {
  numTotalColsCons: number;
  numTotalTabsCons: number;
  numColsCons: number;
  areColGroupsSimilar: boolean;
}
export type nlEl = Element | null;
export type nlHtEl = HTMLElement | null;
export type nlFm = HTMLFormElement | null;
export type nlDlg = HTMLDialogElement | null;
export type nlInp = HTMLInputElement | null;
export type nlSel = HTMLSelectElement | null;
export type nlBtn = HTMLButtonElement | null;
export type nlDsb = HTMLButtonElement | nlInp;
export type nlTab = HTMLTableElement | null;
export type nlTabSect = HTMLTableSectionElement | null;
export type nlA = HTMLAnchorElement | null;
export type nlDiv = HTMLDivElement | null;
export type nlSpan = HTMLSpanElement | null;
export type nlFs = HTMLFieldSetElement | null;
export type nlLab = HTMLLabelElement | null;
export type nullishArtc = HTMLElement & {
  tagName: "ARTICLE";
};
export type nullishCanvas = HTMLCanvasElement | null;
export type nullishDl = HTMLDataListElement | null;
export type nullishOptGrp = HTMLOptGroupElement | null;
export type queryableNode = Document | Element | null;
export type vRoot = Root | voidVal;
export type rMouseEvent = MouseEvent | React.MouseEvent;
export type rKbEv = KeyboardEvent | React.KeyboardEvent;
export type rDragEvent = DragEvent | React.DragEvent;
export type NlMRef<T> = MutableRefObject<T> | null;
export type NlrDispatch<T> = Dispatch<SetStateAction<T>> | null;
export type pageCases = "login" | "base" | "ag" | "ed" | "od" | "panel" | "recover";
export type formCases = "schedule" | "studs" | "profs" | "patients" | "cons" | pageCases;
export type fetchSuffixes = "_table" | "_form";
export type pacStatus =
  | "avaliacao"
  | "tratamento"
  | "emergência"
  | "altaOdontologia"
  | "altaEducacaoFisica"
  | "altaNutricao"
  | "altaOdontologiaEducacaoFisica"
  | "altaOdontologiaNutricao"
  | "altaEducacaoFisicaNutricao"
  | "altaOdontologiaEducacaoFisicaNutricao";
export type quadrCases = "SupDir" | "SupEsq" | "InfDir" | "InfEsq";
export type ctxRot = "RefDia" | "RefCompDia" | "AguaDia" | "UrDia" | "UrInterv" | "EvDia" | "EvInterv";
export type mainContextRot =
  | "Diário"
  | "Refeições Diárias"
  | "Refeições Completas Diárias"
  | "Litros de Água Diários"
  | "Micções Diárias"
  | "Intervalo entre Micções"
  | "Evacuações Diárias"
  | "Intervalo entre Evacuações";
export type IndCases = "BTN" | "IMC" | "MLG" | "TMB" | "GET" | "PGC";
export type validTabLabs =
  | "PA"
  | "FC"
  | "Peso"
  | "Altura"
  | "Abdômen"
  | "Cintura"
  | "Quadril"
  | "Cintura / Quadril"
  | "Antebraço"
  | "Braço"
  | "Panturrilha"
  | "Coxa"
  | "Peitoral"
  | "Abdominal"
  | "Tórax"
  | "Soma"
  | "Subescapular"
  | "Axilar Média"
  | "Tríciptal"
  | "Suprailíaca"
  | Exclude<IndCases, "BTN">;
export type TabCelCtxs = "ProgSVi" | "MedAnt" | "DCut" | "IndPerc";
export type pageStyleCases =
  | "AG Page Style"
  | "Login Page Style"
  | "Base Page Style"
  | "Base Page Style"
  | "EN Page Style"
  | "Od Page Style"
  | "Panel Page Style"
  | "Recover Page Style";
export type validSchedHours = 18 | 19 | 20 | 21;
export type userClasses = "coordenador" | "supervisor" | "estudante";
export type personAbrvClasses = "stud" | "prof" | "pac";
export type personAbrvUpperClasses = "Stud" | "Prof" | "Pac";
export type aptTypes =
  | "anamnese"
  | "retorno"
  | "exodontia"
  | "profilaxia"
  | "raspagem"
  | "rcarie"
  | "acompanhamento"
  | "analise"
  | "diagnostico"
  | "avaliacao"
  | "recordatorio"
  | "suplementacao";
export type validAreas =
  | "Odontologia"
  | "Educação Física"
  | "Nutrição"
  | "Coordenação"
  | "Psicologia"
  | "Medicina"
  | "Tecnologia";
export type panelOpts = "registStud" | "registProf" | "removeStud" | "removeProf" | "pacList" | "agenda" | "dashboard";
