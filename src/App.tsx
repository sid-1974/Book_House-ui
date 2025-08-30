import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import "./styles/variables.scss";
import ProtectedRoute from "./router/RouterProtection";
import LoadingContainer from "./utils/loader/LoadingContainer";
import NotFoundPage from "./components/common/NotfoundPage";

const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Books = lazy(() => import("./pages/Books"));
const Authors = lazy(() => import("./pages/Authors"));
const Community = lazy(() => import("./pages/Community"));
const About = lazy(() => import("./pages/About"));

const queryClient = new QueryClient();

const AppContent: React.FC = () => {
  const location = useLocation();
  const isNotFoundPage =
    location.pathname === "*" ||
    ![
      "/",
      "/login",
      "/books",
      "/authors",
      "/community",
      "/about",
      "/admin",
    ].includes(location.pathname);

  return (
    <div className="min-h-screen bg-white">
      {!isNotFoundPage && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/books" element={<Books />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/community" element={<Community />} />
          <Route path="/about" element={<About />} />
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {!isNotFoundPage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <AuthProvider> */}
      <Router>
        <Suspense
          fallback={<LoadingContainer open={true} message="Loading..." />}
        >
          <AppContent />
        </Suspense>
      </Router>
      {/* </AuthProvider> */}
    </QueryClientProvider>
  );
}

export default App;
