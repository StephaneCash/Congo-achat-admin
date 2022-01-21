import { Route, Routes, BrowserRouter } from "react-router-dom";
import Dashboard from "../view/Dashboard";
import Users from "../view/Users";
import Annonces from "../view/Annonces";
import Login from "../view/Login";
import Essai from "../view/essai";
import AppSettings from "../view/AppSettings";

const RoutesAdmin = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='users' element={<Users />} />
                <Route path='annonces' element={<Annonces />} />
                <Route path="essais" element={<Essai />} />
                <Route path='appsetting' element={<AppSettings />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesAdmin;

