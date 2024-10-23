import { ErrorBoundary } from "react-error-boundary";
import { Suspense, lazy } from "react";
import AgTipsBtnWrapper from "../../components/interactive/ag/AgTipsBtnWrapper";
import GenericErrorComponent from "../../components/error/GenericErrorComponent";
import HeaderDate from "../../components/interactive/def/HeaderDate";
import Watcher from "../../components/interactive/def/Watcher";
import SwitchDiv from "../../components/interactive/def/SwitchDiv";
import Spinner from "../../components/icons/Spinner";
import { Toaster } from "react-hot-toast";
import { pageProps } from "@/vars";
import Head from "next/head";
const Form = lazy(() => import("../../components/interactive/ag/AgForm")),
  { base, name } = pageProps,
  title = `Anamnese Geral — ${name}`,
  metaTags = [
    { name: "description", content: `Este é um formulário para a Anamnese Geral do projeto PROSSaúde — UFRJ` },
    { property: "og:type", content: "website" },
    {
      property: "og:website:published_time",
      content: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
    },
    { property: "og:site_name", content: `${name}` },
    { property: "og:url", content: `${base}/ag/` },
    { property: "og:title", content: `Exame Clínico — ${title}` },
    {
      property: "og:description",
      content: `Acesse o link para preencher o formulário dos dados para a Anamnese Geral do Projeto ${name}`,
    },
    { property: "og:image", content: `/img/PROS_Saude_Modelo1-Final.png` },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "400" },
  ],
  linkTags = [
    { rel: "canonical", href: `${base}/ag/` },
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
    { rel: "stylesheet", href: "aGPageStyle.css", id: "agStyles" },
  ];
export default function AGPage(): JSX.Element {
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent message='Error loading form for Anamnesis' />}>
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
      <div className='pad1pc' id='bgDiv' role='document'>
        <header>
          <div className='flexNoW flexDiv flexAlItT flexSimple flexQ900NoWC' id='hDiv' role='group'>
            <div role='group'>
              <div className='noInvert'>
                <h1 className='bolded flexJBt' id='hForm'>
                  Anamnese Geral
                </h1>
                <h2 className='bolded'>PROSSaúde, UFRJ</h2>
                <AgTipsBtnWrapper />
              </div>
              <SwitchDiv />
            </div>
            <HeaderDate />
          </div>
        </header>
        <main>
          <hr />
          <Suspense fallback={<Spinner fs={true} />}>
            <Form />
          </Suspense>
        </main>
      </div>
      <Watcher routeCase='ag' />
    </ErrorBoundary>
  );
}
