import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const googleProvider = new GoogleAuthProvider();

// authProvide

export const AuthProvide = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // register a user
  const registerUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  // login the user
  const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  // signUp with google
  const signInWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider);
  };

  //   logout user
  const logOut = async () => {
    return signOut(auth);
  };

//   manage user
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user)
        setLoading(false)
        if(user){
            const {email,displayName, photoUrl} = user;
            const userData = {
                email,userName: displayName,photo:photoUrl
            }
        }
    })

     return ()=> unsubscribe();
  },[])

  const value = {
    currentUser,
    loading,
    registerUser,
    loginUser,
    signInWithGoogle,
    logOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
