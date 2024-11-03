import { useState, useEffect, useMemo, MutableRefObject, useRef } from "react";
import { handleFetch } from "../global/data-service";
import { formCases, nlHtEl } from "../global/declarations/types";
import { PacInfo, ProfInfo, StudInfo } from "../global/declarations/interfacesCons";
import { syncAriaStates } from "../global/handlers/gHandlers";
import { navigatorVars } from "@/vars";
import { toast } from "react-hot-toast";
import {
  PacInfoValidator,
  PersonValidator,
  ProfInfoValidator,
  StudInfoValidator,
} from "../global/declarations/classes";
import TabSpinner from "../../../components/icons/TabSpinner";
import GenericErrorComponent from "../../../components/error/GenericErrorComponent";
import { codifyError } from "../global/handlers/errorHandler";
export function useDataFetch(
  apiRoute: formCases,
  ref: MutableRefObject<nlHtEl>,
  dataParser: (p: PacInfo | ProfInfo | StudInfo, i: number) => JSX.Element,
): {
  data: JSX.Element[];
  grp: (PacInfo | ProfInfo | StudInfo)[];
  loaded: boolean;
} {
  let grp: (PacInfo | ProfInfo | StudInfo)[] = useMemo<any[]>((): any[] => [], []);
  const [data, setData] = useState<JSX.Element[]>([
      <TabSpinner
        key={crypto.randomUUID()}
        spinnerClass='spinner-border'
        spinnerColor='text-info'
        message='Loading data...'
      />,
    ]),
    [loaded, setLoad] = useState<boolean>(false),
    tabToasted = useRef<boolean>(false),
    validator = useMemo<(data: Partial<ProfInfo | StudInfo | PacInfo>) => boolean>((): ((
      data: Partial<ProfInfo | StudInfo | PacInfo>,
    ) => boolean) => {
      switch (apiRoute) {
        case "profs":
          return new ProfInfoValidator().validate;
        case "studs":
          return new StudInfoValidator().validate;
        case "patients":
          return new PacInfoValidator().validate;
        default:
          return new PersonValidator().validate;
      }
    }, [apiRoute]);
  useEffect(() => {
    handleFetch(apiRoute, "_table", true)
      .then(res => {
        if (!ref)
          throw new Error(
            navigatorVars.pt ? `Houve algum erro validando a página` : "There was some error validating the page",
          );
        if (Array.isArray(res)) {
          for (const p of res) !grp.includes(p) && grp.push(p as ProfInfo | StudInfo | PacInfo);
          const grpSet = new Set(grp);
          grp = [...grpSet];
        } else
          throw new Error(
            navigatorVars.pt ? `A lista de dados não pôde ser criada` : "The data list could not be created",
          );
      })
      .catch(err => {
        if (tabToasted.current) return;
        toast.error(
          `${navigatorVars.pt ? `Erro: código` : `Error: code`} ${codifyError(err)}` ||
            (navigatorVars.pt ? `Erro desconhecido` : `Unknown error`),
        );
        tabToasted.current = true;
        setTimeout(() => (tabToasted.current = false), 3000);
      })
      .finally(() => {
        setTimeout(
          () => syncAriaStates([...(ref.current?.querySelectorAll("*") ?? []), ref.current ?? document.body]),
          1200,
        );
        !loaded && setLoad(true);
      });
  }, [apiRoute, dataParser, ref]);
  useEffect(() => {
    if (!loaded) return;
    const filtered = grp.filter(p => validator(p));
    if (filtered.length > 0)
      toast.success(`Lista de dados carregada com sucesso`, {
        duration: 1000,
        iconTheme: { primary: "#07919e", secondary: "#FFFAEE" },
      });
    else if (!tabToasted.current) {
      toast.error(navigatorVars.pt ? `A lista de dados não foi preenchida` : "The data list was not filled");
      tabToasted.current = true;
      setTimeout(() => (tabToasted.current = false), 3000);
    }
    setData(prev => {
      prev.splice(0, prev.length);
      return filtered.length === 0
        ? [<GenericErrorComponent message='❌ Não foi possível carregar os dados!' />]
        : filtered.map((p, i) => dataParser(p, i));
    });
    setTimeout(
      () => syncAriaStates([...(ref.current?.querySelectorAll("*") ?? []), ref.current ?? document.body]),
      500,
    );
  }, [loaded, ref, validator]);
  return { data, grp, loaded };
}
