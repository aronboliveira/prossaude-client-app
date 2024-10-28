import { Person, UniqueMap, User, ClickEvaluator, ExportHandler } from "../../../global/declarations/classes";
import { maxProps } from "../../../../vars";
jest.mock("react-hot-toast", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("Person class", () => {
  test("should initialize with default values", () => {
    const person = new Person();
    expect(person.gen).toBe("masculino");
    expect(person.age).toBe(0);
    expect(person.weight).toBe(0);
    expect(person.height).toBe(0);
    expect(person.sumDCut).toBe(0);
    expect(person.atvLvl).toBe("leve");
  });

  test("calcIMC returns correct IMC value", () => {
    const person = new Person("masculino", 30, 70, 175);
    const { l, v } = person.calcIMC(person);
    expect(l).toBe("eutrofico");
    expect(v).toBeCloseTo(22.86, 1);
  });

  test("dispatchAge should cap the age to maxProps.age", () => {
    const person = new Person();
    person.dispatchAge(200);
    expect(person.age).toBe(maxProps.age);
  });

  test("calcPGC returns expected values", () => {
    const person = new Person("masculino", 25, 80, 180, 10);
    const { pgc, mlg } = person.calcPGC(person);
    expect(pgc).toBeGreaterThan(0);
    expect(mlg).toBeLessThan(100);
  });
});

describe("UniqueMap class", () => {
  test("should add unique keys", () => {
    const map = new UniqueMap();
    map.set("key1", "value1");
    expect(map.get("key1")).toBe("value1");
  });

  test("should not add duplicate keys", () => {
    const map = new UniqueMap();
    map.set("key1", "value1");
    map.set("key1", "value2");
    expect(map.get("key1")).toBe("value1");
  });
});

describe("User class", () => {
  test("should correctly initialize and format user data", () => {
    const user = new User({
      name: "Jane Doe",
      privilege: "student",
      area: "nutrition",
      email: "jane@example.com",
      telephone: "123-456-7890",
    });
    expect(user.userClass).toBe("Estudante");
    expect(user.userArea).toBe("Nutrição");
    expect(user.userEmail).toBe("jane@example.com");
  });

  test("should assign default values if email or telephone are not provided", () => {
    const user = new User({
      name: "John Smith",
      privilege: "coordinator",
      area: "general",
    });
    expect(user.userEmail).toBe("Não preenchido");
    expect(user.userTel).toBe("Não preenchido");
  });
});

describe("ClickEvaluator class", () => {
  let evaluator: ClickEvaluator;

  beforeEach(() => {
    evaluator = new ClickEvaluator();
  });

  test("should start with default values", () => {
    expect(evaluator.clientAttempt).toBe(0);
    expect(evaluator.shouldEvaluateTime).toBe(false);
  });

  test("evaluateClickMovements returns suspicious when event is not trusted", () => {
    const mockEvent = { isTrusted: false, movementX: 0, movementY: 0 } as any;
    const [message, suspicious] = evaluator.evaluateClickMovements(mockEvent);
    expect(suspicious).toBe(true);
    expect(message).toContain("not trusted");
  });

  test("evaluateClickMovements returns non-suspicious for valid click event", () => {
    const mockEvent = { isTrusted: true, movementX: 0, movementY: 0, clientX: 0, clientY: 0 } as any;
    const [message, suspicious] = evaluator.evaluateClickMovements(mockEvent);
    expect(suspicious).toBe(false);
    expect(message).toContain("validated");
  });
});

describe("ExportHandler class", () => {
  let handler: ExportHandler;
  let mockEvent: MouseEvent;

  beforeEach(() => {
    handler = new ExportHandler();
    mockEvent = { isTrusted: true, clientX: 0, clientY: 0 } as MouseEvent;
  });

  test("should initialize with default export values", () => {
    expect(handler.exports).toBe(0);
  });

  test("handleExportClick increments exports and displays toast on suspicious activity", () => {
    handler.handleExportClick(mockEvent, "test");
    expect(handler.exports).toBe(1);
  });

  test("autoResetTimer resets exports after a given interval", () => {
    test("autoResetTimer resets exports after a given interval", done => {
      handler.autoResetTimer(100);
      setTimeout(() => {
        expect(handler.exports).toBe(0);
        done();
      }, 150);
    });
  });
});
