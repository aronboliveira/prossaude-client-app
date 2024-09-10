//v1.0.0
import * as gModel from "../../global/gModel";
import * as errorHandler from "../../global/handlers/errorHandler";
describe("numberLimit", () => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach(() => {
    elementNotFoundSpy = jest
      .spyOn(errorHandler, "elementNotFound")
      .mockImplementation(() => new Error(`Element not found.`));
    jest.clearAllMocks();
  });
  it("should remove invalid characters from input", () => {
    const mockInput = document.createElement("input");
    mockInput.value = "1234$%";
    mockInput.classList.add("inpLocNum");
    gModel.numberLimit(mockInput);
    expect(mockInput.value).toBe("1234");
  });
  it("should limit value to two digits for specific classes", () => {
    const mockInput = document.createElement("input");
    mockInput.value = "123";
    mockInput.classList.add("inpAtivFis");
    gModel.numberLimit(mockInput);
    expect(mockInput.value).toBe("12");
  });
  it("should throw an error if input element is invalid", () => {
    gModel.numberLimit(null as any);
    expect(elementNotFoundSpy).toHaveBeenCalled();
  });
});
describe("normalizeNegatives", () => {
  let inputNotFoundSpy: jest.SpyInstance;
  beforeEach(() => {
    inputNotFoundSpy = jest
      .spyOn(errorHandler, "inputNotFound")
      .mockImplementation(() => new Error(`Input not found.`));
    jest.clearAllMocks();
  });
  it("should normalize negative values to zero", () => {
    const mockInput = document.createElement("input");
    mockInput.value = "-10";
    const result = gModel.normalizeNegatives(mockInput);
    expect(mockInput.value).toBe("0");
    expect(result).toBe("0");
  });
  it("should throw an error if the element is not an input", () => {
    gModel.normalizeNegatives(null as any);
    expect(inputNotFoundSpy).toHaveBeenCalled();
  });
});
describe("parseNotNaN", () => {
  it("should return default value for non-numeric string", () => {
    expect(gModel.parseNotNaN("abc", 10, "int")).toBe(10);
  });
  it("should parse valid integer string", () => {
    expect(gModel.parseNotNaN("42", 0, "int")).toBe(42);
  });
  it("should parse valid float string", () => {
    expect(gModel.parseNotNaN("3.14159", 0, "float", 2)).toBe(3.14);
  });
  it("should return default value if context is invalid", () => {
    expect(gModel.parseNotNaN("100", 0, "invalid")).toBe(0);
  });
});
describe("formatCEP", () => {
  let inputNotFoundSpy: jest.SpyInstance;
  beforeEach(() => {
    inputNotFoundSpy = jest
      .spyOn(errorHandler, "inputNotFound")
      .mockImplementation(() => new Error(`Input not found.`));
    jest.clearAllMocks();
  });
  it("should format valid CEP correctly", () => {
    const mockInput = document.createElement("input");
    mockInput.value = "12345678";
    gModel.formatCEP(mockInput);
    expect(mockInput.value).toBe("12345-678");
  });
  it("should throw an error if element is not an input", () => {
    gModel.formatCEP(null as any);
    expect(inputNotFoundSpy).toHaveBeenCalled();
  });
});
describe("formatCPF", () => {
  let inputNotFoundSpy: jest.SpyInstance;
  beforeEach(() => {
    inputNotFoundSpy = jest
      .spyOn(errorHandler, "inputNotFound")
      .mockImplementation(() => new Error(`Input not found.`));
    jest.clearAllMocks();
  });
  it("should format valid CPF correctly", () => {
    const mockInput = document.createElement("input");
    mockInput.value = "12345678909";
    gModel.formatCPF(mockInput);
    expect(mockInput.value).toBe("123.456.789-09");
  });
  it("should throw an error if element is not an input", () => {
    gModel.formatCPF(null as any);
    expect(inputNotFoundSpy).toHaveBeenCalled();
  });
});
describe("formatTel", () => {
  let inputNotFoundSpy: jest.SpyInstance;
  beforeEach(() => {
    inputNotFoundSpy = jest
      .spyOn(errorHandler, "inputNotFound")
      .mockImplementation(() => new Error(`Input not found.`));
    jest.clearAllMocks();
  });
  it("should format telephone number correctly", () => {
    const mockInput = document.createElement("input");
    mockInput.value = "11987654321";
    expect(gModel.formatTel(mockInput, true)).toBe("(11) 98765-4321");
  });
  it("should throw an error if element is not an input", () => {
    gModel.formatTel(null as any);
    expect(inputNotFoundSpy).toHaveBeenCalled();
  });
});
describe("addEmailExtension", () => {
  let inputNotFoundSpy: jest.SpyInstance;
  beforeEach(() => {
    inputNotFoundSpy = jest
      .spyOn(errorHandler, "inputNotFound")
      .mockImplementation(() => new Error(`Input not found.`));
    jest.clearAllMocks();
  });
  it("should add default email extension", () => {
    const mockInput = document.createElement("input");
    mockInput.value = "";
    expect(gModel.addEmailExtension(mockInput)).toBe("@.");
  });
  it("should throw an error if element is not an input", () => {
    gModel.addEmailExtension(null as any);
    expect(inputNotFoundSpy).toHaveBeenCalled();
  });
});
describe("removeFirstClick", () => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach(() => {
    elementNotFoundSpy = jest
      .spyOn(errorHandler, "elementNotFound")
      .mockImplementation(() => new Error(`Element not found.`));
    jest.clearAllMocks();
  });
  it("should clear text content on first click", () => {
    const mockElement = document.createElement("div");
    mockElement.textContent = "Insira Seu Nome Aqui";
    expect(gModel.removeFirstClick(mockElement)).toBe("");
  });
  it("should throw an error if element is not valid", () => {
    gModel.removeFirstClick(null as any);
    expect(elementNotFoundSpy).toHaveBeenCalled();
  });
});
describe("checkAutoCorrect", () => {
  it("should return false if button text contains 'Ativar'", () => {
    const mockButton = document.createElement("button");
    mockButton.textContent = "Ativar";
    expect(gModel.checkAutoCorrect(mockButton)).toBe(false);
  });
  it("should return true if checkbox is checked", () => {
    const mockCheckbox = document.createElement("input");
    mockCheckbox.type = "checkbox";
    mockCheckbox.checked = true;
    expect(gModel.checkAutoCorrect(mockCheckbox)).toBe(true);
  });
});
describe("switchAutocorrect", () => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach(() => {
    elementNotFoundSpy = jest
      .spyOn(errorHandler, "elementNotFound")
      .mockImplementation(() => new Error(`Element not found.`));
    jest.clearAllMocks();
  });
  it("should toggle autocorrect on a button", () => {
    const mockButton = document.createElement("button");
    mockButton.textContent = "Ativar Autocorreção";
    expect(mockButton.textContent).toBe("Desativar Autocorreção");
    expect(
      gModel.switchAutocorrect(new Event("click"), mockButton, false)
    ).toBe(true);
  });
  it("should throw an error if element is not a valid button or input", () => {
    gModel.switchAutocorrect(new Event("click"), null as any);
    expect(elementNotFoundSpy).toHaveBeenCalledWith(
      null,
      "arguments for switchAutocorrect()",
      expect.any(Error)
    );
  });
});
describe("checkAllGenConts", () => {
  let multipleElementsNotFoundSpy: jest.SpyInstance;
  beforeEach(() => {
    multipleElementsNotFoundSpy = jest
      .spyOn(errorHandler, "multipleElementsNotFound")
      .mockImplementation(() => new Error(`Multiple elements not found.`));
    jest.clearAllMocks();
  });
  it("should return true if all elements are valid inputs", () => {
    expect(
      gModel.checkAllGenConts(
        document.createElement("input"),
        document.createElement("textarea")
      )
    ).toBe(true);
  });
  it("should call error handler if invalid elements are passed", () => {
    gModel.checkAllGenConts(null as any);
    expect(multipleElementsNotFoundSpy).toHaveBeenCalled();
  });
});
describe("fluxGen", () => {
  let multipleElementsNotFoundSpy: jest.SpyInstance;
  beforeEach(() => {
    multipleElementsNotFoundSpy = jest
      .spyOn(errorHandler, "multipleElementsNotFound")
      .mockImplementation(() => new Error(`Multiple element not found.`));
    jest.clearAllMocks();
  });
  it("should return 'masculino' if appropriate conditions are met", () => {
    const mockGen = document.createElement("select");
    const mockGenBirthRel = document.createElement("select");
    const mockGenTrans = document.createElement("select");
    const mockGenFisAlin = document.createElement("select");
    mockGen.value = "masculino";
    mockGenBirthRel.value = "cis";
    const result = gModel.fluxGen(
      [mockGen, mockGenBirthRel, mockGenTrans, mockGenFisAlin],
      "masculino"
    );
    expect(result).toBe("masculino");
  });
  it("should handle multiple stages of conditions", () => {
    const mockGen = document.createElement("select");
    const mockGenBirthRel = document.createElement("select");
    const mockGenTrans = document.createElement("select");
    const mockGenFisAlin = document.createElement("select");
    mockGen.value = "feminino";
    mockGenBirthRel.value = "trans";
    mockGenTrans.value = "intermediario";
    mockGenFisAlin.value = "feminilizado";
    expect(
      gModel.fluxGen(
        [mockGen, mockGenBirthRel, mockGenTrans, mockGenFisAlin],
        "feminino"
      )
    ).toBe("feminino");
  });
  it("should call multipleElementsNotFound if elements are invalid", () => {
    gModel.fluxGen([null as any]);
    expect(multipleElementsNotFoundSpy).toHaveBeenCalled();
  });
});
describe("showGenFisAlin", () => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach(() => {
    elementNotFoundSpy = jest
      .spyOn(errorHandler, "elementNotFound")
      .mockImplementation(() => new Error(`Element not found.`));
    jest.clearAllMocks();
  });
  it("should show genFisAlin", () => {
    const mockGenFisAlin = document.createElement("select");
    const mockGenSpan = document.createElement("div");
    mockGenSpan.classList.add("genSpan");
    mockGenSpan.hidden = true;
    mockGenFisAlin.appendChild(mockGenSpan);
    expect(mockGenSpan.hidden).toBe(false);
    expect(gModel.showGenFisAlin(mockGenFisAlin)).toBe(true);
  });
  it("should throw an error if element is not valid", () => {
    gModel.showGenFisAlin(null as any);
    expect(elementNotFoundSpy).toHaveBeenCalled();
  });
});
describe("hideGenFisAlin", () => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach(() => {
    elementNotFoundSpy = jest
      .spyOn(errorHandler, "elementNotFound")
      .mockImplementation(() => new Error(`Element not found.`));
    jest.clearAllMocks();
  });
  it("should hide genFisAlin", () => {
    const mockGenFisAlin = document.createElement("select");
    const mockGenSpan = document.createElement("div");
    mockGenSpan.classList.add("genSpan");
    mockGenSpan.hidden = false;
    mockGenFisAlin.appendChild(mockGenSpan);
    expect(mockGenSpan.hidden).toBe(true);
    expect(gModel.hideGenFisAlin(mockGenFisAlin)).toBe(false);
  });
  it("should throw an error if element is not valid", () => {
    gModel.hideGenFisAlin(null as any);
    expect(elementNotFoundSpy).toHaveBeenCalled();
  });
});
describe("showStgTransHorm", () => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach(() => {
    elementNotFoundSpy = jest
      .spyOn(errorHandler, "elementNotFound")
      .mockImplementation(() => new Error(`Element not found.`));
    jest.clearAllMocks();
  });
  it("should show genTrans", () => {
    const mockGenTrans = document.createElement("select");
    const mockGenSpan = document.createElement("div");
    mockGenSpan.classList.add("genSpan");
    mockGenSpan.hidden = true;
    mockGenTrans.appendChild(mockGenSpan);
    expect(mockGenSpan.hidden).toBe(false);
    expect(gModel.showStgTransHorm(mockGenTrans)).toBe(true);
  });
  it("should throw an error if element is not valid", () => {
    gModel.showStgTransHorm(null as any);
    expect(elementNotFoundSpy).toHaveBeenCalled();
  });
});
describe("filterIdsByGender", () => {
  let typeErrorSpy: jest.SpyInstance;
  beforeEach(() => {
    typeErrorSpy = jest
      .spyOn(errorHandler, "typeError")
      .mockImplementation(() => new Error(`Type error.`));
    jest.clearAllMocks();
  });
  it("should filter ids for masculine body type", () => {
    expect(
      gModel.filterIdsByGender(["peit", "abd", "coxa", "tricp"], "masculino")
    ).toEqual(["peit", "abd", "coxa"]);
  });
  it("should return default ids if body type is invalid", () => {
    expect(gModel.filterIdsByGender(["invalid"], "invalid")).toEqual([
      "peit",
      "abd",
      "coxa",
    ]);
    expect(typeErrorSpy).toHaveBeenCalled();
  });
});
describe("checkPasswordPattern", () => {
  let inputNotFoundSpy: jest.SpyInstance;
  beforeEach(() => {
    inputNotFoundSpy = jest
      .spyOn(errorHandler, "inputNotFound")
      .mockImplementation(() => new Error(`Input not found.`));
    jest.clearAllMocks();
  });
  it("should set custom validity for missing number", () => {
    const mockInput = document.createElement("input");
    mockInput.value = "Password!";
    gModel.checkPasswordPattern(mockInput);
    expect(mockInput.validationMessage).toBe(
      "Sua senha deve ter pelo menos um número"
    );
  });
  it("should set custom validity for missing uppercase letter", () => {
    const mockInput = document.createElement("input");
    mockInput.value = "password1!";
    gModel.checkPasswordPattern(mockInput);
    expect(mockInput.validationMessage).toBe(
      "Sua senha deve ter pelo menos uma letra maiúscula"
    );
  });
  it("should set custom validity for missing symbol", () => {
    const mockInput = document.createElement("input");
    mockInput.value = "Password1";
    gModel.checkPasswordPattern(mockInput);
    expect(mockInput.validationMessage).toBe(
      "Sua senha deve ter pelo menos um símbolo"
    );
  });
  it("should set custom validity for short password", () => {
    const mockInput = document.createElement("input");
    mockInput.value = "P1!";
    gModel.checkPasswordPattern(mockInput);
    expect(mockInput.validationMessage).toBe(
      "Sua senha deve ter pelo menos oito caracteres"
    );
  });
  it("should throw an error if input element is invalid", () => {
    gModel.checkPasswordPattern(null as any);
    expect(inputNotFoundSpy).toHaveBeenCalled();
  });
});
describe("correctCursorNextWords", () => {
  it("should move cursor to the end and fix words", () => {
    const mockElement = document.createElement("input");
    mockElement.value = "Sample text";
    expect(
      gModel.correctCursorNextWords(false, false, "Sample", mockElement)
    ).toEqual(["Sample text", true]);
  });
  it("should return the correct text even if no match is found", () => {
    const mockElement = document.createElement("input");
    mockElement.value = "Different text";
    expect(
      gModel.correctCursorNextWords(false, false, "NoMatch", mockElement)
    ).toEqual(["Different text", false]);
  });
});
describe("wrongStartCorrection", () => {
  it("should correct text when wrong start is detected", () => {
    expect(gModel.wrongStartCorrection("Sample text", "Sample")).toBe(
      "ample textS"
    );
  });
  it("should return original text when no match is found", () => {
    expect(gModel.wrongStartCorrection("Sample text", "NoMatch")).toBe(
      "Sample text"
    );
  });
});
describe("moveCursorToTheEnd", () => {
  it("should move the cursor to the end of the text", () => {
    const mockElement = document.createElement("div");
    document.body.appendChild(mockElement);
    expect(gModel.moveCursorToTheEnd(false, mockElement)).toBe(true);
  });
  it("should not move the cursor if isCursorAutoMoved is true", () => {
    const mockElement = document.createElement("div");
    document.body.appendChild(mockElement);
    expect(gModel.moveCursorToTheEnd(true, mockElement)).toBe(true);
  });
});
describe("fixCursorPosition", () => {
  it("should correctly set cursor position", () => {
    const mockRange = document.createRange();
    gModel.fixCursorPosition(
      document.createElement("div"),
      mockRange,
      window.getSelection(),
      true
    );
    expect(mockRange.collapsed).toBe(true);
  });
});
describe("fixFirstLetter", () => {
  it("should capitalize the first letter", () => {
    expect(
      gModel.fixFirstLetter(
        "a",
        /^[a-z]/,
        document.createElement("div"),
        document.createRange(),
        window.getSelection()
      )
    ).toBe("A");
  });
  it("should return unchanged text if no match is found", () => {
    expect(
      gModel.fixFirstLetter(
        "A",
        /^[a-z]/,
        document.createElement("div"),
        document.createRange(),
        window.getSelection()
      )
    ).toBe("A");
  });
});
describe("fixWrongStarts", () => {
  it("should remove wrong start from text", () => {
    expect(gModel.fixWrongStarts("Sample text", "Sample", 6)).toBe("text");
  });
  it("should return the original text if no match is found", () => {
    expect(gModel.fixWrongStarts("Sample text", "NoMatch", 6)).toBe(
      "Sample text"
    );
  });
});
describe("fixNextWordsIniNotD", () => {
  it("should capitalize the first letter of the next word", () => {
    expect(gModel.fixNextWordsIniNotD("sample text", "text")).toBe(
      "sample Text"
    );
  });
});
describe("fixNextWordsAfterD", () => {
  it("should capitalize the letter after 'D'", () => {
    expect(gModel.fixNextWordsAfterD("Dsample text", "D")).toBe("DSample text");
  });
});
describe("fixUnproperUppercases", () => {
  it("should fix improper uppercases in text", () => {
    expect(gModel.fixUnproperUppercases("sAmple text", "A", 0)).toBe(
      "Sample text"
    );
  });
});
describe("fixForcedUpperCase", () => {
  it("should fix forced uppercase in text", () => {
    const mockElement = document.createElement("div");
    mockElement.textContent = "sample text";
    expect(
      gModel.fixForcedUpperCase(
        document.createElement("div"),
        ["sample"],
        "sample"
      )
    ).toBe("sample text");
  });
});
describe("autoCapitalizeInputs", () => {
  let elementNotFoundSpy: jest.SpyInstance;
  beforeEach(() => {
    elementNotFoundSpy = jest
      .spyOn(errorHandler, "elementNotFound")
      .mockImplementation(() => new Error(`Element not found.`));
    jest.clearAllMocks();
  });
  it("should capitalize the first letter of a single word", () => {
    const mockInput = document.createElement("input");
    mockInput.type = "text";
    mockInput.value = "example";
    expect(gModel.autoCapitalizeInputs(mockInput)).toBe("Example");
  });
  it("should capitalize the first letter of each word", () => {
    const mockInput = document.createElement("input");
    mockInput.type = "text";
    mockInput.value = "example text";
    expect(gModel.autoCapitalizeInputs(mockInput)).toBe("Example Text");
  });
  it("should correct improper upper case in a sentence", () => {
    const mockInput = document.createElement("input");
    mockInput.type = "text";
    mockInput.value = "eXample TexT";
    expect(gModel.autoCapitalizeInputs(mockInput)).toBe("Example Text");
  });
  it("should correct capitalization after the letter 'D'", () => {
    const mockInput = document.createElement("input");
    mockInput.type = "text";
    mockInput.value = "Dexample text";
    expect(gModel.autoCapitalizeInputs(mockInput)).toBe("DExample text");
  });
  it("should fix multiple upper case letters in a word", () => {
    const mockInput = document.createElement("input");
    mockInput.type = "text";
    mockInput.value = "EXample";
    expect(gModel.autoCapitalizeInputs(mockInput)).toBe("Example");
  });
  it("should not modify text if autocorrect is disabled", () => {
    const mockInput = document.createElement("input");
    mockInput.type = "text";
    mockInput.value = "example text";
    expect(gModel.autoCapitalizeInputs(mockInput, false)).toBe("example text");
  });
  it("should remove improper characters", () => {
    const mockInput = document.createElement("input");
    mockInput.type = "text";
    mockInput.value = "Example @!text";
    expect(gModel.autoCapitalizeInputs(mockInput)).toBe("Example text");
  });
  it("should throw an error if the element is not an input or textarea", () => {
    gModel.autoCapitalizeInputs(null as any);
    expect(elementNotFoundSpy).toHaveBeenCalled();
  });
});
describe("capitalizeFirstLetter", () => {
  let typeErrorSpy: jest.SpyInstance;
  beforeEach(() => {
    typeErrorSpy = jest
      .spyOn(errorHandler, "typeError")
      .mockImplementation(() => new Error(`Type error.`));
    jest.clearAllMocks();
  });
  it("should capitalize the first letter of the string", () => {
    expect(gModel.capitalizeFirstLetter("example")).toBe("Example");
  });
  it("should handle empty strings", () => {
    expect(gModel.capitalizeFirstLetter("")).toBe("");
  });
  it("should call typeError if the argument is not a string", () => {
    gModel.capitalizeFirstLetter(null as any);
    expect(typeErrorSpy).toHaveBeenCalled();
  });
});
describe("textTransformPascal", () => {
  let typeErrorSpy: jest.SpyInstance;
  beforeEach(() => {
    typeErrorSpy = jest
      .spyOn(errorHandler, "typeError")
      .mockImplementation(() => new Error(`Type error.`));
    jest.clearAllMocks();
  });
  it("should transform text to PascalCase", () => {
    expect(gModel.textTransformPascal("example")).toBe("Example");
  });
  it("should handle uppercase strings", () => {
    expect(gModel.textTransformPascal("EXAMPLE")).toBe("Example");
  });
  it("should call typeError if the argument is not a string", () => {
    gModel.textTransformPascal(null as any);
    expect(typeErrorSpy).toHaveBeenCalled();
  });
});
describe("dateISOtoBRL", () => {
  it("should convert ISO date to BRL format", () => {
    expect(gModel.dateISOtoBRL("2023-09-09")).toBe("09/09/2023");
  });
  it("should return the input if it's already in BRL format", () => {
    expect(gModel.dateISOtoBRL("09/09/2023")).toBe("09/09/2023");
  });
  it("should handle invalid ISO date input", () => {
    expect(gModel.dateISOtoBRL("invalid-date")).toBe("00/00/0000");
  });
});
describe("camelToKebab", () => {
  it("should convert camelCase to kebab-case", () => {
    expect(gModel.camelToKebab("camelCaseText")).toBe("camel-case-text");
  });
  it("should handle empty strings", () => {
    expect(gModel.camelToKebab("")).toBe("");
  });
});
describe("kebabToCamel", () => {
  it("should convert kebab-case to camelCase", () => {
    expect(gModel.kebabToCamel("kebab-case-text")).toBe("kebabCaseText");
  });
  it("should handle empty strings", () => {
    expect(gModel.kebabToCamel("")).toBe("");
  });
});
describe("regularToSnake", () => {
  it("should convert regular text to snake-case", () => {
    expect(gModel.regularToSnake("Regular Text")).toBe("regular-text");
  });
  it("should handle already snake-cased text", () => {
    expect(gModel.regularToSnake("regular-text")).toBe("regular-text");
  });
});
describe("modelScripts", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <meta name="description" content="test description">
      <script src="test.js"></script>
      <style>.test {}</style>
      <link href="test.css" rel="stylesheet">
      <a href="http://external.com"></a>
    `;
  });
  it("should assign IDs and fix attributes in meta tags", () => {
    gModel.modelScripts();
    expect(document.querySelector("meta")?.id).toBe("description");
  });
  it("should assign type to scripts and handle crossorigin", () => {
    gModel.modelScripts();
    const script = document.querySelector("script");
    expect(script?.type).toBe("text/javascript");
    expect(script?.crossOrigin).toBe("anonymous");
  });
  it("should assign ID to link tags", () => {
    gModel.modelScripts();
    expect(document.querySelector("link")?.id).toBe("test.css");
  });
  it("should add noreferrer and noopener to external links", () => {
    gModel.modelScripts();
    const a = document.querySelector("a");
    expect(a?.rel).toContain("noopener");
    expect(a?.rel).toContain("noreferrer");
  });
});
