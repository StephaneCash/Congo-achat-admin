import { Route, Routes, BrowserRouter } from "react-router-dom";
import Dashboard from "../view/Dashboard";
import Users from "../view/Users";
import Annonces from "../view/Annonces";
import Login from "../view/Login";
import Essai from "../view/essai";
import AppSettings from "../view/AppSettings";
import SubAdmins from "../view/SubAdmins";
import Provinces from "../view/Provinces";
import ProtectedRoute from "../view/ProtectedRoute";

const RoutesAdmin = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path='dashboard'
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />
                <Route path='users' element={<ProtectedRoute><Users /></ProtectedRoute>} />
                <Route path='annonces' element={<ProtectedRoute><Annonces /></ProtectedRoute>} />
                <Route path="essais" element={<ProtectedRoute><Essai /></ProtectedRoute>} />
                <Route path='appsetting' element={<ProtectedRoute><AppSettings /></ProtectedRoute>} />
                <Route path='subAdmins' element={<ProtectedRoute><SubAdmins /></ProtectedRoute>} />
                <Route path="provinces" element={<ProtectedRoute><Provinces /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesAdmin;

