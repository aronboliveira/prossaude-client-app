import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FamCard from "../../../../../../components/interactive/ag/FamCard";
import { handleDivAddShow } from "../../../../../lib/locals/aGPage/aGHandlers";
jest.mock(
  "../../../../../pages/ag",
  (): {
    handleDivAddShow: jest.Mock<any, any, any>;
  } => ({
    handleDivAddShow: jest.fn() as jest.Mock,
  }),
) as typeof jest;
describe("FamCard Component", (): void => {
  it("renders the checkbox for family heart disease history", (): void => {
    render(<FamCard />);
    expect(
      screen.getByLabelText<HTMLInputElement>("Antecedentes Familiares — Doença(s) Cardíaca(s)"),
    ).toBeInTheDocument() as void;
  }) as void;
  it("calls handleDivAddShow on checkbox click", async (): Promise<void> => {
    render(<FamCard />);
    const checkbox = screen.getByLabelText<HTMLInputElement>("Antecedentes Familiares — Doença(s) Cardíaca(s)");
    fireEvent.click(checkbox) as boolean;
    (await waitFor((): void => {
      (expect(handleDivAddShow) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
        Parameters<typeof handleDivAddShow>
      >(checkbox) as void;
    })) as void;
  }) as void;
}) as void;
