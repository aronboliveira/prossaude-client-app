import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FamDislip from "../../../../../../components/interactive/ag/FamDislip";
import { handleDivAddShow } from "../../../../../lib/locals/aGPage/aGHandlers";
jest.mock(
  "../../../../../pages/ag",
  (): {
    handleDivAddShow: jest.Mock<any, any, any>;
  } => ({
    handleDivAddShow: jest.fn() as jest.Mock,
  }),
) as typeof jest;
describe("FamDislip Component", (): void => {
  it("renders the checkbox for family dyslipidemia history", (): void => {
    render(<FamDislip />);
    expect(
      screen.getByLabelText<HTMLInputElement>("Antecedentes Familiares — Dislipidemia"),
    ).toBeInTheDocument() as void;
  }) as void;
  it("calls handleDivAddShow on checkbox click", async (): Promise<void> => {
    render(<FamDislip />);
    const checkbox = screen.getByLabelText<HTMLInputElement>("Antecedentes Familiares — Dislipidemia");
    fireEvent.click(checkbox) as boolean;
    (await waitFor((): void => {
      (expect(handleDivAddShow) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
        Parameters<typeof handleDivAddShow>
      >(checkbox) as void;
    })) as void;
  }) as void;
}) as void;
