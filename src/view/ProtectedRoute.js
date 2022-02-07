import React from 'react';
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../config/useContextComponent";

function ProtectedRoute({ children }) {

    let { user } = useUserAuth();

    /*let name = localStorage.getItem('userAuth');
    if(user){
        name = user.email;
        localStorage.setItem('userAuth', "auth");
    }*/

    /*if (!user) {
        return <Navigate to="/" />
    };*/

    return children;
}

export default ProtectedRoute;
