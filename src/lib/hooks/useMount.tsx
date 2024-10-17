import { Dispatch, SetStateAction, useEffect, useState } from "react";
export default function useMount(): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [mounted, setMount] = useState<boolean>(false);
  useEffect(() => setMount(true), [setMount]);
  return [mounted, setMount];
}
