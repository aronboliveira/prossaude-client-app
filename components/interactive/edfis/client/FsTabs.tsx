"use client";
import { useRef, useEffect } from "react";
import TabProgSVi from "../tabs/TabProgSVi";
import useMount from "@/lib/hooks/useMount";
import DynamicTabsBlock from "./tabs/DynamicTabsBlock";
export default function FsTab(): JSX.Element {
  const tabKey = useRef<number>(0),
    [mounted] = useMount();
  useEffect(() => {
    if (!mounted) return;
    setTimeout(() => (tabKey.current = +1), 1200);
  }, [mounted]);
  return (
    <fieldset className='fsSub' name='fsSubProgConsName' id='fsSubProgConsId'>
      <TabProgSVi />
      <hr />
      <DynamicTabsBlock key={tabKey.current} />
      <br role='presentation' />
      <hr
        style={{
          opacity: 0.15,
          marginLeft: "0.5rem",
        }}
      />
    </fieldset>
  );
}
