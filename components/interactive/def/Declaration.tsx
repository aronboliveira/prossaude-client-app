export default function Declaration({ text }: { text: string }): JSX.Element {
  return (
    <blockquote className="declr" id="declrEnd">
      <span>{text}</span>
      <label htmlFor="confirmId" className="labConfirm noInvert"></label>
      <input
        type="checkbox"
        name="confirm"
        id="confirmId"
        data-title="Concordância"
        required
      />
    </blockquote>
  );
}
