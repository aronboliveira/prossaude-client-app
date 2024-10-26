import { ErrorBoundary } from "react-error-boundary";
import { Suspense, lazy } from "react";
import GenericErrorComponent from "../../components/error/GenericErrorComponent";
import HeaderDate from "../../components/interactive/def/HeaderDate";
import OdTipsBtnWrapper from "../../components/interactive/od/OdTipsBtnWrapper";
import SwitchDiv from "../../components/interactive/def/SwitchDiv";
import Watcher from "../../components/interactive/def/Watcher";
import Spinner from "../../components/icons/Spinner";
import Guard from "../../components/interactive/def/Guard";
import { Toaster } from "react-hot-toast";
import { pageProps } from "@/vars";
import Head from "next/head";
const Form = lazy(() => import("../../components/interactive/od/OdForm")),
  { base, name } = pageProps,
  title = `Odontologia — ${name} `,
  metaTags = [
    {
      name: "description",
      content: `Este é um formulário para o Exame Clínico de Odontologia do Projeto ${name}`,
    },
    { property: "og:type", content: "website" },
    {
      property: "og:website:published_time",
      content: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
    },
    { property: "og:site_name", content: `${name}` },
    { property: "og:url", content: `${base}/od/` },
    { property: "og:title", content: `Exame Clínico — ${title}` },
    {
      property: "og:description",
      content: `Acesse o link para preencher o formulário dos dados para o exame clínico de Odontologia do Projeto ${name}`,
    },
    { property: "og:image", content: `${base}/img/pros-od-icon.png` },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "400" },
  ],
  linkTags = [
    { rel: "canonical", href: `${base}/od/` },
    { rel: "icon", href: `/favicon_od.ico`, id: "faviconpross" },
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
    { rel: "stylesheet", href: "odPageStyle.css", id: "odStyles" },
  ];
export default function OdPage(): JSX.Element {
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent message='Error loading form for Odontology' />}>
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
        <header>
          <div role='group' className='flexNoW flexDiv flexAlItT flexSimple flexQ900NoWC' id='hDiv'>
            <div role='group' id='hTextDiv'>
              <div>
                <h1 className='bolded flexJBt' id='hForm'>
                  <strong>Exame Clínico: Odontologia</strong>
                </h1>
                <p>
                  <strong>PROSSaúde — UFRJ</strong>
                </p>
              </div>
              <OdTipsBtnWrapper />
            </div>
            <HeaderDate />
          </div>
        </header>
        <main>
          <SwitchDiv />
          <hr />
          <Suspense fallback={<Spinner fs={true} />}>
            <Form />
          </Suspense>
        </main>
      </div>
      <Watcher routeCase='od' />
      <Guard />
    </ErrorBoundary>
  );
}
