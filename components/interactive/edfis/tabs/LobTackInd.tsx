import { textTransformPascal } from "@/lib/global/gModel";
import { validTabLabs } from "@/lib/global/declarations/types";

export default function LockTabInd({
  ctx,
  addGroup,
  isSpan,
}: {
  ctx: validTabLabs | "GordCorpLvl" | "formCalcTMB";
  addGroup?: string[];
  isSpan?: boolean;
}): JSX.Element {
  const pascalCtx = textTransformPascal(ctx);
  return isSpan ? (
    <span
      role="img"
      className={`noInvert lock_inpGet${
        addGroup ? addGroup.map(group => ` ${group}`).join("") : ""
      }`}
      id={`lock${pascalCtx}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-lock"
        viewBox="0 0 16 16"
      >
        <defs>
          <linearGradient id="gradiente-lock" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{
                stopColor: "rgb(233, 180, 7)",
              }}
            />
            <stop
              offset="100%"
              style={{
                stopColor: "rgb(243, 221, 93)",
              }}
            />
          </linearGradient>
        </defs>
        <path
          d="M8 1 a2 2 0 0 1 2 2 v4 H6 V3 a2 2 0 0 1 2-2 m3 6 V3 a3 3 0 0 0-6 0 v4"
          className="svg-lock-hook"
        />
        <path
          d="M5 7 a2 2 0 0 0-2 2 v5 a2 2 0 0 0 2 2h 6 a2 2 0 0 0 2-2 V9 a2 2 0 0 0-2-2"
          className="svg-lock-body"
        />
        <line x1="5" y1="7" x2="11" y2="7" stroke="black" />
      </svg>
    </span>
  ) : (
    <div role="group" className="divLock noInvert" id={`div${pascalCtx}`}>
      <span
        role="img"
        className={`noInvert lock_inpGet${
          addGroup ? addGroup.map(group => ` ${group}`).join("") : ""
        }`}
        id={`lock${pascalCtx}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-lock"
          viewBox="0 0 16 16"
        >
          <defs>
            <linearGradient
              id="gradiente-lock"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                style={{
                  stopColor: "rgb(233, 180, 7)",
                }}
              />
              <stop
                offset="100%"
                style={{
                  stopColor: "rgb(243, 221, 93)",
                }}
              />
            </linearGradient>
          </defs>
          <path
            d="M8 1 a2 2 0 0 1 2 2 v4 H6 V3 a2 2 0 0 1 2-2 m3 6 V3 a3 3 0 0 0-6 0 v4"
            className="svg-lock-hook"
          />
          <path
            d="M5 7 a2 2 0 0 0-2 2 v5 a2 2 0 0 0 2 2h 6 a2 2 0 0 0 2-2 V9 a2 2 0 0 0-2-2"
            className="svg-lock-body"
          />
          <line x1="5" y1="7" x2="11" y2="7" stroke="black" />
        </svg>
      </span>
    </div>
  );
}
