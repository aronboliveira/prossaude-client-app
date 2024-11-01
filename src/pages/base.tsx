import { ErrorBoundary } from "react-error-boundary";
import MainContainer from "../../components/interactive/base/MainContainer";
import Watcher from "../../components/interactive/def/Watcher";
import Guard from "../../components/interactive/def/Guard";
import { Toaster } from "react-hot-toast";
import { pageProps } from "@/vars";
import Head from "next/head";
import sBn from "@/styles/modules/baseNavStyles.module.scss";
const { base, name } = pageProps,
  title = `Base de Navegação — ${name}`,
  metaTags = [
    {
      name: "description",
      content: `Este é uma página para navegação entre as subpáginas do sistema do projeto ${name}`,
    },
    { property: "og:type", content: "website" },
    {
      property: "og:website:published_time",
      content: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
    },
    { property: "og:site_name", content: `${name}` },
    { property: "og:url", content: `${base}/base/` },
    { property: "og:title", content: `${name} — Tela ${title}` },
    {
      property: "og:description",
      content: `Acesse o link para acessar a tela para navegação entre as páginas de preenchimento e trabalho do Projeto ${name}`,
    },
    { property: "og:image", content: `/img/PROS_Saude_Modelo1-Final.png` },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "400" },
  ],
  linkTags = [
    { rel: "canonical", href: `${base}/base/` },
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
    { rel: "stylesheet", href: "basePageStyle.css", id: "baseStyles" },
  ];
export default function BasePage(): JSX.Element {
  return (
    <ErrorBoundary FallbackComponent={() => <div>Erro!</div>}>
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
        <Toaster position='bottom-left' reverseOrder={false} />
      </div>
      <div id='bgDiv' className={sBn.bgDiv}>
        <nav className={`${sBn.mainArticle}`} style={{ width: "100%", height: "100%" }}>
          <header className={`${sBn.header} ${sBn.headerMainContainer} pd1r900Q`}>
            <h1 className={`${sBn.headerMainText} noInvert`}>Menu Inicial — PROS-Saúde: UFRJ</h1>
            <div
              role='group'
              className='flexNoW flexAlItCt cGap1v flexAlItE600Q cGap3v600Q contFitW flexNoWC460Q'
              id='divUserPanel'>
              <section className='form-control mgr__1_5v widThird flexNoW rGap2v flexBasis25 mg__t1_2v mg__0bQ460 widMinFit mg__0b600Q noInvert mg__05b forceInvert'>
                <div role='group' className='widFull flexNoW cGap2v rGap1v flexQ460NoWC wsNoW' id='rootUserInfo'></div>
              </section>
            </div>
          </header>
          <MainContainer />
        </nav>
        <footer className={sBn.footer}></footer>
        <Watcher routeCase='base' />
        <Guard />
      </div>
      <cite style={{ display: "none" }}>
        Direitos Autorais para Design de Imagens e Ícones — Luana Monteiro Serpa:
        https://www.linkedin.com/in/luanamserpa/
      </cite>
    </ErrorBoundary>
  );
}
