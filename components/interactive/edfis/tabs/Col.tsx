import { ColProps } from "@/lib/global/declarations/interfaces";

export default function Col({ nCol, ctx }: ColProps) {
  return (
    <col
      className={`tabColProg tabCol${ctx}`}
      id={`tabCol${ctx}${nCol}`}
      itemProp={`col${ctx}`}
    />
  );
}
