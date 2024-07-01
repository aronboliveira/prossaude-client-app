import { ErrorDlgProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { useRef } from "react";

export default function ErrorFallbackDlg({
  renderError,
  onClick,
}: ErrorDlgProps): JSX.Element {
  const mainArticleRef = useRef<HTMLElement | null>(null);
  return (
    <article role="alert" id="errorDlgDiv" ref={mainArticleRef}>
      <h2 className="mg-2bv widHalf">
        <strong>Oops, algo deu errado! 😨</strong>
      </h2>
      <h4>{renderError.message}</h4>
      <small>Feche a janela e tente novamente ou recarregue a página!</small>
      <br />
      <button
        className="btn btn-warning bolded widFull mg-1t"
        id="retryRenderBtn"
        onClick={onClick}
      >
        Fechar
      </button>
    </article>
  );
}
