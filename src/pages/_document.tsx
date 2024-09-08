import { DocumentNodeProps } from "@/lib/global/declarations/interfaces";
import { pageProps } from "@/lib/global/vars";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import Script from "next/script";
import path from "path";
import { promises as fs } from "fs";
export async function getStaticProps() {
  const packageJsonPath = path.join(process.cwd(), "../../package.json");
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf-8"));
  return {
    props: {
      deps: packageJson,
    },
  };
}
export default function MyDocument({ deps }: { deps: any }): JSX.Element {
  const { name, base, origin, firstPub } = pageProps;
  return (
    <Html lang="pt-BR">
      <Head>
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta
          name="generator"
          content={`Next.js ${
            deps?.dependencies?.next || deps?.devDependencies?.next || "14.2.4"
          } + TypeScript ${
            deps?.dependencies?.typescript ||
            deps?.devDependencies?.typescript ||
            "5.5.3"
          }`}
        />
        <title>{name}</title>
        <link rel="canonical" href={`${base}`} />
        <meta
          name="description"
          content={`Este é uma página para login no sistema do Projeto ${name}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:website:published_time" content={`${firstPub}`} />
        <meta property="og:site_name" content={`${name}`} />
        <meta property="og:url" content={`${base}`} />
        <meta property="og:title" content={`Login — ${name}`} />
        <meta
          property="og:description"
          content={`Acesse o link para fazer o login no sistema online do Projeto ${name}`}
        />
        <meta
          property="og:image"
          content={`${base}/img/PROS_Saude_Modelo1-Final.png`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="400" />
        <meta property="og:image:alt" content="logo" />
        <link
          rel="alternate"
          type="application/json+oembed"
          href={`${base}/oembed.json`}
        />
        <link
          rel="alternate"
          type="text/xml+oembed"
          href={`${base}/oembed.xml`}
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed for PROSSaúde"
          href={`${base}/rss.xml`}
        />
        <link
          rel="EditURI"
          type="application/rsd+xml"
          title="RSD"
          href={`${base}/xmlrpc.php?rsd`}
        />
        <link rel="icon" href="/favicon_g.ico" id="faviconpross" />
        <link
          rel="apple-touch-icon"
          href={`${origin}/img/apple-touch-icon-iphone-60x60-precomposed.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href={`${origin}/apple-touch-icon-ipad-76x76-precomposed.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href={`${origin}/apple-touch-icon-iphone-retina-120x120-precomposed.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href={`${origin}/apple-touch-icon-ipad-retina-152x152-precomposed.png`}
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
          crossOrigin="anonymous"
          id="bootstrapLink"
        ></link>
      </Head>
      <body>
        <Main />
        <Script
          defer
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        <Script
          defer
          type="application/ld+json"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "${name}",
            description:
              "Este é uma página para login no sistema do Projeto ${name}",
            publisher: {
              "@type": "Organization",
              name: "PROSSaúde",
              url: "${base}/",
              logo: "${base}/img/PROS_Saude_Modelo1-Final.png",
            },`,
          }}
        />
      </body>
      <NextScript />
    </Html>
  );
}
MyDocument.getInitialProps = async (
  ctx: DocumentContext
): Promise<DocumentNodeProps> => {
  return { ...(await Document.getInitialProps(ctx)) };
};
