import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TabStudForm from "./TabStudForm";
const queryClient = new QueryClient();
export default function TabStudWrapper(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <TabStudForm />
    </QueryClientProvider>
  );
}
