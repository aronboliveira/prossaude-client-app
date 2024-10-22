import { toast } from "react-hot-toast";
export default function promptToast(message: string, ph: string): Promise<string> {
  return new Promise(resolve => {
    toast(
      t => (
        <div>
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
              {navigator.language.startsWith("pt-") ? "Cancelar" : "Cancel"}
            </button>
            <button
              className='btn btn-info'
              onClick={e => {
                const input = (e.target as HTMLElement).parentNode?.querySelector("input");
                resolve(input?.value ?? "");
                toast.dismiss(t.id);
              }}
              style={{ marginLeft: "10px" }}>
              {navigator.language.startsWith("pt-") ? "Confirmar" : "Submit"}
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: "top-center",
      },
    );
  });
}
