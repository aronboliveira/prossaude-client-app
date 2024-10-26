import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FamPulm from "../../../../../../components/interactive/ag/FamPulm";
import { handleDivAddShow } from "../../../../../lib/locals/aGPage/aGHandlers";
jest.mock(
  "../../../../../pages/ag",
  (): {
    handleDivAddShow: jest.Mock<any, any, any>;
  } => ({
    handleDivAddShow: jest.fn() as jest.Mock,
  }),
) as typeof jest;
describe("FamPulm Component", (): void => {
  it("renders the checkbox for family pulmonary disease history", (): void => {
    render(<FamPulm />);
    expect(
      screen.getByLabelText<HTMLInputElement>("Antecedentes Familiares — Doença(s) Pulmonar(es)"),
    ).toBeInTheDocument() as void;
  }) as void;
  it("calls handleDivAddShow on checkbox click", async (): Promise<void> => {
    render(<FamPulm />);
    const checkbox = screen.getByLabelText<HTMLInputElement>("Antecedentes Familiares — Doença(s) Pulmonar(es)");
    fireEvent.click(checkbox) as boolean;
    (await waitFor((): void => {
      (expect(handleDivAddShow) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
        Parameters<typeof handleDivAddShow>
      >(checkbox) as void;
    })) as void;
  }) as void;
}) as void;
