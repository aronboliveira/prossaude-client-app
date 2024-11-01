import React from "react";
import { RenderResult, render, screen } from "@testing-library/react";
import TabMedAnt from "../../../../../../components/interactive/edfis/TabMedAnt";
import Col from "../../../../../../components/interactive/edfis/tabs/Col";
import Th from "../../../../../../components/error/GenericErrorComponent";
import Td from "../../../../../../components/error/GenericErrorComponent";
import GenericErrorComponent from "../../../../../../components/error/GenericErrorComponent";
jest.mock(
  "../../../../../components/interactive/edfis/tabs/Col",
  (): jest.Mock<JSX.Element, [], any> => jest.fn((): JSX.Element => <col />) as jest.Mock,
) as typeof jest;
jest.mock(
  "../../../../../components/error/GenericErrorComponent",
  (): jest.Mock<JSX.Element, [], any> => jest.fn((): JSX.Element => <th />) as jest.Mock,
) as typeof jest;
jest.mock(
  "../../../../../components/error/GenericErrorComponent",
  (): jest.Mock<JSX.Element, [], any> => jest.fn((): JSX.Element => <td />) as jest.Mock,
) as typeof jest;
jest.mock(
  "../../../../../components/error/GenericErrorComponent",
  (): jest.Mock<JSX.Element, [], any> =>
    jest.fn((): JSX.Element => <div>Error rendering Table for Measures</div>) as jest.Mock,
) as typeof jest;
jest.mock(
  "../../../../../components/interactive/edfis/client/tabs/WatcherTab",
  (): jest.Mock<JSX.Element, [], any> => jest.fn((): JSX.Element => <div>WatcherTab Component</div>) as jest.Mock,
) as typeof jest;
describe("TabMedAnt component", (): void => {
  test("renders table caption", (): void => {
    render(<TabMedAnt />) as RenderResult;
    const caption = screen.getByText<HTMLElement>("Medidas Antropométricas (exceto Dobras Cutâneas)");
    (expect(caption) as jest.JestMatchers<jest.SpyInstance>).toBeInTheDocument() as void;
  }) as void;
  test("renders Col, Th, and Td components correctly", (): void => {
    render(<TabMedAnt />) as RenderResult;
    (expect(Col) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledTimes(4) as void;
    (expect(Th) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledTimes(4) as void;
    (expect(Td) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledTimes(36) as void;
  }) as void;
  test("renders error boundary on failure", (): void => {
    render(<GenericErrorComponent message='Error' />) as RenderResult;
    (
      expect(screen.getByText<HTMLElement>("Error rendering Table for Measures")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  test("renders WatcherTab component", (): void => {
    render(<TabMedAnt />) as RenderResult;
    (
      expect(screen.getByText<HTMLElement>("WatcherTab Component")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
}) as void;
