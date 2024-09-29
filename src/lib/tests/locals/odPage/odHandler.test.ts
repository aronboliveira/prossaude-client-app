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
import {
  CSSPositionValues,
  ConsoleMethod,
  CursorCSSValues,
  DataTransferFormat,
  DragEventMethod,
  ErrorHandler,
  HTMLTag,
  OdHandler,
  PseudoBool,
  PseudoNum,
  PseudoVoid,
  SearchFunction,
  WindowMethods,
} from "../../testVars";
let odIsDragging = false;
describe("Testing all provided functions", (): void => {
  let event: Partial<MouseEvent>, inputEl: HTMLInputElement, buttonEl: HTMLButtonElement;
  let siblingEl: HTMLElement, dialogEl: HTMLDialogElement, textAreaEl: HTMLTextAreaElement;
  let element: HTMLElement;
  beforeEach((): void => {
    inputEl = document.createElement("input") as HTMLInputElement;
    siblingEl = document.createElement("span");
    event = new MouseEvent("click");
    Object.defineProperty(event, "currentTarget", {
      value: inputEl,
      writable: false,
    });
    buttonEl = document.createElement("button") as HTMLButtonElement;
    dialogEl = document.createElement("dialog");
    textAreaEl = document.createElement("textarea");
    element = document.createElement("div") as HTMLDivElement;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should remove hidden attribute from valid sibling when 'radYes' is checked", (): void => {
    inputEl.type = "radio";
    inputEl.classList.add("radYes") as void;
    inputEl.checked = true;
    jest
      .spyOn<any, SearchFunction>(require("../../../global/handlers/gHandlers"), "searchNextSiblings")
      .mockReturnValue(siblingEl) as jest.Mock;
    showInspSpanSub(event as MouseEvent);
    (expect(siblingEl.hasAttribute("hidden")) as jest.JestMatchers<jest.SpyInstance>).toBe<boolean>(false) as void;
  }) as void;
  it("should set hidden attribute for valid sibling when 'radNo' is checked", (): void => {
    inputEl.type = "radio";
    inputEl.classList.add("radNo");
    inputEl.checked = true;
    jest
      .spyOn<any, SearchFunction>(require("../../../global/handlers/gHandlers"), "searchNextSiblings")
      .mockReturnValue(siblingEl) as jest.Mock;
    showInspSpanSub(event as MouseEvent);
    (expect(siblingEl.hasAttribute("hidden")) as jest.JestMatchers<jest.SpyInstance>).toBe<boolean>(true) as void;
  }) as void;
  it("should call inputNotFound when currentTarget is invalid", (): void => {
    const event = new MouseEvent("click");
    Object.defineProperty(event, "currentTarget", {
      value: {},
      writable: false,
    });
    showInspSpanSub(event);
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "inputNotFound")
    ).toHaveBeenCalled() as void;
  }) as void;
  it("should call multipleElementsNotFound when parent or sibling is not found", (): void => {
    const mockMultipleElementsNotFound = jest.spyOn<any, ErrorHandler>(
      require("../../../global/handlers/errorHandler"),
      "multipleElementsNotFound"
    );
    showInspSpanSub(event as MouseEvent);
    (expect(mockMultipleElementsNotFound) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  it("should show the dialog and update button text when isDialogCalled is false", (): void => {
    const parentEl = document.createElement("div") as HTMLDivElement;
    parentEl.appendChild(buttonEl);
    parentEl.appendChild(dialogEl);
    const event = new MouseEvent("click");
    Object.defineProperty(event, "currentTarget", {
      value: buttonEl,
      writable: false,
    });
    (expect(dialogEl.open) as jest.JestMatchers<jest.SpyInstance>).toBe<boolean>(true) as void;
    (expect(buttonEl.textContent) as jest.JestMatchers<jest.SpyInstance>).toBe<string>("Esconder Sugestões") as void;
    (expect(showInspDialogs(event, false)) as jest.JestMatchers<jest.SpyInstance>).toBe<boolean>(false) as void;
  }) as void;
  it("should close the dialog and update button text when isDialogCalled is true", (): void => {
    Object.defineProperty(buttonEl, "nextElementSibling", {
      value: dialogEl,
      configurable: true,
    });
    const event = new MouseEvent("click");
    Object.defineProperty(event, "currentTarget", {
      value: buttonEl,
      writable: false,
    });
    (expect(dialogEl.open) as jest.JestMatchers<jest.SpyInstance>).toBe<boolean>(false) as void;
    (expect(buttonEl.textContent) as jest.JestMatchers<jest.SpyInstance>).toBe<string>("Mostrar Sugestões") as void;
    (expect(showInspDialogs(event as MouseEvent, true)) as jest.JestMatchers<jest.SpyInstance>).toBe<boolean>(
      true
    ) as void;
  }) as void;
  it("should call elementNotFound when currentTarget is invalid", (): void => {
    const event = new MouseEvent("click");
    Object.defineProperty(event, "currentTarget", {
      value: {},
      writable: false,
    });
    showInspDialogs(event);
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "elementNotFound")
    ).toHaveBeenCalled() as void;
  }) as void;
  it("should add text to textarea when empty", (): void => {
    jest
      .spyOn<any, SearchFunction>(require("../../../global/handlers/gHandlers"), "searchParents")
      .mockReturnValue(document.createElement("div") as HTMLDivElement) as jest.Mock;
    jest
      .spyOn<any, SearchFunction>(require("../../../global/handlers/gHandlers"), "searchPreviousSiblings")
      .mockReturnValue(textAreaEl) as jest.Mock;
    addTextToObs(event as MouseEvent);
    (expect(textAreaEl.value) as jest.JestMatchers<jest.SpyInstance>).toBe<PseudoVoid>("undefined") as void;
  }) as void;
  it("should append text in lowercase when textarea is not empty", (): void => {
    jest
      .spyOn<any, SearchFunction>(require("../../../global/handlers/gHandlers"), "searchParents")
      .mockReturnValue(document.createElement("div") as HTMLDivElement) as jest.Mock;
    jest
      .spyOn<any, SearchFunction>(require("../../../global/handlers/gHandlers"), "searchPreviousSiblings")
      .mockReturnValue(textAreaEl) as jest.Mock;
    textAreaEl.value = "Initial Text";
    addTextToObs(event as MouseEvent);
    (expect(textAreaEl.value) as jest.JestMatchers<jest.SpyInstance>).toBe<string>("Initial Textundefined") as void;
  }) as void;
  it("should call inputNotFound when validParentSibling is invalid", (): void => {
    const mockInputNotFound = jest.spyOn<any, ErrorHandler>(
      require("../../../global/handlers/errorHandler"),
      "inputNotFound"
    );
    jest
      .spyOn<any, SearchFunction>(require("../../../global/handlers/gHandlers"), "searchPreviousSiblings")
      .mockReturnValue({} as any) as jest.Mock;
    addTextToObs(event as MouseEvent);
    (expect(mockInputNotFound) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  it("should change cursor style to 'grabbing' and back to 'grab'", (): void => {
    jest.useFakeTimers();
    dragHover(element);
    (expect(element.style.cursor) as jest.JestMatchers<jest.SpyInstance>).toBe<CursorCSSValues>("") as void;
    jest.advanceTimersByTime(2000);
    (expect(element.style.cursor) as jest.JestMatchers<jest.SpyInstance>).toBe<CursorCSSValues>("grabbing") as void;
    jest.advanceTimersByTime(2000);
    (expect(element.style.cursor) as jest.JestMatchers<jest.SpyInstance>).toBe<CursorCSSValues>("grab") as void;
    jest.useRealTimers();
  }) as void;
  it("should call elementNotFound when the element is not valid", (): void => {
    dragHover(null as any);
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "elementNotFound")
    ).toHaveBeenCalled() as void;
  }) as void;
  it("should call elementNotFound when nextElementSibling is not found", (): void => {
    Object.defineProperty(inputEl, "nextElementSibling", {
      value: null,
      configurable: true,
    });
    clearQuadrInps(inputEl);
    expect(
      jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "elementNotFound")
    ).toHaveBeenCalled() as void;
  }) as void;
  it("should clear input value and set placeholder to 'Apagado'", (): void => {
    const siblingEl = document.createElement("datalist"),
      optionEl = document.createElement("option");
    optionEl.value = "Option1";
    siblingEl.appendChild(optionEl);
    Object.defineProperty(inputEl, "nextElementSibling", {
      value: siblingEl,
      configurable: true,
    });
    inputEl.value = "Option1";
    clearQuadrInps(inputEl);
    (expect(inputEl.value) as jest.JestMatchers<jest.SpyInstance>).toBe<string>("") as void;
    (expect(inputEl.placeholder) as jest.JestMatchers<jest.SpyInstance>).toBe<string>("Apagado") as void;
  }) as void;
  it("should call inputNotFound when input element is invalid", (): void => {
    const mockInputNotFound = jest.spyOn<any, ErrorHandler>(
      require("../../../global/handlers/errorHandler"),
      "inputNotFound"
    );
    clearQuadrInps(null as any);
    (expect(mockInputNotFound) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  describe("dragStart", (): void => {
    let dragEvent: DragEvent;
    let touchEvent: TouchEvent;
    let element: HTMLElement;
    let quadrsTe: HTMLElement[];
    beforeEach((): void => {
      element = document.createElement("div") as HTMLDivElement;
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
    }) as void;
    it("should handle a drag event and set dataTransfer", (): void => {
      dragStart(dragEvent, quadrsTe);
      (expect(dragEvent.dataTransfer?.setData) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
        [DataTransferFormat, string]
      >("text/plain", "") as void;
    }) as void;
    it("should handle a touch event and start dragging", (): void => {
      dragStart(touchEvent, quadrsTe);
      (expect(odIsDragging) as jest.JestMatchers<jest.SpyInstance>).toBe<boolean>(true) as void;
      (expect(element.style.position) as jest.JestMatchers<jest.SpyInstance>).toBe<CSSPositionValues>(
        "absolute"
      ) as void;
      (expect(element.style.zIndex) as jest.JestMatchers<jest.SpyInstance>).toBe<PseudoNum>("100") as void;
    }) as void;
    it("should call elementNotFound if the element is invalid", (): void => {
      dragStart({} as DragEvent, quadrsTe);
      expect(
        jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "elementNotFound")
      ).toHaveBeenCalled() as void;
    }) as void;
  }) as void;
  describe("dragEnter", (): void => {
    let dragEvent: DragEvent;
    beforeEach((): void => {
      dragEvent = new DragEvent("dragenter");
    }) as void;
    it("should prevent default if the event is valid", (): void => {
      dragEnter(dragEvent);
      (
        expect(
          jest.spyOn<DragEvent, DragEventMethod>(dragEvent, "preventDefault")
        ) as jest.JestMatchers<jest.SpyInstance>
      ).toHaveBeenCalled() as void;
    }) as void;
    it("should call elementNotFound if target is invalid", (): void => {
      dragEnter({ target: null } as DragEvent);
      expect(
        jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "elementNotFound")
      ).toHaveBeenCalled() as void;
    }) as void;
  }) as void;
  describe("dragOver", (): void => {
    let dragEvent: DragEvent;
    beforeEach((): void => {
      dragEvent = new DragEvent("dragover");
    }) as void;
    it("should prevent default if the event is valid", (): void => {
      dragOver(dragEvent);
      (
        expect(
          jest.spyOn<DragEvent, DragEventMethod>(dragEvent, "preventDefault")
        ) as jest.JestMatchers<jest.SpyInstance>
      ).toHaveBeenCalled() as void;
    }) as void;
    it("should call elementNotFound if target is invalid", (): void => {
      dragOver({ target: null } as DragEvent);
      expect(
        jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "elementNotFound")
      ).toHaveBeenCalled() as void;
    }) as void;
  }) as void;
  describe("dragDrop", (): void => {
    let dropEvent: DragEvent;
    let srcEl: HTMLElement;
    let targetEl: HTMLElement;
    let quadrsTe: HTMLElement[];
    beforeEach((): void => {
      srcEl = document.createElement("div") as HTMLDivElement;
      targetEl = document.createElement("div") as HTMLDivElement;
      srcEl.classList.add("quadrMainDiv");
      targetEl.classList.add("quadrAvDent");
      quadrsTe = [srcEl, targetEl];
      dropEvent = new DragEvent("drop");
      Object.defineProperty(dropEvent, "currentTarget", { value: targetEl });
    }) as void;
    it("should swap grid properties of source and target elements", (): void => {
      //@ts-ignore
      jest
        //@ts-ignore
        .spyOn<Window, WindowMethods>(window, "getComputedStyle")
        //@ts-ignore
        .mockImplementation((el: Element) => {
          if (el === srcEl) {
            return {
              getPropertyValue: (prop: string) => (prop === "grid-column" ? "1" : "1"),
            } as CSSStyleDeclaration;
          }
          if (el === targetEl) {
            return {
              getPropertyValue: (prop: string) => (prop === "grid-column" ? "2" : "2"),
            } as CSSStyleDeclaration;
          }
          return {} as CSSStyleDeclaration;
        }) as void;
      dragDrop(dropEvent, srcEl, quadrsTe, jest.fn() as jest.Mock);
      (expect(srcEl.style.getPropertyValue("grid-column")) as jest.JestMatchers<jest.SpyInstance>).toBe<PseudoNum>(
        "2"
      ) as void;
      (expect(targetEl.style.getPropertyValue("grid-column")) as jest.JestMatchers<jest.SpyInstance>).toBe<PseudoNum>(
        "1"
      ) as void;
    }) as void;
    it("should call multipleElementsNotFound if valid target element is not found", (): void => {
      dragDrop({} as Event, srcEl, quadrsTe, jest.fn() as jest.Mock);
      expect(
        jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "multipleElementsNotFound")
      ).toHaveBeenCalled() as void;
    }) as void;
  }) as void;
  describe("dragEnd", (): void => {
    let element: HTMLElement;
    beforeEach((): void => {
      element = document.createElement("div") as HTMLDivElement;
    }) as void;
    it("should call dragEndChilds if element is valid", (): void => {
      document.body.innerHTML = '<div class="contInQuadrs"></div>';
      dragEnd(element);
      expect(
        jest.spyOn<any, OdHandler>(require("../../../locals/odPage/odHandler"), "dragEndChilds")
      ).toHaveBeenCalledWith<[NodeListOf<Element>]>(
        document.querySelectorAll(".contInQuadrs") as NodeListOf<HTMLElement>
      ) as void;
    }) as void;
    it("should call elementNotFound if element is invalid", (): void => {
      dragEnd(null as any);
      expect(
        jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "elementNotFound")
      ).toHaveBeenCalled() as void;
    }) as void;
  }) as void;
  describe("dragStartChilds", (): void => {
    it("should set 'draggable' attribute to true for all elements", (): void => {
      const contInQuadrs = [
        document.createElement("div") as HTMLDivElement,
        document.createElement("div") as HTMLDivElement,
      ];
      dragStartChilds(contInQuadrs);
      contInQuadrs.forEach(contInQuadr => {
        (expect(contInQuadr.getAttribute("draggable")) as jest.JestMatchers<jest.SpyInstance>).toBe<PseudoBool>(
          "true"
        ) as void;
      }) as void;
    }) as void;
  }) as void;
  describe("dragEndChilds", (): void => {
    it("should set 'draggable' attribute to false for all elements", (): void => {
      const contInQuadrs = [
        document.createElement("div") as HTMLDivElement,
        document.createElement("div") as HTMLDivElement,
      ];
      dragEndChilds(contInQuadrs);
      contInQuadrs.forEach(contInQuadr => {
        (expect(contInQuadr.getAttribute("draggable")) as jest.JestMatchers<jest.SpyInstance>).toBe<PseudoBool>(
          "false"
        ) as void;
      }) as void;
    }) as void;
  }) as void;
  describe("resetLabels", (): void => {
    let quadrBtn: HTMLButtonElement;
    let parentDiv: HTMLDivElement;
    beforeEach((): void => {
      quadrBtn = document.createElement("button") as HTMLButtonElement;
      parentDiv = document.createElement("div") as HTMLDivElement;
      parentDiv.classList.add("quadrMainDiv");
      quadrBtn.closest = (jest.fn() as jest.Mock).mockReturnValue(parentDiv) as jest.Mock;
    }) as void;
    it("should reset all input values to 'Hígido'", (): void => {
      for (let i = 0; i < 8; i++) {
        const input = document.createElement("input") as HTMLInputElement;
        input.id = `inpD${i}`;
        parentDiv.appendChild(input);
      }
      resetLabels(quadrBtn);
      parentDiv
        .querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input[id^=inpD]")
        .forEach((input): void => {
          (input instanceof HTMLInputElement ||
            input instanceof HTMLSelectElement ||
            inputEl instanceof HTMLTextAreaElement) &&
            ((expect((input as HTMLInputElement).value) as jest.JestMatchers<jest.SpyInstance>).toBe<string>(
              "Hígido"
            ) as void);
        }) as void;
    }) as void;
    it("should call multipleElementsNotFound if inputs are missing", (): void => {
      resetLabels(quadrBtn);
      expect(
        jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "multipleElementsNotFound")
      ).toHaveBeenCalled() as void;
    }) as void;
    it("should log a warning if input length is less than 8", (): void => {
      parentDiv.appendChild(document.createElement("input") as HTMLInputElement);
      resetLabels(quadrBtn);
      expect(
        jest.spyOn<Console, ConsoleMethod>(console, "warn").mockImplementation((): void => {}) as jest.SpyInstance
      ).toHaveBeenCalledWith<[any]>(expect.stringContaining("Error validating inputs")) as void;
    }) as void;
  }) as void;
  describe("addSubDivTrat", (): void => {
    let addSubDivBtn: HTMLButtonElement;
    let blockCount = 1;
    beforeEach((): void => {
      addSubDivBtn = document.createElement("button") as HTMLButtonElement;
      addSubDivBtn.classList.add("addTrat");
      document.body.innerHTML = '<div id="tratContainer"></div>';
    }) as void;
    it("should add a new block to the container", (): void => {
      const clickEvent = new MouseEvent("click", { bubbles: true });
      Object.defineProperty(clickEvent, "currentTarget", {
        value: addSubDivBtn,
      });
      addSubDivTrat(clickEvent, addSubDivBtn, blockCount);
      (
        expect(document.getElementById(`divSubTrat${blockCount}`)).not as jest.JestMatchers<jest.SpyInstance>
      ).toBeNull() as void;
    }) as void;
    it("should add event listeners for the new block", (): void => {
      const clickEvent = new MouseEvent("click", { bubbles: true });
      Object.defineProperty(clickEvent, "currentTarget", {
        value: addSubDivBtn,
      });
      addSubDivTrat(clickEvent, addSubDivBtn, blockCount);
      const newBlock = document.getElementById(`divSubTrat${blockCount}`);
      (expect(newBlock).not as jest.JestMatchers<jest.SpyInstance>).toBeNull() as void;
      newBlock!.querySelectorAll<HTMLButtonElement>("button").forEach((button): void => {
        (expect(button.tagName.toLowerCase()) as jest.JestMatchers<jest.SpyInstance>).toBe<HTMLTag>("button") as void;
      }) as void;
    }) as void;
    it("should call elementNotFound if target element is invalid", (): void => {
      addSubDivTrat({ currentTarget: null } as any, addSubDivBtn, blockCount);
      expect(
        jest.spyOn<any, ErrorHandler>(require("../../../global/handlers/errorHandler"), "elementNotFound")
      ).toHaveBeenCalled() as void;
    }) as void;
  }) as void;
}) as void;
