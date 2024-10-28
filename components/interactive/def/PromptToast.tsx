import { navigatorVars } from "@/vars";
import { toast } from "react-hot-toast";
export default function promptToast(message: string, ph: string): Promise<string> {
  return new Promise(resolve => {
    toast(
      t => (
        <fieldset>
          <p>{message}</p>
          <input
            type='text'
            className='form-control'
            placeholder={ph}
            onKeyDown={e => {
              if (e.key !== "Enter") return;
              resolve((e.target as HTMLInputElement).value);
              setTimeout(() => toast.dismiss(t.id), 200);
            }}
            autoFocus
          />
          <div style={{ marginTop: "1.5rem", width: "100%", display: "flex", justifyContent: "space-around" }}>
            <button
              className='btn btn-secondary'
              onClick={() => {
                resolve("");
                toast.dismiss(t.id);
              }}>
              {navigatorVars.pt ? "Cancelar" : "Cancel"}
            </button>
            <button
              className='btn btn-info'
              onClick={e => {
                const input = (e.target as HTMLElement).parentNode?.querySelector("input");
                resolve(input?.value ?? "");
                toast.dismiss(t.id);
              }}
              style={{ marginLeft: "10px" }}>
              {navigatorVars.pt ? "Confirmar" : "Submit"}
            </button>
          </div>
        </fieldset>
      ),
      {
        duration: Infinity,
        position: "top-center",
      },
    );
  });
}
