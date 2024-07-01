export const mainPanelVariables = {
  tryAcc: 0,
};
export const resetErrorBoundary = (
  ResetComponent: (props: { [k: string]: any }) => JSX.Element,
  props: {}
): JSX.Element | void => {
  console.log(mainPanelVariables.tryAcc);
  return mainPanelVariables.tryAcc < 2
    ? (() => {
        mainPanelVariables.tryAcc++;
        (props as any).mainRoot.render(<ResetComponent props={props} />);
      })()
    : (() => {
        window.location.reload();
        mainPanelVariables.tryAcc = 0;
      })();
};
