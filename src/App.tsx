import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppBar } from "./shared/AppBar";
import { Home } from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <AppBar />
      <Routes>
        <Route index element={<p>Velkommen!</p>} />
        <Route path="/recipes" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
