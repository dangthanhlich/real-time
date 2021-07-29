import React from 'react';
import firebase from "../libs/firebaseConfig";
import AppContext from "../context/AppContext";
import { useAuthState } from "react-firebase-hooks/auth";

const AppProvider = ({children}) => {
    //lấy thông tin người dùng đang đăng nhập
    const [user] = useAuthState(firebase.auth());
    
    return (
        <AppContext.Provider
        value={{
            user: user
            ? {
                name: user.displayName,
                photo: user.photoURL,
                userId: user.uid,
                }
            : null,
            signInWithGoogle,
            signOut,
            // isShowNotificationList: false,
        }}
        >   { children }
        </AppContext.Provider>
    )
}

const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    return firebase.auth().signInWithPopup(provider);
};
 
const signOut = () => {
    return firebase.auth().signOut();
};


export default AppProvider
