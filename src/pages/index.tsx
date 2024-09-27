import LoginPage from "./login";
export const basePath = {
  path: "",
  ph: "undefined",
};
export const getServerSideProps = async () => {
  const data = {
    fetch: "",
    status: 404,
    text: "",
  };
  try {
    console.log("TRYING ON SERVER...");
    const res = await fetch("https://cdn.jsdelivr.net/gh/aronboliveira/my-python@main/fetch_test.py", {
      method: "GET",
      headers: {},
      mode: "cors",
      credentials: "same-origin",
      referrer: "",
      referrerPolicy: "same-origin",
      cache: "no-store",
      redirect: "error",
      keepalive: false,
    });
    if (!res.ok)
      throw new Error(
        `${res.status}: ${res.statusText} && ${res.redirected ? "should redirect" : "should not redirect"}`,
      );
    let script = await res.text();
    script = JSON.parse(script.slice(script.indexOf("{"), script.lastIndexOf("}") + 1).trim());
    data.fetch = script;
    data.status = res.status;
    data.text = res.statusText;
  } catch (e) {
    console.warn(`Failed to execute fetch API:
       Name: ${(e as Error).name}
       Message: ${(e as Error).message}
       Stack: ${(e as Error).stack || "undefined"}
       Cause: ${(e as Error).cause || "undefined"}`);
  }
  return {
    props: { data },
  };
};
export default function Home({ data }: { data: any }): JSX.Element {
  console.log(data.fetch);
  return <LoginPage data={data} />;
}
