export default function GenericErrorComponent({
  message,
}: {
  message: string;
}): JSX.Element {
  message ??= "Erro indefinido";
  return (
    <article>
      <h2 className="mg-2bv widHalf">
        <strong>Oops, algo deu errado! 😨</strong>
      </h2>
      <h4>{message}</h4>
    </article>
  );
}
