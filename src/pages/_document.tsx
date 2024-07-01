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
      <Head></Head>
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
