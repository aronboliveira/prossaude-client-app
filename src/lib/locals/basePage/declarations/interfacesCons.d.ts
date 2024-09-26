import { MutableRefObject, Dispatch, SetStateAction, Component } from "react";
import { Root } from "react-dom/client";
import { nullishForm, nullishDlg, nullishInp, nullishTab, voidVal } from "@glSrc/types";
export interface FormData {
  [key: string]: any;
}
export interface UserProfile {
  userClass: string;
  userArea: string;
  userName: string;
  userEmail: string;
  userTel: string;
}
export interface DataContextType {
  formData: FormData;
  updateFormData: (newData: FormData) => void;
}
export interface PanelFormProps {
  formCallback: (form: nullishForm) => void;
}
export interface userProfileDropdownProps {
  user: userProfile;
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
export interface UserDlgProps {
  user: UserProfile;
  setDropdown: Dispatch<SetStateAction<boolean>>;
  setPropDlg: Dispatch<SetStateAction<boolean>>;
  setContac: Dispatch<SetStateAction<boolean>>;
  setUserDlg: Dispatch<SetStateAction<boolean>>;
  shouldShowDropwn: boolean;
  shouldDisplayPropDlg: boolean;
  shoulDisplayContac: boolean;
  shouldDisplayUserDlg: boolean;
  callLogout: () => void;
}
