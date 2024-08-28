import { DlgProps } from "@/lib/global/declarations/interfaces";
import {
  aptTypes,
  formCases,
  looseNum,
  panelOpts,
} from "@/lib/global/declarations/types";
import { UserState } from "@/pages/api/ts/serverInterfaces";
import {
  nullishForm,
  nullishDlg,
  nullishInp,
  nullishTab,
  voidVal,
  nullishBtn,
} from "@glSrc/types";
import { NextRouter } from "next/router";
import { MutableRefObject, Dispatch, SetStateAction, Component } from "react";
import { Root } from "react-dom/client";

export interface FormData {
  [key: string]: any;
}

export interface UserProfile {
  userClass: userClasses;
  userArea: string;
  userName: string;
  userEmail: string;
  userTel: string;
}

export interface GlobalFormProps {
  userClass: userClasses;
  mainRoot?: Root;
}

export interface MainPanelProps {
  defOp: panelOpts;
}

export interface ScheduleFormProps extends GlobalFormProps {
  context: boolean;
}

export interface HrRowProps extends GlobalFormProps {
  nHr: 18 | 19 | 20 | 21;
  nRow: number;
  last?: boolean;
}

export interface HrCelProps extends HrRowProps {
  nCol: number;
}

export interface DataContextType {
  formData: FormData;
  updateFormData: (newData: FormData) => void;
}

export interface PanelFormProps {
  formCallback: (form: nullishForm) => void;
}

export interface BtnAddPacPros {
  context: boolean;
  userClass: userClasses;
}

export interface ConsDlgProps extends Omit<BtnAddPacPros, "context"> {
  onClose: () => void;
}

export interface FormDlgProps extends ConsDlgProps {
  dialogRef: MutableRefObject<nullishDlg>;
}

export interface FillerProps {
  forwardedRef: MutableRefObject<nullishDlg>;
  userClass: userClasses;
}

export interface AvStudListDlgProps extends FillerProps, DlgProps {}

export interface StudListProps extends GlobalFormProps, Partial<DlgProps> {
  mainDlgRef: MutableRefObject<nullishDlg>;
}

export interface AvProfListDlgProps extends DlgProps, GlobalFormProps {
  mainDlgRef: MutableRefObject<nullishDlg>;
  btnProf: HTMLButtonElement | null;
}

export interface AvPacListDlgProps extends DlgProps, GlobalFormProps {
  shouldShowAlocBtn: boolean;
  mainDlgRef: MutableRefObject<nullishDlg>;
}

export interface PacListProps
  extends Omit<
      AvPacListDlgProps,
      "mainDlgRef" | "onClick" | "shouldDisplayPacList"
    >,
    Partial<Pick<AvPacListDlgProps, "onClick" | "shouldDisplayPacList">> {
  setDisplayRowData: Dispatch<SetStateAction<boolean>>;
  shouldDisplayRowData: boolean;
  shouldShowAlocBtn: boolean;
  mainDlgRef?: MutableRefObject<nullishDlg>;
  dispatch?: Dispatch<SetStateAction<boolean>>;
  state?: boolean;
}

export interface PrevConsListProps {
  setDisplayPrevList: Dispatch<SetStateAction<boolean>>;
  shouldDisplayPrevList: boolean;
}

export interface AlterFieldListProps extends DlgProps {
  tabRef: MutableRefObject<nullishTab>;
  name: string;
}

export interface ProviderAptDataListProps {
  [key: string]: any;
  btnId: string;
  userClass: userClasses;
}

export interface AptDataListProps {
  setDisplayAptList: Dispatch<SetStateAction<boolean>>;
  data: { [key: string]: any };
  btnId: string;
  shouldDisplayAptList: boolean;
  userClass: userClasses;
  isDirectRender?: boolean;
}

export interface RegsConstBtnProps {
  rootEl: HTMLElement | voidVal;
  secondOp: string;
  userClass: userClasses;
}

export interface ExcludeDlgProps {
  setDisplayExcludeDlg: Dispatch<SetStateAction<boolean>>;
  shouldDisplayExcludeDlg: boolean;
  route: formCases;
}

export interface ExcludeConsDlgProps extends Omit<ExcludeDlgProps, "route"> {
  btn: nullishBtn;
  userClass: userClasses;
}

export interface FailedRegstProps {
  setDisplayFailRegstDlg: Dispatch<SetStateAction<boolean>>;
  shouldDisplayFailRegstDlg: boolean;
  root: Root | undefined;
  secondOp: string;
}

export interface ReseterBtnProps {
  root: Root;
  renderForm: Component | ReactElement;
}

export interface ResetDlgProps extends ReseterBtnProps {
  setDisplayResetDlg: Dispatch<SetStateAction<boolean>>;
  shouldDisplayResetDlg: boolean;
}

export interface UserProfileDropdownProps {
  user: userProfile;
  router: NextRouter;
  setDropdown: Dispatch<SetStateAction<boolean>>;
  shouldShowDropdown: boolean;
}

export interface ContactDlgProps {
  setContact: Dispatch<SetStateAction<boolean>>;
  shouldDisplayContact: boolean;
}

export interface UserPropsDlgProps {
  setPropDlg: Dispatch<SetStateAction<boolean>>;
  shouldDisplayPropDlg: boolean;
}

export interface UserDlgProps
  extends UserPropsDlgProps,
    ContactDlgProps,
    UserProfileDropdownProps {
  setUserDlg: Dispatch<SetStateAction<boolean>>;
  shouldDisplayUserDlg: boolean;
  callLogout: () => void;
}

export interface FallbackedMainPanelProps
  extends Omit<MainPanelProps, "mainRoot"> {
  renderError: Error;
}

export interface ErrorFallbackMainPanelProps extends FallbackedMainPanelProps {
  tryAcc: number;
  resetErrorBoundary(mainRoot: Root, userClass: userClasses, tryAcc: number);
  mainRoot: Root;
}

export interface ErrorDlgProps {
  renderError: Error;
  onClick: () => void;
}

export interface TabRowProps extends GlobalFormProps {
  tabRef: MutableRefObject<nullishTab>;
  nRow: looseNum;
}

export interface UserRowProps extends TabRowProps {
  state?: boolean;
  dispatch?: Dispatch<SetStateAction<boolean>>;
  inDlg?: boolean;
}

export interface StudRowProps extends UserRowProps {
  stud: StudInfo;
}

export interface ProfRowProps extends UserRowProps {
  prof: ProfInfo;
  external?: boolean;
}

export interface PacRowProps extends TabRowProps {
  pac: PacInfo;
  shouldShowAlocBtn: boolean;
}

export interface PersonProps {
  name: string;
  email: string;
  tel: string;
}

export interface UserProps extends PersonProps {
  area: string;
  day: string;
  start_day: string;
  end_day: string;
}

export interface ProfInfo extends UserProps {
  idf?: string;
  external?: boolean;
}

export interface StudInfo extends UserProps {
  dre?: string;
  cpf?: string;
}

export interface PacInfo extends PersonProps {
  next_appointed_day: string;
  treatment_beg: string;
  treatment_end: string;
  current_status: string;
  signature: File;
  historic: HistoricInfo[];
  idf?: string;
}

export interface PrevAppointmentRowProps
  extends GlobalFormProps,
    Omit<TabRowProps, "tabRef"> {}

export interface HistoricInfo {
  type: "Indefinido" | aptTypes;
  day: string;
  prof: string;
  stud?: string;
  notes?: string;
}

export interface HistoricDlgProps extends DlgProps {
  historic: HistoricInfo[];
  name: string;
}

export interface HistoricRowProps extends Pick<HistoricDlgProps, "name"> {
  historic: HistoricInfo;
  nRow: number;
}
