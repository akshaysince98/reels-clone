import React, { useState, useEffect } from 'react'
import { auth } from '../Firebase';
import { onAuthStateChanged } from 'firebase/auth'
import { createContext } from 'react';

export const AuthContext = createContext();

// children is an inbuilt prop => it refers to all the component specified inside
export function AuthContextProvider({ children }) {

  let [mainLoader, setMainLoader] = useState(true);
  let [cUser, setUser] = useState(null);
  useEffect(() => {

    // need to learn more about this unsubscribe function
    let unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
      } else {
        // User is signed out
        // ...
        setUser(null);
      }
      setMainLoader(false);
    });
    return unsubscribe;
  }, [])
  let value = cUser;
  return (
    <AuthContext.Provider value={value}>
      {mainLoader == false && children}
    </AuthContext.Provider>
  )
}

