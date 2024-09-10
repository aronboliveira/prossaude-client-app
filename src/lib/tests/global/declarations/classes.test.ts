//v1.0.0
import { Person, UniqueMap, User } from "../../../global/declarations/classes";
describe("Person Class", () => {
  describe("checkAtvLvl method", () => {
    it("should return correct activity level multiplier", () => {
      const person = new Person("masculino", 25, 70, 1.75, 10, "leve");
      expect(person.checkAtvLvl(person)).toBe(1.4);
    });
    it("should update atvLvl and return multiplier for string input", () => {
      const person = new Person();
      expect(person.checkAtvLvl("intenso")).toBe(1.9);
      expect(person.atvLvl).toBe("intenso");
    });
    it("should handle invalid atvLvl", () => {
      new Person().checkAtvLvl("invalidLvl");
      expect(jest.spyOn(console, "error")).toHaveBeenCalledWith(
        expect.stringContaining("Error validating case")
      );
    });
  });
  describe("calcIMC method", () => {
    it("should calculate and classify IMC correctly", () => {
      const person = new Person("masculino", 30, 70, 1.75);
      const [classification, imc] = person.calcIMC(person);
      expect(classification).toBe("eutrofico");
      expect(imc).toBeCloseTo(22.86, 2);
    });
    it("should handle input as an array", () => {
      const person = new Person();
      const [classification, imc] = person.calcIMC([70, 1.75]);
      expect(classification).toBe("eutrofico");
      expect(imc).toBeCloseTo(22.86, 2);
    });
    it("should handle invalid IMC values", () => {
      const person = new Person("masculino", 30, -70, 1.75);
      const consoleSpy = jest.spyOn(console, "error");
      person.calcIMC(person);
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("Error calculating IMC")
      );
    });
  });
  describe("calcPGC method", () => {
    it("should calculate PGC and MLG correctly for males", () => {
      const person = new Person("masculino", 25, 70, 1.75, 10);
      const [pgc, mlg] = person.calcPGC(person);
      expect(pgc).toBeGreaterThan(0);
      expect(mlg).toBeGreaterThan(0);
    });
    it("should calculate PGC and MLG correctly for females", () => {
      const person = new Person("feminino", 25, 70, 1.75, 10);
      const [pgc, mlg] = person.calcPGC(person);
      expect(pgc).toBeGreaterThan(0);
      expect(mlg).toBeGreaterThan(0);
    });
    it("should handle invalid sumDCut values", () => {
      const person = new Person("masculino", 25, 70, 1.75, -10);
      person.calcPGC(person);
      expect(jest.spyOn(console, "warn")).toHaveBeenCalledWith(
        expect.stringContaining("Error validating .sumDCut")
      );
    });
  });
  describe("calcTMB method", () => {
    it("should calculate TMB using Harris-Benedict formula", () => {
      const person = new Person("masculino", 25, 70, 1.75, 10, "leve");
      const [formula, tmb] = person.calcTMB(person, 22.5);
      expect(formula).toBe("harrisBenedict");
      expect(tmb).toBeGreaterThan(0);
    });
    it("should calculate TMB using Tinsley formula for athletes", () => {
      const person = new Person("masculino", 25, 70, 1.75, 10, "muitoIntenso");
      const [formula, tmb] = person.calcTMB(person, 22.5, 60, "MLG");
      expect(formula).toBe("tinsley");
      expect(tmb).toBeGreaterThan(0);
    });
    it("should handle invalid factorAtleta", () => {
      const person = new Person();
      person.calcTMB(person, 22.5, 0, "invalidFactor");
      expect(jest.spyOn(console, "error")).toHaveBeenCalledWith(
        expect.stringContaining("Error validating atvLvl and/or factorAtleta")
      );
    });
  });
  describe("calcGET method", () => {
    it("should calculate GET correctly", () => {
      expect(new Person().calcGET(2000, 1.4)).toBe(2800);
    });
    it("should handle invalid TMB values", () => {
      new Person().calcGET(0, 1.4);
      expect(jest.spyOn(console, "error")).toHaveBeenCalledWith(
        expect.stringContaining("Error validating arguments")
      );
    });
  });
});
describe("UniqueMap Class", () => {
  let uniqueMap: UniqueMap;
  beforeEach(() => {
    uniqueMap = new UniqueMap();
  });
  it("should set a value for a new key", () => {
    uniqueMap.set("key1", "value1");
    expect(uniqueMap.get("key1")).toBe("value1");
  });
  it("should not allow setting a value for an existing key", () => {
    uniqueMap.set("key1", "value1");
    uniqueMap.set("key1", "value2");
    expect(jest.spyOn(console, "error")).toHaveBeenCalledWith(
      expect.stringContaining("Map already has specified key.")
    );
    expect(uniqueMap.get("key1")).toBe("value1");
  });
  it("should handle NaN keys", () => {
    uniqueMap.set(NaN, "value");
    expect(jest.spyOn(console, "error")).toHaveBeenCalledWith(
      expect.stringContaining("NaN values are not qualified.")
    );
  });
  it("should handle self-referencing objects", () => {
    const obj: any = {};
    obj.self = obj;
    uniqueMap.set(obj, "value");
    expect(jest.spyOn(console, "error")).toHaveBeenCalledWith(
      expect.stringContaining("Self-references are not qualified.")
    );
  });
});
describe("User Class", () => {
  it("should initialize user properties correctly", () => {
    const user = new User({
      name: "John Doe",
      privilege: "coordinator",
      area: "technology",
      email: "john@example.com",
      telephone: "1234567890",
    });
    expect(user.userName).toBe("John Doe");
    expect(user.userClass).toBe("Coordenador");
    expect(user.userArea).toBe("Tecnologia");
    expect(user.userEmail).toBe("john@example.com");
    expect(user.userTel).toBe("1234567890");
  });
  it("should use default email and telephone if not provided", () => {
    const user = new User({
      name: "Jane Doe",
      privilege: "student",
      area: "general",
    });
    expect(user.userEmail).toBe("Não preenchido");
    expect(user.userTel).toBe("Não preenchido");
  });
  it("should map area and privilege to corresponding values", () => {
    const user = new User({
      name: "Jane Doe",
      privilege: "student",
      area: "medicine",
    });
    expect(user.userClass).toBe("Estudante");
    expect(user.userArea).toBe("Medicina");
  });
});
