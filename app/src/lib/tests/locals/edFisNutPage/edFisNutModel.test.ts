import {
  checkInnerColGroups,
  checkTabRowsIds,
  changeTabDCutLayout,
  defineHiddenRows,
  evalPGCDecay,
  evalBodyType,
  evalFactorAtleta,
  dispatchFactorAtleta,
  evalFactorAtvLvl,
  dispatchFactorAtvLvl,
  evalActivityLvl,
  evalIMC,
  evalPseudoNum,
  evalMatchTMBElements,
} from "../../../locals/edFisNutPage/edFisNutModel";
import { person, tabProps } from "../../../../vars";

describe("checkInnerColGroups", () => {
  test("returns 0 if parentEl is not an HTMLElement", () => {
    expect(checkInnerColGroups(null)).toBe(0);
  });

  test("counts valid colgroup children", () => {
    document.body.innerHTML = `<div><colgroup><col /><col /></colgroup></div>`;
    const parentEl = document.querySelector("div");
    expect(checkInnerColGroups(parentEl)).toBe(2);
  });
});

describe("checkTabRowsIds", () => {
  test("returns empty array if tab is not a valid table", () => {
    expect(checkTabRowsIds(null)).toEqual([""]);
  });

  test("returns an array of IDs from valid table rows", () => {
    document.body.innerHTML = `
      <table id="tabDCut">
        <tr id="rowSubescap2_" class="tabRowDCutMed"></tr>
      </table>
    `;
    const tab = document.getElementById("tabDCut");
    expect(checkTabRowsIds(tab)).toEqual(["subescap2_"]);
  });
});

describe("changeTabDCutLayout", () => {
  test("returns pollock3 if no valid elements are found", () => {
    expect(changeTabDCutLayout(null, null, null)).toBe("pollock3");
  });

  test("handles layout change based on protocolo", () => {
    document.body.innerHTML = `
      <select id="protocolo"><option>pollock3</option></select>
      <table id="tabDCut"></table>
      <select id="bodyType"></select>
    `;
    const protocolo = document.getElementById("protocolo");
    const tabDC = document.getElementById("tabDCut");
    const bodyType = document.getElementById("bodyType");
    expect(changeTabDCutLayout(protocolo, tabDC, bodyType)).toBe("pollock3");
  });
});

describe("defineHiddenRows", () => {
  test("correctly hides and unhides table rows based on genderedIds", () => {
    document.body.innerHTML = `
      <table id="tabDCut">
        <tr id="rowSubescap2_" class="tabRowDCutMed"></tr>
      </table>
    `;
    const tabDC = document.getElementById("tabDCut");
    defineHiddenRows(tabDC, ["subescap2_"], ["subescap2_"]);
    const row = document.getElementById("rowSubescap2_");
    expect(row?.hasAttribute("hidden")).toBe(false);
  });
});

describe("evalPGCDecay", () => {
  test("returns false if person is not an instance of Person", () => {
    expect(evalPGCDecay(null)).toBe(false);
  });

  test("calculates decay and changes tipgc color on finding decay point", () => {
    document.body.innerHTML = `<input id="tipgc" />`;
    const tipgc = document.getElementById("tipgc");
    person.sumDCut = 100;
    expect(evalPGCDecay(tipgc)).toBe(true);
    expect(tipgc?.style.color).toBe("#ff59");
  });
});

describe("evalBodyType", () => {
  test("validates gender correctly", () => {
    expect(evalBodyType("masculino")).toBe(true);
    expect(evalBodyType("unknown")).toBe(false);
  });
});

describe("evalFactorAtleta", () => {
  test('validates factorAtleta is either "peso" or "mlg"', () => {
    tabProps.factorAtleta = "peso";
    expect(evalFactorAtleta()).toBe(true);
    tabProps.factorAtleta = "invalid";
    expect(evalFactorAtleta()).toBe(false);
  });
});

describe("dispatchFactorAtleta", () => {
  test('sets factorAtleta to the valid provided value or defaults to "peso"', () => {
    dispatchFactorAtleta("mlg");
    expect(tabProps.factorAtleta).toBe("mlg");
    dispatchFactorAtleta("invalid");
    expect(tabProps.factorAtleta).toBe("peso");
  });
});

describe("evalFactorAtvLvl", () => {
  test("validates and normalizes factorAtvLvl", () => {
    tabProps.factorAtvLvl = "1.4";
    expect(evalFactorAtvLvl()).toBe(true);
    tabProps.factorAtvLvl = "invalid";
    expect(evalFactorAtvLvl()).toBe(false);
    expect(tabProps.factorAtvLvl).toBe(1.4);
  });
});

describe("dispatchFactorAtvLvl", () => {
  test("sets factorAtvLvl to a valid provided value or defaults to 1.4", () => {
    dispatchFactorAtvLvl(1.9);
    expect(tabProps.factorAtvLvl).toBe(1.9);
    dispatchFactorAtvLvl(3.0);
    expect(tabProps.factorAtvLvl).toBe(1.4);
  });
});

describe("evalActivityLvl", () => {
  test("validates person activity level", () => {
    person.atvLvl = "leve";
    expect(evalActivityLvl()).toBe(true);
    person.atvLvl = "invalid";
    expect(evalActivityLvl()).toBe(false);
    expect(person.atvLvl).toBe("leve");
  });
});

describe("evalIMC", () => {
  test("validates IMC as a finite number", () => {
    tabProps.IMC = 25.4;
    expect(evalIMC()).toBe(true);
    tabProps.IMC = NaN;
    expect(evalIMC()).toBe(false);
    expect(tabProps.IMC).toBe(0);
  });
});

describe("evalPseudoNum", () => {
  test("parses various inputs to a valid number", () => {
    expect(evalPseudoNum("123.45")).toBe(123.45);
    expect(evalPseudoNum("invalid")).toBe(0);
    expect(evalPseudoNum(true)).toBe(1);
  });
});

describe("evalMatchTMBElements", () => {
  test("validates TMB-related elements in the DOM", () => {
    document.body.innerHTML = `
      <div id="lockGordCorpLvl"></div>
      <span id="spanFactorAtleta"></span>
    `;
    expect(evalMatchTMBElements()).toBe(true);
  });

  test("returns false if elements are missing", () => {
    document.body.innerHTML = ``;
    expect(evalMatchTMBElements()).toBe(false);
  });
});
