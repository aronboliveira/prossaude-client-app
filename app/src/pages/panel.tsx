import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../components/error/GenericErrorComponent";
import MainFormPanel from "../../components/mainPanel/MainFormPanel";
import TipsBtnWrapper from "../../components/interactive/panel/TipsBtnWrapper";
import Guard from "../../components/interactive/def/Guard";
import { Toaster } from "react-hot-toast";
import { pageProps } from "@/vars";
import Head from "next/head";
import EnhancedUserProfilePanel from "../../components/user/EnhancedUserProfilePanel";
const { base, name } = pageProps;
const title = `Painel de Trabalho — ${name}`,
  metaTags = [
    { name: "description", content: `Este é o painel de trabalho principal para o Projeto ${name}` },
    { property: "og:type", content: "website" },
    {
      property: "og:website:published_time",
      content: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
    },
    { property: "og:site_name", content: `${name}` },
    { property: "og:url", content: `${base}/panel/` },
    { property: "og:title", content: `${title}` },
    {
      property: "og:description",
      content: `Acesse o link para preencher acessar o painel de trabalho online do Projeto ${name}`,
    },
    { property: "og:image", content: `${base}/img/PROS_Saude_Modelo1-Final.png` },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "400" },
  ],
  linkTags = [
    { rel: "canonical", href: `${base}/panel/` },
    { rel: "icon", href: `/favicon_g.ico`, id: "faviconpross" },
    { rel: "apple-touch-icon", href: `/img/apple-touch-icon-iphone-60x60-precomposed.png` },
    {
      rel: "apple-touch-icon",
      sizes: "60x60",
      href: `/img/apple-touch-icon-ipad-76x76-precomposed.png`,
    },
    {
      rel: "apple-touch-icon",
      sizes: "114x114",
      href: `/img/apple-touch-icon-iphone-retina-120x120-precomposed.png`,
    },
    {
      rel: "apple-touch-icon",
      sizes: "144x144",
      href: `/img/apple-touch-icon-ipad-retina-152x152-precomposed.png`,
    },
    { rel: "stylesheet", href: "panelPageStyle.css", id: "panelStyles" },
  ];
export default function PanelPage(): JSX.Element {
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent message='Error rendering Panel Page' />}>
      <Head>
        <title>{title}</title>
        {metaTags.map((tag, i) => (
          <meta key={i} {...tag} />
        ))}
        {linkTags.map((tag, i) => (
          <link key={i} {...tag} />
        ))}
      </Head>
      <div>
        <Toaster />
      </div>
      <div role='group' className='pad1pc' id='bgDiv'>
        <header className='flexJBt flexAlItSt flexNoWC600Q flexAlItCt600Q pd_2vQ460 rGap1v mg__0lm601Q pd__1rbm601Q'>
          <div role='group' className='flexNoW flexAlItSE flexSimple flexQ900NoWC flexAlItSt900Q'>
            <h1 className='bolded mg__1t noInvert mgr__1v'>
              <strong className='noInvert'>Painel de Trabalho</strong>
            </h1>
            <TipsBtnWrapper />
          </div>
          <hr className='widFull d-no d_bl600Q' />
          <div
            role='group'
            className='flexNoW flexNoWC600Q flexAlItCt cGap1v flexAlItSt600Q form-control contFitW'
            id='wrapperUserInfo'>
            <section
              className='form-control noMargin widThird flexNoW rGap2v flexBasis25 mg__0bQ460 widMinFit mg__0b600Q noInvert'
              id='sectUserInfo'>
              <div role='group' className='widFull flexNoW cGap2v rGap1v flexQ460NoWC wsNoW' id='rootUserInfo'>
                <EnhancedUserProfilePanel />
              </div>
            </section>
          </div>
          <hr className='widFull d-no d_bl600Q' />
        </header>
        <main>
          <section className='flexColumn' id='registSect'>
            <div role='group' id='panelDiv'>
              <MainFormPanel />
              <div role='group' id='pacDiv' className='formPadded'></div>
            </div>
          </section>
        </main>
      </div>
      <div role='group' id='rootDlgList'></div>
      <canvas id='chreference' hidden>
        0
      </canvas>
      <Guard />
    </ErrorBoundary>
  );
}
