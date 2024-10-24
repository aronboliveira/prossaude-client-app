"use client";
import { NextRouter } from "next/router";
import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { createContext, useEffect, useRef, useState } from "react";
import UserProfileDropdown from "./UserProfileDropdown";
import { UserState } from "@/lib/locals/basePage/declarations/serverInterfaces";
import { User } from "@/lib/global/declarations/classes";
import { UserPanelCtxProps } from "@/lib/global/declarations/interfaces";
export const UserPanelCtx = createContext<UserPanelCtxProps>({
  setDropdown: null,
  shouldShowDropdown: false,
});
export default function UserProfilePanel({ router, user }: { router: NextRouter; user: UserState }): JSX.Element {
  const userPanelRef = useRef<HTMLSpanElement | null>(null),
    [shouldShowDropdown, setDropdown] = useState<boolean>(false),
    [userName, setName] = useState<string>("Geral"),
    [imageSrc, setSrc] = useState<string>("../img/PROS_icon.png");
  useEffect(() => {
    if (userPanelRef.current instanceof HTMLElement) {
      syncAriaStates([...userPanelRef.current.querySelectorAll("*"), userPanelRef.current]);
      const loadedUser = Object.freeze(
          new User({
            name: user.loadedData.name,
            privilege: user.loadedData.privilege,
            area: user.loadedData.area,
            email: user.loadedData.email,
            telephone: user.loadedData.telephone,
          }),
        ),
        area = /psi/gi.test(loadedUser.userArea) ? "psi" : loadedUser.userArea;
      setName(user.loadedData.name);
      switch (area) {
        case "odontologia":
          setSrc("../img/pros-od-icon.png");
          break;
        case "educação física":
          setSrc("../img/pros_edfis_icon.png");
          break;
        case "nutrição":
          setSrc("../img/pros_nut_icon.png");
          break;
        case "psi":
          setSrc("../img/icon-psy.png");
          break;
        default:
          setSrc("../img/PROS_icon.png");
      }
    } else elementNotFound(userPanelRef.current, "JSX for user panel", extLine(new Error()));
  }, [user]);
  return (
    <UserPanelCtx.Provider value={{ setDropdown, shouldShowDropdown }}>
      <span className='posRl flexNoW flexNoW900Q cGap0_5v rGap1v900Q contFitW noInvert' ref={userPanelRef}>
        <output id='nameLogin' data-title='Usuário ativo'>
          {userName}
        </output>
        <span id='contProfileImg' className='profileIcon'>
          <img
            decoding='async'
            loading='lazy'
            src={imageSrc}
            className='profileIcon mg__03rb'
            id='profileIconImg'
            data-container='body'
            data-toggle='popover'
            title='Informações de Usuário'
            data-placement='bottom'
            onClick={() => setDropdown(!shouldShowDropdown)}
            alt='User img'
          />
        </span>
        {shouldShowDropdown && (
          <UserProfileDropdown
            user={user}
            setDropdown={setDropdown}
            shouldShowDropdown={shouldShowDropdown}
            router={router}
          />
        )}
      </span>
    </UserPanelCtx.Provider>
  );
}
