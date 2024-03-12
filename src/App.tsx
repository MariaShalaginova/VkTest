
import { AppRoot,
  //  PanelHeader, SplitCol, SplitLayout,  usePlatform
   } from "@vkontakte/vkui";
import FindGroups from "./components/FindGroups/FindGroups";
// import { SearchProvider } from "./components/SearchResults/SeacrhContext";

export default function App() {
  // const platform = usePlatform();
  return (
    <AppRoot>
       {/* <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}> */}
       {/* <SplitCol autoSpaced> */}
      {/* <SearchProvider> */}
        <FindGroups />
      {/* </SearchProvider> */}
    {/* </SplitCol>
    </SplitLayout> */}
    </AppRoot>
  );
}
