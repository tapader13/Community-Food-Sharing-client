import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from './../firebase/firebase.init';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';

export const authContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const signUpUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logoutUser = () => {
    return signOut(auth);
  };
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  const updateProfileUser = (data) => {
    return updateProfile(auth.currentUser, data);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log('state captured', user?.email);

      if (user?.email) {
        const users = { email: user.email };

        axios
          .post('http://localhost:5001/jwt', users, { withCredentials: true })
          .then((res) => {
            console.log('login token', res.data);
            setLoading(false);
          });
      } else {
        axios
          .post(
            'http://localhost:5001/logout',
            {},
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log('logout', res.data);
            setLoading(false);
          });
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <authContext.Provider
      value={{
        user,
        signUpUser,
        loginUser,
        loading,
        logoutUser,
        googleLogin,
        setUser,
        updateProfileUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
