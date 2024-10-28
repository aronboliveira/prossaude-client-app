import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { toast } from "react-hot-toast";
import ENForm, { ENCtx } from "../../../../../../components/interactive/edfis/client/ENForm";
jest.mock("@/lib/global/handlers/gHandlers", () => ({
  registerPersistInputs: jest.fn(),
  syncAriaStates: jest.fn(),
  validateForm: jest.fn(),
}));
jest.mock("@/lib/global/data-service", () => ({
  handleSubmit: jest.fn(),
}));
jest.mock("react-hot-toast", () => ({
  toast: jest.fn(),
}));
describe("ENForm Component", () => {
  const mockBodyType: BodyType = "masculino",
    setBodyType = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("renders ENForm component with initial form elements", async () => {
    render(<ENForm />);
    await waitFor(() => {
      expect(screen.getByRole("form")).toBeInTheDocument();
    });
    expect(screen.getByRole("form")).toHaveAttribute("name", "ed_form");
    expect(screen.getByText("Identificação")).toBeInTheDocument();
    expect(screen.getByText("Idade:")).toBeInTheDocument();
    expect(screen.getByText("Hábitos Rotineiros — Alimentação")).toBeInTheDocument();
    expect(screen.getByText("Hábitos Rotineiros — Hidratação")).toBeInTheDocument();
    expect(screen.getByText("DECLARO QUE CONCORDO COM AS AVALIAÇÕES DESCRITAS ACIMA")).toBeInTheDocument();
  });
  test("provides context values and renders components within the provider", async () => {
    const contextValue = {
      refs: {
        af: null,
        f: null,
        fspr: null,
        fct: null,
        gl: null,
        gar: null,
        gbr: null,
        gr: null,
        nafr: null,
        sar: null,
        txbr: null,
      },
      bt: {
        s: mockBodyType,
        d: setBodyType,
      },
    };
    render(
      <ENCtx.Provider value={contextValue}>
        <ENForm />
      </ENCtx.Provider>,
    );
    await waitFor(() => expect(screen.getByRole("form")).toBeInTheDocument());
    expect(screen.getByRole("form")).toHaveAttribute("name", "ed_form");
  });
  test("calls validateForm and handleSubmit on form submission", async () => {
    (validateForm as jest.Mock).mockResolvedValue([true, undefined, {}]);
    render(<ENForm />);
    const form = screen.getByRole("form");
    fireEvent.submit(form);
    await waitFor(() => expect(validateForm).toHaveBeenCalled());
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledWith("ed", {}, true));
  });
  test("displays toast notification on load", async () => {
    render(<ENForm />);
    await waitFor(() => expect(toast).toHaveBeenCalled());
    expect(toast).toHaveBeenCalledWith(expect.any(Function));
  });
  test("sets initial values in inputs when component is mounted", async () => {
    render(<ENForm />);
    await waitFor(() => {
      expect(screen.getByRole("form")).toBeInTheDocument();
    });
    expect((document.getElementById("tabInpRowMedAnt2_2") as HTMLInputElement).value).toBe("70");
    expect((document.getElementById("tabInpRowMedAnt2_3") as HTMLInputElement).value).toBe("30");
    expect((document.getElementById("tabInpRowMedAnt2_4") as HTMLInputElement).value).toBe("200");
  });
  test("renders lazy-loaded components with ReactSpinner as fallback", async () => {
    render(<ENForm />);
    expect(screen.getAllByTestId("react-spinner")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Hábitos Rotineiros — Alimentação")).toBeInTheDocument();
    });
  });
  test("renders labels and elements correctly", async () => {
    render(<ENForm />);
    await waitFor(() => {
      expect(screen.getByText("Qual é a coloração da urina?")).toBeInTheDocument();
    });
    expect(screen.getByText("Proteinúria")).toBeInTheDocument();
    expect(screen.getByLabelText("Sim")).toBeInTheDocument();
    expect(screen.getByLabelText("Não")).toBeInTheDocument();
  });
  test("renders and handles context change in SelectLvlAtFis component", async () => {
    render(<ENForm />);
    const select = screen.getByText("Nível de Atividade Física:");
    fireEvent.click(select);
    await waitFor(() => {
      expect(select).toBeInTheDocument();
    });
  });
});
