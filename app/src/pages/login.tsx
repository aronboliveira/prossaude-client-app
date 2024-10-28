import { ErrorBoundary } from "react-error-boundary";
import Watcher from "../../components/interactive/def/Watcher";
import GenericErrorComponent from "../../components/error/GenericErrorComponent";
import { Suspense, lazy } from "react";
import Spinner from "../../components/icons/Spinner";
import ReactBrand from "../../components/icons/ReactBrand";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import { pageProps } from "@/vars";
import sLp from "@/styles/modules/loginStyles.module.scss";
const Login = lazy(() => import("../../components/interactive/login/LoginInputs")),
  { base, name } = pageProps,
  title = `Login — ${name}`,
  metaTags = [
    {
      name: "description",
      content: `Este é uma página para login no sistema do projeto ${name}`,
    },
    { property: "og:type", content: "website" },
    {
      property: "og:website:published_time",
      content: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
    },
    { property: "og:site_name", content: name },
    { property: "og:url", content: `${base}/` },
    { property: "og:title", content: title },
    {
      property: "og:description",
      content: `Acesse o link para fazer o login no sistema online do Projeto ${name}`,
    },
    { property: "og:image", content: `${base}/img/PROS_Saude_Modelo1-Final.png` },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "400" },
    { property: "og:image:alt", content: "logo" },
  ],
  linkTags = [
    { rel: "icon", href: `/favicon_g.ico`, id: "faviconpross" },
    {
      rel: "apple-touch-icon",
      href: `/apple-touch-icon-iphone-60x60-precomposed.png`,
    },
    {
      rel: "apple-touch-icon",
      sizes: "60x60",
      href: `/apple-touch-icon-ipad-76x76-precomposed.png`,
    },
    {
      rel: "apple-touch-icon",
      sizes: "114x114",
      href: `/apple-touch-icon-iphone-retina-120x120-precomposed.png`,
    },
    {
      rel: "apple-touch-icon",
      sizes: "144x144",
      href: `/apple-touch-icon-ipad-retina-152x152-precomposed.png`,
    },
    { rel: "preload", as: "image", href: "/img/PROS_Saude_Modelo1-Final.webp" },
  ];
export default function LoginPage(): JSX.Element {
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <ErrorBoundary FallbackComponent={() => <GenericErrorComponent message='Error loading Login Page' />} />
      )}>
      <Head>
        <title>{title}</title>
        {metaTags.map((tag, i) => (
          <meta key={i} {...tag} />
        ))}
        {linkTags.map((tag, i) => (
          <link key={i} {...tag} />
        ))}
      </Head>
      <div role='group' className={`pad1pc ${sLp.bgDiv}`} id='bgDiv'>
        <main className={`${sLp.main}`}>
          <div>
            <Toaster />
          </div>
          <div className={`${sLp.outerLoginCont}`} id='outerLoginCont'>
            <div className={`${sLp.loginCont}`} role='group' id='loginCont'>
              <section id='logoCont'>
                <img
                  className={`fade-in-element`}
                  id='logo'
                  src='/img/PROS_Saude_Modelo1-Final.webp'
                  alt='logo'
                  width='322'
                  height='155'
                  sizes='(max-width: 499px) 11.5625rem, (max-width: 714px) 16.6875rem, 20.125rem'
                  loading='eager'
                  title={`Direitos Autorais para Design de Imagens e Ícones —
                  Luana Monteiro Serpa: https://www.linkedin.com/in/luanamserpa/`}
                />
              </section>
              <section className={`${sLp.headerCont}`} id='headerCont'>
                <div className={`${sLp.titleCont1}`} role='group' id='titleCont1'>
                  <h1 className={`${sLp.titleText}`} id='titleText'>
                    <span role='group' className='fade-in-element' id='spanTitle'>
                      Faça o Login
                    </span>
                  </h1>
                </div>
                <div className={`${sLp.titleCont2}`} role='group' id='titleCont2'>
                  <h2 className={`${sLp.subtitleText}`} id='subtitleText'>
                    <span role='group' className='fadeInLateElement' id='spanSubtitle'>
                      Informe seus dados de usuário
                    </span>
                  </h2>
                </div>
              </section>
              <Suspense fallback={<Spinner fs={true} />}>
                <Login />
              </Suspense>
            </div>
          </div>
          <ReactBrand />
        </main>
      </div>
      <Watcher routeCase='login' />
    </ErrorBoundary>
  );
}
