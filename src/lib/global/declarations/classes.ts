export interface UndefinedPerson {
  gen: string;
  age: number;
  sumDCut: number;
  weight: number;
  height: number;
  atvLvl: string;
}
export class Person {
  gen;
  age;
  weight;
  height;
  sumDCut;
  atvLvl;
  constructor(
    gen: string = "masculino",
    age: number = 0,
    weight: number = 0,
    height: number = 0,
    sumDCut: number = 0,
    atvLvl: string = "leve"
  ) {
    this.gen = gen;
    this.age = age;
    this.weight = weight;
    this.height = height;
    this.sumDCut = sumDCut;
    this.atvLvl = atvLvl;
  }
  checkAtvLvl(personInfo: Person | string): number {
    if (
      (personInfo instanceof Person &&
        "atvLvl" in personInfo &&
        this.atvLvl !== "") ||
      typeof personInfo === "string"
    ) {
      if (typeof personInfo === "string") this.atvLvl = personInfo;
      switch (this.atvLvl) {
        case "sedentario":
          return 1.2;
        case "leve":
          return 1.4;
        case "moderado":
          return 1.6;
        case "intenso":
          return 1.9;
        case "muitoIntenso":
          return 2.2;
        default:
          console.error(
            `Error validating case. Obtained this.atvLvl: ${
              this.atvLvl ?? "null"
            }; Accepted values: sedentário || leve || moderado || intenso || muitoIntenso`
          );
      }
    } else {
      console.error(
        `Error validating instance of person. Obtained value: ${
          personInfo ?? "null"
        }; instance ${
          Object.prototype.toString.call(personInfo).slice(8, -1) ?? "null"
        }; Value of Nível of Atividade Física obtained: ${
          this.atvLvl ?? "null"
        }`
      );
      return 0;
    }
    return 0;
  }
  calcIMC(personInfo: Person | [number, number]): [string, number] {
    try {
      if (
        (personInfo instanceof Person &&
          "weight" in personInfo &&
          typeof this.weight === "number" &&
          this.weight >= 0 &&
          "height" in this &&
          typeof this.height === "number" &&
          this.height >= 0) ||
        (Array.isArray(personInfo) &&
          typeof personInfo[0] === "number" &&
          typeof personInfo[1] === "number")
      ) {
        if (Array.isArray(personInfo)) {
          [this.weight, this.height] = personInfo;
        }
        let IMC = this.weight / this.height ** 2;
        if (Number.isNaN(IMC) || IMC === Math.abs(Infinity)) IMC = 0;
        if (IMC >= 0) {
          if (IMC < 18.5) return ["abaixo", IMC];
          else if (IMC >= 18.5 && IMC < 25.0) return ["eutrofico", IMC];
          else if (IMC >= 25.0 && IMC < 30) return ["sobrepeso", IMC];
          else if (IMC >= 30 && IMC < 35) return ["obeso1", IMC];
          else if (IMC >= 35 && IMC < 40) return ["obeso2", IMC];
          else if (IMC > 40) return ["obeso3", IMC];
          else
            throw new Error(
              `Error classifying IMC. Obtained value: ${
                IMC ?? 0
              }; Values have to be positive.`
            );
        } else
          throw new Error(
            `Error calculating IMC. Used values: Weight ${
              this.weight ?? 0
            } and Height ${this.height ?? 0}`
          );
      } else
        throw new Error(
          `Error validating data for person. 
          Element person: ${
            Object.prototype.toString.call(personInfo).slice(8, -1) ?? "null"
          }; 
          Weight present: ${"weight" in personInfo ?? false};
          Weight obtained: ${this.weight ?? 0};
          Height present: ${"height" in personInfo ?? false};
          Height obtained: ${this.height ?? 0}`
        );
    } catch (IMCError) {
      console.error((IMCError as Error).message);
    }
    return ["", 0];
  }
  calcPGC(person: Person): [number, number] {
    if (
      person instanceof Person &&
      "sumDCut" in person &&
      typeof this.sumDCut === "number" &&
      this.sumDCut >= 0
    ) {
      if (person.gen === "masculino") {
        let DC =
          1.10938 -
          0.0008267 * this.sumDCut +
          0.0000016 * this.sumDCut ** 2 -
          0.0002574 * person.age;
        if (DC <= 0 || Number.isNaN(DC)) DC = 0.01;
        let PGC = 495 / DC - 450;
        if (PGC <= 0 || Number.isNaN(PGC)) PGC = 0.01;
        if (PGC > 100) PGC = 100;
        let MLG = 100 - PGC ?? 0;
        if (Number.isNaN(MLG) || MLG === Math.abs(Infinity)) MLG = 0;
        return [PGC, MLG];
      } else if (person.gen === "feminino") {
        let DC =
          1.0994921 -
          0.0009929 * this.sumDCut +
          0.0000023 * this.sumDCut ** 2 -
          0.0001392 * person.age;
        if (DC <= 0 || Number.isNaN(DC)) DC = 0.01;
        let PGC = 495 / DC - 450;
        if (PGC <= 0 || Number.isNaN(PGC)) PGC = 0.01;
        if (PGC > 100) PGC = 100;
        let MLG = 100 - PGC ?? 0;
        if (Number.isNaN(MLG) || MLG === Math.abs(Infinity)) MLG = 0;
        return [PGC, MLG];
      } else if (person.gen === "neutro") {
        let DC =
          1.10443605 -
          0.0009098 * this.sumDCut +
          0.00000195 * this.sumDCut ** 2 -
          0.0001983 * person.age;
        if (DC <= 0 || Number.isNaN(DC)) DC = 0.01;

        let PGC = 495 / DC - 450;
        if (PGC <= 0 || Number.isNaN(PGC)) PGC = 0.01;
        if (PGC > 100) PGC = 100;
        let MLG = 100 - PGC ?? 0;
        if (Number.isNaN(MLG) || MLG === Math.abs(Infinity)) MLG = 0;
        return [PGC, MLG];
      } else
        console.error(
          `Invalid instance of object. Obtained instance: ${
            Object.prototype.toString.call(person).slice(8, -1) ?? "null"
          }`
        );
    } else
      console.warn(`Error validating .sumDCut:
      It is present: ${"sumDCut" in person ?? false};
      Obtained primitive type for .sumDCut: ${typeof this.sumDCut};
      Obtained value: ${this.sumDCut ?? 0}`);
    return [0, 0];
  }
  calcTMB(
    person: Person,
    IMC: number = 0,
    MLG: number = 0,
    factorAtleta: string = "Peso"
  ): [string, number] {
    if (factorAtleta === "peso") factorAtleta = "Peso";
    if (factorAtleta === "mlg") factorAtleta = "MLG";
    try {
      if (
        person instanceof Person &&
        "atvLvl" in person &&
        this.atvLvl &&
        typeof this.atvLvl === "string" &&
        typeof IMC === "number" &&
        typeof MLG === "number" &&
        typeof factorAtleta === "string"
      ) {
        if (
          this.atvLvl === "muitoIntenso" &&
          (factorAtleta === "MLG" || factorAtleta === "Peso")
        ) {
          if (factorAtleta === "MLG") {
            if (MLG && MLG >= 0) return ["tinsley", 25.9 * MLG + 284];
            else
              throw new Error(`Error validating MLG.
              Obtained value: ${MLG ?? 0}`);
          } else if (factorAtleta === "Peso") {
            if ("weight" in person && this.weight >= 0)
              return ["tinsley", 24.8 * this.weight + 10];
            else
              throw new Error(`Error validating weight.
              Obtained value: ${this.weight ?? 0}`);
          }
        } else if (
          this.atvLvl === "sedentario" ||
          this.atvLvl === "leve" ||
          this.atvLvl === "moderado" ||
          this.atvLvl === "intenso"
        ) {
          if (
            "weight" in person &&
            this.weight >= 0 &&
            "height" in person &&
            this.height >= 0 &&
            "age" in person
          ) {
            if (IMC < 25.0 && IMC >= 0) {
              if (person.gen === "masculino")
                return [
                  "harrisBenedict",
                  66 +
                    (13.8 * this.weight + 5.0 * this.height - 6.8 * this.age),
                ];
              else if (person.gen === "feminino")
                return [
                  "harrisBenedict",
                  655 +
                    (9.6 * this.weight + 1.9 * this.height - 4.7 * this.age),
                ];
              else if (person.gen === "neutro")
                return [
                  "harrisBenedict",
                  360.5 +
                    (11.7 * this.weight + 3.45 * this.height - 5.75 * this.age),
                ];
              else
                throw new Error(
                  `Error validating instance of Person. Obtained instance: ${
                    Object.prototype.toString.call(person).slice(8, -1) ??
                    "null"
                  }`
                );
            } else if (IMC >= 25.0) {
              if (person.gen === "masculino")
                return [
                  "mifflinStJeor",
                  10 * this.weight + 6.25 * this.height - 5.0 * this.age + 5,
                ];
              else if (person.gen === "feminino")
                return [
                  "mifflinStJeor",
                  10 * this.weight + 6.25 * this.height - 5.0 * this.age - 161,
                ];
              else if (person.gen === "neutro")
                return [
                  "mifflinStJeor",
                  10 * this.weight + 6.25 * this.height - 5.0 * this.age - 78,
                ];
              else
                throw new Error(
                  `Error validating instance of Person. Obtained instance: ${Object.prototype.toString
                    .call(person)
                    .slice(8, -1)}`
                );
            } else
              throw new Error(
                `Error validating IMC. IMC obtained: ${
                  IMC ?? 0
                }; Valor deve ser númerico, positivo e float`
              );
          } else
            throw new Error(`Error validating properties of person.
            Weight present: ${"weight" in person ?? false};
            Value of weight obtained: ${this.weight ?? 0};
            Height present: ${"height" in person ?? false};
            Value of height obtained: ${this.height ?? 0};
            age present: ${"age" in person ?? false};
            `);
        } else {
          throw new Error(
            `Error validating atvLvl and/or factorAtleta.
            atvLvl obtained: ${this.atvLvl ?? "null"}
            Fator obtained: ${
              factorAtleta ?? "null"
            }; Fatores válidos: "MLG" || "Peso"`
          );
        }
      } else {
        throw new Error(`Error validating person.
        Elemento: ${person ?? "null"};
        instance: ${
          Object.prototype.toString.call(person).slice(8, -1) ?? "null"
        };
        atvLvl present: ${"atvLvl" in person ?? false};
        Value of atvLvl obtained: ${this.atvLvl ?? "null"};
        Primitive type of .atvLvl: ${typeof this.atvLvl};
        Primitive type of IMC: ${typeof IMC};
        Primitive type of MLG: ${typeof MLG};
        Primitive type of factorAtleta: ${typeof factorAtleta}.`);
      }
    } catch (TMBError) {
      console.error((TMBError as Error).message);
    }
    return ["", 0];
  }
  calcGET(TMB: number = 0, factorAtvLvl: number = 1.4): number {
    if (TMB && factorAtvLvl) return TMB * factorAtvLvl;
    else
      console.error(`Error validating arguments.
      TMB obtained: ${TMB ?? 0};
      factorAtvLvl obtained: ${factorAtvLvl ?? 0}`);
    return 0;
  }
}
export class UniqueMap extends Map {
  set(key: any, value: any) {
    try {
      if (this.has(key)) {
        if (Number.isNaN(key)) {
          if (typeof key === "object" && key[key]) {
            super.set(key, value);
          } else throw new Error(`Self-references are not qualified.`);
        } else throw new Error(`NaN values are not qualified.`);
      } else throw new Error(`Map already has specified key.`);
    } catch (err) {
      console.error(
        `Error adding entry to UniqueMap: ${(err as Error).message}`
      );
    }
    return this;
  }
}
export class User {
  readonly #userClass: string;
  readonly #userArea: string;
  readonly #userName: string;
  readonly #userEmail: string;
  readonly #userTel: string;
  constructor({
    privilege,
    name,
    area,
    email,
    telephone,
  }: {
    name: string;
    privilege: string;
    area: string;
    email?: string;
    telephone?: string;
  }) {
    this.#userName = name;
    if (privilege === "coordinator") privilege = "Coordenador";
    if (privilege === "student") privilege = "Estudante";
    if (privilege === "supervisor") privilege = "Supervisor";
    this.#userClass = privilege;
    if (area === "general") area = "Geral";
    if (area === "medicine") area = "Medicina";
    if (area === "nutrition") area = "Nutrição";
    if (area === "physical_education") area = "Educação Física";
    if (area === "psychology") area = "Psicologia";
    if (area === "odontology") area = "Odontologia";
    if (area === "technology") area = "Tecnologia";
    this.#userArea = area;
    this.#userEmail = email || "Não preenchido";
    this.#userTel = telephone || "Não preenchido";
  }
  get userClass(): string {
    return this.#userClass;
  }
  get userArea(): string {
    return this.#userArea;
  }
  get userName(): string {
    return this.#userName;
  }
  get userEmail(): string {
    return this.#userEmail;
  }
  get userTel(): string {
    return this.#userTel;
  }
}
