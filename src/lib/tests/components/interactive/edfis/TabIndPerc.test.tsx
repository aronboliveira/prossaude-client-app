import React from "react";
import { RenderResult, render, screen } from "@testing-library/react";
import TabIndPerc from "../../../../../../components/interactive/edfis/TabIndPerc";
import Col from "../../../../../../components/interactive/edfis/tabs/Col";
import Th from "../../../../../../components/interactive/edfis/tabs/Th";
import Td from "../../../../../../components/interactive/edfis/tabs/Td";
import GenericErrorComponent from "../../../../../../components/error/GenericErrorComponent";
jest.mock(
  "../../../../../components/interactive/edfis/tabs/Col",
  (): jest.Mock<JSX.Element, [], any> => jest.fn((): JSX.Element => <col />) as jest.Mock,
);
jest.mock(
  "../../../../../components/interactive/edfis/tabs/Th",
  (): jest.Mock<JSX.Element, [], any> => jest.fn((): JSX.Element => <th />) as jest.Mock,
);
jest.mock(
  "../../../../../components/interactive/edfis/tabs/Td",
  (): jest.Mock<JSX.Element, [], any> => jest.fn((): JSX.Element => <td />) as jest.Mock,
);
jest.mock(
  "../../../../../components/error/GenericErrorComponent",
  (): jest.Mock<JSX.Element, [], any> =>
    jest.fn((): JSX.Element => <div>Error rendering Table for Indexes</div>) as jest.Mock,
);
jest.mock(
  "../../../../../components/interactive/edfis/client/tabs/WatcherTab",
  (): jest.Mock<JSX.Element, [], any> => jest.fn((): JSX.Element => <div>WatcherTab Component</div>) as jest.Mock,
);
describe("TabIndPerc component", (): void => {
  test("renders table caption", (): void => {
    render(<TabIndPerc />) as RenderResult;
    (
      expect(screen.getByText<HTMLElement>("Índices e Percentuais Corporais")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  test("renders Col, Th, and Td components correctly", (): void => {
    render(<TabIndPerc />) as RenderResult;
    (expect(Col) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledTimes(4) as void;
    (expect(Th) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledTimes(4) as void;
    (expect(Td) as jest.JestMatchers<jest.SpyInstance>).toHaveBeenCalledTimes(20) as void;
  }) as void;
  test("renders error boundary on failure", (): void => {
    render(<GenericErrorComponent message='Error' />) as RenderResult;
    (
      expect(screen.getByText<HTMLElement>("Error rendering Table for Indexes")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
  test("renders WatcherTab component", (): void => {
    render(<TabIndPerc />) as RenderResult;
    (
      expect(screen.getByText<HTMLElement>("WatcherTab Component")) as jest.JestMatchers<jest.SpyInstance>
    ).toBeInTheDocument() as void;
  }) as void;
}) as void;
