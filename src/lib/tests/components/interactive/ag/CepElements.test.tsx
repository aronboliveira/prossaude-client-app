import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CepElements from "../../../../../../components/interactive/ag/CepElements";
import { formatCEP } from "../../../../../lib/global/gModel";
import { handleEventReq } from "../../../../../lib/global/handlers/gHandlers";
import { enableCEPBtn, searchCEP, searchCEPXML } from "../../../../../lib/locals/aGPage/aGHandlers";
import { elementNotFound, inputNotFound } from "../../../../../lib/global/handlers/errorHandler";
jest.mock(
  "../../../../../lib/global/gModel",
  (): {
    formatCEP: jest.Mock<any, any, any>;
  } => ({
    formatCEP: jest.fn() as jest.Mock,
  })
) as typeof jest;
jest.mock(
  "../../../../../lib/global/handlers/gHandlers",
  (): {
    handleEventReq: jest.Mock<any, any, any>;
  } => ({
    handleEventReq: jest.fn() as jest.Mock,
  })
) as typeof jest;
jest.mock(
  "../../../../../lib/locals/aGPage/aGHandlers",
  (): {
    enableCEPBtn: jest.Mock<any, any, any>;
    searchCEP: jest.Mock<Promise<string>, [], any>;
    searchCEPXML: jest.Mock<any, any, any>;
  } => ({
    enableCEPBtn: jest.fn() as jest.Mock,
    searchCEP: jest.fn(() => Promise.resolve<string>("success")),
    searchCEPXML: jest.fn() as jest.Mock,
  })
) as typeof jest;
jest.mock(
  "../../../../../lib/global/handlers/errorHandler",
  (): {
    elementNotFound: jest.Mock<any, any, any>;
    inputNotFound: jest.Mock<any, any, any>;
  } => ({
    elementNotFound: jest.fn() as jest.Mock,
    inputNotFound: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("CepElements", (): void => {
  it("renders the CEP input field", (): void => {
    render(<CepElements />);
    expect(screen.getByLabelText<HTMLInputElement>("CEP:")).toBeInTheDocument() as void;
  }) as void;
  it("calls formatCEP and handleEventReq on input", async (): Promise<void> => {
    render(<CepElements />);
    const input = screen.getByLabelText<HTMLInputElement>("CEP:");
    fireEvent.input(input, { target: { value: "12345678" } }) as boolean;
    (await waitFor((): void => {
      expect(formatCEP).toHaveBeenCalledWith<Parameters<typeof formatCEP>>(input) as void;
      expect(handleEventReq).toHaveBeenCalledWith<Parameters<typeof handleEventReq>>(input) as void;
    })) as void;
  }) as void;
  it("enables the CEP button and calls searchCEP when input length is valid", async (): Promise<void> => {
    (enableCEPBtn as jest.Mock).mockReturnValue(true) as jest.Mock;
    render(<CepElements />);
    const input = screen.getByLabelText<HTMLInputElement>("CEP:");
    fireEvent.input(input, { target: { value: "12345678" } }) as boolean;
    (await waitFor((): void => {
      expect(enableCEPBtn).toHaveBeenCalledWith<Parameters<typeof enableCEPBtn>>(expect.anything() as any, 8) as void;
      expect(searchCEP).toHaveBeenCalledWith<Parameters<typeof searchCEP>>(input) as void;
    })) as void;
  }) as void;
  it("calls searchCEPXML when searchCEP returns 'fail'", async (): Promise<void> => {
    (searchCEP as jest.Mock).mockReturnValueOnce(Promise.resolve<string>("fail")) as jest.Mock;
    render(<CepElements />);
    const input = screen.getByLabelText<HTMLInputElement>("CEP:");
    fireEvent.input(input, { target: { value: "12345678" } }) as boolean;
    (await waitFor((): void => {
      expect(searchCEPXML).toHaveBeenCalledWith<Parameters<typeof searchCEPXML>>(input) as void;
    })) as void;
  }) as void;
  it("calls elementNotFound and inputNotFound when elements are not found", async (): Promise<void> => {
    render(<CepElements />);
    (await waitFor((): void => {
      expect(elementNotFound).toHaveBeenCalled() as void;
      expect(inputNotFound).toHaveBeenCalled() as void;
    })) as void;
  }) as void;
}) as void;
