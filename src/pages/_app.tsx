import type { AppProps } from "next/app";
import { Context, createContext } from "react";
import { RootCtxType } from "@/lib/global/declarations/interfaces";
import { Provider } from "react-redux";
import "../styles/globals/gStyle.scss";
import "../styles/globals/reactSpinner.scss";
import "../styles/globals/loginPageStyle.scss";
import mainStore from "@/redux/mainStore";
export const RootCtx: Context<RootCtxType> = createContext<RootCtxType>({
  divModal: {
    current: null,
  },
  divModalSec: {
    current: null,
  },
  divModalTerc: {
    current: null,
  },
  roots: {
    nextRoot: undefined,
  },
});
export default function ProSaudeApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={mainStore}>
      <RootCtx.Provider
        value={{
          divModal: { current: null },
          divModalSec: { current: null },
          divModalTerc: { current: null },
          roots: { nextRoot: undefined },
        }}>
        <Component {...pageProps} />
      </RootCtx.Provider>
    </Provider>
  );
}
