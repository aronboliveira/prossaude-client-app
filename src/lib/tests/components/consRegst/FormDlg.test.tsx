import { render, fireEvent, screen, RenderResult } from "@testing-library/react";
import FormDlg from "../../../../../components/consRegst/FormDlg";
import { ConsDlgProps } from "../../..//lib/global/declarations/interfacesCons";
import { addListenerAvMembers } from "../../../../lib/locals/panelPage/handlers/consHandlerList";
import { addExportFlags } from "../../../../lib/global/gController";
import { syncAriaStates } from "../../../../lib/global/handlers/gHandlers";
import { isClickOutside } from "../../../../lib/global/gStyleScript";
import { checkRegstBtn, generateSchedPacData } from "../../../../lib/locals/panelPage/handlers/consHandlerCmn";
import { formatCPF, formatTel, addEmailExtension } from "../../../../lib/global/gModel";
import { handleCondtReq, enableCPFBtn } from "../../../../lib/global/handlers/gHandlers";
import { validateForm } from "../../../../lib/global/handlers/gHandlers";
import { handleSubmit } from "../../../locals/panelPage/handlers/handlers";
import FailRegstAlert from "../../../../../components/alerts/FailRegsAlert";
import "@testing-library/jest-dom/extend-expect";
import { CSSColor } from "../../testVars";
jest.mock(
  "../../../../lib/locals/panelPage/handlers/consHandlerList",
  (): {
    addListenerAvMembers: jest.Mock<any, any, any>;
  } => ({
    addListenerAvMembers: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "../../../../lib/global/gController",
  (): {
    addExportFlags: jest.Mock<any, any, any>;
  } => ({
    addExportFlags: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "../../../../lib/global/handlers/gHandlers",
  (): {
    syncAriaStates: jest.Mock<any, any, any>;
    checkRegstBtn: jest.Mock<any, any, any>;
  } => ({
    syncAriaStates: jest.fn() as jest.Mock,
    checkRegstBtn: (jest.fn() as jest.Mock).mockReturnValue(false),
  }),
) as typeof jest;
jest.mock(
  "../../../../lib/global/gStyleScript",
  (): {
    isClickOutside: jest.Mock<any, any, any>;
  } => ({
    isClickOutside: (jest.fn() as jest.Mock).mockReturnValue([true]),
  }),
) as typeof jest;
jest.mock(
  "react-dom/client",
  (): {
    createRoot: jest.Mock<any, any, any>;
  } => ({
    createRoot: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "../../../../lib/locals/panelPage/consController",
  (): {
    formData: object;
  } => ({
    formData: {},
  }),
) as typeof jest;
jest.mock(
  "../../..//lib/global/declarations/interfacesCons",
  (): {
    toggleACCons: jest.Mock<any, any, any>;
    toggleAFCons: jest.Mock<any, any, any>;
  } => ({
    toggleACCons: jest.fn() as jest.Mock,
    toggleAFCons: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "../../../../lib/global/gModel",
  (): {
    formatCPF: jest.Mock<any, any, any>;
    formatTel: jest.Mock<any, any, any>;
    addEmailExtension: jest.Mock<any, any, any>;
  } => ({
    formatCPF: jest.fn() as jest.Mock,
    formatTel: jest.fn() as jest.Mock,
    addEmailExtension: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "../../../../lib/global/handlers/gHandlers",
  (): {
    handleCondtReq: jest.Mock<any, any, any>;
    enableCPFBtn: jest.Mock<any, any, any>;
  } => ({
    handleCondtReq: jest.fn() as jest.Mock,
    enableCPFBtn: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "../../../../lib/global/handlers/gHandlers",
  (): {
    validateForm: jest.Mock<any, any, any>;
    generateSchedPacData: jest.Mock<any, any, any>;
    generateSchedBtn: jest.Mock<any, any, any>;
  } => ({
    validateForm: (jest.fn() as jest.Mock).mockResolvedValue([true, null, {}]),
    generateSchedPacData: jest.fn() as jest.Mock,
    generateSchedBtn: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "../../../../pages/api/ts/handlers",
  (): {
    handleSubmit: jest.Mock<any, any, any>;
  } => ({
    handleSubmit: jest.fn() as jest.Mock,
  }),
) as typeof jest;
jest.mock(
  "../../../../../components/alerts/FailRegsAlert",
  (): jest.Mock<any, any, any> => jest.fn() as jest.Mock,
) as typeof jest;
describe("FormDlg Component", (): void => {
  const defaultProps: ConsDlgProps = {
    onClose: jest.fn() as jest.Mock,
    userClass: "estudante",
  };
  const renderComponent = (
    props = {},
  ): RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement> =>
    render(<FormDlg {...defaultProps} {...props} />);
  test("calls addListenerAvMembers on mount", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (expect(addListenerAvMembers) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  test("calls addExportFlags when exportRef and dlgRef are valid", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (expect(addExportFlags) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof addExportFlags>
    >("Paciente", expect.anything() as any, "#firstNamePac");
  }) as void;
  test("calls isClickOutside and onClose when clicking outside dialog", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.click(document) as boolean;
    (expect(isClickOutside) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
    (expect(defaultProps.onClose) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  test("syncs aria states on dialog initialization", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (expect(syncAriaStates) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  test("pushes correct state to history on mount and unmount", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (
      expect(jest.spyOn<History, "pushState">(window.history, "pushState")) as jest.JestMatchers<jest.SpyInstance>
    ).toHaveBeenCalledWith<[object, string, any]>({}, "", expect.any(String));
  }) as void;
  test("handles CPF button click and populates form", (): void => {
    const { container }: { container: HTMLElement } = renderComponent() as RenderResult<
      typeof import("@testing-library/dom/types/queries"),
      HTMLElement,
      HTMLElement
    >;
    fireEvent.click(container.querySelector<HTMLButtonElement>("button[id*='cpf']")!) as boolean;
    (expect(jest.fn() as jest.Mock) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  test("activates and toggles CPFFiller", (): void => {
    const { container }: { container: HTMLElement } = renderComponent() as RenderResult<
      typeof import("@testing-library/dom/types/queries"),
      HTMLElement,
      HTMLElement
    >;
    fireEvent.click(container.querySelector<HTMLButtonElement>("button[id*='CPFProf']")!) as boolean;
    (expect(container) as jest.JestMatchers<jest.SpyInstance>).toHaveClass("active") as void;
  }) as void;
  test("handles registration button click and validation", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.click(screen.getByText<HTMLButtonElement>("Submit")) as boolean;
    (expect(checkRegstBtn) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  test("calls syncAriaStates on dialog initialization", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (expect(syncAriaStates) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  test("pushes history correctly on mount/unmount", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (
      expect(jest.spyOn<History, "pushState">(window.history, "pushState")) as jest.JestMatchers<jest.SpyInstance>
    ).toHaveBeenCalled() as void;
  }) as void;
  test("scrolls dialog into view", (): void => {
    const { container }: { container: HTMLElement } = renderComponent() as RenderResult<
      typeof import("@testing-library/dom/types/queries"),
      HTMLElement,
      HTMLElement
    >;
    container
      .querySelector<HTMLDialogElement>("dialog")
      ?.scrollIntoView({ behavior: "smooth", block: "center" }) as void;
    (expect(jest.fn() as jest.Mock) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  test("renders the dialog modal correctly", (): void =>
    (renderComponent() as RenderResult<
      typeof import("@testing-library/dom/types/queries"),
      HTMLElement,
      HTMLElement
    >) &&
    ((
      expect(screen.getByRole<HTMLDialogElement>("dialog")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void));
  test("renders 'Registro de Consulta' title", (): void =>
    (renderComponent() as RenderResult<
      typeof import("@testing-library/dom/types/queries"),
      HTMLElement,
      HTMLElement
    >) &&
    ((
      expect(screen.getByText<HTMLElement>("Registro de Consulta")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void));
  test("renders ErrorBoundary with fallback component", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (
      expect(
        screen.getByText<HTMLDialogElement>("Erro carregando a janela modal!"),
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  test("renders 'Autocorreção' checkbox", (): void =>
    (renderComponent() as RenderResult<
      typeof import("@testing-library/dom/types/queries"),
      HTMLElement,
      HTMLElement
    >) &&
    ((
      expect(screen.getByTitle<HTMLElement>("Correção automática de Nomes")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void));
  test("renders 'Autopreenchimento' checkbox", (): void =>
    (renderComponent() as RenderResult<
      typeof import("@testing-library/dom/types/queries"),
      HTMLElement,
      HTMLElement
    >) &&
    (expect(
      screen.getByTitle<HTMLElement>("Correção automática de CPF, Telefone e E-mail"),
    ).toBeInTheDocument() as void));
  test("clicking the 'Autocorreção' checkbox triggers toggleACCons", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.click(screen.getByTitle<HTMLInputElement>("Correção automática de Nomes")) as boolean;
    (expect(jest.fn() as jest.Mock) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  test("clicking the 'Autopreenchimento' checkbox triggers toggleAFCons", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.click(screen.getByTitle<HTMLInputElement>("Correção automática de CPF, Telefone e E-mail")) as boolean;
    (expect(jest.fn() as jest.Mock) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  test("calls onClose when close button is clicked", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button", { name: /close/i })) as boolean;
    (expect(defaultProps.onClose) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  test("renders CPF input and triggers appropriate handlers", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.input(screen.getByPlaceholderText<HTMLInputElement>("Preencha com o CPF"), {
      target: { value: "123.456.789-12" },
    }) as boolean;
    (expect(formatCPF) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
    (expect(handleCondtReq) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
    (expect(enableCPFBtn) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  test("renders 'Preencher Dados com CPF' button and calls handleCPFBtnClick", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.click(screen.getByText<HTMLInputElement>("Preencher Dados com CPF")) as boolean;
    (expect(jest.fn() as jest.Mock) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  test("renders first name input and handles input with auto-capitalization", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.input(screen.getByPlaceholderText<HTMLInputElement>("Preencha com o Primeiro Nome do Paciente"), {
      target: { value: "jose" },
    }) as boolean;
    (expect(handleCondtReq) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  test("renders family name input and applies autocorrect", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.input(screen.getByPlaceholderText<HTMLInputElement>("Preencha com Sobrenome(s) do Paciente"), {
      target: { value: "silva" },
    }) as boolean;
    (expect(handleCondtReq) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  test("renders telephone input and triggers appropriate handlers", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.input(
      screen.getByPlaceholderText<HTMLInputElement>("Preencha com o Telefone (sem código nacional e DDD) de Contato"),
      {
        target: { value: "98765-4321" },
      },
    ) as boolean;
    (expect(formatTel) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
    (expect(handleCondtReq) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  test("renders email input and triggers email extension handler", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.input(screen.getByPlaceholderText<HTMLInputElement>("Preencha com o E-mail do Paciente"), {
      target: { value: "email@example.com" },
    }) as boolean;
    (expect(addEmailExtension) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
    (expect(handleCondtReq) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
  }) as void;
  test("renders 'Paciente Confirmado' checkbox", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    const confirmCheckbox: HTMLElement = screen.getByLabelText<HTMLInputElement>("Paciente Confirmado:");
    (expect(confirmCheckbox) as jest.JestMatchers<jest.SpyInstance>).toBeInTheDocument() as void;
    fireEvent.click(confirmCheckbox) as boolean;
    (expect(confirmCheckbox) as jest.JestMatchers<jest.SpyInstance>).toBeChecked() as void;
  }) as void;
  test("renders 'Status do Paciente' select and its options", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (
      expect(screen.getByLabelText<HTMLSelectElement>("Status do Paciente:")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(screen.getByText<HTMLOptionElement>("Em Avaliação Inicial")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(screen.getByText<HTMLOptionElement>("Em Tratamento Geral")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  test("renders 'Tipo da Consulta' select and its options", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (
      expect(screen.getByLabelText<HTMLSelectElement>("Tipo da Consulta:")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(screen.getByText<HTMLOptionElement>("Anamnese e Exame Clínico")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(screen.getByText<HTMLOptionElement>("Acompanhamento Geral")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  test("renders 'Estudante alocado' input and button", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (
      expect(
        screen.getByPlaceholderText<HTMLInputElement>("Preencha com o Nome do Estudante alocado"),
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
    (
      expect(screen.getByText<HTMLButtonElement>("Capturar por Identificadores")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  test("renders 'Professor ou Profissional Responsável' input", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (
      expect(
        screen.getByPlaceholderText<HTMLInputElement>("Preencha com o Nome do Profissional Responsável alocado"),
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  test("renders 'Notas' textarea", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    (
      expect(
        screen.getByPlaceholderText<HTMLInputElement>("Insira aqui observações adicionais sobre a consulta"),
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  test("renders time input and applies hour validation logic", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    const timeInput = screen.getByTitle<HTMLElement>(
      "Selecione aqui o horário na agenda (só funcionará para horários tabelados)",
    );
    fireEvent.input(timeInput, { target: { value: "18:00" } }) as boolean;
    (expect(timeInput) as jest.JestMatchers<jest.SpyInstance>).toHaveValue("18:00") as void;
    (expect(timeInput.style.color) as jest.JestMatchers<jest.SpyInstance>).toBe<CSSColor>("rgb(33, 37, 41)") as void;
  }) as void;
  test("renders 'Finalizar' button", (): void =>
    (renderComponent() as RenderResult<
      typeof import("@testing-library/dom/types/queries"),
      HTMLElement,
      HTMLElement
    >) &&
    ((
      expect(screen.getByText<HTMLButtonElement>("Finalizar")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void));
  test("calls validateForm and handleSubmit on 'Finalizar' button click", async (): Promise<void> => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    const submitBtn: HTMLButtonElement = screen.getByText<HTMLButtonElement>("Finalizar");
    const fakeEvent: MouseEvent = new MouseEvent("click");
    fireEvent.click(submitBtn, fakeEvent) as boolean;
    (expect(validateForm) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<Parameters<typeof validateForm>>(
      fakeEvent,
      submitBtn,
      false,
    ) as void;
    (await validateForm(fakeEvent, submitBtn, false).then((validation): void => {
      (expect(generateSchedPacData) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
      (expect(handleSubmit) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
        Parameters<typeof handleSubmit>
      >("cons", validation[2], true) as void;
      (expect(defaultProps.onClose) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
    })) as void;
  }) as void;
  test("prevents form submission when validation fails", async (): Promise<void> => {
    (validateForm as jest.Mock).mockResolvedValueOnce([false, null, {}]);
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    const submitBtn: HTMLButtonElement = screen.getByText<HTMLButtonElement>("Finalizar");
    const fakeEvent: MouseEvent = new MouseEvent("click");
    fireEvent.click(submitBtn, fakeEvent) as boolean;
    (await validateForm(fakeEvent, submitBtn, false).then((validation): void => {
      (expect(validation[0]) as jest.JestMatchers<jest.SpyInstance>).toBe<boolean>(false) as void;
      (expect(handleSubmit).not as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
    })) as void;
  }) as void;
  test("renders 'Gerar Planilha' button", (): void =>
    (renderComponent() as RenderResult<
      typeof import("@testing-library/dom/types/queries"),
      HTMLElement,
      HTMLElement
    >) &&
    ((
      expect(screen.getByText<HTMLButtonElement>("Gerar Planilha")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void));
  test("renders FailRegstAlert when shouldDisplayFailRegstDlg is true", (): void => {
    renderComponent({ shouldDisplayFailRegstDlg: true }) as RenderResult;
    (expect(FailRegstAlert) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<[any, object]>(
      expect.objectContaining({
        shouldDisplayFailRegstDlg: true,
        secondOp: "Arraste",
      }),
      {},
    );
  }) as void;
  test("handles export button click", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    const exportBtn: HTMLButtonElement = screen.getByText<HTMLButtonElement>("Gerar Planilha");
    fireEvent.click(exportBtn) as boolean;
    (expect(exportBtn) as jest.JestMatchers<jest.SpyInstance>).toBeInTheDocument() as void;
  }) as void;
}) as void;
