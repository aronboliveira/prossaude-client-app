import { AlignType, Gender } from "@/lib/global/declarations/testVars";
import { fluxGen } from "@/lib/global/gModel";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { person } from "@/vars";
export function handleGenRender({
  g,
  gb,
  gt,
  ga,
  selectedGen,
  setGenFisAlin,
}: {
  setGen: Dispatch<SetStateAction<Gender>>;
  onSetGen?: Dispatch<SetStateAction<Gender>>;
  selectedGen: string;
  setGenFisAlin: Dispatch<SetStateAction<AlignType>>;
} & Parameters<typeof fluxGen>[0]): void {
  person.gen = (fluxGen({ g, gb, gt, ga }, selectedGen, setGenFisAlin) as Gender) || "masculino";
  console.log("Person's Gender: " + person.gen);
}
export function handleQueryForRefs(
  ...refs: { id: string; r: MutableRefObject<any>; fallback?: { p?: string; selector: string } }[]
): void {
  for (const { id, r, fallback } of refs) {
    if (r) r.current = document.getElementById(id);
    if (!r.current && fallback?.p) r.current = document.getElementById(fallback.p)?.querySelector(fallback.selector);
  }
}
