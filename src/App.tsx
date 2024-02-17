import { Toaster } from "react-hot-toast";
import { AppRouter } from "./router";

function App() {
  return <>
    <AppRouter />
    <Toaster position="bottom-right" />
  </>;
}

export default App;
