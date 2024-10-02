export const mainPanelVariables = {
  tryAcc: 0,
};
export const resetErrorBoundary = (
  ResetComponent: (props: { [k: string]: any }) => JSX.Element,
  props: object,
): JSX.Element | void => {
  return mainPanelVariables.tryAcc < 2
    ? ((): void => {
        mainPanelVariables.tryAcc++;
        (props as any).mainRoot.render(<ResetComponent props={props} />);
      })()
    : ((): void => {
        location.reload();
        mainPanelVariables.tryAcc = 0;
      })();
};
