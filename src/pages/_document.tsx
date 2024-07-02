import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { DocumentNodeProps } from "@/lib/global/declarations/interfaces";

export default function MyDocument() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link
          rel="apple-touch-icon"
          href="img/apple-touch-icon-iphone-60x60-precomposed.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="img/apple-touch-icon-ipad-76x76-precomposed.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="img/apple-touch-icon-iphone-retina-120x120-precomposed.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="img/apple-touch-icon-ipad-retina-152x152-precomposed.png"
        />
        <link rel="icon" href="/favicon_g.ico" id="faviconpross" />
        <title>Login — PROSSaúde</title>
        <meta
          name="description"
          content="Este é uma página para login no sistema do projeto PROSSaúde — UFRJ"
        />
        <meta property="og:type" content="website" />
        <meta property="og:website:published_time" content="2024-07-02" />
        <meta property="og:site_name" content="Login — PROSSaúde" />
        <meta
          property="og:url"
          content="https://prossaude-client.netlify.app/"
        />
        <meta property="og:title" content="PROSSaúde — UFRJ — Login" />
        <meta
          property="og:description"
          content="Acesse o link para fazer o login no sistema online do Projeto PROSSaúde, UFRJ"
        />
        <meta
          property="og:image"
          content="https://prossaude-client.netlify.app/img/PROS_Saude_Modelo1-Final.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="400" />
        <meta property="og:image:alt" content="logo" />
      </Head>
      <body>
        <Main />
      </body>
      <script
        async
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossOrigin="anonymous"
      ></script>
      <NextScript />
    </Html>
  );
}
MyDocument.getInitialProps = async (
  ctx: DocumentContext
): Promise<DocumentNodeProps> => {
  return { ...(await Document.getInitialProps(ctx)) };
};
