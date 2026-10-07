import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("movie_explorer_user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("movie_explorer_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("movie_explorer_user");
    }
  }, [user]);

  const login = (username, password) => {
    
    // Authentication verification
    if (username.trim() && password.length >= 4) {
      const userData = { username, loggedInAt: new Date().toISOString() };
      setUser(userData);
      return { success: true };
    }
    return { success: false, error: "Password must be at least 4 characters" };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
