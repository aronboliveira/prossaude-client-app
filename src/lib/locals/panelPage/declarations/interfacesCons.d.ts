import { formCases, looseNum } from "@/lib/global/declarations/types";
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

export interface MainPanelProps extends GlobalFormProps {
  defOp: string;
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

export interface AvStudListDlgProps extends FillerProps {
  onClose: (shouldDisplayStudList: boolean) => void;
  shouldDisplayStudList: boolean;
}

export interface AvProfListDlgProps {
  onClick: (isCPFFillerActive: boolean) => void;
  mainDlgRef: MutableRefObject<nullishDlg>;
  btnProf: HTMLButtonElement | null;
  isCPFFillerActive: boolean;
  userClass: userClasses;
}

export interface AvPacListDlgProps {
  onClick: (shouldDisplayStudList: boolean) => void;
  shouldDisplayPacList: boolean;
  shouldShowAlocBtn: boolean;
  mainDlgRef: MutableRefObject<nullishDlg>;
  userClass: userClasses;
}

export interface PacListProps
  extends Omit<
      AvPacListDlgProps,
      "mainDlgRef" | "onClick" | "shouldDisplayPacList"
    >,
    Partial<Pick<AvPacListDlgProps, "onClick" | "shouldDisplayPacList">> {
  setDisplayRowData: Dispatch<SetStateAction<boolean>>;
  shouldDisplayRowData: boolean;
}

export interface PrevConsListProps {
  setDisplayPrevList: Dispatch<SetStateAction<boolean>>;
  shouldDisplayPrevList: boolean;
}

export interface AlterFieldListProps {
  setDisplayRowData: Dispatch<SetStateAction<boolean>>;
  tabRef: MutableRefObject<nullishTab>;
  shouldDisplayRowData: boolean;
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

export interface ExcludeConsDlgProps extends ExcludeDlgProps {
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
  interv: string;
}

export interface ProfInfo extends UserProps {
  idf?: string;
}

export interface StudInfo extends UserProps {
  dre?: string;
  cpf?: string;
}

export interface PacInfo extends PersonProps {
  next_appointed_day: string;
  treatment_period: string;
  current_status: string;
  signature: File;
  historic: {};
  idf?: string;
}
