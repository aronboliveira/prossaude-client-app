import { addEmailExtension } from "@/lib/global/gModel";
import { handleCondtReq } from "@/lib/global/handlers/gHandlers";


export default function Email({
  name = "email",
  id = "email1Id",
  title = "E-mail Primário",
}: {
  name?: string;
  id?: string;
  title?: string;
}): JSX.Element {
  return (
    <input
      type="text"
      name={name}
      id={id}
      className="form-control inpIdentif noInvert inpEmail"
      autoComplete="email"
      data-title={title}
      onInput={ev => {
        addEmailExtension(ev.currentTarget);
        handleCondtReq(ev.currentTarget, {
          min: 6,
          pattern: ["@", "g"],
        });
      }}
      onClick={ev => addEmailExtension(ev.currentTarget)}
    />
  );
}
