import { BrowserRouter } from "react-router-dom";
import { AppBar } from "./shared/AppBar";
import { AppRoutes } from "./shared/AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./store/AuthProvider";

const queryClient = new QueryClient();

const App = () => {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppBar />
          <div className="pt-[60px]">
            <AppRoutes />
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthContextProvider>
  );
};

export default App;
