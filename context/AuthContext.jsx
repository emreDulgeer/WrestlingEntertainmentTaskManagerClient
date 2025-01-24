import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    token: null,
    user: null,
  });
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  // Sayfa yüklendiğinde localStorage'dan auth durumunu yükle
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    console.log('AuthProvider: localStorage token:', token);
    console.log('AuthProvider: localStorage user:', user);

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        console.log('AuthProvider: Parsed user:', parsedUser);

        setAuth({
          isAuthenticated: true,
          token,
          user: parsedUser,
        });
      } catch (error) {
        console.error('AuthProvider: Error parsing user:', error);
        localStorage.clear(); // Hatalıysa tüm verileri temizle
      }
    } else {
      console.log('AuthProvider: No token or user found in localStorage.');
    }

    setIsAuthLoaded(true);
  }, []);

  const loginUser = (token, user) => {
    console.log('AuthProvider: Logging in user:', { token, user });

    setAuth({
      isAuthenticated: true,
      token,
      user,
    });

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logoutUser = () => {
    console.log('AuthProvider: Logging out user.');

    setAuth({
      isAuthenticated: false,
      token: null,
      user: null,
    });

    localStorage.clear();
  };

  console.log('AuthProvider: Current auth state:', auth);

  return (
    <AuthContext.Provider value={{ auth, loginUser, logoutUser, isAuthLoaded }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
