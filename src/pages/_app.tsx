import App from "next/app";
import type { AppContext, AppProps } from "next/app";
import { ProSaudeAppProps } from "@/lib/global/declarations/interfaces";
import { Context, createContext } from "react";
import { AppRootContextType } from "@/lib/global/declarations/interfaces";
import "../styles/globals/gStyle.scss";
import "../styles/locals/loginPageStyle.scss";
import "../styles/locals/basePageStyle.scss";
import "../styles/locals/aGPageStyle.scss";
import "../styles/locals/edFisNutPageStyle.scss";
import "../styles/locals/odPageStyle.scss";
import "../styles/locals/panelPageStyle.scss";

export const AppRootContext: Context<AppRootContextType> =
  createContext<AppRootContextType>({
    roots: {
      nextRoot: undefined,
    },
  });

export default function ProSaudeApp({ Component, pageProps }: AppProps) {
  return (
    <AppRootContext.Provider value={{ roots: { nextRoot: undefined } }}>
      <Component {...pageProps} />
    </AppRootContext.Provider>
  );
}
ProSaudeApp.getInitialProps = async (
  ctx: AppContext
): Promise<ProSaudeAppProps> => {
  return { ...(await App.getInitialProps(ctx)) };
};
