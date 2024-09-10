//v1.0.0
import {
  showInspSpanSub,
  showInspDialogs,
  addTextToObs,
  dragHover,
  clearQuadrInps,
  dragStart,
  dragEnter,
  dragOver,
  dragDrop,
  dragEnd,
  dragStartChilds,
  dragEndChilds,
  resetLabels,
  addSubDivTrat,
} from "../../../locals/odPage/odHandler";
let odIsDragging = false;
describe("Testing all provided functions", () => {
  let event: Partial<MouseEvent>,
    inputEl: HTMLInputElement,
    buttonEl: HTMLButtonElement;
  let siblingEl: HTMLElement,
    dialogEl: HTMLDialogElement,
    textAreaEl: HTMLTextAreaElement;
  let element: HTMLElement;
  beforeEach(() => {
    inputEl = document.createElement("input");
    siblingEl = document.createElement("span");
    event = new MouseEvent("click");
    Object.defineProperty(event, "currentTarget", {
      value: inputEl,
      writable: false,
    });
    buttonEl = document.createElement("button");
    dialogEl = document.createElement("dialog");
    textAreaEl = document.createElement("textarea");
    element = document.createElement("div");
    jest.clearAllMocks();
  });
  it("should remove hidden attribute from valid sibling when 'radYes' is checked", () => {
    inputEl.type = "radio";
    inputEl.classList.add("radYes");
    inputEl.checked = true;
    jest
      .spyOn(
        require("../../../global/handlers/gHandlers"),
        "searchNextSiblings"
      )
      .mockReturnValue(siblingEl);
    showInspSpanSub(event as MouseEvent);
    expect(siblingEl.hasAttribute("hidden")).toBe(false);
  });
  it("should set hidden attribute for valid sibling when 'radNo' is checked", () => {
    inputEl.type = "radio";
    inputEl.classList.add("radNo");
    inputEl.checked = true;
    jest
      .spyOn(
        require("../../../global/handlers/gHandlers"),
        "searchNextSiblings"
      )
      .mockReturnValue(siblingEl);
    showInspSpanSub(event as MouseEvent);
    expect(siblingEl.hasAttribute("hidden")).toBe(true);
  });
  it("should call inputNotFound when currentTarget is invalid", () => {
    const event = new MouseEvent("click");
    Object.defineProperty(event, "currentTarget", {
      value: {},
      writable: false,
    });
    showInspSpanSub(event);
    expect(
      jest.spyOn(
        require("../../../global/handlers/errorHandler"),
        "inputNotFound"
      )
    ).toHaveBeenCalled();
  });
  it("should call multipleElementsNotFound when parent or sibling is not found", () => {
    const mockMultipleElementsNotFound = jest.spyOn(
      require("../../../global/handlers/errorHandler"),
      "multipleElementsNotFound"
    );
    showInspSpanSub(event as MouseEvent);
    expect(mockMultipleElementsNotFound).toHaveBeenCalled();
  });
  it("should show the dialog and update button text when isDialogCalled is false", () => {
    // Create parent div to hold the button and dialog elements
    const parentEl = document.createElement("div");
    parentEl.appendChild(buttonEl);
    parentEl.appendChild(dialogEl);
    const event = new MouseEvent("click");
    Object.defineProperty(event, "currentTarget", {
      value: buttonEl,
      writable: false,
    });
    expect(dialogEl.open).toBe(true);
    expect(buttonEl.textContent).toBe("Esconder Sugestões");
    expect(showInspDialogs(event, false)).toBe(false);
  });
  it("should close the dialog and update button text when isDialogCalled is true", () => {
    Object.defineProperty(buttonEl, "nextElementSibling", {
      value: dialogEl,
      configurable: true,
    });
    const event = new MouseEvent("click");
    Object.defineProperty(event, "currentTarget", {
      value: buttonEl,
      writable: false,
    });
    expect(dialogEl.open).toBe(false);
    expect(buttonEl.textContent).toBe("Mostrar Sugestões");
    expect(showInspDialogs(event as MouseEvent, true)).toBe(true);
  });
  it("should call elementNotFound when currentTarget is invalid", () => {
    const event = new MouseEvent("click");
    Object.defineProperty(event, "currentTarget", {
      value: {},
      writable: false,
    });
    showInspDialogs(event);
    expect(
      jest.spyOn(
        require("../../../global/handlers/errorHandler"),
        "elementNotFound"
      )
    ).toHaveBeenCalled();
  });
  it("should add text to textarea when empty", () => {
    jest
      .spyOn(require("../../../global/handlers/gHandlers"), "searchParents")
      .mockReturnValue(document.createElement("div"));
    jest
      .spyOn(
        require("../../../global/handlers/gHandlers"),
        "searchPreviousSiblings"
      )
      .mockReturnValue(textAreaEl);
    addTextToObs(event as MouseEvent);
    expect(textAreaEl.value).toBe("undefined");
  });
  it("should append text in lowercase when textarea is not empty", () => {
    jest
      .spyOn(require("../../../global/handlers/gHandlers"), "searchParents")
      .mockReturnValue(document.createElement("div"));
    jest
      .spyOn(
        require("../../../global/handlers/gHandlers"),
        "searchPreviousSiblings"
      )
      .mockReturnValue(textAreaEl);
    textAreaEl.value = "Initial Text";
    addTextToObs(event as MouseEvent);
    expect(textAreaEl.value).toBe("Initial Textundefined");
  });
  it("should call inputNotFound when validParentSibling is invalid", () => {
    const mockInputNotFound = jest.spyOn(
      require("../../../global/handlers/errorHandler"),
      "inputNotFound"
    );
    jest
      .spyOn(
        require("../../../global/handlers/gHandlers"),
        "searchPreviousSiblings"
      )
      .mockReturnValue({} as any);
    addTextToObs(event as MouseEvent);
    expect(mockInputNotFound).toHaveBeenCalled();
  });
  it("should change cursor style to 'grabbing' and back to 'grab'", () => {
    jest.useFakeTimers();
    dragHover(element);
    expect(element.style.cursor).toBe("");
    jest.advanceTimersByTime(2000);
    expect(element.style.cursor).toBe("grabbing");
    jest.advanceTimersByTime(2000);
    expect(element.style.cursor).toBe("grab");
    jest.useRealTimers();
  });
  it("should call elementNotFound when the element is not valid", () => {
    dragHover(null as any);
    expect(
      jest.spyOn(
        require("../../../global/handlers/errorHandler"),
        "elementNotFound"
      )
    ).toHaveBeenCalled();
  });
  it("should call elementNotFound when nextElementSibling is not found", () => {
    Object.defineProperty(inputEl, "nextElementSibling", {
      value: null,
      configurable: true,
    });
    clearQuadrInps(inputEl);
    expect(
      jest.spyOn(
        require("../../../global/handlers/errorHandler"),
        "elementNotFound"
      )
    ).toHaveBeenCalled();
  });
  it("should clear input value and set placeholder to 'Apagado'", () => {
    const siblingEl = document.createElement("datalist");
    const optionEl = document.createElement("option");
    optionEl.value = "Option1";
    siblingEl.appendChild(optionEl);
    Object.defineProperty(inputEl, "nextElementSibling", {
      value: siblingEl,
      configurable: true,
    });
    inputEl.value = "Option1";
    clearQuadrInps(inputEl);
    expect(inputEl.value).toBe("");
    expect(inputEl.placeholder).toBe("Apagado");
  });
  it("should call inputNotFound when input element is invalid", () => {
    const mockInputNotFound = jest.spyOn(
      require("../../../global/handlers/errorHandler"),
      "inputNotFound"
    );
    clearQuadrInps(null as any);
    expect(mockInputNotFound).toHaveBeenCalled();
  });
  describe("dragStart", () => {
    let dragEvent: DragEvent;
    let touchEvent: TouchEvent;
    let element: HTMLElement;
    let quadrsTe: HTMLElement[];
    beforeEach(() => {
      element = document.createElement("div");
      element.classList.add("quadrMainDiv");
      quadrsTe = [element];
      dragEvent = new DragEvent("dragstart", { bubbles: true });
      Object.defineProperty(dragEvent, "currentTarget", { value: element });
      touchEvent = new TouchEvent("touchstart", { bubbles: true });
      Object.defineProperty(touchEvent, "touches", {
        value: [
          {
            target: element,
            clientX: 0,
            clientY: 0,
          },
        ],
      });
    });
    it("should handle a drag event and set dataTransfer", () => {
      dragStart(dragEvent, quadrsTe);
      expect(dragEvent.dataTransfer?.setData).toHaveBeenCalledWith(
        "text/plain",
        ""
      );
    });
    it("should handle a touch event and start dragging", () => {
      dragStart(touchEvent, quadrsTe);
      expect(odIsDragging).toBe(true);
      expect(element.style.position).toBe("absolute");
      expect(element.style.zIndex).toBe("100");
    });
    it("should call elementNotFound if the element is invalid", () => {
      dragStart({} as DragEvent, quadrsTe);
      expect(
        jest.spyOn(
          require("../../../global/handlers/errorHandler"),
          "elementNotFound"
        )
      ).toHaveBeenCalled();
    });
  });
  describe("dragEnter", () => {
    let dragEvent: DragEvent;
    beforeEach(() => {
      dragEvent = new DragEvent("dragenter");
    });
    it("should prevent default if the event is valid", () => {
      dragEnter(dragEvent);
      expect(jest.spyOn(dragEvent, "preventDefault")).toHaveBeenCalled();
    });
    it("should call elementNotFound if target is invalid", () => {
      dragEnter({ target: null } as DragEvent);
      expect(
        jest.spyOn(
          require("../../../global/handlers/errorHandler"),
          "elementNotFound"
        )
      ).toHaveBeenCalled();
    });
  });
  describe("dragOver", () => {
    let dragEvent: DragEvent;
    beforeEach(() => {
      dragEvent = new DragEvent("dragover");
    });
    it("should prevent default if the event is valid", () => {
      dragOver(dragEvent);
      expect(jest.spyOn(dragEvent, "preventDefault")).toHaveBeenCalled();
    });
    it("should call elementNotFound if target is invalid", () => {
      dragOver({ target: null } as DragEvent);
      expect(
        jest.spyOn(
          require("../../../global/handlers/errorHandler"),
          "elementNotFound"
        )
      ).toHaveBeenCalled();
    });
  });
  describe("dragDrop", () => {
    let dropEvent: DragEvent;
    let srcEl: HTMLElement;
    let targetEl: HTMLElement;
    let quadrsTe: HTMLElement[];
    beforeEach(() => {
      srcEl = document.createElement("div");
      targetEl = document.createElement("div");
      srcEl.classList.add("quadrMainDiv");
      targetEl.classList.add("quadrAvDent");
      quadrsTe = [srcEl, targetEl];
      dropEvent = new DragEvent("drop");
      Object.defineProperty(dropEvent, "currentTarget", { value: targetEl });
    });
    it("should swap grid properties of source and target elements", () => {
      jest
        .spyOn(window, "getComputedStyle")
        .mockImplementation((el: Element) => {
          if (el === srcEl) {
            return {
              getPropertyValue: (prop: string) =>
                prop === "grid-column" ? "1" : "1",
            } as CSSStyleDeclaration;
          }
          if (el === targetEl) {
            return {
              getPropertyValue: (prop: string) =>
                prop === "grid-column" ? "2" : "2",
            } as CSSStyleDeclaration;
          }
          return {} as CSSStyleDeclaration;
        });
      dragDrop(dropEvent, srcEl, quadrsTe, jest.fn());
      expect(srcEl.style.getPropertyValue("grid-column")).toBe("2");
      expect(targetEl.style.getPropertyValue("grid-column")).toBe("1");
    });
    it("should call multipleElementsNotFound if valid target element is not found", () => {
      dragDrop({} as Event, srcEl, quadrsTe, jest.fn());
      expect(
        jest.spyOn(
          require("../../../global/handlers/errorHandler"),
          "multipleElementsNotFound"
        )
      ).toHaveBeenCalled();
    });
  });
  describe("dragEnd", () => {
    let element: HTMLElement;
    beforeEach(() => {
      element = document.createElement("div");
    });
    it("should call dragEndChilds if element is valid", () => {
      document.body.innerHTML = '<div class="contInQuadrs"></div>';
      dragEnd(element);
      expect(
        jest.spyOn(require("../../../locals/odPage/odHandler"), "dragEndChilds")
      ).toHaveBeenCalledWith(document.querySelectorAll(".contInQuadrs"));
    });
    it("should call elementNotFound if element is invalid", () => {
      dragEnd(null as any);
      expect(
        jest.spyOn(
          require("../../../global/handlers/errorHandler"),
          "elementNotFound"
        )
      ).toHaveBeenCalled();
    });
  });
  describe("dragStartChilds", () => {
    it("should set 'draggable' attribute to true for all elements", () => {
      const contInQuadrs = [
        document.createElement("div"),
        document.createElement("div"),
      ];
      dragStartChilds(contInQuadrs);
      contInQuadrs.forEach(contInQuadr => {
        expect(contInQuadr.getAttribute("draggable")).toBe("true");
      });
    });
  });
  describe("dragEndChilds", () => {
    it("should set 'draggable' attribute to false for all elements", () => {
      const contInQuadrs = [
        document.createElement("div"),
        document.createElement("div"),
      ];
      dragEndChilds(contInQuadrs);
      contInQuadrs.forEach(contInQuadr => {
        expect(contInQuadr.getAttribute("draggable")).toBe("false");
      });
    });
  });
  describe("resetLabels", () => {
    let quadrBtn: HTMLButtonElement;
    let parentDiv: HTMLDivElement;
    beforeEach(() => {
      quadrBtn = document.createElement("button");
      parentDiv = document.createElement("div");
      parentDiv.classList.add("quadrMainDiv");
      quadrBtn.closest = jest.fn().mockReturnValue(parentDiv);
    });
    it("should reset all input values to 'Hígido'", () => {
      for (let i = 0; i < 8; i++) {
        const input = document.createElement("input");
        input.id = `inpD${i}`;
        parentDiv.appendChild(input);
      }
      resetLabels(quadrBtn);
      parentDiv.querySelectorAll("input[id^=inpD]").forEach(input => {
        (input instanceof HTMLInputElement ||
          input instanceof HTMLSelectElement ||
          inputEl instanceof HTMLTextAreaElement) &&
          expect((input as HTMLInputElement).value).toBe("Hígido");
      });
    });
    it("should call multipleElementsNotFound if inputs are missing", () => {
      resetLabels(quadrBtn);
      expect(
        jest.spyOn(
          require("../../../global/handlers/errorHandler"),
          "multipleElementsNotFound"
        )
      ).toHaveBeenCalled();
    });
    it("should log a warning if input length is less than 8", () => {
      parentDiv.appendChild(document.createElement("input"));
      resetLabels(quadrBtn);
      expect(
        jest.spyOn(console, "warn").mockImplementation(() => {})
      ).toHaveBeenCalledWith(
        expect.stringContaining("Error validating inputs")
      );
    });
  });
  describe("addSubDivTrat", () => {
    let addSubDivBtn: HTMLButtonElement;
    let blockCount = 1;
    beforeEach(() => {
      addSubDivBtn = document.createElement("button");
      addSubDivBtn.classList.add("addTrat");
      document.body.innerHTML = '<div id="tratContainer"></div>';
    });
    it("should add a new block to the container", () => {
      const clickEvent = new MouseEvent("click", { bubbles: true });
      Object.defineProperty(clickEvent, "currentTarget", {
        value: addSubDivBtn,
      });
      addSubDivTrat(clickEvent, addSubDivBtn, blockCount);
      expect(document.getElementById(`divSubTrat${blockCount}`)).not.toBeNull();
    });
    it("should add event listeners for the new block", () => {
      const clickEvent = new MouseEvent("click", { bubbles: true });
      Object.defineProperty(clickEvent, "currentTarget", {
        value: addSubDivBtn,
      });
      addSubDivTrat(clickEvent, addSubDivBtn, blockCount);
      const newBlock = document.getElementById(`divSubTrat${blockCount}`);
      expect(newBlock).not.toBeNull();
      newBlock!.querySelectorAll("button").forEach(button => {
        expect(button.tagName.toLowerCase()).toBe("button");
      });
    });
    it("should call elementNotFound if target element is invalid", () => {
      addSubDivTrat({ currentTarget: null } as any, addSubDivBtn, blockCount);
      expect(
        jest.spyOn(
          require("../../../global/handlers/errorHandler"),
          "elementNotFound"
        )
      ).toHaveBeenCalled();
    });
  });
});
