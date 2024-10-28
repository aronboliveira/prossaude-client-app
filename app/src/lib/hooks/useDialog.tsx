import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { DlgProps } from "../global/declarations/interfaces";
import { nlDlg, rKbEv } from "../global/declarations/types";
import { NextRouter, useRouter } from "next/router";
import { syncAriaStates } from "../global/handlers/gHandlers";
export default function useDialog({ state, dispatch, param }: DlgProps & { param: string }): {
  mainRef: MutableRefObject<nlDlg>;
  router: NextRouter;
  handleKp: (kp: rKbEv) => void;
} {
  const mainRef = useRef<nlDlg>(null),
    router = useRouter(),
    handleKp = useCallback(
      (kp: rKbEv): void => {
        if (kp.key !== "ESCAPE") return;
        dispatch(!state);
        !state && mainRef.current?.close();
      },
      [state, dispatch],
    );
  useEffect(() => {
    if (!router.query[param]) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, [param]: "open" },
      });
    }
    return () => {
      const { [param]: _, ...rest } = router.query;
      if (router.query[param]) {
        router.replace({
          pathname: router.pathname,
          query: rest,
        });
      }
    };
  }, [router.query[param]]);
  useEffect(() => {
    try {
      if (!(mainRef.current instanceof HTMLElement)) return;
      syncAriaStates([mainRef.current, ...mainRef.current.querySelectorAll("*")]);
      mainRef.current instanceof HTMLDialogElement && mainRef.current.showModal();
    } catch (e) {
      return;
    }
    addEventListener("keypress", handleKp);
    return (): void => removeEventListener("keypress", handleKp);
  }, [mainRef, handleKp, state]);
  return { mainRef, router, handleKp };
}
