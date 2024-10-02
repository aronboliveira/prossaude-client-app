import { Suspense, lazy } from "react";
import Spinner from "../../components/icons/Spinner";
const Login = lazy(() => import("./login"));
export default function Home(): JSX.Element {
  return (
    <Suspense fallback={<Spinner fs={true} />}>
      <Login />
    </Suspense>
  );
}
