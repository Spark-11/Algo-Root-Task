import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/login" element={<AuthPage type="login" />} />
            <Route path="/signup" element={<AuthPage type="signup" />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </AuthProvider>
      </Router>
      <Toaster
        position="top-right"
        containerStyle={{
          maxWidth: "90vw",
          "@media (min-width: 425px)": {
            maxWidth: "320px",
          },
        }}
        toastOptions={{
          className: "!max-w-full",
          duration: 3000,
        }}
      />
    </>
  );
}

export default App;
