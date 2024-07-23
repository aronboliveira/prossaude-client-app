import { RotProps } from "@/lib/global/declarations/interfaces";
import InpRot from "./client/InpRot";

export default function DivRot({ quest, ctx, grp, ur }: RotProps): JSX.Element {
  const maxes = (() => {
    switch (ctx) {
      case "RefDia":
        return {
          max: 99,
          maxLength: 4,
        };
      case "RefCompDia":
        return {
          max: 99,
          maxLength: 4,
        };
      case "AguaDia":
        return {
          max: 99,
          maxLength: 4,
        };
      case "UrDia":
        return {
          max: 96,
          maxLength: 4,
        };
      default:
        return {
          max: 999,
          maxLength: 255,
        };
    }
  })();
  return (
    <div role="group" className="flexDiv divRot widMax900q80vw">
      <label
        htmlFor={!ur ? `inp${ctx}Min` : `inp${ur.ctx}${ctx}Min`}
        className={`lab${grp}Rot fitSpaced labRef lab${ctx}${
          ur && " labUr labUrDia"
        }`}
      >
        <InpRot
          quest={quest}
          grp={grp}
          ctx={ctx}
          max={maxes.max}
          maxLength={maxes.maxLength}
          ur={ur}
        />
      </label>
      <label
        htmlFor={!ur ? `inp${ctx}Max` : `inp${ur.ctx}${ctx}Max`}
        className={`lab${grp}Rot fitSpaced labRef lab${ctx}`}
      >
        <InpRot
          quest={quest}
          grp={grp}
          ctx={ctx}
          max={maxes.max}
          maxLength={maxes.maxLength}
          isMax={true}
          ur={ur}
        />
      </label>
    </div>
  );
}
