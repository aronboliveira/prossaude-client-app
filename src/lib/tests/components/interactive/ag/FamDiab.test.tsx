import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FamDiab from "../../../../../../components/interactive/ag/FamDiab";
import { handleDivAddShow } from "../../../../../lib/locals/aGPage/aGHandlers";
jest.mock(
  "../../../../../pages/ag",
  (): {
    handleDivAddShow: jest.Mock<any, any, any>;
  } => ({
    handleDivAddShow: jest.fn() as jest.Mock,
  }),
) as typeof jest;
describe("FamDiab Component", (): void => {
  it("renders the checkbox for family diabetes history", (): void => {
    render(<FamDiab />);
    (
      expect(
        screen.getByLabelText<HTMLInputElement>("Antecedentes Familiares — Diabetes"),
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("calls handleDivAddShow on checkbox click", async (): Promise<void> => {
    render(<FamDiab />);
    const checkbox = screen.getByLabelText<HTMLInputElement>("Antecedentes Familiares — Diabetes");
    fireEvent.click(checkbox) as boolean;
    (await waitFor((): void => {
      (expect(handleDivAddShow) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
        Parameters<typeof handleDivAddShow>
      >(checkbox) as void;
    })) as void;
  }) as void;
}) as void;
