//v1.0.0
import { handleLinkChanges } from "../../../global/handlers/gRoutingHandlers";
import { elementNotFound } from "../../../global/handlers/errorHandler";
import { decodeToken } from "../../../global/auth";
import { pageProps } from "../../../../vars";
import { ConsoleMethod, LinkTag, LocationMethod, MetaTag, TitleTag } from "../../testVars";
jest.mock(
  "../../../../../src/pages/api/ts/handlers",
  (): {
    decodeToken: jest.Mock<any, any, any>;
  } => ({
    decodeToken: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "../../../global/handlers/errorHandler",
  (): {
    elementNotFound: jest.Mock<any, any, any>;
    extLine: jest.Mock<any, any, any>;
  } => ({
    elementNotFound: jest.fn() as jest.Mock,
    extLine: (jest.fn() as jest.Mock).mockReturnValue("test-line"),
  }),
) as typeof jest;
describe("handleLinkChanges", (): void => {
  beforeEach((): void => {
    document.head.innerHTML = "";
    document.body.innerHTML = "";
    (decodeToken as jest.Mock).mockReturnValue({ ok: true }) as jest.Mock;
  }) as void;
  it("should redirect to the base page if the token is invalid", (): void => {
    (decodeToken as jest.Mock).mockReturnValue({ ok: false }) as jest.Mock;
    const locationReplaceSpy = jest
      .spyOn<Location, LocationMethod>(window.location, "replace")
      .mockImplementation((): void => {}) as jest.SpyInstance;
    handleLinkChanges("login", "Login Page Style");
    expect(locationReplaceSpy).toHaveBeenCalledWith<[string]>(window.location.origin) as void;
    locationReplaceSpy.mockRestore() as void;
  }) as void;
  it("should throw an error if componentCase is not a string", (): void => {
    expect((): void => handleLinkChanges(123 as any, "Login Page Style")).toThrow(
      "invalid componentCase argument given to handleLinkChanges",
    );
    jest
      .spyOn<Console, ConsoleMethod>(console, "error")
      .mockImplementation((): void => {})
      .mockRestore();
  }) as void;
  it("should throw an error if styleFlag is not a string", (): void => {
    expect((): void => handleLinkChanges("login", 123 as any)).toThrow("invalid StyleFlag given to handleLinkChanges");
    jest
      .spyOn<Console, ConsoleMethod>(console, "error")
      .mockImplementation((): void => {})
      .mockRestore();
  }) as void;
  it("should remove extra head elements", (): void => {
    document.documentElement.append(document.createElement("head"), document.createElement("head"));
    handleLinkChanges("login", "Login Page Style") as void;
    (expect(document.querySelectorAll("head").length) as jest.JestMatchers<jest.SpyInstance>).toBe<number>(1);
  }) as void;
  it("should add a noscript element if it doesn't exist", (): void => {
    const noscript = document.createElement("noscript") as HTMLElement;
    document.body.appendChild<HTMLElement>(noscript);
    handleLinkChanges("login", "Login Page Style") as void;
    (expect(noscript.innerText) as jest.JestMatchers<jest.SpyInstance>).toBe<string>(
      "You need JavaScript to run this application.",
    ) as void;
  }) as void;
  it("should throw an error if <head> is not found", (): void => {
    handleLinkChanges("login", "Login Page Style") as void;
    (expect(elementNotFound) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
    jest
      .spyOn<Console, ConsoleMethod>(console, "error")
      .mockImplementation((): void => {})
      .mockRestore() as void;
  }) as void;
  it("should append meta tags if they are missing", (): void => {
    const head = document.createElement("head") as HTMLHeadElement;
    document.documentElement.appendChild<HTMLHeadElement>(head);
    handleLinkChanges("login", "Login Page Style") as void;
    (
      expect(head.querySelector<HTMLMetaElement>('meta[charset="UTF-8"]')) as jest.JestMatchers<jest.SpyInstance>
    ).toBeTruthy() as void;
    expect(head.querySelector<HTMLMetaElement>('meta[name="viewport"]')).toBeTruthy() as void;
    expect(head.querySelector<HTMLMetaElement>('meta[content="IE=edge"]')).toBeTruthy() as void;
  }) as void;

  it('should insert title and meta tags for "login" case', (): void => {
    const head = document.createElement("head") as HTMLHeadElement;
    document.documentElement.appendChild<HTMLHeadElement>(head);
    const { base, name } = pageProps;
    handleLinkChanges("login", "Login Page Style");
    expect(head.innerHTML).toContain<TitleTag>(`<title>Login — PROSSaúde</title>`) as void;
    expect(head.innerHTML).toContain<LinkTag>(`<link rel="canonical" href="${base}/" />`) as void;
    expect(head.innerHTML).toContain<MetaTag>(
      `<meta name="description" content="Este é uma página para login no sistema do projeto ${name}" />`,
    );
    expect(document.body.className).toBe<string>("loginBody");
  }) as void;

  it('should insert title and meta tags for "base" case', (): void => {
    const head = document.createElement("head") as HTMLHeadElement;
    document.documentElement.appendChild<HTMLHeadElement>(head);
    const { base, name } = pageProps;
    handleLinkChanges("base", "Base Page Style");
    expect(head.innerHTML).toContain<TitleTag>(`<title>Base de Navegação — ${name}</title>`) as void;
    expect(head.innerHTML).toContain<LinkTag>(`<link rel="canonical" href="${base}/base/" />`) as void;
    expect(head.innerHTML).toContain<MetaTag>(
      `<meta name="description" content="Este é uma página para navegação entre as subpáginas do sistema do projeto ${name}" />`,
    );
    expect(document.body.className).toBe<string>("baseBody");
  }) as void;
  it('should handle the "ag" case and update meta tags', (): void => {
    const head = document.createElement("head") as HTMLHeadElement;
    document.documentElement.appendChild<HTMLHeadElement>(head);
    const { base, name } = pageProps;
    handleLinkChanges("ag", "Base Page Style");
    expect(head.innerHTML).toContain<TitleTag>(`<title>Anamnese Geral &#8211 ${name}</title>`) as void;
    expect(head.innerHTML).toContain<LinkTag>(`<link rel="canonical" href="${base}/ag/" />`) as void;
    expect(document.body.className).toBe<string>("agBody");
  }) as void;
  it('should handle the "ed" case and update meta tags', (): void => {
    const head = document.createElement("head") as HTMLHeadElement;
    document.documentElement.appendChild<HTMLHeadElement>(head);
    const { base, name } = pageProps;
    handleLinkChanges("ed", "EN Page Style");
    expect(head.innerHTML).toContain<TitleTag>(
      `<title>Exame Clínico — Educação Física & Nutrição — ${name}</title>`,
    ) as void;
    expect(head.innerHTML).toContain<LinkTag>(`<link rel="canonical" href="${base}/edfis/" />`) as void;
    expect(document.body.className).toBe<string>("edfisNutBody");
  }) as void;
  it('should handle the "ed" case and update meta tags', (): void => {
    const head = document.createElement("head") as HTMLHeadElement;
    document.documentElement.appendChild<HTMLHeadElement>(head);
    const { base, name } = pageProps;
    handleLinkChanges("od", "Od Page Style");
    expect(head.innerHTML).toContain<TitleTag>(`<title>Exame Clínico — Odontologia — ${name}</title>`) as void;
    expect(head.innerHTML).toContain<LinkTag>(`<link rel="canonical" href="${base}/edfis/" />`) as void;
    expect(document.body.className).toBe<string>("odBody");
  }) as void;
  it('should handle the "ed" case and update meta tags', (): void => {
    const head = document.createElement("head") as HTMLHeadElement;
    document.documentElement.appendChild<HTMLHeadElement>(head);
    const { base, name } = pageProps;
    handleLinkChanges("ed", "EN Page Style");
    expect(head.innerHTML).toContain<TitleTag>(`<title>Recuperação de Senha — ${name}</title>`) as void;
    expect(head.innerHTML).toContain<LinkTag>(`<link rel="canonical" href="${base}/recover/" />`) as void;
    expect(document.body.className).toBe<string>("recoverBody");
  }) as void;
  it('should handle the "panel" case and update meta tags', (): void => {
    const head = document.createElement("head") as HTMLHeadElement;
    document.documentElement.appendChild<HTMLHeadElement>(head);
    const { base, name } = pageProps;
    handleLinkChanges("panel", "Panel Page Style");
    expect(head.innerHTML).toContain<TitleTag>(`<title>Painel de Trabalho &#8211 ${name}</title>`) as void;
    expect(head.innerHTML).toContain<LinkTag>(`<link rel="canonical" href="${base}/panel/" />`) as void;
    expect(document.body.className).toBe<string>("panelBody");
  }) as void;
  it("should handle removing duplicate elements in the head", (): void => {
    const head = document.createElement("head") as HTMLHeadElement;
    const duplicateTitle = document.createElement("title");
    duplicateTitle.textContent = "Duplicate";
    head.appendChild(duplicateTitle);
    const favicon = document.createElement("link");
    favicon.setAttribute("rel", "icon");
    head.appendChild(favicon);
    document.documentElement.appendChild<HTMLHeadElement>(head);
    handleLinkChanges("login", "Login Page Style");
    expect(head.querySelectorAll("title").length).toBe<number>(1);
    expect(head.querySelectorAll('link[rel="icon"]').length).toBe<number>(1);
  }) as void;
  it("should log errors if an exception occurs during meta tag removal", (): void => {
    const head = document.createElement("head") as HTMLHeadElement;
    const meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    head.appendChild(meta);
    document.documentElement.appendChild<HTMLHeadElement>(head);
    const consoleErrorSpy = jest.spyOn<Console, ConsoleMethod>(console, "error").mockImplementation((): void => {
      throw new Error("meta tag error");
    }) as jest.Mock;
    handleLinkChanges("login", "Login Page Style");
    expect(consoleErrorSpy).toHaveBeenCalledWith<[any]>(expect.stringContaining("Error executing iteration")) as void;
    consoleErrorSpy.mockRestore() as void;
  }) as void;
}) as void;
