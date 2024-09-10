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
jest.mock("../../../locals/odPage/odHandler");
jest.mock("../../../locals/odPage/odModel");
describe("odController", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });
  test("addListenerInspRadios adds click listeners to radio buttons", () => {
    document.body.innerHTML = `
      <input type="radio" class="radYes" id="radio1">
      <input type="radio" class="radNo" id="radio2">
    `;
    expect(addListenerInspRadios().length).toBe(2);
    expect(
      jest.spyOn(HTMLInputElement.prototype, "addEventListener")
    ).toHaveBeenCalledWith("click", OdHandler.showInspSpanSub);
  });
  test("addListenerInspDialogBtns adds click listeners to dialog buttons", () => {
    document.body.innerHTML = `
      <button id="inspDialogBtn1">Button 1</button>
      <button id="inspDialogBtn2">Button 2</button>
    `;
    const [isDialogCalled, buttons] = addListenerInspDialogBtns(false);
    expect(buttons.length).toBe(2);
    expect(isDialogCalled).toBe(false);
    expect(
      jest.spyOn(HTMLButtonElement.prototype, "addEventListener")
    ).toHaveBeenCalledWith("click", expect.any(Function));
  });
  test("addListenerInspLIBtns adds click listeners to LI buttons", () => {
    document.body.innerHTML = `
      <button id="inspLIBtn1">LI Button 1</button>
      <button id="inspLIBtn2">LI Button 2</button>
    `;
    expect(addListenerInspLIBtns().length).toBe(2);
    expect(
      jest.spyOn(HTMLButtonElement.prototype, "addEventListener")
    ).toHaveBeenCalledWith("click", OdHandler.addTextToObs);
  });
  test("addListenerQuadrsTe adds drag and touch listeners to quadrant elements", () => {
    document.body.innerHTML = `
      <div class="quadrMainDiv" id="quadr1"></div>
      <div class="quadrMainDiv" id="quadr2"></div>
    `;
    const spyAddEventListener = jest.spyOn(
      HTMLElement.prototype,
      "addEventListener"
    );
    expect(addListenerQuadrsTe().length).toBe(2);
    expect(spyAddEventListener).toHaveBeenCalledWith(
      "mousemove",
      expect.any(Function)
    );
    expect(spyAddEventListener).toHaveBeenCalledWith(
      "dragstart",
      expect.any(Function)
    );
    expect(spyAddEventListener).toHaveBeenCalledWith(
      "dragend",
      expect.any(Function)
    );
  });
  test("addListenerAvElemenDents adds click listeners to dental elements", () => {
    document.body.innerHTML = `
      <input type="text" class="inpAvDent" id="dent1">
      <input type="text" class="inpAvDent" id="dent2">
    `;
    const [isValuePreDef, elements] = addListenerAvElemenDents(false);
    expect(elements.length).toBe(2);
    expect(isValuePreDef).toBe(false);
    expect(
      jest.spyOn(HTMLInputElement.prototype, "addEventListener")
    ).toHaveBeenCalledWith("click", expect.any(Function));
  });
  test("addListenerQuadrInps adds click listeners to quadrant input elements", () => {
    document.body.innerHTML = `
      <input type="text" id="inpD1">
      <input type="text" id="inpD2">
    `;
    expect(addListenerQuadrInps().length).toBe(2);
    expect(
      jest.spyOn(HTMLInputElement.prototype, "addEventListener")
    ).toHaveBeenCalledWith("click", expect.any(Function));
  });
  test("addListenerResetDivsQuadrs adds click listeners to reset buttons", () => {
    document.body.innerHTML = `
      <button class="resetBut" id="reset1">Reset 1</button>
      <button class="resetBut" id="reset2">Reset 2</button>
    `;
    expect(addListenerResetDivsQuadrs().length).toBe(2);
    expect(
      jest.spyOn(HTMLButtonElement.prototype, "addEventListener")
    ).toHaveBeenCalledWith("click", expect.any(Function));
  });
  test("addListenersSubDivsQuadrs calls orderLabels on sub divs when DOM is ready", () => {
    document.body.innerHTML = `
      <div class="quadrSubDiv" id="subDiv1"></div>
      <div class="quadrSubDiv" id="subDiv2"></div>
    `;
    document.dispatchEvent(new Event("DOMContentLoaded"));
    expect(addListenersSubDivsQuadrs().length).toBe(2);
    expect(jest.spyOn(OdModel, "orderLabels")).toHaveBeenCalledTimes(2);
  });
  test("addListenerTratContainer adds click listeners to treatment buttons", () => {
    document.body.innerHTML = `
      <button class="countTrat" id="trat1">Trat 1</button>
      <button class="countTrat" id="trat2">Trat 2</button>
    `;
    const [blockCount, buttons] = addListenerTratContainer(1);
    expect(buttons.length).toBe(2);
    expect(blockCount).toBe(1);
    expect(
      jest.spyOn(HTMLButtonElement.prototype, "addEventListener")
    ).toHaveBeenCalledWith("click", expect.any(Function));
  });
});
