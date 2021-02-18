import React, { createContext, useEffect, useState } from 'react';
import firebase from './firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  console.log('auth-provider mount');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
