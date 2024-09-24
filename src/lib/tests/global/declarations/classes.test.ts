//v1.0.0
import { userClasses, validAreas } from "@/lib/global/declarations/types";
import { Person, UniqueMap, User } from "../../../global/declarations/classes";
import { ConsoleMethod, Email, PseudoNum, TMBFormula } from "../../testVars";
describe("Person Class", (): void => {
  describe("checkAtvLvl method", (): void => {
    it("should return correct activity level multiplier", (): void => {
      const person = new Person("masculino", 25, 70, 1.75, 10, "leve");
      expect(person.checkAtvLvl(person)).toBe<number>(1.4);
    });
    it("should update atvLvl and return multiplier for string input", (): void => {
      const person = new Person();
      expect(person.checkAtvLvl("intenso")).toBe<number>(1.9);
      expect(person.atvLvl).toBe<string>("intenso");
    });
    it("should handle invalid atvLvl", (): void => {
      new Person().checkAtvLvl("invalidLvl");
      expect(jest.spyOn<Console, ConsoleMethod>(console, "error")).toHaveBeenCalledWith<[any]>(
        expect.stringContaining("Error validating case")
      );
    });
  });
  describe("calcIMC method", (): void => {
    it("should calculate and classify IMC correctly", (): void => {
      const person = new Person("masculino", 30, 70, 1.75);
      const [classification, imc] = person.calcIMC(person);
      expect(classification).toBe<string>("eutrofico");
      expect(imc).toBeCloseTo(22.86, 2);
    });
    it("should handle input as an array", (): void => {
      const person = new Person();
      const [classification, imc] = person.calcIMC([70, 1.75]);
      expect(classification).toBe<string>("eutrofico");
      expect(imc).toBeCloseTo(22.86, 2);
    });
    it("should handle invalid IMC values", (): void => {
      const person = new Person("masculino", 30, -70, 1.75);
      person.calcIMC(person);
      expect(jest.spyOn<Console, ConsoleMethod>(console, "error")).toHaveBeenCalledWith<[any]>(
        expect.stringContaining("Error calculating IMC")
      );
    });
  });
  describe("calcPGC method", (): void => {
    it("should calculate PGC and MLG correctly for males", (): void => {
      const person = new Person("masculino", 25, 70, 1.75, 10);
      const [pgc, mlg] = person.calcPGC(person);
      expect(pgc).toBeGreaterThan(0);
      expect(mlg).toBeGreaterThan(0);
    });
    it("should calculate PGC and MLG correctly for females", (): void => {
      const person = new Person("feminino", 25, 70, 1.75, 10);
      const [pgc, mlg] = person.calcPGC(person);
      expect(pgc).toBeGreaterThan(0);
      expect(mlg).toBeGreaterThan(0);
    });
    it("should handle invalid sumDCut values", (): void => {
      const person = new Person("masculino", 25, 70, 1.75, -10);
      person.calcPGC(person);
      expect(jest.spyOn<Console, ConsoleMethod>(console, "warn")).toHaveBeenCalledWith<[any]>(
        expect.stringContaining("Error validating .sumDCut")
      );
    });
  });
  describe("calcTMB method", (): void => {
    it("should calculate TMB using Harris-Benedict formula", (): void => {
      const person = new Person("masculino", 25, 70, 1.75, 10, "leve");
      const [formula, tmb] = person.calcTMB(person, 22.5);
      expect(formula).toBe<TMBFormula>("harrisBenedict");
      expect(tmb).toBeGreaterThan(0);
    });
    it("should calculate TMB using Tinsley formula for athletes", (): void => {
      const person = new Person("masculino", 25, 70, 1.75, 10, "muitoIntenso");
      const [formula, tmb] = person.calcTMB(person, 22.5, 60, "MLG");
      expect(formula).toBe<TMBFormula>("tinsley");
      expect(tmb).toBeGreaterThan(0);
    });
    it("should handle invalid factorAtleta", (): void => {
      const person = new Person();
      person.calcTMB(person, 22.5, 0, "invalidFactor");
      expect(jest.spyOn<Console, ConsoleMethod>(console, "error")).toHaveBeenCalledWith<[any]>(
        expect.stringContaining("Error validating atvLvl and/or factorAtleta")
      );
    });
  });
  describe("calcGET method", (): void => {
    it("should calculate GET correctly", (): void => {
      expect(new Person().calcGET(2000, 1.4)).toBe<number>(2800);
    });
    it("should handle invalid TMB values", (): void => {
      new Person().calcGET(0, 1.4);
      expect(jest.spyOn<Console, ConsoleMethod>(console, "error")).toHaveBeenCalledWith<[any]>(
        expect.stringContaining("Error validating arguments")
      );
    });
  });
});
describe("UniqueMap Class", (): void => {
  let uniqueMap: UniqueMap;
  beforeEach((): void => {
    uniqueMap = new UniqueMap();
  });
  it("should set a value for a new key", (): void => {
    uniqueMap.set("key1", "value1");
    expect(uniqueMap.get("key1")).toBe<string>("value1");
  });
  it("should not allow setting a value for an existing key", (): void => {
    uniqueMap.set("key1", "value1");
    uniqueMap.set("key1", "value2");
    expect(jest.spyOn<Console, ConsoleMethod>(console, "error")).toHaveBeenCalledWith<[any]>(
      expect.stringContaining("Map already has specified key.")
    );
    expect(uniqueMap.get("key1")).toBe<string>("value1");
  });
  it("should handle NaN keys", (): void => {
    uniqueMap.set(NaN, "value");
    expect(jest.spyOn<Console, ConsoleMethod>(console, "error")).toHaveBeenCalledWith<[any]>(
      expect.stringContaining("NaN values are not qualified.")
    );
  });
  it("should handle self-referencing objects", (): void => {
    const obj: any = {};
    obj.self = obj;
    uniqueMap.set(obj, "value");
    expect(jest.spyOn<Console, ConsoleMethod>(console, "error")).toHaveBeenCalledWith<[any]>(
      expect.stringContaining("Self-references are not qualified.")
    );
  });
});
describe("User Class", (): void => {
  it("should initialize user properties correctly", (): void => {
    const user = new User({
      name: "John Doe",
      privilege: "coordinator",
      area: "technology",
      email: "john@example.com",
      telephone: "1234567890",
    });
    expect(user.userName).toBe<string>("John Doe");
    expect(user.userClass).toBe<userClasses>("coordenador");
    expect(user.userArea).toBe<validAreas>("Tecnologia");
    expect(user.userEmail).toBe<Email>("john@example.com");
    expect(user.userTel).toBe<PseudoNum>("1234567890");
  });
  it("should use default email and telephone if not provided", (): void => {
    const user = new User({
      name: "Jane Doe",
      privilege: "student",
      area: "general",
    });
    expect(user.userEmail).toBe<string>("Não preenchido");
    expect(user.userTel).toBe<string>("Não preenchido");
  });
  it("should map area and privilege to corresponding values", (): void => {
    const user = new User({
      name: "Jane Doe",
      privilege: "student",
      area: "medicine",
    });
    expect(user.userClass).toBe<userClasses>("estudante");
    expect(user.userArea).toBe<validAreas>("Medicina");
  });
});
