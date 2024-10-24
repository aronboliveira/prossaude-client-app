//v1.0.0
import * as gModel from "../../global/gModel";
import * as errorHandler from "../../global/handlers/errorHandler";
import {
  AnchorRel,
  CEP,
  CPF,
  CrossOrigin,
  Email,
  ErrorHandler,
  LocalNumber,
  PseudoNum,
  ScriptType,
  brDate,
} from "../../global/declarations/testVars";
describe("numberLimit", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<typeof errorHandler, "elementNotFound">(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`)) as jest.SpyInstance;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should remove invalid characters from input", (): void => {
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockInput.value = "1234$%";
    mockInput.classList.add("inpLocNum");
    gModel.numberLimit(mockInput);
    expect(mockInput.value).toBe<PseudoNum>("1234") as void;
  }) as void;
  it("should limit value to two digits for specific classes", (): void => {
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockInput.value = "123";
    mockInput.classList.add("inpAtivFis");
    gModel.numberLimit(mockInput);
    expect(mockInput.value).toBe<PseudoNum>("12") as void;
  }) as void;
  it("should throw an error if input element is invalid", (): void => {
    gModel.numberLimit(null as any);
    expect(elementNotFoundSpy).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("normalizeNegatives", (): void => {
  let inputNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    inputNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "inputNotFound")
      .mockImplementation((): Error => new Error(`Input not found.`)) as jest.SpyInstance;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should normalize negative values to zero", (): void => {
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockInput.value = "-10";
    const result = gModel.normalizeNegatives(mockInput);
    expect(mockInput.value).toBe<PseudoNum>("0") as void;
    expect(result).toBe<PseudoNum>("0") as void;
  }) as void;
  it("should throw an error if the element is not an input", (): void => {
    gModel.normalizeNegatives(null as any);
    expect(inputNotFoundSpy).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("parseNotNaN", (): void => {
  it("should return default value for non-numeric string", (): void => {
    expect(gModel.parseNotNaN("abc", 10, "int")).toBe<number>(10) as void;
  }) as void;
  it("should parse valid integer string", (): void => {
    expect(gModel.parseNotNaN("42", 0, "int")).toBe<number>(42) as void;
  }) as void;
  it("should parse valid float string", (): void => {
    expect(gModel.parseNotNaN("3.14159", 0, "float", 2)).toBe<number>(3.14) as void;
  }) as void;
  it("should return default value if context is invalid", (): void => {
    expect(gModel.parseNotNaN("100", 0, "invalid")).toBe<number>(0) as void;
  }) as void;
}) as void;
describe("formatCEP", (): void => {
  let inputNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    inputNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "inputNotFound")
      .mockImplementation((): Error => new Error(`Input not found.`)) as jest.SpyInstance;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should format valid CEP correctly", (): void => {
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockInput.value = "12345678";
    gModel.formatCEP(mockInput);
    expect(mockInput.value).toBe<CEP>("12345-678") as void;
  }) as void;
  it("should throw an error if element is not an input", (): void => {
    gModel.formatCEP(null as any);
    expect(inputNotFoundSpy).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("formatCPF", (): void => {
  let inputNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    inputNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "inputNotFound")
      .mockImplementation((): Error => new Error(`Input not found.`)) as jest.SpyInstance;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should format valid CPF correctly", (): void => {
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockInput.value = "12345678909";
    gModel.formatCPF(mockInput);
    expect(mockInput.value).toBe<CPF>("123.456.789-09") as void;
  }) as void;
  it("should throw an error if element is not an input", (): void => {
    gModel.formatCPF(null as any);
    expect(inputNotFoundSpy).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("formatTel", (): void => {
  let inputNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    inputNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "inputNotFound")
      .mockImplementation((): Error => new Error(`Input not found.`)) as jest.SpyInstance;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should format telephone number correctly", (): void => {
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockInput.value = "11987654321";
    expect(gModel.formatTel(mockInput, true)).toBe<LocalNumber>("(11) 98765-4321") as void;
  }) as void;
  it("should throw an error if element is not an input", (): void => {
    gModel.formatTel(null as any);
    expect(inputNotFoundSpy).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("addEmailExtension", (): void => {
  let inputNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    inputNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "inputNotFound")
      .mockImplementation((): Error => new Error(`Input not found.`)) as jest.SpyInstance;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should add default email extension", (): void => {
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockInput.value = "";
    expect(gModel.addEmailExtension(mockInput)).toBe<Email>("@.") as void;
  }) as void;
  it("should throw an error if element is not an input", (): void => {
    gModel.addEmailExtension(null as any);
    expect(inputNotFoundSpy).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("removeFirstClick", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`)) as jest.SpyInstance;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should clear text content on first click", (): void => {
    const mockElement = document.createElement("div") as HTMLDivElement;
    mockElement.textContent = "Insira Seu Nome Aqui";
    expect(gModel.removeFirstClick(mockElement)).toBe<string>("") as void;
  }) as void;
  it("should throw an error if element is not valid", (): void => {
    gModel.removeFirstClick(null as any);
    expect(elementNotFoundSpy).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("checkAutoCorrect", (): void => {
  it("should return false if button text contains 'Ativar'", (): void => {
    const mockButton = document.createElement("button") as HTMLButtonElement;
    mockButton.textContent = "Ativar";
    expect(gModel.checkAutoCorrect(mockButton)).toBe<boolean>(false) as void;
  }) as void;
  it("should return true if checkbox is checked", (): void => {
    const mockCheckbox = document.createElement("input") as HTMLInputElement;
    mockCheckbox.type = "checkbox";
    mockCheckbox.checked = true;
    expect(gModel.checkAutoCorrect(mockCheckbox)).toBe<boolean>(true) as void;
  }) as void;
}) as void;
describe("switchAutocorrect", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`)) as jest.SpyInstance;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should toggle autocorrect on a button", (): void => {
    const mockButton = document.createElement("button") as HTMLButtonElement;
    mockButton.textContent = "Ativar Autocorreção";
    expect(mockButton.textContent).toBe<string>("Desativar Autocorreção") as void;
    expect(gModel.switchAutocorrect(new Event("click"), mockButton, false)).toBe<boolean>(true) as void;
  }) as void;
  it("should throw an error if element is not a valid button or input", (): void => {
    gModel.switchAutocorrect(new Event("click"), null as any);
    expect(elementNotFoundSpy).toHaveBeenCalledWith<[null, string, any]>(
      null,
      "arguments for switchAutocorrect()",
      expect.any(Error),
    );
  }) as void;
}) as void;
describe("checkAllGenConts", (): void => {
  let multipleElementsNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    multipleElementsNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "multipleElementsNotFound")
      .mockImplementation((): Error => new Error(`Multiple elements not found.`)) as jest.SpyInstance;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should return true if all elements are valid inputs", (): void => {
    expect(
      gModel.checkAllGenConts(document.createElement("input") as HTMLInputElement, document.createElement("textarea")),
    ).toBe<boolean>(true) as void;
  }) as void;
  it("should call error handler if invalid elements are passed", (): void => {
    gModel.checkAllGenConts(null as any);
    expect(multipleElementsNotFoundSpy).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("fluxGen", () => {
  let genConts: any, alignSetter: jest.Mock, transSetter: jest.Mock, birthSetter: jest.Mock;
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    alignSetter = jest.fn();
    transSetter = jest.fn();
    birthSetter = jest.fn();
    jest.spyOn(gModel, "showStgTransHorm").mockImplementation(jest.fn());
    jest.spyOn(gModel, "showGenFisAlin").mockImplementation(jest.fn());
    jest.spyOn(gModel, "hideStgTransHorm").mockImplementation(jest.fn());
    jest.spyOn(gModel, "hideGenFisAlin").mockImplementation(jest.fn());
    jest.spyOn(errorHandler, "multipleElementsNotFound").mockImplementation(jest.fn());
    genConts = {
      g: document.createElement("select"),
      gb: document.createElement("select"),
      gt: document.createElement("select"),
      ga: document.createElement("select"),
    };
    genConts.g.value = "masculino";
    genConts.gb.value = "cis";
    genConts.gt.value = "undefined";
    genConts.ga.value = "masculinizado";
  });
  test('should call switchAlign and disable elements when g is "masculino" and gb is "cis"', () => {
    expect(gModel.fluxGen(genConts, transSetter, birthSetter, alignSetter)).toBe("masculino");
    expect(genConts.gb.disabled).toBe(false);
    expect(genConts.gt.disabled).toBe(true);
    expect(genConts.ga.disabled).toBe(true);
    expect(gModel.hideStgTransHorm).toHaveBeenCalledWith(genConts.gt);
    expect(gModel.hideGenFisAlin).toHaveBeenCalledWith(genConts.ga);
  });
  test('should call switchAlign and fluxAlign when gb is "trans" and gt is "avancado"', () => {
    genConts.gb.value = "trans";
    genConts.gt.value = "avancado";
    expect(gModel.fluxGen(genConts, transSetter, birthSetter, alignSetter)).toBe("masculino");
    expect(gModel.showStgTransHorm).toHaveBeenCalledWith(genConts.gt);
    expect(gModel.showGenFisAlin).toHaveBeenCalledWith(genConts.ga, genConts.g);
  });
  test('should call alignSetter when g is "feminino" and gb is not "cis"', () => {
    genConts.g.value = "feminino";
    genConts.gb.value = "trans";
    expect(gModel.fluxGen(genConts, transSetter, birthSetter, alignSetter)).toBe("feminino");
    expect(alignSetter).toHaveBeenCalledWith("feminilizado");
  });
  test('should set birthSetter and transSetter when g is "naoBinario"', () => {
    genConts.g.value = "naoBinario";
    expect(gModel.fluxGen(genConts, transSetter, birthSetter, alignSetter)).toBe("neutro");
    expect(genConts.gb.disabled).toBe(true);
    expect(birthSetter).toHaveBeenCalledWith("trans");
  });
  test('should disable elements when g is "undefined"', () => {
    genConts.g.value = "undefined";
    expect(gModel.fluxGen(genConts, transSetter, birthSetter, alignSetter)).toBe("masculino");
    expect(genConts.gb.disabled).toBe(true);
    expect(genConts.gt.disabled).toBe(true);
    expect(genConts.ga.disabled).toBe(false);
    expect(transSetter).toHaveBeenCalledWith("undefined");
  });
  test("should call multipleElementsNotFound when genConts elements are invalid", () => {
    genConts.g = null;
    genConts.gb = null;
    genConts.gt = null;
    genConts.ga = null;
    gModel.fluxGen(genConts, transSetter, birthSetter, alignSetter);
    expect(errorHandler.multipleElementsNotFound).toHaveBeenCalled();
  });
  test("should handle alignSetter and switchAlign behavior correctly", () => {
    genConts.gb.value = "undefined";
    genConts.g.value = "masculino";
    expect(gModel.fluxGen(genConts, transSetter, birthSetter, alignSetter)).toBe("masculino");
    expect(alignSetter).toHaveBeenCalledWith("masculinizado");
  });
}) as void;
describe("showGenFisAlin", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`)) as jest.SpyInstance;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should show genFisAlin", (): void => {
    const mockGenFisAlin = document.createElement("select");
    const mockGenSpan = document.createElement("div") as HTMLDivElement;
    mockGenSpan.classList.add("genSpan");
    mockGenSpan.hidden = true;
    mockGenFisAlin.appendChild<HTMLSpanElement>(mockGenSpan);
    expect(mockGenSpan.hidden).toBe<boolean>(false) as void;
    expect(gModel.showGenFisAlin(mockGenFisAlin, document.createElement("select"))).toBe<boolean>(true) as void;
  }) as void;
  it("should throw an error if element is not valid", (): void => {
    gModel.showGenFisAlin(null as any, null);
    expect(elementNotFoundSpy).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("hideGenFisAlin", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`)) as jest.SpyInstance;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should hide genFisAlin", (): void => {
    const mockGenFisAlin = document.createElement("select");
    const mockGenSpan = document.createElement("div") as HTMLDivElement;
    mockGenSpan.classList.add("genSpan");
    mockGenSpan.hidden = false;
    mockGenFisAlin.appendChild<HTMLSpanElement>(mockGenSpan);
    expect(mockGenSpan.hidden).toBe<boolean>(true) as void;
    expect(gModel.hideGenFisAlin(mockGenFisAlin)).toBe<boolean>(false) as void;
  }) as void;
  it("should throw an error if element is not valid", (): void => {
    gModel.hideGenFisAlin(null as any);
    expect(elementNotFoundSpy).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("showStgTransHorm", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`)) as jest.SpyInstance;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should show genTrans", (): void => {
    const mockGenTrans = document.createElement("select");
    const mockGenSpan = document.createElement("div") as HTMLDivElement;
    mockGenSpan.classList.add("genSpan");
    mockGenSpan.hidden = true;
    mockGenTrans.appendChild<HTMLSpanElement>(mockGenSpan);
    expect(mockGenSpan.hidden).toBe<boolean>(false) as void;
    expect(gModel.showStgTransHorm(mockGenTrans)).toBe<boolean>(true) as void;
  }) as void;
  it("should throw an error if element is not valid", (): void => {
    gModel.showStgTransHorm(null as any);
    expect(elementNotFoundSpy).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("filterIdsByGender", (): void => {
  let typeErrorSpy: jest.SpyInstance;
  beforeEach((): void => {
    typeErrorSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "typeError")
      .mockImplementation((): Error => new Error(`Type error.`)) as jest.SpyInstance;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should filter ids for masculine body type", (): void => {
    expect(gModel.filterIdsByGender(["peit", "abd", "coxa", "tricp"], "masculino")).toEqual<[string, string, string]>([
      "peit",
      "abd",
      "coxa",
    ]);
  }) as void;
  it("should return default ids if body type is invalid", (): void => {
    expect(gModel.filterIdsByGender(["invalid"], "invalid")).toEqual<[string, string, string]>(["peit", "abd", "coxa"]);
    expect(typeErrorSpy).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("checkPasswordPattern", (): void => {
  let inputNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    inputNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "inputNotFound")
      .mockImplementation((): Error => new Error(`Input not found.`)) as jest.SpyInstance;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should set custom validity for missing number", (): void => {
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockInput.value = "Password!";
    gModel.checkPasswordPattern(mockInput);
    expect(mockInput.validationMessage).toBe<string>("Sua senha deve ter pelo menos um número") as void;
  }) as void;
  it("should set custom validity for missing uppercase letter", (): void => {
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockInput.value = "password1!";
    gModel.checkPasswordPattern(mockInput);
    expect(mockInput.validationMessage).toBe<string>("Sua senha deve ter pelo menos uma letra maiúscula") as void;
  }) as void;
  it("should set custom validity for missing symbol", (): void => {
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockInput.value = "Password1";
    gModel.checkPasswordPattern(mockInput);
    expect(mockInput.validationMessage).toBe<string>("Sua senha deve ter pelo menos um símbolo") as void;
  }) as void;
  it("should set custom validity for short password", (): void => {
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockInput.value = "P1!";
    gModel.checkPasswordPattern(mockInput);
    expect(mockInput.validationMessage).toBe<string>("Sua senha deve ter pelo menos oito caracteres") as void;
  }) as void;
  it("should throw an error if input element is invalid", (): void => {
    gModel.checkPasswordPattern(null as any);
    expect(inputNotFoundSpy).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("correctCursorNextWords", (): void => {
  it("should move cursor to the end and fix words", (): void => {
    const mockElement = document.createElement("input") as HTMLInputElement;
    mockElement.value = "Sample text";
    expect(gModel.correctCursorNextWords(false, false, "Sample", mockElement)).toEqual<[string, boolean]>([
      "Sample text",
      true,
    ]);
  }) as void;
  it("should return the correct text even if no match is found", (): void => {
    const mockElement = document.createElement("input") as HTMLInputElement;
    mockElement.value = "Different text";
    expect(gModel.correctCursorNextWords(false, false, "NoMatch", mockElement)).toEqual<[string, boolean]>([
      "Different text",
      false,
    ]);
  }) as void;
}) as void;
describe("wrongStartCorrection", (): void => {
  it("should correct text when wrong start is detected", (): void => {
    expect(gModel.wrongStartCorrection("Sample text", "Sample")).toBe<string>("ample textS") as void;
  }) as void;
  it("should return original text when no match is found", (): void => {
    expect(gModel.wrongStartCorrection("Sample text", "NoMatch")).toBe<string>("Sample text") as void;
  }) as void;
}) as void;
describe("moveCursorToTheEnd", (): void => {
  it("should move the cursor to the end of the text", (): void => {
    const mockElement = document.createElement("div") as HTMLDivElement;
    document.body.appendChild<HTMLElement>(mockElement);
    expect(gModel.moveCursorToTheEnd(false, mockElement)).toBe<boolean>(true) as void;
  }) as void;
  it("should not move the cursor if isCursorAutoMoved is true", (): void => {
    const mockElement = document.createElement("div") as HTMLDivElement;
    document.body.appendChild<HTMLElement>(mockElement);
    expect(gModel.moveCursorToTheEnd(true, mockElement) as boolean).toBe<boolean>(true) as void;
  }) as void;
}) as void;
describe("fixCursorPosition", (): void => {
  it("should correctly set cursor position", (): void => {
    const mockRange = document.createRange();
    gModel.fixCursorPosition(document.createElement("div") as HTMLDivElement, mockRange, window.getSelection(), true);
    expect(mockRange.collapsed).toBe<boolean>(true) as void;
  }) as void;
}) as void;
describe("fixFirstLetter", (): void => {
  it("should capitalize the first letter", (): void => {
    expect(
      gModel.fixFirstLetter(
        "a",
        /^[a-z]/,
        document.createElement("div") as HTMLDivElement,
        document.createRange(),
        window.getSelection(),
      ),
    ).toBe<string>("A") as void;
  }) as void;
  it("should return unchanged text if no match is found", (): void => {
    expect(
      gModel.fixFirstLetter(
        "A",
        /^[a-z]/,
        document.createElement("div") as HTMLDivElement,
        document.createRange(),
        window.getSelection(),
      ),
    ).toBe<string>("A") as void;
  }) as void;
}) as void;
describe("fixWrongStarts", (): void => {
  it("should remove wrong start from text", (): void => {
    expect(gModel.fixWrongStarts("Sample text", "Sample", 6)).toBe<string>("text") as void;
  }) as void;
  it("should return the original text if no match is found", (): void => {
    expect(gModel.fixWrongStarts("Sample text", "NoMatch", 6)).toBe<string>("Sample text") as void;
  }) as void;
}) as void;
describe("fixNextWordsIniNotD", (): void => {
  it("should capitalize the first letter of the next word", (): void => {
    expect(gModel.fixNextWordsIniNotD("sample text", "text")).toBe<string>("sample Text") as void;
  }) as void;
}) as void;
describe("fixNextWordsAfterD", (): void => {
  it("should capitalize the letter after 'D'", (): void => {
    expect(gModel.fixNextWordsAfterD("Dsample text", "D")).toBe<string>("DSample text") as void;
  }) as void;
}) as void;
describe("fixUnproperUppercases", (): void => {
  it("should fix improper uppercases in text", (): void => {
    expect(gModel.fixUnproperUppercases("sAmple text", "A", 0)).toBe<string>("Sample text") as void;
  }) as void;
}) as void;
describe("fixForcedUpperCase", (): void => {
  it("should fix forced uppercase in text", (): void => {
    const mockElement = document.createElement("div") as HTMLDivElement;
    mockElement.textContent = "sample text";
    expect(
      gModel.fixForcedUpperCase(document.createElement("div") as HTMLDivElement, ["sample"], "sample"),
    ).toBe<string>("sample text") as void;
  }) as void;
}) as void;
describe("autoCapitalizeInputs", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`)) as jest.SpyInstance;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should capitalize the first letter of a single word", (): void => {
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockInput.type = "text";
    mockInput.value = "example";
    expect(gModel.autoCapitalizeInputs(mockInput)).toBe<string>("Example") as void;
  }) as void;
  it("should capitalize the first letter of each word", (): void => {
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockInput.type = "text";
    mockInput.value = "example text";
    expect(gModel.autoCapitalizeInputs(mockInput)).toBe<string>("Example Text") as void;
  }) as void;
  it("should correct improper upper case in a sentence", (): void => {
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockInput.type = "text";
    mockInput.value = "eXample TexT";
    expect(gModel.autoCapitalizeInputs(mockInput)).toBe<string>("Example Text") as void;
  }) as void;
  it("should correct capitalization after the letter 'D'", (): void => {
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockInput.type = "text";
    mockInput.value = "Dexample text";
    expect(gModel.autoCapitalizeInputs(mockInput)).toBe<string>("DExample text") as void;
  }) as void;
  it("should fix multiple upper case letters in a word", (): void => {
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockInput.type = "text";
    mockInput.value = "EXample";
    expect(gModel.autoCapitalizeInputs(mockInput)).toBe<string>("Example") as void;
  }) as void;
  it("should not modify text if autocorrect is disabled", (): void => {
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockInput.type = "text";
    mockInput.value = "example text";
    expect(gModel.autoCapitalizeInputs(mockInput, false)).toBe<string>("example text") as void;
  }) as void;
  it("should remove improper characters", (): void => {
    const mockInput = document.createElement("input") as HTMLInputElement;
    mockInput.type = "text";
    mockInput.value = "Example @!text";
    expect(gModel.autoCapitalizeInputs(mockInput)).toBe<string>("Example text") as void;
  }) as void;
  it("should throw an error if the element is not an input or textarea", (): void => {
    gModel.autoCapitalizeInputs(null as any);
    expect(elementNotFoundSpy).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("capitalizeFirstLetter", (): void => {
  let typeErrorSpy: jest.SpyInstance;
  beforeEach((): void => {
    typeErrorSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "typeError")
      .mockImplementation((): Error => new Error(`Type error.`)) as jest.SpyInstance;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should capitalize the first letter of the string", (): void => {
    (expect(gModel.capitalizeFirstLetter("example")) as jest.JestMatchers<jest.SpyInstance>).toBe<string>(
      "Example",
    ) as void;
  }) as void;
  it("should handle empty strings", (): void => {
    (expect(gModel.capitalizeFirstLetter("") as string) as jest.JestMatchers<jest.SpyInstance>).toBe<string>(
      "",
    ) as void;
  }) as void;
  it("should call typeError if the argument is not a string", (): void => {
    gModel.capitalizeFirstLetter(null as any) as string;
    (expect(typeErrorSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("textTransformPascal", (): void => {
  let typeErrorSpy: jest.SpyInstance;
  beforeEach((): void => {
    typeErrorSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "typeError")
      .mockImplementation((): Error => new Error(`Type error.`)) as jest.SpyInstance;
    jest.clearAllMocks() as typeof jest;
  }) as void;
  it("should transform text to PascalCase", (): void => {
    (expect(gModel.textTransformPascal("example")) as jest.JestMatchers<jest.SpyInstance>).toBe<string>(
      "Example",
    ) as void;
  }) as void;
  it("should handle uppercase strings", (): void => {
    (expect(gModel.textTransformPascal("EXAMPLE")) as jest.JestMatchers<jest.SpyInstance>).toBe<string>(
      "Example",
    ) as void;
  }) as void;
  it("should call typeError if the argument is not a string", (): void => {
    gModel.textTransformPascal(null as any) as string;
    (expect(typeErrorSpy) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
}) as void;
describe("dateISOtoBRL", (): void => {
  it("should convert ISO date to BRL format", (): void => {
    (expect(gModel.dateISOtoBRL("2023-09-09") as string) as jest.JestMatchers<jest.SpyInstance>).toBe<brDate>(
      "09/09/2023",
    ) as void;
  }) as void;
  it("should return the input if it's already in BRL format", (): void => {
    (expect(gModel.dateISOtoBRL("09/09/2023") as string) as jest.JestMatchers<jest.SpyInstance>).toBe<brDate>(
      "09/09/2023",
    ) as void;
  }) as void;
  it("should handle invalid ISO date input", (): void => {
    (expect(gModel.dateISOtoBRL("invalid-date") as string) as jest.JestMatchers<jest.SpyInstance>).toBe<brDate>(
      "00/00/0000",
    ) as void;
  }) as void;
}) as void;
describe("camelToKebab", (): void => {
  it("should convert camelCase to kebab-case", (): void => {
    (expect(gModel.camelToKebab("camelCaseText") as string) as jest.JestMatchers<jest.SpyInstance>).toBe<string>(
      "camel-case-text",
    ) as void;
  }) as void;
  it("should handle empty strings", (): void => {
    (expect(gModel.camelToKebab("") as string) as jest.JestMatchers<jest.SpyInstance>).toBe<string>("") as void;
  }) as void;
}) as void;
describe("kebabToCamel", (): void => {
  it("should convert kebab-case to camelCase", (): void => {
    (expect(gModel.kebabToCamel("kebab-case-text") as string) as jest.JestMatchers<jest.SpyInstance>).toBe<string>(
      "kebabCaseText",
    ) as void;
  }) as void;
  it("should handle empty strings", (): void => {
    (expect(gModel.kebabToCamel("") as string) as jest.JestMatchers<jest.SpyInstance>).toBe<string>("") as void;
  }) as void;
}) as void;
describe("regularToSnake", (): void => {
  it("should convert regular text to snake-case", (): void => {
    (expect(gModel.regularToSnake("Regular Text") as string) as jest.JestMatchers<jest.SpyInstance>).toBe<string>(
      "regular-text",
    ) as void;
  }) as void;
  it("should handle already snake-cased text", (): void => {
    (expect(gModel.regularToSnake("regular-text") as string) as jest.JestMatchers<jest.SpyInstance>).toBe<string>(
      "regular-text",
    ) as void;
  }) as void;
}) as void;
describe("modelScripts", (): void => {
  beforeEach((): void => {
    document.body.innerHTML = `
      <meta name="description" content="test description">
      <script src="test.js"></script>
      <style>.test {}</style>
      <link href="test.css" rel="stylesheet">
      <a href="http://external.com"></a>
    `;
  }) as void;
  it("should assign IDs and fix attributes in meta tags", (): void => {
    gModel.modelScripts();
    expect(document.querySelector<HTMLMetaElement>("meta")?.id).toBe<string>("description") as void;
  }) as void;
  it("should assign type to scripts and handle crossorigin", (): void => {
    gModel.modelScripts();
    const script = document.querySelector<HTMLScriptElement>("script");
    expect(script?.type).toBe<ScriptType>("text/javascript") as void;
    expect(script?.crossOrigin).toBe<CrossOrigin>("anonymous") as void;
  }) as void;
  it("should assign ID to link tags", (): void => {
    gModel.modelScripts();
    expect(document.querySelector<HTMLLinkElement>("link")?.id).toBe<string>("test.css") as void;
  }) as void;
  it("should add noreferrer and noopener to external links", (): void => {
    gModel.modelScripts();
    const a = document.querySelector<HTMLAnchorElement>("a");
    (expect(a?.rel) as jest.JestMatchers<jest.SpyInstance>).toContain<AnchorRel>("noopener") as void;
    (expect(a?.rel) as jest.JestMatchers<jest.SpyInstance>).toContain<AnchorRel>("noreferrer") as void;
  }) as void;
}) as void;
describe("assignFormAttrs", (): void => {
  let form: HTMLFormElement,
    input: HTMLInputElement,
    select: HTMLSelectElement,
    textarea: HTMLTextAreaElement,
    button: HTMLButtonElement;
  beforeEach((): void => {
    form = document.createElement("form");
    form.id = "testForm";
    form.action = "/submit";
    form.method = "POST";
    form.enctype = "multipart/form-data";
    form.noValidate = true;
    const metaCharset = document.createElement("meta");
    metaCharset.setAttribute("charset", "utf-8") as void;
    document.head.appendChild<HTMLMetaElement>(metaCharset);
    input = document.createElement("input");
    input.id = "input1";
    form.appendChild<HTMLInputElement>(input);
    select = document.createElement("select");
    select.id = "select1";
    form.appendChild<HTMLSelectElement>(select);
    textarea = document.createElement("textarea");
    textarea.id = "textarea1";
    form.appendChild<HTMLTextAreaElement>(textarea);
    button = document.createElement("button");
    button.id = "button1";
    form.appendChild<HTMLButtonElement>(button);
    document.body.appendChild<HTMLFormElement>(form);
  }) as void;
  afterEach((): void => {
    document.body.innerHTML = "";
    document.head.innerHTML = "";
  }) as void;
  it("should throw an error if the passed argument is not a form element", (): void => {
    (expect(() => gModel.assignFormAttrs(null) as void) as jest.JestMatchers<jest.SpyInstance>).toThrow(
      "Failed to validate Form Reference",
    ) as void;
  }) as void;
  it("should set acceptCharset to utf-8 based on meta charset tag", (): void => {
    gModel.assignFormAttrs(form) as void;
    (expect(form.acceptCharset) as jest.JestMatchers<jest.SpyInstance>).toBe("utf-8") as void;
  }) as void;
  it("should assign form attributes to input elements", (): void => {
    gModel.assignFormAttrs(form) as void;
    (expect(input.formAction) as jest.JestMatchers<jest.SpyInstance>).toBe(form.action) as void;
    (expect(input.formMethod) as jest.JestMatchers<jest.SpyInstance>).toBe(form.method) as void;
    (expect(input.formEnctype) as jest.JestMatchers<jest.SpyInstance>).toBe(form.enctype) as void;
    (expect(input.formNoValidate) as jest.JestMatchers<jest.SpyInstance>).toBe(form.noValidate) as void;
  }) as void;
  it("should assign dataset attributes to form elements", (): void => {
    gModel.assignFormAttrs(form);
    (expect(input.dataset.form) as jest.JestMatchers<jest.SpyInstance>).toBe(form.id) as void;
    (expect(select.dataset.form) as jest.JestMatchers<jest.SpyInstance>).toBe(form.id) as void;
    (expect(textarea.dataset.form) as jest.JestMatchers<jest.SpyInstance>).toBe(form.id) as void;
    (expect(button.dataset.form) as jest.JestMatchers<jest.SpyInstance>).toBe(form.id) as void;
  }) as void;
  it("should assign placeholder based on label content", (): void => {
    const label = document.createElement("label");
    label.setAttribute("for", input.id);
    label.innerText = "Nome:";
    form.appendChild<HTMLLabelElement>(label);
    gModel.assignFormAttrs(form) as void;
    (expect(input.placeholder) as jest.JestMatchers<jest.SpyInstance>).toBe("Preencha aqui o nome") as void;
  }) as void;
  it("should assign unique ids to labels without ids", (): void => {
    const label = document.createElement("label");
    label.htmlFor = input.id;
    form.appendChild<HTMLLabelElement>(label);
    gModel.assignFormAttrs(form) as void;
    (expect(label.id) as jest.JestMatchers<jest.SpyInstance>).toBe(`${input.id}_lab`) as void;
  }) as void;
}) as void;
describe("applyFieldConstraints", () => {
  let inputEl: HTMLInputElement;
  beforeEach(() => {
    inputEl = document.createElement("input");
  });
  test("limits the value length for input element", () => {
    inputEl.maxLength = 5;
    inputEl.value = "123456";
    gModel.applyFieldConstraints(inputEl);
    expect(inputEl.value).toBe("12345");
  });
  test("does not throw error if invalid element is passed", () => {
    const divEl = document.createElement("div");
    expect(() => gModel.applyFieldConstraints(divEl)).not.toThrow();
  });
  test("validates min and max value for number input", () => {
    inputEl.type = "number";
    inputEl.min = "10";
    inputEl.max = "100";
    inputEl.value = "150";
    gModel.applyFieldConstraints(inputEl);
    expect(inputEl.value).toBe("100");
  });
}) as void;
describe("applyConstraintsTitle", () => {
  let formEl: HTMLFormElement;
  let inputEl: HTMLInputElement;
  beforeEach(() => {
    formEl = document.createElement("form");
    inputEl = document.createElement("input");
    formEl.appendChild(inputEl);
  });
  test("adds title for required input field", () => {
    inputEl.required = true;
    gModel.applyConstraintsTitle(formEl);
    expect(inputEl.title).toContain("Obrigatório!");
  });
  test("adds minLength and maxLength constraints to the title", () => {
    inputEl.minLength = 3;
    inputEl.maxLength = 10;
    gModel.applyConstraintsTitle(formEl);
    expect(inputEl.title).toContain("O campo deve conter no mínimo 3 dígitos");
    expect(inputEl.title).toContain("O campo deve conter no máximo 10 dígitos");
  });
}) as void;
describe("compProp", () => {
  let element: HTMLElement;
  beforeEach(() => {
    element = document.createElement("div");
    jest.spyOn(window, "getComputedStyle").mockImplementation(
      () =>
        ({
          getPropertyValue: (prop: string) => {
            if (prop === "width") return "100px";
            return "";
          },
        } as any),
    );
  });
  test("returns the computed property without measure unit", () => {
    expect(gModel.compProp(element, "width")).toBe("100");
  });
  test("returns empty string if the element is not an instance of Element", () => {
    expect(gModel.compProp(null as any, "width")).toBe("");
  });
  test("returns the property value directly if measure is not a string", () => {
    expect(gModel.compProp(element, "width", null as any)).toBe("100px");
  });
}) as void;
