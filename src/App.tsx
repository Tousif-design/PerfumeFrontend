// App.tsx
import { Toaster as ShadToaster } from "@/components/ui/toaster"; // custom shadcn toaster
import { Toaster as SonnerToaster } from "@/components/ui/sonner"; // sonner toaster
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Collections from "./components/Collections";
import Login from "./components/Login";

const queryClient = new QueryClient();

const App = () => {
  // Add state to manage admin authentication
  const [adminAuth, setAdminAuth] = useState(null);

  const handleLoginSuccess = (authData) => {
    setAdminAuth(authData);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Both toasters, but renamed clearly */}
        <ShadToaster />
        <SonnerToaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/collections"
              element={<Collections adminAuth={adminAuth} />}
            />
            <Route
              path="/login"
              element={<Login onLoginSuccess={handleLoginSuccess} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
