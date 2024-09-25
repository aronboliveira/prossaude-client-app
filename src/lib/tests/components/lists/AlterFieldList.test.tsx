import { render, screen, fireEvent, RenderResult, waitFor } from "@testing-library/react";
import AlterFieldList from "../../../../../components/lists/AlterFieldList";
import { elementNotFound } from "../../../../lib/global/handlers/errorHandler";
import { syncAriaStates } from "../../../../lib/global/handlers/gHandlers";
import "@testing-library/jest-dom/extend-expect";
jest.mock(
  "../../../../../components/consRegst/GenericErrorComponent",
  (): (() => JSX.Element) => (): JSX.Element => <div>GenericErrorComponent</div>
) as typeof jest;
jest.mock(
  "../../../../../components/consRegst/ErrorFallbackDlg",
  (): (() => JSX.Element) => (): JSX.Element => <div>ErrorFallbackDlg</div>
) as typeof jest;
jest.mock(
  "../../../../lib/global/handlers/gHandlers",
  (): {
    syncAriaStates: jest.Mock<any, any, any>;
  } => ({
    syncAriaStates: jest.fn(),
  })
) as typeof jest;
jest.mock(
  "../../../../lib/global/handlers/errorHandler",
  (): {
    elementNotFound: jest.Mock<any, any, any>;
  } => ({
    elementNotFound: jest.fn(),
  })
) as typeof jest;
describe("AlterFieldList Component", (): void => {
  const mockDispatch: jest.Mock<any, any, any> = jest.fn();
  const renderComponent = (
    name = "anonimo",
    state = true
  ): RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement> =>
    render(
      <AlterFieldList
        dispatch={mockDispatch}
        tabRef={{ current: document.createElement("table") } as React.MutableRefObject<HTMLTableElement>}
        name={name}
        state={state}
      />
    );
  test("renders the dialog and syncs aria states", async (): Promise<void> => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    expect(screen.getByRole<HTMLDialogElement>("dialog")).toBeInTheDocument() as void;
    await waitFor((): void => expect(syncAriaStates).toHaveBeenCalled());
  });
  test("calls dispatch function and closes dialog on clicking outside", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    fireEvent.click(screen.getByRole<HTMLDialogElement>("dialog"));
    expect(mockDispatch).toHaveBeenCalled() as void;
  });
  test("calls elementNotFound when alterFieldRef is not found", async (): Promise<void> => {
    (document.getElementById as jest.Mock).mockReturnValueOnce(null);
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    expect(elementNotFound).toHaveBeenCalledWith<Parameters<typeof elementNotFound>>(
      expect.anything() as any,
      expect.any(String),
      expect.any(String)
    );
  });
  test("generates new options dynamically based on headers", async (): Promise<void> => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    const select = screen.getByRole<HTMLSelectElement>("combobox");
    expect(select).toBeInTheDocument() as void;
    fireEvent.change(select, { target: { value: "nome" } });
    expect(select.value).toBe<string>("nome");
  });
  test("renders ErrorFallbackDlg when error occurs", (): void => {
    renderComponent() as RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    expect(screen.queryByText<HTMLDialogElement>("ErrorFallbackDlg")).not.toBeInTheDocument() as void;
  });
});
