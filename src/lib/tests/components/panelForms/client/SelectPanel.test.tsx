import { render, fireEvent, RenderResult } from "@testing-library/react";
import { handleLinkChanges } from "@/lib/global/handlers/gRoutingHandlers";
import SelectPanel from "../../../../../../components/panelForms/defs/client/SelectPanel";
jest.mock(
  "@/lib/global/handlers/gRoutingHandlers",
  (): {
    handleLinkChanges: jest.Mock<any, any, any>;
  } => ({
    handleLinkChanges: jest.fn() as jest.Mock,
  })
) as typeof jest;
jest.mock(
  "react-dom/client",
  (): {
    createRoot: jest.Mock<any, [], any>;
  } => ({
    createRoot: jest.fn(
      (): {
        render: jest.Mock<any, any, any>;
      } => ({
        render: jest.fn() as jest.Mock,
      })
    ),
  })
) as typeof jest;
jest.mock(
  "@/lib/global/gModel",
  (): {
    camelToKebab: jest.Mock<any, any, any>;
    kebabToCamel: jest.Mock<any, any, any>;
  } => ({
    camelToKebab: jest.fn() as jest.Mock,
    kebabToCamel: jest.fn() as jest.Mock,
  })
) as typeof jest;
jest.mock(
  "@/lib/global/handlers/gHandlers",
  (): {
    syncAriaStates: jest.Mock<any, any, any>;
  } => ({
    syncAriaStates: jest.fn() as jest.Mock,
  })
) as typeof jest;
jest.mock(
  "@/lib/global/handlers/errorHandler",
  (): {
    elementNotFound: jest.Mock<any, any, any>;
    extLine: jest.Mock<any, any, any>;
    inputNotFound: jest.Mock<any, any, any>;
    stringError: jest.Mock<any, any, any>;
  } => ({
    elementNotFound: jest.fn() as jest.Mock,
    extLine: jest.fn() as jest.Mock,
    inputNotFound: jest.fn() as jest.Mock,
    stringError: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("SelectPanel Component", (): void => {
  test("renders the select panel and handles option change", (): void => {
    const selectElement = (render(<SelectPanel defOp='agenda' />) as RenderResult).getByLabelText(
      /Escolha o Painel de Trabalho/i
    ) as HTMLSelectElement;
    (
      expect(
        fireEvent.change(selectElement, { target: { value: "registStud" } }) as boolean
      ) as jest.JestMatchers<jest.SpyInstance>
    ).toBe<boolean>(true) as void;
    (expect(handleLinkChanges) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalled() as void;
    (expect(selectElement.value) as jest.JestMatchers<string>).toBe("registStud") as void;
  }) as void;
}) as void;
