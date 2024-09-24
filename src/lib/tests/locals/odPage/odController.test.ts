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
jest.mock("../../../locals/odPage/odHandler");
jest.mock("../../../locals/odPage/odModel");
describe("odController", (): void => {
  beforeEach((): void => {
    document.body.innerHTML = "";
  });
  test("addListenerInspRadios adds click listeners to radio buttons", (): void => {
    document.body.innerHTML = `
      <input type="radio" class="radYes" id="radio1">
      <input type="radio" class="radNo" id="radio2">
    `;
    expect(addListenerInspRadios().length).toBe<number>(2);
    expect(
      jest.spyOn<HTMLElement, EventTargetMethod>(HTMLInputElement.prototype, "addEventListener")
    ).toHaveBeenCalledWith<[DOMEvent, any]>("click", OdHandler.showInspSpanSub);
  });
  test("addListenerInspDialogBtns adds click listeners to dialog buttons", (): void => {
    document.body.innerHTML = `
      <button id="inspDialogBtn1">Button 1</button>
      <button id="inspDialogBtn2">Button 2</button>
    `;
    const [isDialogCalled, buttons] = addListenerInspDialogBtns(false);
    expect(buttons.length).toBe<number>(2);
    expect(isDialogCalled).toBe<boolean>(false);
    expect(
      jest.spyOn<HTMLElement, EventTargetMethod>(HTMLButtonElement.prototype, "addEventListener")
    ).toHaveBeenCalledWith<[DOMEvent, any]>("click", expect.any(Function));
  });
  test("addListenerInspLIBtns adds click listeners to LI buttons", (): void => {
    document.body.innerHTML = `
      <button id="inspLIBtn1">LI Button 1</button>
      <button id="inspLIBtn2">LI Button 2</button>
    `;
    expect(addListenerInspLIBtns().length).toBe<number>(2);
    expect(
      jest.spyOn<HTMLElement, EventTargetMethod>(HTMLButtonElement.prototype, "addEventListener")
    ).toHaveBeenCalledWith<[DOMEvent, any]>("click", OdHandler.addTextToObs);
  });
  test("addListenerQuadrsTe adds drag and touch listeners to quadrant elements", (): void => {
    document.body.innerHTML = `
      <div class="quadrMainDiv" id="quadr1"></div>
      <div class="quadrMainDiv" id="quadr2"></div>
    `;
    const spyAddEventListener = jest.spyOn<HTMLElement, EventTargetMethod>(HTMLElement.prototype, "addEventListener");
    expect(addListenerQuadrsTe().length).toBe<number>(2);
    expect(spyAddEventListener).toHaveBeenCalledWith<[DOMEvent, any]>("mousemove", expect.any(Function));
    expect(spyAddEventListener).toHaveBeenCalledWith<[DOMEvent, any]>("dragstart", expect.any(Function));
    expect(spyAddEventListener).toHaveBeenCalledWith<[DOMEvent, any]>("dragend", expect.any(Function));
  });
  test("addListenerAvElemenDents adds click listeners to dental elements", (): void => {
    document.body.innerHTML = `
      <input type="text" class="inpAvDent" id="dent1">
      <input type="text" class="inpAvDent" id="dent2">
    `;
    const [isValuePreDef, elements] = addListenerAvElemenDents(false);
    expect(elements.length).toBe<number>(2);
    expect(isValuePreDef).toBe<boolean>(false);
    expect(
      jest.spyOn<HTMLElement, EventTargetMethod>(HTMLInputElement.prototype, "addEventListener")
    ).toHaveBeenCalledWith<[DOMEvent, any]>("click", expect.any(Function));
  });
  test("addListenerQuadrInps adds click listeners to quadrant input elements", (): void => {
    document.body.innerHTML = `
      <input type="text" id="inpD1">
      <input type="text" id="inpD2">
    `;
    expect(addListenerQuadrInps().length).toBe<number>(2);
    expect(
      jest.spyOn<HTMLElement, EventTargetMethod>(HTMLInputElement.prototype, "addEventListener")
    ).toHaveBeenCalledWith<[DOMEvent, any]>("click", expect.any(Function));
  });
  test("addListenerResetDivsQuadrs adds click listeners to reset buttons", (): void => {
    document.body.innerHTML = `
      <button class="resetBut" id="reset1">Reset 1</button>
      <button class="resetBut" id="reset2">Reset 2</button>
    `;
    expect(addListenerResetDivsQuadrs().length).toBe<number>(2);
    expect(
      jest.spyOn<HTMLElement, EventTargetMethod>(HTMLButtonElement.prototype, "addEventListener")
    ).toHaveBeenCalledWith<[DOMEvent, any]>("click", expect.any(Function));
  });
  test("addListenersSubDivsQuadrs calls orderLabels on sub divs when DOM is ready", (): void => {
    document.body.innerHTML = `
      <div class="quadrSubDiv" id="subDiv1"></div>
      <div class="quadrSubDiv" id="subDiv2"></div>
    `;
    document.dispatchEvent(new Event("DOMContentLoaded"));
    expect(addListenersSubDivsQuadrs().length).toBe<number>(2);
    expect(jest.spyOn<any, OdModeler>(OdModel, "orderLabels")).toHaveBeenCalledTimes(2);
  });
  test("addListenerTratContainer adds click listeners to treatment buttons", (): void => {
    document.body.innerHTML = `
      <button class="countTrat" id="trat1">Trat 1</button>
      <button class="countTrat" id="trat2">Trat 2</button>
    `;
    const [blockCount, buttons] = addListenerTratContainer(1);
    expect(buttons.length).toBe<number>(2);
    expect(blockCount).toBe<number>(1);
    expect(
      jest.spyOn<HTMLElement, EventTargetMethod>(HTMLButtonElement.prototype, "addEventListener")
    ).toHaveBeenCalledWith<[DOMEvent, any]>("click", expect.any(Function));
  });
});
