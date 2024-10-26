export default function GenericErrorComponent({ message }: { message: string }): JSX.Element {
  message ??= "Erro indefinido";
  return (
    <article
      style={{
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        width: "100vw",
        height: "100vh",
        paddingInline: "10vw",
        backgroundColor: "#afa3a396",
      }}>
      <h2 className='mg__2bv widHalf'>
        <strong style={{ marginTop: "0.25rem" }}>Oops, algo deu errado! 😨</strong>
      </h2>
      <h4 style={{ fontSize: "0.8rem", marginBlock: "1rem" }}>{message}</h4>
      <button style={{ fontWeight: "bold" }} className='btn btn-info' onClick={() => location.replace("/login")}>
        Retornar ao Login
      </button>
    </article>
  );
}
