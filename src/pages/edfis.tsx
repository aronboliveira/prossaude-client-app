import { ErrorBoundary } from "react-error-boundary";
import ENTipsBtnWrapper from "../../components/interactive/edfis/client/ENTipsBtnWrapper";
import GenericErrorComponent from "../../components/error/GenericErrorComponent";
import HeaderDate from "../../components/interactive/def/HeaderDate";
import SwitchDiv from "../../components/interactive/def/SwitchDiv";
import WatcherEN from "../../components/interactive/edfis/client/WatcherEN";
import { Suspense, lazy } from "react";
import Spinner from "../../components/icons/Spinner";
import Guard from "../../components/interactive/def/Guard";
import sEn from "@/styles//modules/enStyles.module.scss";
import { Toaster } from "react-hot-toast";
import { pageProps } from "@/vars";
import Head from "next/head";
const ENForm = lazy(() => import("../../components/interactive/edfis/client/ENForm")),
  { base, name } = pageProps,
  title = `Educação Física & Nutrição — ${name}`,
  metaTags = [
    {
      name: "description",
      content: `Este é um formulário para o Exame Clínico de Educação Física do Projeto ${name}`,
    },
    { property: "og:type", content: "website" },
    {
      property: "og:website:published_time",
      content: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
    },
    { property: "og:site_name", content: `${name}` },
    { property: "og:url", content: `${base}/edfis/` },
    { property: "og:title", content: `Exame Clínico — ${title}` },
    {
      property: "og:description",
      content: `Acesse o link para preencher o formulário dos dados para o exame clínico de Educação Física & Nutrição do Projeto ${name}`,
    },
    { property: "og:image", content: `/img/PROS_edfis_icon.png` },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "400" },
  ],
  linkTags = [
    { rel: "canonical", href: `${base}/edfis/` },
    { rel: "icon", href: `/favicon_nut.ico`, id: "faviconpross" },
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
    { rel: "stylesheet", href: "edFisNutPageStyle.css", id: "enStyles" },
  ];
export default function EdFisNutPage(): JSX.Element {
  return (
    <ErrorBoundary
      FallbackComponent={() => <GenericErrorComponent message='Error loading form Physical Education and Nutrition' />}>
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
      <div id='bgDiv'>
        <header>
          <div role='group' className='pad1pc'>
            <div role='group' className='flexNoW flexDiv flexAlItT flexSimple flexQ900NoWC' id='hDiv'>
              <div role='group' id='hTextDiv' className='noInvert'>
                <h1 className='bolded flexJBt' id='hForm'>
                  <strong>Ficha de Avaliação:</strong>
                </h1>
                <h2>
                  <strong>Educação Física & Nutrição</strong>
                </h2>
                <p>
                  <strong>PROSSaúde — UFRJ</strong>
                </p>
                <ENTipsBtnWrapper />
              </div>
              <HeaderDate />
            </div>
          </div>
        </header>
        <main className={sEn.main}>
          <SwitchDiv autofill={true} />
          <hr />
          <Suspense fallback={<Spinner fs={true} />}>
            <ENForm />
          </Suspense>
        </main>
      </div>
      <WatcherEN />
      <Guard />
    </ErrorBoundary>
  );
}
