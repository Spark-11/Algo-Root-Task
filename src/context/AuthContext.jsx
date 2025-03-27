import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && !user) {
      setUser(JSON.parse(storedUser));
    }
  }, [user]);

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      return "Password must contain both letters and numbers";
    }
    return null;
  };

  const login = (email, password) => {
    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const userSession = {
        email: foundUser.email,
        name: foundUser.name,
        isAuthenticated: true,
      };
      localStorage.setItem("user", JSON.stringify(userSession));
      setUser(userSession);
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } else {
      toast.error("Invalid credentials!");
    }
  };

  const signup = (name, email, password) => {
    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((u) => u.email === email)) {
      toast.error("User already exists! Please login.");
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    // localStorage.setItem('user', JSON.stringify(newUser))
    const userSession = {
      email,
      name,
      isAuthenticated: true,
    };
    localStorage.setItem("user", JSON.stringify(userSession));
    setUser(userSession);
    toast.success("Registered successfully!");
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const deleteAccount = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.filter((u) => u.email !== user?.email);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Account deleted successfully!");
    navigate("/signup");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, deleteAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
