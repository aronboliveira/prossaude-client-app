"use client";
import { useRef, useEffect, useContext } from "react";
import TabProgSVi from "../tabs/TabProgSVi";
import useMount from "@/lib/hooks/useMount";
import { FspCtx } from "./FsProgCons";
import DynamicTabsBlock from "./tabs/DynamicTabsBlock";
import { checkContext } from "@/lib/global/gModel";
export default function FsTab(): JSX.Element {
  const tabKey = useRef<number>(0),
    [mounted] = useMount();
  //TODO REMOVER APÓS TESTE
  const ctx = useContext(FspCtx);
  checkContext(ctx, "FspCtx", FsTab);
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
