//v1.0.0
import * as OdHandler from "../../../locals/odPage/odHandler";
import * as OdModel from "../../../locals/odPage/odModel";
import {
  addListenerInspRadios,
  addListenerInspDialogBtns,
  addListenerInspLIBtns,
  addListenerQuadrsTe,
  addListenerAvElemenDents,
  addListenerQuadrInps,
  addListenerResetDivsQuadrs,
  addListenersSubDivsQuadrs,
  addListenerTratContainer,
} from "../../../locals/odPage/odController";
import { DOMEvent, EventTargetMethod, OdModeler } from "../../testVars";
jest.mock("../../../locals/odPage/odHandler") as typeof jest;
jest.mock("../../../locals/odPage/odModel") as typeof jest;
describe("odController", (): void => {
  beforeEach((): void => {
    document.body.innerHTML = "";
  }) as typeof jest;
  test("addListenerInspRadios adds click listeners to radio buttons", (): void => {
    document.body.innerHTML = `
      <input type="radio" class="radYes" id="radio1">
      <input type="radio" class="radNo" id="radio2">
    `;
    expect(addListenerInspRadios().length).toBe<number>(2) as void;
    expect(
      jest.spyOn<HTMLElement, EventTargetMethod>(HTMLInputElement.prototype, "addEventListener")
    ).toHaveBeenCalledWith<[DOMEvent, any]>("click", OdHandler.showInspSpanSub) as void;
  }) as void;
  test("addListenerInspDialogBtns adds click listeners to dialog buttons", (): void => {
    document.body.innerHTML = `
      <button id="inspDialogBtn1">Button 1</button>
      <button id="inspDialogBtn2">Button 2</button>
    `;
    const [isDialogCalled, buttons] = addListenerInspDialogBtns(false);
    expect(buttons.length).toBe<number>(2) as void;
    expect(isDialogCalled).toBe<boolean>(false) as void;
    expect(
      jest.spyOn<HTMLElement, EventTargetMethod>(HTMLButtonElement.prototype, "addEventListener")
    ).toHaveBeenCalledWith<[DOMEvent, any]>("click", expect.any(Function) as any) as void;
  }) as void;
  test("addListenerInspLIBtns adds click listeners to LI buttons", (): void => {
    document.body.innerHTML = `
      <button id="inspLIBtn1">LI Button 1</button>
      <button id="inspLIBtn2">LI Button 2</button>
    `;
    expect(addListenerInspLIBtns().length).toBe<number>(2) as void;
    expect(
      jest.spyOn<HTMLElement, EventTargetMethod>(HTMLButtonElement.prototype, "addEventListener")
    ).toHaveBeenCalledWith<[DOMEvent, any]>("click", OdHandler.addTextToObs) as void;
  }) as void;
  test("addListenerQuadrsTe adds drag and touch listeners to quadrant elements", (): void => {
    document.body.innerHTML = `
      <div class="quadrMainDiv" id="quadr1"></div>
      <div class="quadrMainDiv" id="quadr2"></div>
    `;
    const spyAddEventListener = jest.spyOn<HTMLElement, EventTargetMethod>(HTMLElement.prototype, "addEventListener");
    expect(addListenerQuadrsTe().length).toBe<number>(2) as void;
    expect(spyAddEventListener).toHaveBeenCalledWith<[DOMEvent, any]>("mousemove", expect.any(Function) as any) as void;
    expect(spyAddEventListener).toHaveBeenCalledWith<[DOMEvent, any]>("dragstart", expect.any(Function) as any) as void;
    expect(spyAddEventListener).toHaveBeenCalledWith<[DOMEvent, any]>("dragend", expect.any(Function) as any) as void;
  }) as void;
  test("addListenerAvElemenDents adds click listeners to dental elements", (): void => {
    document.body.innerHTML = `
      <input type="text" class="inpAvDent" id="dent1">
      <input type="text" class="inpAvDent" id="dent2">
    `;
    const [isValuePreDef, elements] = addListenerAvElemenDents(false);
    expect(elements.length).toBe<number>(2) as void;
    expect(isValuePreDef).toBe<boolean>(false) as void;
    expect(
      jest.spyOn<HTMLElement, EventTargetMethod>(HTMLInputElement.prototype, "addEventListener")
    ).toHaveBeenCalledWith<[DOMEvent, any]>("click", expect.any(Function) as any) as void;
  }) as void;
  test("addListenerQuadrInps adds click listeners to quadrant input elements", (): void => {
    document.body.innerHTML = `
      <input type="text" id="inpD1">
      <input type="text" id="inpD2">
    `;
    expect(addListenerQuadrInps().length).toBe<number>(2) as void;
    expect(
      jest.spyOn<HTMLElement, EventTargetMethod>(HTMLInputElement.prototype, "addEventListener")
    ).toHaveBeenCalledWith<[DOMEvent, any]>("click", expect.any(Function) as any) as void;
  }) as void;
  test("addListenerResetDivsQuadrs adds click listeners to reset buttons", (): void => {
    document.body.innerHTML = `
      <button class="resetBut" id="reset1">Reset 1</button>
      <button class="resetBut" id="reset2">Reset 2</button>
    `;
    expect(addListenerResetDivsQuadrs().length).toBe<number>(2) as void;
    expect(
      jest.spyOn<HTMLElement, EventTargetMethod>(HTMLButtonElement.prototype, "addEventListener")
    ).toHaveBeenCalledWith<[DOMEvent, any]>("click", expect.any(Function) as any) as void;
  }) as void;
  test("addListenersSubDivsQuadrs calls orderLabels on sub divs when DOM is ready", (): void => {
    document.body.innerHTML = `
      <div class="quadrSubDiv" id="subDiv1"></div>
      <div class="quadrSubDiv" id="subDiv2"></div>
    `;
    document.dispatchEvent(new Event("DOMContentLoaded")) as boolean;
    expect(addListenersSubDivsQuadrs().length).toBe<number>(2) as void;
    expect(jest.spyOn<any, OdModeler>(OdModel, "orderLabels")).toHaveBeenCalledTimes(2) as void;
  }) as void;
  test("addListenerTratContainer adds click listeners to treatment buttons", (): void => {
    document.body.innerHTML = `
      <button class="countTrat" id="trat1">Trat 1</button>
      <button class="countTrat" id="trat2">Trat 2</button>
    `;
    const [blockCount, buttons] = addListenerTratContainer(1);
    expect(buttons.length).toBe<number>(2) as void;
    expect(blockCount).toBe<number>(1) as void;
    expect(
      jest.spyOn<HTMLElement, EventTargetMethod>(HTMLButtonElement.prototype, "addEventListener")
    ).toHaveBeenCalledWith<[DOMEvent, any]>("click", expect.any(Function) as any) as void;
  }) as void;
}) as void;
