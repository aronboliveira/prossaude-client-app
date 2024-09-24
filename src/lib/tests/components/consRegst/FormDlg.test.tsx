import { render, fireEvent, screen, RenderResult } from "@testing-library/react";
import FormDlg from "../../../../../components/consRegst/FormDlg";
import { ConsDlgProps } from "../../../../lib/locals/panelPage/declarations/interfacesCons";
import { addListenerAvMembers } from "../../../../lib/locals/panelPage/handlers/consHandlerList";
import { addListenerExportBtn } from "../../../../lib/global/gController";
import { syncAriaStates } from "../../../../lib/global/handlers/gHandlers";
import { isClickOutside } from "../../../../lib/global/gStyleScript";
import { checkRegstBtn, generateSchedPacData } from "../../../../lib/locals/panelPage/handlers/consHandlerCmn";
import { formatCPF, formatTel, addEmailExtension } from "../../../../lib/global/gModel";
import { handleCondtReq, enableCPFBtn } from "../../../../lib/global/handlers/gHandlers";
import { validateForm } from "../../../../lib/global/handlers/gHandlers";
import { handleSubmit } from "../../../../pages/api/ts/handlers";
import FailRegstAlert from "../../../../../components/alerts/FailRegsAlert";
import "@testing-library/jest-dom/extend-expect";
import { CSSColor } from "../../testVars";
jest.mock(
  "../../../../lib/locals/panelPage/handlers/consHandlerList",
  (): {
    addListenerAvMembers: jest.Mock<any, any, any>;
  } => ({
    addListenerAvMembers: jest.fn(),
  })
);
jest.mock(
  "../../../../lib/global/gController",
  (): {
    addListenerExportBtn: jest.Mock<any, any, any>;
  } => ({
    addListenerExportBtn: jest.fn(),
  })
);
jest.mock(
  "../../../../lib/global/handlers/gHandlers",
  (): {
    syncAriaStates: jest.Mock<any, any, any>;
    checkRegstBtn: jest.Mock<any, any, any>;
  } => ({
    syncAriaStates: jest.fn(),
    checkRegstBtn: jest.fn().mockReturnValue(false),
  })
);
jest.mock(
  "../../../../lib/global/gStyleScript",
  (): {
    isClickOutside: jest.Mock<any, any, any>;
  } => ({
    isClickOutside: jest.fn().mockReturnValue([true]),
  })
);
jest.mock(
  "react-dom/client",
  (): {
    createRoot: jest.Mock<any, any, any>;
  } => ({
    createRoot: jest.fn(),
  })
);
jest.mock(
  "../../../../lib/locals/panelPage/consController",
  (): {
    formData: {};
  } => ({
    formData: {},
  })
);
jest.mock(
  "../../../../lib/locals/panelPage/declarations/interfacesCons",
  (): {
    toggleACCons: jest.Mock<any, any, any>;
    toggleAFCons: jest.Mock<any, any, any>;
  } => ({
    toggleACCons: jest.fn(),
    toggleAFCons: jest.fn(),
  })
);
jest.mock(
  "../../../../lib/global/gModel",
  (): {
    formatCPF: jest.Mock<any, any, any>;
    formatTel: jest.Mock<any, any, any>;
    addEmailExtension: jest.Mock<any, any, any>;
  } => ({
    formatCPF: jest.fn(),
    formatTel: jest.fn(),
    addEmailExtension: jest.fn(),
  })
);
jest.mock(
  "../../../../lib/global/handlers/gHandlers",
  (): {
    handleCondtReq: jest.Mock<any, any, any>;
    enableCPFBtn: jest.Mock<any, any, any>;
  } => ({
    handleCondtReq: jest.fn(),
    enableCPFBtn: jest.fn(),
  })
);
jest.mock(
  "../../../../lib/global/handlers/gHandlers",
  (): {
    validateForm: jest.Mock<any, any, any>;
    generateSchedPacData: jest.Mock<any, any, any>;
    generateSchedBtn: jest.Mock<any, any, any>;
  } => ({
    validateForm: jest.fn().mockResolvedValue([true, null, {}]),
    generateSchedPacData: jest.fn(),
    generateSchedBtn: jest.fn(),
  })
);
jest.mock(
  "../../../../pages/api/ts/handlers",
  (): {
    handleSubmit: jest.Mock<any, any, any>;
  } => ({
    handleSubmit: jest.fn(),
  })
);
jest.mock("../../../../../components/alerts/FailRegsAlert", (): jest.Mock<any, any, any> => jest.fn());
describe("FormDlg Component", (): void => {
  const defaultProps: ConsDlgProps = {
    onClose: jest.fn(),
    userClass: "estudante",
  };
  const renderComponent = (
    props = {}
  ): RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement> =>
    render(<FormDlg {...defaultProps} {...props} />);
  test("calls addListenerAvMembers on mount", (): void => {
    renderComponent();
    expect(addListenerAvMembers).toHaveBeenCalled();
  });
  test("calls addListenerExportBtn when exportRef and dlgRef are valid", (): void => {
    renderComponent();
    expect(addListenerExportBtn).toHaveBeenCalledWith<Parameters<typeof addListenerExportBtn>>(
      "Paciente",
      expect.anything(),
      "#firstNamePac"
    );
  });
  test("calls isClickOutside and onClose when clicking outside dialog", (): void => {
    renderComponent();
    fireEvent.click(document);
    expect(isClickOutside).toHaveBeenCalled();
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
  test("syncs aria states on dialog initialization", (): void => {
    renderComponent();
    expect(syncAriaStates).toHaveBeenCalled();
  });
  test("pushes correct state to history on mount and unmount", (): void => {
    renderComponent();
    expect(jest.spyOn<History, "pushState">(window.history, "pushState")).toHaveBeenCalledWith<[{}, string, any]>(
      {},
      "",
      expect.any(String)
    );
  });
  test("handles CPF button click and populates form", (): void => {
    const { container }: { container: HTMLElement } = renderComponent();
    fireEvent.click(container.querySelector("button[id*='cpf']")!);
    expect(jest.fn()).toHaveBeenCalled();
  });
  test("activates and toggles CPFFiller", (): void => {
    const { container }: { container: HTMLElement } = renderComponent();
    fireEvent.click(container.querySelector("button[id*='CPFProf']")!);
    expect(container).toHaveClass("active");
  });
  test("handles registration button click and validation", (): void => {
    renderComponent();
    fireEvent.click(screen.getByText<HTMLButtonElement>("Submit"));
    expect(checkRegstBtn).toHaveBeenCalled();
  });
  test("calls syncAriaStates on dialog initialization", (): void => {
    renderComponent();
    expect(syncAriaStates).toHaveBeenCalled();
  });
  test("pushes history correctly on mount/unmount", (): void => {
    renderComponent();
    expect(jest.spyOn<History, "pushState">(window.history, "pushState")).toHaveBeenCalled();
  });
  test("scrolls dialog into view", (): void => {
    const { container }: { container: HTMLElement } = renderComponent();
    container.querySelector("dialog")?.scrollIntoView({ behavior: "smooth", block: "center" });
    expect(jest.fn()).toHaveBeenCalled();
  });
  test("renders the dialog modal correctly", (): void =>
    renderComponent() && expect(screen.getByRole<HTMLDialogElement>("dialog")).toBeInTheDocument());
  test("renders 'Registro de Consulta' title", (): void =>
    renderComponent() && expect(screen.getByText<HTMLElement>("Registro de Consulta")).toBeInTheDocument());
  test("renders ErrorBoundary with fallback component", (): void => {
    renderComponent();
    expect(screen.getByText<HTMLDialogElement>("Erro carregando a janela modal!")).toBeInTheDocument();
  });
  test("renders 'Autocorreção' checkbox", (): void =>
    renderComponent() && expect(screen.getByTitle<HTMLElement>("Correção automática de Nomes")).toBeInTheDocument());
  test("renders 'Autopreenchimento' checkbox", (): void =>
    renderComponent() &&
    expect(screen.getByTitle<HTMLElement>("Correção automática de CPF, Telefone e E-mail")).toBeInTheDocument());
  test("clicking the 'Autocorreção' checkbox triggers toggleACCons", (): void => {
    renderComponent();
    fireEvent.click(screen.getByTitle("Correção automática de Nomes"));
    expect(jest.fn()).toHaveBeenCalled();
  });
  test("clicking the 'Autopreenchimento' checkbox triggers toggleAFCons", (): void => {
    renderComponent();
    fireEvent.click(screen.getByTitle("Correção automática de CPF, Telefone e E-mail"));
    expect(jest.fn()).toHaveBeenCalled();
  });
  test("calls onClose when close button is clicked", (): void => {
    renderComponent();
    fireEvent.click(screen.getByRole<HTMLButtonElement>("button", { name: /close/i }));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
  test("renders CPF input and triggers appropriate handlers", (): void => {
    renderComponent();
    fireEvent.input(screen.getByPlaceholderText<HTMLInputElement>("Preencha com o CPF"), {
      target: { value: "123.456.789-12" },
    });
    expect(formatCPF).toHaveBeenCalled();
    expect(handleCondtReq).toHaveBeenCalled();
    expect(enableCPFBtn).toHaveBeenCalled();
  });
  test("renders 'Preencher Dados com CPF' button and calls handleCPFBtnClick", (): void => {
    renderComponent();
    fireEvent.click(screen.getByText<HTMLInputElement>("Preencher Dados com CPF"));
    expect(jest.fn()).toHaveBeenCalled();
  });
  test("renders first name input and handles input with auto-capitalization", (): void => {
    renderComponent();
    fireEvent.input(screen.getByPlaceholderText<HTMLInputElement>("Preencha com o Primeiro Nome do Paciente"), {
      target: { value: "jose" },
    });
    expect(handleCondtReq).toHaveBeenCalled();
  });
  test("renders family name input and applies autocorrect", (): void => {
    renderComponent();
    fireEvent.input(screen.getByPlaceholderText<HTMLInputElement>("Preencha com Sobrenome(s) do Paciente"), {
      target: { value: "silva" },
    });
    expect(handleCondtReq).toHaveBeenCalled();
  });
  test("renders telephone input and triggers appropriate handlers", (): void => {
    renderComponent();
    fireEvent.input(
      screen.getByPlaceholderText<HTMLInputElement>("Preencha com o Telefone (sem código nacional e DDD) de Contato"),
      {
        target: { value: "98765-4321" },
      }
    );
    expect(formatTel).toHaveBeenCalled();
    expect(handleCondtReq).toHaveBeenCalled();
  });
  test("renders email input and triggers email extension handler", (): void => {
    renderComponent();
    fireEvent.input(screen.getByPlaceholderText<HTMLInputElement>("Preencha com o E-mail do Paciente"), {
      target: { value: "email@example.com" },
    });
    expect(addEmailExtension).toHaveBeenCalled();
    expect(handleCondtReq).toHaveBeenCalled();
  });
  test("renders 'Paciente Confirmado' checkbox", (): void => {
    renderComponent();
    const confirmCheckbox: HTMLElement = screen.getByLabelText<HTMLInputElement>("Paciente Confirmado:");
    expect(confirmCheckbox).toBeInTheDocument();
    fireEvent.click(confirmCheckbox);
    expect(confirmCheckbox).toBeChecked();
  });
  test("renders 'Status do Paciente' select and its options", (): void => {
    renderComponent();
    expect(screen.getByLabelText<HTMLSelectElement>("Status do Paciente:")).toBeInTheDocument();
    expect(screen.getByText<HTMLOptionElement>("Em Avaliação Inicial")).toBeInTheDocument();
    expect(screen.getByText<HTMLOptionElement>("Em Tratamento Geral")).toBeInTheDocument();
  });
  test("renders 'Tipo da Consulta' select and its options", (): void => {
    renderComponent();
    expect(screen.getByLabelText<HTMLSelectElement>("Tipo da Consulta:")).toBeInTheDocument();
    expect(screen.getByText<HTMLOptionElement>("Anamnese e Exame Clínico")).toBeInTheDocument();
    expect(screen.getByText<HTMLOptionElement>("Acompanhamento Geral")).toBeInTheDocument();
  });
  test("renders 'Estudante alocado' input and button", (): void => {
    renderComponent();
    expect(
      screen.getByPlaceholderText<HTMLInputElement>("Preencha com o Nome do Estudante alocado")
    ).toBeInTheDocument();
    expect(screen.getByText<HTMLButtonElement>("Capturar por Identificadores")).toBeInTheDocument();
  });
  test("renders 'Professor ou Profissional Responsável' input", (): void => {
    renderComponent();
    expect(
      screen.getByPlaceholderText<HTMLInputElement>("Preencha com o Nome do Profissional Responsável alocado")
    ).toBeInTheDocument();
  });
  test("renders 'Notas' textarea", (): void => {
    renderComponent();
    expect(
      screen.getByPlaceholderText<HTMLInputElement>("Insira aqui observações adicionais sobre a consulta")
    ).toBeInTheDocument();
  });
  test("renders time input and applies hour validation logic", (): void => {
    renderComponent();
    const timeInput = screen.getByTitle("Selecione aqui o horário na agenda (só funcionará para horários tabelados)");
    fireEvent.input(timeInput, { target: { value: "18:00" } });
    expect(timeInput).toHaveValue("18:00");
    expect(timeInput.style.color).toBe<CSSColor>("rgb(33, 37, 41)");
  });
  test("renders 'Finalizar' button", (): void =>
    renderComponent() && expect(screen.getByText<HTMLButtonElement>("Finalizar")).toBeInTheDocument());
  test("calls validateForm and handleSubmit on 'Finalizar' button click", async (): Promise<void> => {
    renderComponent();
    const submitBtn: HTMLButtonElement = screen.getByText<HTMLButtonElement>("Finalizar");
    const fakeEvent: MouseEvent = new MouseEvent("click");
    fireEvent.click(submitBtn, fakeEvent);
    expect(validateForm).toHaveBeenCalledWith<Parameters<typeof validateForm>>(fakeEvent, submitBtn, false);
    await validateForm(fakeEvent, submitBtn, false).then(validation => {
      expect(generateSchedPacData).toHaveBeenCalled();
      expect(handleSubmit).toHaveBeenCalledWith<Parameters<typeof handleSubmit>>("cons", validation[2], true);
      expect(defaultProps.onClose).toHaveBeenCalled();
    });
  });
  test("prevents form submission when validation fails", async (): Promise<void> => {
    (validateForm as jest.Mock).mockResolvedValueOnce([false, null, {}]);
    renderComponent();
    const submitBtn: HTMLButtonElement = screen.getByText<HTMLButtonElement>("Finalizar");
    const fakeEvent: MouseEvent = new MouseEvent("click");
    fireEvent.click(submitBtn, fakeEvent);
    await validateForm(fakeEvent, submitBtn, false).then((validation): void => {
      expect(validation[0]).toBe<boolean>(false);
      expect(handleSubmit).not.toHaveBeenCalled();
    });
  });
  test("renders 'Gerar Planilha' button", (): void =>
    renderComponent() && expect(screen.getByText<HTMLButtonElement>("Gerar Planilha")).toBeInTheDocument());
  test("renders FailRegstAlert when shouldDisplayFailRegstDlg is true", (): void => {
    renderComponent({ shouldDisplayFailRegstDlg: true });
    expect(FailRegstAlert).toHaveBeenCalledWith<[any, {}]>(
      expect.objectContaining({
        shouldDisplayFailRegstDlg: true,
        secondOp: "Arraste",
      }),
      {}
    );
  });
  test("handles export button click", (): void => {
    renderComponent();
    const exportBtn: HTMLButtonElement = screen.getByText<HTMLButtonElement>("Gerar Planilha");
    fireEvent.click(exportBtn);
    expect(exportBtn).toBeInTheDocument();
  });
});
