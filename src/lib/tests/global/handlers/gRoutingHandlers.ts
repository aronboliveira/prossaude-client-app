//v1.0.0
import { handleLinkChanges } from "../../../global/handlers/gRoutingHandlers";
import { elementNotFound } from "../../../global/handlers/errorHandler";
import { decodeToken } from "../../../../../src/pages/api/ts/handlers";
import { pageProps } from "../../../global/vars";
jest.mock("../../../../../src/pages/api/ts/handlers", () => ({
  decodeToken: jest.fn(),
}));
jest.mock("../../../global/handlers/errorHandler", () => ({
  elementNotFound: jest.fn(),
  extLine: jest.fn().mockReturnValue("test-line"),
}));
describe("handleLinkChanges", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
    document.body.innerHTML = "";
    (decodeToken as jest.Mock).mockReturnValue({ ok: true });
  });
  it("should redirect to the base page if the token is invalid", () => {
    (decodeToken as jest.Mock).mockReturnValue({ ok: false });
    const locationReplaceSpy = jest
      .spyOn(window.location, "replace")
      .mockImplementation(() => {});
    handleLinkChanges("login", "Login Page Style");
    expect(locationReplaceSpy).toHaveBeenCalledWith(window.location.origin);
    locationReplaceSpy.mockRestore();
  });
  it("should throw an error if componentCase is not a string", () => {
    expect(() => handleLinkChanges(123 as any, "Login Page Style")).toThrow(
      "invalid componentCase argument given to handleLinkChanges"
    );
    jest
      .spyOn(console, "error")
      .mockImplementation(() => {})
      .mockRestore();
  });
  it("should throw an error if styleFlag is not a string", () => {
    expect(() => handleLinkChanges("login", 123 as any)).toThrow(
      "invalid StyleFlag given to handleLinkChanges"
    );
    jest
      .spyOn(console, "error")
      .mockImplementation(() => {})
      .mockRestore();
  });
  it("should remove extra head elements", () => {
    document.documentElement.append(
      document.createElement("head"),
      document.createElement("head")
    );
    handleLinkChanges("login", "Login Page Style");
    expect(document.querySelectorAll("head").length).toBe(1);
  });
  it("should add a noscript element if it doesn't exist", () => {
    const noscript = document.createElement("noscript");
    document.body.appendChild(noscript);
    handleLinkChanges("login", "Login Page Style");
    expect(noscript.innerText).toBe(
      "You need JavaScript to run this application."
    );
  });
  it("should throw an error if <head> is not found", () => {
    handleLinkChanges("login", "Login Page Style");
    expect(elementNotFound).toHaveBeenCalled();
    jest
      .spyOn(console, "error")
      .mockImplementation(() => {})
      .mockRestore();
  });
  it("should append meta tags if they are missing", () => {
    const head = document.createElement("head");
    document.documentElement.appendChild(head);
    handleLinkChanges("login", "Login Page Style");
    expect(head.querySelector('meta[charset="UTF-8"]')).toBeTruthy();
    expect(head.querySelector('meta[name="viewport"]')).toBeTruthy();
    expect(head.querySelector('meta[content="IE=edge"]')).toBeTruthy();
  });

  it("should insert title and meta tags for 'login' case", () => {
    const head = document.createElement("head");
    document.documentElement.appendChild(head);
    const { base, name } = pageProps;
    handleLinkChanges("login", "Login Page Style");
    expect(head.innerHTML).toContain(`<title>Login — PROSSaúde</title>`);
    expect(head.innerHTML).toContain(
      `<link rel="canonical" href="${base}/" />`
    );
    expect(head.innerHTML).toContain(
      `<meta name="description" content="Este é uma página para login no sistema do projeto ${name}" />`
    );
    expect(document.body.className).toBe("loginBody");
  });

  it("should insert title and meta tags for 'base' case", () => {
    const head = document.createElement("head");
    document.documentElement.appendChild(head);
    const { base, name } = pageProps;
    handleLinkChanges("base", "Base Page Style");
    expect(head.innerHTML).toContain(
      `<title>Base de Navegação — ${name}</title>`
    );
    expect(head.innerHTML).toContain(
      `<link rel="canonical" href="${base}/base/" />`
    );
    expect(head.innerHTML).toContain(
      `<meta name="description" content="Este é uma página para navegação entre as subpáginas do sistema do projeto ${name}" />`
    );
    expect(document.body.className).toBe("baseBody");
  });
  it("should handle the 'ag' case and update meta tags", () => {
    const head = document.createElement("head");
    document.documentElement.appendChild(head);
    const { base, name } = pageProps;
    handleLinkChanges("ag", "Base Page Style");
    expect(head.innerHTML).toContain(
      `<title>Anamnese Geral &#8211 ${name}</title>`
    );
    expect(head.innerHTML).toContain(
      `<link rel="canonical" href="${base}/ag/" />`
    );
    expect(document.body.className).toBe("agBody");
  });
  it("should handle the 'ed' case and update meta tags", () => {
    const head = document.createElement("head");
    document.documentElement.appendChild(head);
    const { base, name } = pageProps;
    handleLinkChanges("ed", "EN Page Style");
    expect(head.innerHTML).toContain(
      `<title>Exame Clínico — Educação Física & Nutrição — ${name}</title>`
    );
    expect(head.innerHTML).toContain(
      `<link rel="canonical" href="${base}/edfis/" />`
    );
    expect(document.body.className).toBe("edfisNutBody");
  });
  it("should handle the 'ed' case and update meta tags", () => {
    const head = document.createElement("head");
    document.documentElement.appendChild(head);
    const { base, name } = pageProps;
    handleLinkChanges("od", "Od Page Style");
    expect(head.innerHTML).toContain(
      `<title>Exame Clínico — Odontologia — ${name}</title>`
    );
    expect(head.innerHTML).toContain(
      `<link rel="canonical" href="${base}/edfis/" />`
    );
    expect(document.body.className).toBe("odBody");
  });
  it("should handle the 'ed' case and update meta tags", () => {
    const head = document.createElement("head");
    document.documentElement.appendChild(head);
    const { base, name } = pageProps;
    handleLinkChanges("ed", "EN Page Style");
    expect(head.innerHTML).toContain(
      `<title>Recuperação de Senha — ${name}</title>`
    );
    expect(head.innerHTML).toContain(
      `<link rel="canonical" href="${base}/recover/" />`
    );
    expect(document.body.className).toBe("recoverBody");
  });
  it("should handle the 'panel' case and update meta tags", () => {
    const head = document.createElement("head");
    document.documentElement.appendChild(head);
    const { base, name } = pageProps;
    handleLinkChanges("panel", "Panel Page Style");
    expect(head.innerHTML).toContain(
      `<title>Painel de Trabalho &#8211 ${name}</title>`
    );
    expect(head.innerHTML).toContain(
      `<link rel="canonical" href="${base}/panel/" />`
    );
    expect(document.body.className).toBe("panelBody");
  });
  it("should handle removing duplicate elements in the head", () => {
    const head = document.createElement("head");
    const duplicateTitle = document.createElement("title");
    duplicateTitle.textContent = "Duplicate";
    head.appendChild(duplicateTitle);
    const favicon = document.createElement("link");
    favicon.setAttribute("rel", "icon");
    head.appendChild(favicon);
    document.documentElement.appendChild(head);
    handleLinkChanges("login", "Login Page Style");
    expect(head.querySelectorAll("title").length).toBe(1);
    expect(head.querySelectorAll('link[rel="icon"]').length).toBe(1);
  });
  it("should log errors if an exception occurs during meta tag removal", () => {
    const head = document.createElement("head");
    const meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    head.appendChild(meta);
    document.documentElement.appendChild(head);
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {
        throw new Error("meta tag error");
      });
    handleLinkChanges("login", "Login Page Style");
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("Error executing iteration")
    );
    consoleErrorSpy.mockRestore();
  });
});
