import { elementNotFound, extLine } from "@/lib/global/handlers/errorHandler";
import { syncAriaStates } from "@/lib/global/handlers/gHandlers";
import { UserProfile } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { useEffect, useRef, useState } from "react";
import UserProfileDropdown from "./UserProfileDropdown";
import { NextRouter } from "next/router";

export default function UserProfilePanel({
  user,
  router,
}: {
  user: UserProfile;
  router: NextRouter;
}): JSX.Element {
  const userPanelRef = useRef<HTMLSpanElement | null>(null);
  const [shouldShowDropdown, setDropdown] = useState<boolean>(false);
  useEffect(() => {
    if (userPanelRef.current instanceof HTMLElement) {
      syncAriaStates([
        ...userPanelRef.current.querySelectorAll("*"),
        userPanelRef.current,
      ]);
    } else
      elementNotFound(
        userPanelRef.current,
        "JSX for user panel",
        extLine(new Error())
      );
  }, [userPanelRef]);
  const toggleUserDropdown = (): void => {
    setDropdown(!shouldShowDropdown);
  };
  const area = /psi/gi.test(user.userArea) ? "psi" : user.userArea;
  let imageSrc = "../img/PROS_icon.png";
  switch (area) {
    case "odontologia":
      imageSrc = "../img/pros-od-icon.png";
      break;
    case "educação física":
      imageSrc = "../img/pros_edfis_icon.png";
      break;
    case "nutrição":
      imageSrc = "../img/pros_nut_icon.png";
      break;
    case "psi":
      imageSrc = "../img/icon-psy.png";
      break;
    default:
      imageSrc = "../img/PROS_icon.png";
  }
  return (
    <span
      className="posRl flexNoW flexNoW900Q cGap0-5v rGap1v900Q contFitW noInvert"
      ref={userPanelRef}
    >
      <output id="nameLogin" data-title="Usuário ativo">
        {`${user.userName}`}
      </output>
      <span id="contProfileImg" className="profileIcon">
        <img
          src={imageSrc}
          className="profileIcon mg-03rb"
          id="profileIconImg"
          data-container="body"
          data-toggle="popover"
          title="Informações de Usuário"
          data-placement="bottom"
          onClick={toggleUserDropdown}
          alt="User img"
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
  );
}
