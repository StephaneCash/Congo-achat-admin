import { createContext, useEffect, useState } from "react";
import {
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth";
import {auth} from "../config/FirebaseConfig";

export const UserContext = createContext();

export function UserContextProvider(props) {

    const [modalState, setModalState] = useState({
        signUpModal: true,
        signInModal: false
    });

    const [currentUser, setCurrentUser] = useState();
    const [loadingData, setLoadingData] = useState(true);

    const toggleModals = (modal) => {
        if (modal === "signIn") {
            setModalState({
                signUpModal: false,
                signInModal: true
            });
        }
        if (modal === "signIn") {
            setModalState({
                signUpModal: true,
                signInModal: false
            });
        }
        if (modal === "close") {
            setModalState({
                signUpModal: false,
                signInModal: false
            });
        }
    }

    return (
        <UserContext.Provider value={{ modalState, toggleModals }}>
            {props.children}
        </UserContext.Provider>
    )

}