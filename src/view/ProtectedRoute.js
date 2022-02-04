import React, { useState } from 'react';
import {Navigate} from "react-router-dom";
import {useUserAuth} from "../config/useContextComponent";

function ProtectedRoute({ children }) {

    let {user} = useUserAuth();

    let etat = false;

    if(user){
        etat = true;
    }

    sessionStorage.setItem("userAuth", user.email);
    
    if(!etat){
        return <Navigate to="/" />
    };

    return children;
}

export default ProtectedRoute;
