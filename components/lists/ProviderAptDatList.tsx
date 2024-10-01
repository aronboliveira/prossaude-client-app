import { ProviderAptDataListProps } from "@/lib/locals/panelPage/declarations/interfacesCons";
import { useContext, useState } from "react";
import AptDataList from "./AptDataList";
import { PanelCtx } from "../panelForms/defs/client/SelectLoader";
export default function ProviderAptDatList({ data, btnId }: ProviderAptDataListProps): JSX.Element {
  const [shouldDisplayAptList, setDisplayAptList] = useState(true),
    userClass = useContext(PanelCtx).userClass;
  return !shouldDisplayAptList ? (
    <></>
  ) : (
    <div role='group' className='providerAptDiv'>
      {shouldDisplayAptList && (
        <AptDataList
          setDisplayAptList={setDisplayAptList}
          data={data}
          btnId={btnId}
          shouldDisplayAptList={shouldDisplayAptList}
        />
      )}
    </div>
  );
}
