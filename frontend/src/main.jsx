import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React, { createContext, useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import App from './App.jsx'

export const Context = createContext({
  user: {},
  setUser: () => {},
});

const AppWrapper = () => {
  const [user, setUser] = useState({});
  // const isAuthenticated = useAuth();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     fetchUserData();
  //   } else {
  //     setUser({});
  //   }
  // }, [isAuthenticated]);

  // const fetchUserData = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:4000/api/v1/user/me", {
  //       withCredentials: true,
  //     });
  //     setUser(response.data.user);
  //   } catch (error) {
  //     setUser({}); 
  //   }
  // };

  return (
    <Context.Provider
      value={{
        user,
        setUser,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)
