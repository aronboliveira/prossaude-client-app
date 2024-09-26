import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import { callbackTextBodyEl, person } from "@/pages/edfis";
import TextBodyType from "../../../../../../../components/interactive/edfis/client/TextBodyType";
jest.mock(
  "@/pages/edfis",
  (): {
    callbackTextBodyEl: jest.Mock<any, any, any>;
    person: {};
  } => ({
    callbackTextBodyEl: jest.fn() as jest.Mock,
    person: {},
  })
) as typeof jest;
jest.mock(
  "@/lib/global/handlers/errorHandler",
  (): {
    elementNotFound: jest.Mock<any, any, any>;
  } => ({
    elementNotFound: jest.fn() as jest.Mock,
  })
) as typeof jest;
describe("TextBodyType Component", (): void => {
  it("should render the TextBodyType select input", (): void => {
    render(<TextBodyType />) as RenderResult;
    (
      expect(screen.getByTitle<HTMLSelectElement>("Tipo Corporal por Gênero")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  it("should call callbackTextBodyEl when an option is selected", (): void => {
    render(<TextBodyType />) as RenderResult;
    fireEvent.change(screen.getByTitle<HTMLSelectElement>("Tipo Corporal por Gênero"), {
      target: { value: "masculino" },
    }) as boolean;
    (expect(callbackTextBodyEl) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledWith<
      Parameters<typeof callbackTextBodyEl>
    >(person) as void;
  }) as void;
}) as void;
