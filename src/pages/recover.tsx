import { ErrorBoundary } from "react-error-boundary";
import Watcher from "../../components/interactive/def/Watcher";
import GenericErrorComponent from "../../components/error/GenericErrorComponent";
import RecoverForm from "../../components/interactive/recover/RecoverForm";
import { Toaster } from "react-hot-toast";
import { pageProps } from "@/vars";
import Head from "next/head";
const { base, name } = pageProps,
  title = `Recuperação de Senha &#8211 ${name}`,
  metaTags = [
    { name: "description", content: `Este é o painel de trabalho principal para o Projeto ${name}` },
    { property: "og:type", content: "website" },
    {
      property: "og:website:published_time",
      content: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
    },
    { property: "og:site_name", content: `${name}` },
    { property: "og:url", content: `${base}/recover/` },
    { property: "og:title", content: `${title}` },
    {
      property: "og:description",
      content: `Acesse o link para preencher acessar a página de recuperação de senha do Projeto ${name}`,
    },
    { property: "og:image", content: `${base}/img/PROS_Saude_Modelo1-Final.png` },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "400" },
  ],
  linkTags = [
    { rel: "canonical", href: `${base}/recover/` },
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
    { rel: "stylesheet", href: "recoverPageStyle.css", id: "recoverStyles" },
  ];
export default function Recover(): JSX.Element {
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent message='Error loading Recover Password Page!' />}>
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
        <RecoverForm />
      </div>
      <Watcher routeCase='recover' />
    </ErrorBoundary>
  );
}
