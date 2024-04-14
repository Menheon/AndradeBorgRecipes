import { BrowserRouter } from "react-router-dom";
import { AppBar } from "./shared/AppBar";
import { AppRoutes } from "./shared/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <AppBar />
      <div className="pt-[60px]">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
