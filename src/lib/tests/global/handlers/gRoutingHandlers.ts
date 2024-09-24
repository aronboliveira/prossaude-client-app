//v1.0.0
import { handleLinkChanges } from "../../../global/handlers/gRoutingHandlers";
import { elementNotFound } from "../../../global/handlers/errorHandler";
import { decodeToken } from "../../../../../src/pages/api/ts/handlers";
import { pageProps } from "../../../global/vars";
import { ConsoleMethod, LinkTag, LocationMethod, MetaTag, TitleTag } from "../../testVars";
jest.mock(
  "../../../../../src/pages/api/ts/handlers",
  (): {
    decodeToken: jest.Mock<any, any, any>;
  } => ({
    decodeToken: jest.fn(),
  })
);
jest.mock(
  "../../../global/handlers/errorHandler",
  (): {
    elementNotFound: jest.Mock<any, any, any>;
    extLine: jest.Mock<any, any, any>;
  } => ({
    elementNotFound: jest.fn(),
    extLine: jest.fn().mockReturnValue("test-line"),
  })
);
describe("handleLinkChanges", (): void => {
  beforeEach((): void => {
    document.head.innerHTML = "";
    document.body.innerHTML = "";
    (decodeToken as jest.Mock).mockReturnValue({ ok: true });
  });
  it("should redirect to the base page if the token is invalid", (): void => {
    (decodeToken as jest.Mock).mockReturnValue({ ok: false });
    const locationReplaceSpy = jest
      .spyOn<Location, LocationMethod>(window.location, "replace")
      .mockImplementation((): void => {});
    handleLinkChanges("login", "Login Page Style");
    expect(locationReplaceSpy).toHaveBeenCalledWith<[string]>(window.location.origin);
    locationReplaceSpy.mockRestore();
  });
  it("should throw an error if componentCase is not a string", (): void => {
    expect((): void => handleLinkChanges(123 as any, "Login Page Style")).toThrow(
      "invalid componentCase argument given to handleLinkChanges"
    );
    jest
      .spyOn<Console, ConsoleMethod>(console, "error")
      .mockImplementation((): void => {})
      .mockRestore();
  });
  it("should throw an error if styleFlag is not a string", (): void => {
    expect((): void => handleLinkChanges("login", 123 as any)).toThrow("invalid StyleFlag given to handleLinkChanges");
    jest
      .spyOn<Console, ConsoleMethod>(console, "error")
      .mockImplementation((): void => {})
      .mockRestore();
  });
  it("should remove extra head elements", (): void => {
    document.documentElement.append(document.createElement("head"), document.createElement("head"));
    handleLinkChanges("login", "Login Page Style");
    expect(document.querySelectorAll("head").length).toBe<number>(1);
  });
  it("should add a noscript element if it doesn't exist", (): void => {
    const noscript = document.createElement("noscript");
    document.body.appendChild(noscript);
    handleLinkChanges("login", "Login Page Style");
    expect(noscript.innerText).toBe<string>("You need JavaScript to run this application.");
  });
  it("should throw an error if <head> is not found", (): void => {
    handleLinkChanges("login", "Login Page Style");
    expect(elementNotFound).toHaveBeenCalled();
    jest
      .spyOn<Console, ConsoleMethod>(console, "error")
      .mockImplementation((): void => {})
      .mockRestore();
  });
  it("should append meta tags if they are missing", (): void => {
    const head = document.createElement("head");
    document.documentElement.appendChild(head);
    handleLinkChanges("login", "Login Page Style");
    expect(head.querySelector('meta[charset="UTF-8"]')).toBeTruthy();
    expect(head.querySelector('meta[name="viewport"]')).toBeTruthy();
    expect(head.querySelector('meta[content="IE=edge"]')).toBeTruthy();
  });

  it('should insert title and meta tags for "login" case', (): void => {
    const head = document.createElement("head");
    document.documentElement.appendChild(head);
    const { base, name } = pageProps;
    handleLinkChanges("login", "Login Page Style");
    expect(head.innerHTML).toContain<TitleTag>(`<title>Login — PROSSaúde</title>`);
    expect(head.innerHTML).toContain<LinkTag>(`<link rel="canonical" href="${base}/" />`);
    expect(head.innerHTML).toContain<MetaTag>(
      `<meta name="description" content="Este é uma página para login no sistema do projeto ${name}" />`
    );
    expect(document.body.className).toBe<string>("loginBody");
  });

  it('should insert title and meta tags for "base" case', (): void => {
    const head = document.createElement("head");
    document.documentElement.appendChild(head);
    const { base, name } = pageProps;
    handleLinkChanges("base", "Base Page Style");
    expect(head.innerHTML).toContain<TitleTag>(`<title>Base de Navegação — ${name}</title>`);
    expect(head.innerHTML).toContain<LinkTag>(`<link rel="canonical" href="${base}/base/" />`);
    expect(head.innerHTML).toContain<MetaTag>(
      `<meta name="description" content="Este é uma página para navegação entre as subpáginas do sistema do projeto ${name}" />`
    );
    expect(document.body.className).toBe<string>("baseBody");
  });
  it('should handle the "ag" case and update meta tags', (): void => {
    const head = document.createElement("head");
    document.documentElement.appendChild(head);
    const { base, name } = pageProps;
    handleLinkChanges("ag", "Base Page Style");
    expect(head.innerHTML).toContain<TitleTag>(`<title>Anamnese Geral &#8211 ${name}</title>`);
    expect(head.innerHTML).toContain<LinkTag>(`<link rel="canonical" href="${base}/ag/" />`);
    expect(document.body.className).toBe<string>("agBody");
  });
  it('should handle the "ed" case and update meta tags', (): void => {
    const head = document.createElement("head");
    document.documentElement.appendChild(head);
    const { base, name } = pageProps;
    handleLinkChanges("ed", "EN Page Style");
    expect(head.innerHTML).toContain<TitleTag>(`<title>Exame Clínico — Educação Física & Nutrição — ${name}</title>`);
    expect(head.innerHTML).toContain<LinkTag>(`<link rel="canonical" href="${base}/edfis/" />`);
    expect(document.body.className).toBe<string>("edfisNutBody");
  });
  it('should handle the "ed" case and update meta tags', (): void => {
    const head = document.createElement("head");
    document.documentElement.appendChild(head);
    const { base, name } = pageProps;
    handleLinkChanges("od", "Od Page Style");
    expect(head.innerHTML).toContain<TitleTag>(`<title>Exame Clínico — Odontologia — ${name}</title>`);
    expect(head.innerHTML).toContain<LinkTag>(`<link rel="canonical" href="${base}/edfis/" />`);
    expect(document.body.className).toBe<string>("odBody");
  });
  it('should handle the "ed" case and update meta tags', (): void => {
    const head = document.createElement("head");
    document.documentElement.appendChild(head);
    const { base, name } = pageProps;
    handleLinkChanges("ed", "EN Page Style");
    expect(head.innerHTML).toContain<TitleTag>(`<title>Recuperação de Senha — ${name}</title>`);
    expect(head.innerHTML).toContain<LinkTag>(`<link rel="canonical" href="${base}/recover/" />`);
    expect(document.body.className).toBe<string>("recoverBody");
  });
  it('should handle the "panel" case and update meta tags', (): void => {
    const head = document.createElement("head");
    document.documentElement.appendChild(head);
    const { base, name } = pageProps;
    handleLinkChanges("panel", "Panel Page Style");
    expect(head.innerHTML).toContain<TitleTag>(`<title>Painel de Trabalho &#8211 ${name}</title>`);
    expect(head.innerHTML).toContain<LinkTag>(`<link rel="canonical" href="${base}/panel/" />`);
    expect(document.body.className).toBe<string>("panelBody");
  });
  it("should handle removing duplicate elements in the head", (): void => {
    const head = document.createElement("head");
    const duplicateTitle = document.createElement("title");
    duplicateTitle.textContent = "Duplicate";
    head.appendChild(duplicateTitle);
    const favicon = document.createElement("link");
    favicon.setAttribute("rel", "icon");
    head.appendChild(favicon);
    document.documentElement.appendChild(head);
    handleLinkChanges("login", "Login Page Style");
    expect(head.querySelectorAll("title").length).toBe<number>(1);
    expect(head.querySelectorAll('link[rel="icon"]').length).toBe<number>(1);
  });
  it("should log errors if an exception occurs during meta tag removal", (): void => {
    const head = document.createElement("head");
    const meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    head.appendChild(meta);
    document.documentElement.appendChild(head);
    const consoleErrorSpy = jest.spyOn<Console, ConsoleMethod>(console, "error").mockImplementation((): void => {
      throw new Error("meta tag error");
    });
    handleLinkChanges("login", "Login Page Style");
    expect(consoleErrorSpy).toHaveBeenCalledWith<[any]>(expect.stringContaining("Error executing iteration"));
    consoleErrorSpy.mockRestore();
  });
});
