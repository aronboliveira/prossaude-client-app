import { useEffect, useState } from "react";
import { UserState } from "@/lib/locals/basePage/declarations/serverInterfaces";
import { defUser } from "@/redux/slices/userSlice";
import { NextRouter } from "next/router";
export default function withUserData(
  Wrapped: React.ComponentType<{ user: UserState; router: NextRouter }>,
): (props: any) => JSX.Element {
  return function UserDataHOC(props: any): JSX.Element {
    const [user, setUser] = useState<UserState>(defUser);
    useEffect(
      () =>
        setUser(
          localStorage.getItem("activeUser") ? JSON.parse(localStorage.getItem("activeUser")!) : defUser.loadedData,
        ),
      [],
    );
    return <Wrapped user={user} {...props} />;
  };
}
