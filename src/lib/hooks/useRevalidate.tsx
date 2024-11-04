import { useRef, useReducer, useEffect, Dispatch, MutableRefObject, SetStateAction } from "react";
import Spinner from "../../../components/icons/Spinner";
import { useQuery } from "@tanstack/react-query";
import { handleFetch } from "../global/data-service";
import { formCases, nlHtEl } from "../global/declarations/types";
import { navigatorVars } from "@/vars";
import GenericErrorComponent from "../../../components/error/GenericErrorComponent";
import { PacInfo, ProfInfo, StudInfo } from "../global/declarations/interfacesCons";
import { syncAriaStates } from "../global/handlers/gHandlers";
export default function useRevalidate({
  apiRoute,
  onSuccess,
  onError,
  rowFn,
  validator,
  dispatch,
  ref,
}: {
  apiRoute: formCases;
  onSuccess: JSX.Element;
  onError: JSX.Element;
  rowFn: (p: any, i: number) => JSX.Element;
  validator: (data: Partial<ProfInfo | StudInfo | PacInfo>) => boolean;
  dispatch: (value: SetStateAction<JSX.Element[]>) => void;
  ref: MutableRefObject<nlHtEl>;
}): {
  caption: JSX.Element;
  setCaption: Dispatch<"pending" | "success" | "error">;
  validated: MutableRefObject<boolean | "pending">;
} {
  const validated = useRef<"pending" | boolean>(true),
    [caption, setCaption] = useReducer<(state: JSX.Element, action: "success" | "error" | "pending") => JSX.Element>(
      (state: JSX.Element, action: "success" | "error" | "pending") => {
        switch (action) {
          case "success":
            return onSuccess;
          case "error":
            return onError;
          case "pending":
            return <Spinner />;
          default:
            return state;
        }
      },
      onSuccess,
    );
  useQuery({
    queryKey: [`req_${apiRoute}_tab`],
    queryFn: async () => {
      setCaption("pending");
      validated.current = "pending";
      const res = await handleFetch(apiRoute, "_table", true);
      if (!res)
        throw new Error(
          navigatorVars.pt ? `Houve algum erro validando a página` : "There was some error validating the page",
        );
      if (!Array.isArray(res))
        throw new Error(
          navigatorVars.pt ? `A lista de dados não pôde ser criada` : "The data list could not be created",
        );
      const filtered = res.filter(p => validator(p));
      validated.current = filtered.length > 0 ? true : false;
      dispatch(prev => {
        prev.splice(0, prev.length);
        return filtered.length === 0
          ? [<GenericErrorComponent key={crypto.randomUUID()} message='❌ Não foi possível carregar os dados!' />]
          : filtered
              .map(p => {
                return { desc: apiRoute, ind: p };
              })
              .map((p, i) => rowFn(p, i));
      });
      setTimeout(
        () => syncAriaStates([...(ref.current?.querySelectorAll("*") ?? []), ref.current ?? document.body]),
        500,
      );
      return [...new Set(res)];
    },
    networkMode: "online",
    staleTime: 60000 * 5,
    refetchInterval: 60000 * 10,
    refetchOnMount: true,
    refetchIntervalInBackground: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    setTimeout(() => {
      validated.current ? setCaption("success") : setCaption("error");
    }, 1000);
  }, [validated.current]);
  return { caption, setCaption, validated };
}
