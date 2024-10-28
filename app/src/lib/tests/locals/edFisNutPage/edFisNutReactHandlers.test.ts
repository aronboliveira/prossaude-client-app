import { handleGenRender, handleQueryForRefs } from "../../../../lib/locals/edFisNutPage/edFisNutReactHandlers";
import { fluxGen } from "../../../global/gModel";
import { person } from "../../../../vars";
import { MutableRefObject } from "react";
jest.mock("@/lib/global/gModel", () => ({
  fluxGen: jest.fn(),
}));

jest.mock("@/vars", () => ({
  person: {
    dispatchGen: jest.fn(),
  },
}));

describe("handleGenRender", () => {
  const mockSetGenTrans = jest.fn();
  const mockSetGenBirthRel = jest.fn();
  const mockSetGenFisAlin = jest.fn();
  const genProps = { g: "someG", gb: "someGB", gt: "someGT", ga: "someGA" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("calls fluxGen with correct arguments and dispatches to person", () => {
    handleGenRender({
      ...genProps,
      setGenTrans: mockSetGenTrans,
      setGenBirthRel: mockSetGenBirthRel,
      setGenFisAlin: mockSetGenFisAlin,
    });

    expect(fluxGen).toHaveBeenCalledWith(genProps, mockSetGenTrans, mockSetGenBirthRel, mockSetGenFisAlin);
    expect(person.dispatchGen).toHaveBeenCalledWith(fluxGen.mock.results[0].value);
  });

  test("works with optional parameters omitted", () => {
    handleGenRender(genProps);

    expect(fluxGen).toHaveBeenCalledWith(genProps, undefined, undefined, undefined);
    expect(person.dispatchGen).toHaveBeenCalledWith(fluxGen.mock.results[0].value);
  });
});

describe("handleQueryForRefs", () => {
  let mockRef1: MutableRefObject<any>;
  let mockRef2: MutableRefObject<any>;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="element1"></div>
      <div id="container">
        <span class="child-element"></span>
      </div>
    `;

    mockRef1 = { current: null };
    mockRef2 = { current: null };
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("assigns element by ID to ref when available", () => {
    handleQueryForRefs({ id: "element1", r: mockRef1 });
    expect(mockRef1.current).toBe(document.getElementById("element1"));
  });

  test("assigns fallback element when primary element is not found", () => {
    handleQueryForRefs({
      id: "nonExistentElement",
      r: mockRef2,
      fallback: { p: "container", selector: ".child-element" },
    });
    expect(mockRef2.current).toBe(document.querySelector("#container .child-element"));
  });

  test("does not assign anything if neither primary nor fallback element is found", () => {
    handleQueryForRefs({
      id: "nonExistentElement",
      r: mockRef2,
      fallback: { p: "nonExistentContainer", selector: ".child-element" },
    });
    expect(mockRef2.current).toBeNull();
  });

  test("does nothing if ref is already assigned", () => {
    const existingElement = document.getElementById("element1");
    mockRef1.current = existingElement;
    handleQueryForRefs({ id: "element1", r: mockRef1 });
    expect(mockRef1.current).toBe(existingElement);
  });
});
