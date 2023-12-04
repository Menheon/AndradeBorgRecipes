import { BrowserRouter } from "react-router-dom";
import { AppBar } from "./shared/AppBar";
import { AppRoutes } from "./shared/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <AppBar />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
