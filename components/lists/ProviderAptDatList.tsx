import { ProviderAptDataListProps } from "@/lib/global/declarations/interfacesCons";
import { useState } from "react";
import AptDataList from "./AptDataList";
export default function ProviderAptDatList({ data, btnId }: ProviderAptDataListProps): JSX.Element {
  const [shouldDisplayAptList, setDisplayAptList] = useState(true);
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
