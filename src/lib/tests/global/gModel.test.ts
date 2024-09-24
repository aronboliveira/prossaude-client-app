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
  Gender,
  LocalNumber,
  PseudoNum,
  ScriptType,
  brDate,
} from "../testVars";
describe("numberLimit", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<typeof errorHandler, "elementNotFound">(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`));
    jest.clearAllMocks();
  });
  it("should remove invalid characters from input", (): void => {
    const mockInput = document.createElement("input");
    mockInput.value = "1234$%";
    mockInput.classList.add("inpLocNum");
    gModel.numberLimit(mockInput);
    expect(mockInput.value).toBe<PseudoNum>("1234");
  });
  it("should limit value to two digits for specific classes", (): void => {
    const mockInput = document.createElement("input");
    mockInput.value = "123";
    mockInput.classList.add("inpAtivFis");
    gModel.numberLimit(mockInput);
    expect(mockInput.value).toBe<PseudoNum>("12");
  });
  it("should throw an error if input element is invalid", (): void => {
    gModel.numberLimit(null as any);
    expect(elementNotFoundSpy).toHaveBeenCalled();
  });
});
describe("normalizeNegatives", (): void => {
  let inputNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    inputNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "inputNotFound")
      .mockImplementation((): Error => new Error(`Input not found.`));
    jest.clearAllMocks();
  });
  it("should normalize negative values to zero", (): void => {
    const mockInput = document.createElement("input");
    mockInput.value = "-10";
    const result = gModel.normalizeNegatives(mockInput);
    expect(mockInput.value).toBe<PseudoNum>("0");
    expect(result).toBe<PseudoNum>("0");
  });
  it("should throw an error if the element is not an input", (): void => {
    gModel.normalizeNegatives(null as any);
    expect(inputNotFoundSpy).toHaveBeenCalled();
  });
});
describe("parseNotNaN", (): void => {
  it("should return default value for non-numeric string", (): void => {
    expect(gModel.parseNotNaN("abc", 10, "int")).toBe<number>(10);
  });
  it("should parse valid integer string", (): void => {
    expect(gModel.parseNotNaN("42", 0, "int")).toBe<number>(42);
  });
  it("should parse valid float string", (): void => {
    expect(gModel.parseNotNaN("3.14159", 0, "float", 2)).toBe<number>(3.14);
  });
  it("should return default value if context is invalid", (): void => {
    expect(gModel.parseNotNaN("100", 0, "invalid")).toBe<number>(0);
  });
});
describe("formatCEP", (): void => {
  let inputNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    inputNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "inputNotFound")
      .mockImplementation((): Error => new Error(`Input not found.`));
    jest.clearAllMocks();
  });
  it("should format valid CEP correctly", (): void => {
    const mockInput = document.createElement("input");
    mockInput.value = "12345678";
    gModel.formatCEP(mockInput);
    expect(mockInput.value).toBe<CEP>("12345-678");
  });
  it("should throw an error if element is not an input", (): void => {
    gModel.formatCEP(null as any);
    expect(inputNotFoundSpy).toHaveBeenCalled();
  });
});
describe("formatCPF", (): void => {
  let inputNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    inputNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "inputNotFound")
      .mockImplementation((): Error => new Error(`Input not found.`));
    jest.clearAllMocks();
  });
  it("should format valid CPF correctly", (): void => {
    const mockInput = document.createElement("input");
    mockInput.value = "12345678909";
    gModel.formatCPF(mockInput);
    expect(mockInput.value).toBe<CPF>("123.456.789-09");
  });
  it("should throw an error if element is not an input", (): void => {
    gModel.formatCPF(null as any);
    expect(inputNotFoundSpy).toHaveBeenCalled();
  });
});
describe("formatTel", (): void => {
  let inputNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    inputNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "inputNotFound")
      .mockImplementation((): Error => new Error(`Input not found.`));
    jest.clearAllMocks();
  });
  it("should format telephone number correctly", (): void => {
    const mockInput = document.createElement("input");
    mockInput.value = "11987654321";
    expect(gModel.formatTel(mockInput, true)).toBe<LocalNumber>("(11) 98765-4321");
  });
  it("should throw an error if element is not an input", (): void => {
    gModel.formatTel(null as any);
    expect(inputNotFoundSpy).toHaveBeenCalled();
  });
});
describe("addEmailExtension", (): void => {
  let inputNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    inputNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "inputNotFound")
      .mockImplementation((): Error => new Error(`Input not found.`));
    jest.clearAllMocks();
  });
  it("should add default email extension", (): void => {
    const mockInput = document.createElement("input");
    mockInput.value = "";
    expect(gModel.addEmailExtension(mockInput)).toBe<Email>("@.");
  });
  it("should throw an error if element is not an input", (): void => {
    gModel.addEmailExtension(null as any);
    expect(inputNotFoundSpy).toHaveBeenCalled();
  });
});
describe("removeFirstClick", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`));
    jest.clearAllMocks();
  });
  it("should clear text content on first click", (): void => {
    const mockElement = document.createElement("div");
    mockElement.textContent = "Insira Seu Nome Aqui";
    expect(gModel.removeFirstClick(mockElement)).toBe<string>("");
  });
  it("should throw an error if element is not valid", (): void => {
    gModel.removeFirstClick(null as any);
    expect(elementNotFoundSpy).toHaveBeenCalled();
  });
});
describe("checkAutoCorrect", (): void => {
  it("should return false if button text contains 'Ativar'", (): void => {
    const mockButton = document.createElement("button");
    mockButton.textContent = "Ativar";
    expect(gModel.checkAutoCorrect(mockButton)).toBe<boolean>(false);
  });
  it("should return true if checkbox is checked", (): void => {
    const mockCheckbox = document.createElement("input");
    mockCheckbox.type = "checkbox";
    mockCheckbox.checked = true;
    expect(gModel.checkAutoCorrect(mockCheckbox)).toBe<boolean>(true);
  });
});
describe("switchAutocorrect", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`));
    jest.clearAllMocks();
  });
  it("should toggle autocorrect on a button", (): void => {
    const mockButton = document.createElement("button");
    mockButton.textContent = "Ativar Autocorreção";
    expect(mockButton.textContent).toBe<string>("Desativar Autocorreção");
    expect(gModel.switchAutocorrect(new Event("click"), mockButton, false)).toBe<boolean>(true);
  });
  it("should throw an error if element is not a valid button or input", (): void => {
    gModel.switchAutocorrect(new Event("click"), null as any);
    expect(elementNotFoundSpy).toHaveBeenCalledWith<[null, string, any]>(
      null,
      "arguments for switchAutocorrect()",
      expect.any(Error)
    );
  });
});
describe("checkAllGenConts", (): void => {
  let multipleElementsNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    multipleElementsNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "multipleElementsNotFound")
      .mockImplementation((): Error => new Error(`Multiple elements not found.`));
    jest.clearAllMocks();
  });
  it("should return true if all elements are valid inputs", (): void => {
    expect(gModel.checkAllGenConts(document.createElement("input"), document.createElement("textarea"))).toBe<boolean>(
      true
    );
  });
  it("should call error handler if invalid elements are passed", (): void => {
    gModel.checkAllGenConts(null as any);
    expect(multipleElementsNotFoundSpy).toHaveBeenCalled();
  });
});
describe("fluxGen", (): void => {
  let multipleElementsNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    multipleElementsNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "multipleElementsNotFound")
      .mockImplementation((): Error => new Error(`Multiple element not found.`));
    jest.clearAllMocks();
  });
  it("should return 'masculino' if appropriate conditions are met", (): void => {
    const mockGen = document.createElement("select"),
      mockGenBirthRel = document.createElement("select"),
      mockGenTrans = document.createElement("select"),
      mockGenFisAlin = document.createElement("select");
    mockGen.value = "masculino";
    mockGenBirthRel.value = "cis";
    const result = gModel.fluxGen([mockGen, mockGenBirthRel, mockGenTrans, mockGenFisAlin], "masculino");
    expect(result).toBe<Gender>("masculino");
  });
  it("should handle multiple stages of conditions", (): void => {
    const mockGen = document.createElement("select"),
      mockGenBirthRel = document.createElement("select"),
      mockGenTrans = document.createElement("select"),
      mockGenFisAlin = document.createElement("select");
    mockGen.value = "feminino";
    mockGenBirthRel.value = "trans";
    mockGenTrans.value = "intermediario";
    mockGenFisAlin.value = "feminilizado";
    expect(gModel.fluxGen([mockGen, mockGenBirthRel, mockGenTrans, mockGenFisAlin], "feminino")).toBe<Gender>(
      "feminino"
    );
  });
  it("should call multipleElementsNotFound if elements are invalid", (): void => {
    gModel.fluxGen([null as any]);
    expect(multipleElementsNotFoundSpy).toHaveBeenCalled();
  });
});
describe("showGenFisAlin", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`));
    jest.clearAllMocks();
  });
  it("should show genFisAlin", (): void => {
    const mockGenFisAlin = document.createElement("select");
    const mockGenSpan = document.createElement("div");
    mockGenSpan.classList.add("genSpan");
    mockGenSpan.hidden = true;
    mockGenFisAlin.appendChild(mockGenSpan);
    expect(mockGenSpan.hidden).toBe<boolean>(false);
    expect(gModel.showGenFisAlin(mockGenFisAlin)).toBe<boolean>(true);
  });
  it("should throw an error if element is not valid", (): void => {
    gModel.showGenFisAlin(null as any);
    expect(elementNotFoundSpy).toHaveBeenCalled();
  });
});
describe("hideGenFisAlin", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`));
    jest.clearAllMocks();
  });
  it("should hide genFisAlin", (): void => {
    const mockGenFisAlin = document.createElement("select");
    const mockGenSpan = document.createElement("div");
    mockGenSpan.classList.add("genSpan");
    mockGenSpan.hidden = false;
    mockGenFisAlin.appendChild(mockGenSpan);
    expect(mockGenSpan.hidden).toBe<boolean>(true);
    expect(gModel.hideGenFisAlin(mockGenFisAlin)).toBe<boolean>(false);
  });
  it("should throw an error if element is not valid", (): void => {
    gModel.hideGenFisAlin(null as any);
    expect(elementNotFoundSpy).toHaveBeenCalled();
  });
});
describe("showStgTransHorm", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`));
    jest.clearAllMocks();
  });
  it("should show genTrans", (): void => {
    const mockGenTrans = document.createElement("select");
    const mockGenSpan = document.createElement("div");
    mockGenSpan.classList.add("genSpan");
    mockGenSpan.hidden = true;
    mockGenTrans.appendChild(mockGenSpan);
    expect(mockGenSpan.hidden).toBe<boolean>(false);
    expect(gModel.showStgTransHorm(mockGenTrans)).toBe<boolean>(true);
  });
  it("should throw an error if element is not valid", (): void => {
    gModel.showStgTransHorm(null as any);
    expect(elementNotFoundSpy).toHaveBeenCalled();
  });
});
describe("filterIdsByGender", (): void => {
  let typeErrorSpy: jest.SpyInstance;
  beforeEach((): void => {
    typeErrorSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "typeError")
      .mockImplementation((): Error => new Error(`Type error.`));
    jest.clearAllMocks();
  });
  it("should filter ids for masculine body type", (): void => {
    expect(gModel.filterIdsByGender(["peit", "abd", "coxa", "tricp"], "masculino")).toEqual<[string, string, string]>([
      "peit",
      "abd",
      "coxa",
    ]);
  });
  it("should return default ids if body type is invalid", (): void => {
    expect(gModel.filterIdsByGender(["invalid"], "invalid")).toEqual<[string, string, string]>(["peit", "abd", "coxa"]);
    expect(typeErrorSpy).toHaveBeenCalled();
  });
});
describe("checkPasswordPattern", (): void => {
  let inputNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    inputNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "inputNotFound")
      .mockImplementation((): Error => new Error(`Input not found.`));
    jest.clearAllMocks();
  });
  it("should set custom validity for missing number", (): void => {
    const mockInput = document.createElement("input");
    mockInput.value = "Password!";
    gModel.checkPasswordPattern(mockInput);
    expect(mockInput.validationMessage).toBe<string>("Sua senha deve ter pelo menos um número");
  });
  it("should set custom validity for missing uppercase letter", (): void => {
    const mockInput = document.createElement("input");
    mockInput.value = "password1!";
    gModel.checkPasswordPattern(mockInput);
    expect(mockInput.validationMessage).toBe<string>("Sua senha deve ter pelo menos uma letra maiúscula");
  });
  it("should set custom validity for missing symbol", (): void => {
    const mockInput = document.createElement("input");
    mockInput.value = "Password1";
    gModel.checkPasswordPattern(mockInput);
    expect(mockInput.validationMessage).toBe<string>("Sua senha deve ter pelo menos um símbolo");
  });
  it("should set custom validity for short password", (): void => {
    const mockInput = document.createElement("input");
    mockInput.value = "P1!";
    gModel.checkPasswordPattern(mockInput);
    expect(mockInput.validationMessage).toBe<string>("Sua senha deve ter pelo menos oito caracteres");
  });
  it("should throw an error if input element is invalid", (): void => {
    gModel.checkPasswordPattern(null as any);
    expect(inputNotFoundSpy).toHaveBeenCalled();
  });
});
describe("correctCursorNextWords", (): void => {
  it("should move cursor to the end and fix words", (): void => {
    const mockElement = document.createElement("input");
    mockElement.value = "Sample text";
    expect(gModel.correctCursorNextWords(false, false, "Sample", mockElement)).toEqual<[string, boolean]>([
      "Sample text",
      true,
    ]);
  });
  it("should return the correct text even if no match is found", (): void => {
    const mockElement = document.createElement("input");
    mockElement.value = "Different text";
    expect(gModel.correctCursorNextWords(false, false, "NoMatch", mockElement)).toEqual<[string, boolean]>([
      "Different text",
      false,
    ]);
  });
});
describe("wrongStartCorrection", (): void => {
  it("should correct text when wrong start is detected", (): void => {
    expect(gModel.wrongStartCorrection("Sample text", "Sample")).toBe<string>("ample textS");
  });
  it("should return original text when no match is found", (): void => {
    expect(gModel.wrongStartCorrection("Sample text", "NoMatch")).toBe<string>("Sample text");
  });
});
describe("moveCursorToTheEnd", (): void => {
  it("should move the cursor to the end of the text", (): void => {
    const mockElement = document.createElement("div");
    document.body.appendChild(mockElement);
    expect(gModel.moveCursorToTheEnd(false, mockElement)).toBe<boolean>(true);
  });
  it("should not move the cursor if isCursorAutoMoved is true", (): void => {
    const mockElement = document.createElement("div");
    document.body.appendChild(mockElement);
    expect(gModel.moveCursorToTheEnd(true, mockElement)).toBe<boolean>(true);
  });
});
describe("fixCursorPosition", (): void => {
  it("should correctly set cursor position", (): void => {
    const mockRange = document.createRange();
    gModel.fixCursorPosition(document.createElement("div"), mockRange, window.getSelection(), true);
    expect(mockRange.collapsed).toBe<boolean>(true);
  });
});
describe("fixFirstLetter", (): void => {
  it("should capitalize the first letter", (): void => {
    expect(
      gModel.fixFirstLetter("a", /^[a-z]/, document.createElement("div"), document.createRange(), window.getSelection())
    ).toBe<string>("A");
  });
  it("should return unchanged text if no match is found", (): void => {
    expect(
      gModel.fixFirstLetter("A", /^[a-z]/, document.createElement("div"), document.createRange(), window.getSelection())
    ).toBe<string>("A");
  });
});
describe("fixWrongStarts", (): void => {
  it("should remove wrong start from text", (): void => {
    expect(gModel.fixWrongStarts("Sample text", "Sample", 6)).toBe<string>("text");
  });
  it("should return the original text if no match is found", (): void => {
    expect(gModel.fixWrongStarts("Sample text", "NoMatch", 6)).toBe<string>("Sample text");
  });
});
describe("fixNextWordsIniNotD", (): void => {
  it("should capitalize the first letter of the next word", (): void => {
    expect(gModel.fixNextWordsIniNotD("sample text", "text")).toBe<string>("sample Text");
  });
});
describe("fixNextWordsAfterD", (): void => {
  it("should capitalize the letter after 'D'", (): void => {
    expect(gModel.fixNextWordsAfterD("Dsample text", "D")).toBe<string>("DSample text");
  });
});
describe("fixUnproperUppercases", (): void => {
  it("should fix improper uppercases in text", (): void => {
    expect(gModel.fixUnproperUppercases("sAmple text", "A", 0)).toBe<string>("Sample text");
  });
});
describe("fixForcedUpperCase", (): void => {
  it("should fix forced uppercase in text", (): void => {
    const mockElement = document.createElement("div");
    mockElement.textContent = "sample text";
    expect(gModel.fixForcedUpperCase(document.createElement("div"), ["sample"], "sample")).toBe<string>("sample text");
  });
});
describe("autoCapitalizeInputs", (): void => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach((): void => {
    elementNotFoundSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "elementNotFound")
      .mockImplementation((): Error => new Error(`Element not found.`));
    jest.clearAllMocks();
  });
  it("should capitalize the first letter of a single word", (): void => {
    const mockInput = document.createElement("input");
    mockInput.type = "text";
    mockInput.value = "example";
    expect(gModel.autoCapitalizeInputs(mockInput)).toBe<string>("Example");
  });
  it("should capitalize the first letter of each word", (): void => {
    const mockInput = document.createElement("input");
    mockInput.type = "text";
    mockInput.value = "example text";
    expect(gModel.autoCapitalizeInputs(mockInput)).toBe<string>("Example Text");
  });
  it("should correct improper upper case in a sentence", (): void => {
    const mockInput = document.createElement("input");
    mockInput.type = "text";
    mockInput.value = "eXample TexT";
    expect(gModel.autoCapitalizeInputs(mockInput)).toBe<string>("Example Text");
  });
  it("should correct capitalization after the letter 'D'", (): void => {
    const mockInput = document.createElement("input");
    mockInput.type = "text";
    mockInput.value = "Dexample text";
    expect(gModel.autoCapitalizeInputs(mockInput)).toBe<string>("DExample text");
  });
  it("should fix multiple upper case letters in a word", (): void => {
    const mockInput = document.createElement("input");
    mockInput.type = "text";
    mockInput.value = "EXample";
    expect(gModel.autoCapitalizeInputs(mockInput)).toBe<string>("Example");
  });
  it("should not modify text if autocorrect is disabled", (): void => {
    const mockInput = document.createElement("input");
    mockInput.type = "text";
    mockInput.value = "example text";
    expect(gModel.autoCapitalizeInputs(mockInput, false)).toBe<string>("example text");
  });
  it("should remove improper characters", (): void => {
    const mockInput = document.createElement("input");
    mockInput.type = "text";
    mockInput.value = "Example @!text";
    expect(gModel.autoCapitalizeInputs(mockInput)).toBe<string>("Example text");
  });
  it("should throw an error if the element is not an input or textarea", (): void => {
    gModel.autoCapitalizeInputs(null as any);
    expect(elementNotFoundSpy).toHaveBeenCalled();
  });
});
describe("capitalizeFirstLetter", (): void => {
  let typeErrorSpy: jest.SpyInstance;
  beforeEach((): void => {
    typeErrorSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "typeError")
      .mockImplementation((): Error => new Error(`Type error.`));
    jest.clearAllMocks();
  });
  it("should capitalize the first letter of the string", (): void => {
    expect(gModel.capitalizeFirstLetter("example")).toBe<string>("Example");
  });
  it("should handle empty strings", (): void => {
    expect(gModel.capitalizeFirstLetter("")).toBe<string>("");
  });
  it("should call typeError if the argument is not a string", (): void => {
    gModel.capitalizeFirstLetter(null as any);
    expect(typeErrorSpy).toHaveBeenCalled();
  });
});
describe("textTransformPascal", (): void => {
  let typeErrorSpy: jest.SpyInstance;
  beforeEach((): void => {
    typeErrorSpy = jest
      .spyOn<any, ErrorHandler>(errorHandler, "typeError")
      .mockImplementation((): Error => new Error(`Type error.`));
    jest.clearAllMocks();
  });
  it("should transform text to PascalCase", (): void => {
    expect(gModel.textTransformPascal("example")).toBe<string>("Example");
  });
  it("should handle uppercase strings", (): void => {
    expect(gModel.textTransformPascal("EXAMPLE")).toBe<string>("Example");
  });
  it("should call typeError if the argument is not a string", (): void => {
    gModel.textTransformPascal(null as any);
    expect(typeErrorSpy).toHaveBeenCalled();
  });
});
describe("dateISOtoBRL", (): void => {
  it("should convert ISO date to BRL format", (): void => {
    expect(gModel.dateISOtoBRL("2023-09-09")).toBe<brDate>("09/09/2023");
  });
  it("should return the input if it's already in BRL format", (): void => {
    expect(gModel.dateISOtoBRL("09/09/2023")).toBe<brDate>("09/09/2023");
  });
  it("should handle invalid ISO date input", (): void => {
    expect(gModel.dateISOtoBRL("invalid-date")).toBe<brDate>("00/00/0000");
  });
});
describe("camelToKebab", (): void => {
  it("should convert camelCase to kebab-case", (): void => {
    expect(gModel.camelToKebab("camelCaseText")).toBe<string>("camel-case-text");
  });
  it("should handle empty strings", (): void => {
    expect(gModel.camelToKebab("")).toBe<string>("");
  });
});
describe("kebabToCamel", (): void => {
  it("should convert kebab-case to camelCase", (): void => {
    expect(gModel.kebabToCamel("kebab-case-text")).toBe<string>("kebabCaseText");
  });
  it("should handle empty strings", (): void => {
    expect(gModel.kebabToCamel("")).toBe<string>("");
  });
});
describe("regularToSnake", (): void => {
  it("should convert regular text to snake-case", (): void => {
    expect(gModel.regularToSnake("Regular Text")).toBe<string>("regular-text");
  });
  it("should handle already snake-cased text", (): void => {
    expect(gModel.regularToSnake("regular-text")).toBe<string>("regular-text");
  });
});
describe("modelScripts", (): void => {
  beforeEach((): void => {
    document.body.innerHTML = `
      <meta name="description" content="test description">
      <script src="test.js"></script>
      <style>.test {}</style>
      <link href="test.css" rel="stylesheet">
      <a href="http://external.com"></a>
    `;
  });
  it("should assign IDs and fix attributes in meta tags", (): void => {
    gModel.modelScripts();
    expect(document.querySelector("meta")?.id).toBe<string>("description");
  });
  it("should assign type to scripts and handle crossorigin", (): void => {
    gModel.modelScripts();
    const script = document.querySelector("script");
    expect(script?.type).toBe<ScriptType>("text/javascript");
    expect(script?.crossOrigin).toBe<CrossOrigin>("anonymous");
  });
  it("should assign ID to link tags", (): void => {
    gModel.modelScripts();
    expect(document.querySelector("link")?.id).toBe<string>("test.css");
  });
  it("should add noreferrer and noopener to external links", (): void => {
    gModel.modelScripts();
    const a = document.querySelector("a");
    expect(a?.rel).toContain<AnchorRel>("noopener");
    expect(a?.rel).toContain<AnchorRel>("noreferrer");
  });
});
