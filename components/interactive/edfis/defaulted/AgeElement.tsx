import { useState, useEffect, useRef } from "react";
import { person, isAutoFillActive, tabProps, numCons } from "@/pages/edfis";
import { Person } from "@/lib/global/declarations/classes";
import { validateEvResultNum } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { exeAutoFill } from "@/pages/edfis";
import {
  multipleElementsNotFound,
  extLine,
} from "@/lib/global/handlers/errorHandler";
import { handleEventReq } from "@/lib/global/handlers/gHandlers";
import { nullishInp } from "@/lib/global/declarations/types";

export default function AgeElement() {
  const [value, setValue] = useState<string>("");
  const [prevValue, setPreValue] = useState<string>("");
  const inpRef = useRef<nullishInp>(null);
  useEffect(() => {
    if (inpRef.current && inpRef.current.value === "")
      inpRef.current.value = "30";
  }, []);
  useEffect(() => {
    if (inpRef.current && inpRef.current.value === "")
      inpRef.current.value = "0";
    setValue(person.age.toString());
  }, [value]);
  return (
    <input
      type="number"
      name="dateAgeName"
      id="dateAgeId"
      className="form-control noInvert inpIdentif minText maxText minNum maxNum patternText"
      min="0"
      max="255"
      ref={inpRef}
      required
      data-title="Idade"
      data-reqlength="1"
      data-maxlength="4"
      data-minnum="0"
      data-maxnum="255"
      data-pattern="^[\d,.]+$"
      onInput={ev => {
        const newValue = ev.currentTarget.value;
        if (
          person instanceof Person &&
          "age" in person &&
          typeof person.age === "number" &&
          typeof isAutoFillActive === "boolean"
        ) {
          setValue(newValue);
          setPreValue(newValue);
          person.age = validateEvResultNum(ev.currentTarget, person.age);
          //sem autofill, dá update somente em person.age
          isAutoFillActive &&
            exeAutoFill(ev.currentTarget, isAutoFillActive, "cons");
          console.log([newValue, ev.currentTarget.value, person.age]);
        } else {
          setValue(prevValue);
          multipleElementsNotFound(
            extLine(new Error()),
            "argumentas for callbackAgeElement()",
            `${JSON.stringify(person)}`,
            person?.age,
            ev.currentTarget,
            `${[
              numCons || 1,
              [person.weight, person.height, person.sumDCut],
              [
                tabProps.IMC,
                tabProps.MLG,
                tabProps.TMB,
                tabProps.GET,
                tabProps.PGC,
              ],
              [
                tabProps.targInpWeigth,
                tabProps.targInpHeigth,
                tabProps.targInpIMC,
                tabProps.targInpMLG,
                tabProps.targInpTMB,
                tabProps.targInpGET,
                tabProps.targInpSumDCut,
                tabProps.targInpPGC,
              ],
            ].toString()}`,
            isAutoFillActive
          );
        }
        handleEventReq(ev.currentTarget);
      }}
    />
  );
}