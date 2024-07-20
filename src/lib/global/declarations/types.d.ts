import { UndefinedPerson, Man, Woman, Neutro } from "./classes";

export type voidVal = null | undefined;
export type looseNum = string | number;
export type primitiveType = looseNum | boolean | voidVal;
export type textEl = HTMLInputElement | HTMLTextAreaElement;
export type entryEl = textEl | HTMLSelectElement;
export type elCollection =
  | Element[]
  | NodeListOf<Element>
  | HTMLCollectionOf<Element>;
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
export type contextAutofill = [targEl, targEl, targEl, targEl[]];
export type contextAutofillNums = [
  number,
  number,
  string,
  [number, number, number, number, number]
];
export type autofillResult = [number, number[], number[], targEl[]];
export type btnFillResult = [number[], number[], targEl[]];
export type btnContext = [[number, string, fiveNums], contextAutofill];
//errors
export type errorHandleElType = Element | EventTarget | string | voidVal;
export type errorHandleArrayType =
  | (Element | primitiveType)[]
  | NodeList
  | HTMLCollection
  | string
  | voidVal;
export type errorHandleSpreadType = (
  | Element
  | EventTarget
  | primitiveType
  | voidVal
)[];
export type errorLineExp = targStr | (() => string | undefined);

export interface objInnerTabs {
  numTotalColsCons: number;
  numTotalTabsCons: number;
  numColsCons: number;
  areColGroupsSimilar: boolean;
}
export type nullishForm = HTMLFormElement | null;
export type nullishDlg = HTMLDialogElement | null;
export type nullishInp = HTMLInputElement | null;
export type nullishSel = HTMLSelectElement | null;
export type nullishBtn = HTMLButtonElement | null;
export type nullishTab = HTMLTableElement | null;
export type nullishAnchor = HTMLAnchorElement | null;
export type nullishDiv = HTMLDivElement | null;
export type nullishSpan = HTMLSpanElement | null;
export type nullishFs = HTMLFieldSetElement | null;
export type nullishLab = HTMLLabelElement | null;
export type nullishArtc = HTMLElement & {
  tagName: "ARTICLE";
};
export type rMouseEvent = MouseEvent | React.MouseEvent;
export type pageCases = "login" | "base" | "ag" | "edfis" | "od" | "panel";
export type pageStyleCases =
  | "Login Page Style"
  | "Base Page Style"
  | "AG Page Style"
  | "EN Page Style"
  | "Od Page Style"
  | "Panel Page Style";
export type IndCases = "BTN" | "IMC" | "MLG" | "TMB" | "GET" | "PGC";
