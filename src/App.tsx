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
          <main className="pt-[60px]">
            <AppRoutes />
          </main>
          <footer className="mt-4 h-4 w-full" />
        </BrowserRouter>
      </QueryClientProvider>
    </AuthContextProvider>
  );
};

export default App;
