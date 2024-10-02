import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FamOnc from "../../../../../../components/interactive/ag/FamOnc";
import { handleDivAddShow } from "../../../../../lib/locals/aGPage/aGHandlers";
jest.mock(
  "../../../../../pages/ag",
  (): {
    handleDivAddShow: jest.Mock<any, any, any>;
  } => ({
    handleDivAddShow: jest.fn() as jest.Mock,
  }),
) as typeof jest;
describe("FamOnc Component", (): void => {
  it("renders the checkbox for family oncology history", (): void => {
    render(<FamOnc />);
    expect(
      screen.getByLabelText<HTMLInputElement>("Antecedentes Familiares — Doença(s) Oncológica(s)"),
    ).toBeInTheDocument() as void;
  }) as void;
  it("calls handleDivAddShow on checkbox click", async (): Promise<void> => {
    render(<FamOnc />);
    const checkbox = screen.getByLabelText<HTMLInputElement>("Antecedentes Familiares — Doença(s) Oncológica(s)");
    fireEvent.click(checkbox) as boolean;
    (await waitFor((): void => {
      (expect(handleDivAddShow) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
        Parameters<typeof handleDivAddShow>
      >(checkbox) as void;
    })) as void;
  }) as void;
}) as void;
