import { exeAutoFill } from "@/lib/locals/edFisNutPage/edFisNutHandler";
import { handleEventReq } from "@/lib/global/handlers/gHandlers";
import { looseNum, nlInp } from "@/lib/global/declarations/types";
import { person, tabProps } from "@/vars";
import { useState, useEffect, Dispatch, SetStateAction, MutableRefObject, useCallback } from "react";
import { applyFieldConstraints, limitedError, parseNotNaN } from "@/lib/global/gModel";
import { PseudoNum } from "@/lib/global/declarations/testVars";
export default function AgeElement({
  onSetAge,
  inpRef,
  ageRef,
}: {
  onSetAge?: Dispatch<SetStateAction<looseNum>>;
  inpRef?: MutableRefObject<nlInp>;
  ageRef?: MutableRefObject<number>;
}): JSX.Element {
  const [age, setAge] = useState<PseudoNum>("0"),
    evaluateNum = useCallback((a: string): PseudoNum => {
      if (a.startsWith("0") && a.length > 1) a = parseNotNaN(a, 0, "int").toString();
      if (a.length > 3) a = a.slice(0, 4);
      const numValue = parseNotNaN(a, 0, "int");
      if (!Number.isFinite(numValue)) a = "";
      if (numValue > 255) a = "255";
      return a as PseudoNum;
    }, []);
  useEffect(() => {
    if (inpRef?.current && inpRef.current.value === "") {
      if (!/edfis/gi.test(location.pathname.toLowerCase())) return;
      person.age = parseNotNaN(inpRef.current.value, 0, "int");
      if (ageRef) ageRef.current = person.age;
      setAge(person.age.toString() as PseudoNum);
      onSetAge && onSetAge(evaluateNum(person.age.toString()) as PseudoNum);
      tabProps.isAutoFillActive && exeAutoFill(inpRef.current, "cons");
    }
  }, [setAge, onSetAge, inpRef, ageRef, evaluateNum]);
  useEffect(() => {
    try {
      if (!(inpRef?.current && inpRef.current instanceof HTMLElement))
        throw new Error(`Failed to validate instance of input`);
      handleEventReq(inpRef.current);
      if (!/edfis/gi.test(location.pathname.toLowerCase())) return;
      const evaluatedNum = parseNotNaN(evaluateNum(age) || "0", 0, "int");
      person.age = Number.isFinite(evaluatedNum) ? evaluatedNum : 0;
      //TODO REMOVER APÓS TESTE
      console.log(`Person's age: ` + person.age);
      tabProps.isAutoFillActive && exeAutoFill(inpRef.current, "cons");
      if (ageRef) ageRef.current = person.age;
    } catch (e) {
      limitedError(
        `Error executing effect for ${AgeElement.prototype.constructor.name}:${(e as Error).message}`,
        AgeElement.prototype.constructor.name,
      );
    }
  }, [age, ageRef, inpRef, evaluateNum]);
  return (
    <input
      value={age}
      ref={inpRef}
      type='number'
      name='age'
      id='ageId'
      className='form-control noInvert inpIdentif minText maxText minNum maxNum patternText'
      min='0'
      max='255'
      required
      data-title='Idade'
      data-reqlength='1'
      data-maxlength='4'
      data-minnum='0'
      data-maxnum='255'
      data-pattern='^[\d,.]+$'
      onInput={ev => {
        try {
          let newValue = ev.currentTarget.value.replace(/[^0-9]/g, "").trim();
          applyFieldConstraints(ev.currentTarget);
          if (newValue === "") {
            setAge(() => newValue as PseudoNum);
            onSetAge && onSetAge(() => evaluateNum(newValue) as PseudoNum);
            return;
          }
          setAge(() => evaluateNum(newValue) as PseudoNum);
          onSetAge && onSetAge(() => evaluateNum(newValue) as PseudoNum);
        } catch (e) {
          console.error(
            `Error executing ${ev.type} for ${
              ev.currentTarget.id || ev.currentTarget.className || ev.currentTarget.tagName
            }:${(e as Error).message}`,
          );
        }
      }}
    />
  );
}
