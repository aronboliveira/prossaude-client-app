import { formatCPF } from "@/lib/global/gModel";
import { handleCondtReq } from "@/lib/global/handlers/gHandlers";
"use client";


export default function CPFElement(): JSX.Element {
  return (
    <input
      type="text"
      id="inpCPF"
      maxLength={16}
      pattern="/^(\d{3}\.){2}\d{3}-\d{2}$/"
      className="form-control noInvert"
      placeholder="Preencha com o CPF"
      autoComplete="username"
      data-title="CPF"
      onInput={ev => {
        formatCPF(ev.currentTarget);
        handleCondtReq(ev.currentTarget, {
          min: 1,
          max: 16,
          pattern: ["^(d{3}.){2}d{3}-d{2}$", ""],
        });
      }}
    />
  );
}
