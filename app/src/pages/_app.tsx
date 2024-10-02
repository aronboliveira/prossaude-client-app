import type { AppProps } from "next/app";
import { Context, createContext } from "react";
import { AppRootContextType } from "@/lib/global/declarations/interfaces";
import { Provider } from "react-redux";
import "../styles/globals/gStyle.scss";
import "../styles/locals/loginPageStyle.scss";
import "../styles/locals/basePageStyle.scss";
import "../styles/locals/aGPageStyle.scss";
import "../styles/locals/edFisNutPageStyle.scss";
import "../styles/locals/odPageStyle.scss";
import "../styles/locals/panelPageStyle.scss";
import "../styles/locals/recoverPageStyle.scss";
import mainStore from "@/redux/mainStore";
export const AppRootContext: Context<AppRootContextType> = createContext<AppRootContextType>({
  roots: {
    nextRoot: undefined,
  },
});
export default function ProSaudeApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={mainStore}>
      <AppRootContext.Provider value={{ roots: { nextRoot: undefined } }}>
        <Component {...pageProps} />
      </AppRootContext.Provider>
    </Provider>
  );
}
