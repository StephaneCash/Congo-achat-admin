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
import GestionMonetaire from "../view/GestionMonetaire";
import TrouverClient from "../view/TrouverClient";
import CategoriesAndSous from "../view/CategoriesAndSous";
import Postes from "../view/Postes";
import NotificationPush from "../view/NotificationPush";

const RoutesAdmin = () => {

    //let name = localStorage.getItem("userAuth");
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path='dashboard' element={<ProtectedRoute><Dashboard /> </ProtectedRoute>} />
                    <Route path='users' element={<ProtectedRoute><Users /></ProtectedRoute>} />
                    <Route path='annonces' element={<ProtectedRoute><Annonces /></ProtectedRoute>} />
                    <Route path="essais" element={<ProtectedRoute><Essai /></ProtectedRoute>} />
                    <Route path='appsetting' element={<ProtectedRoute><AppSettings /></ProtectedRoute>} />
                    <Route path='subAdmins' element={<ProtectedRoute><SubAdmins /></ProtectedRoute>} />
                    <Route path="provinces" element={<ProtectedRoute><Provinces /></ProtectedRoute>} />
                    <Route path="gestion-monetaire" element={<ProtectedRoute><GestionMonetaire /></ProtectedRoute>} />
                    <Route path="findClient" element={<ProtectedRoute><TrouverClient /></ProtectedRoute>} />
                    <Route path="notifications" element={<ProtectedRoute><NotificationPush /></ProtectedRoute>} />
                    <Route path='categories' element={
                        <ProtectedRoute><CategoriesAndSous /></ProtectedRoute>
                    } />
                    <Route path='postes' element={<ProtectedRoute><Postes /></ProtectedRoute>} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default RoutesAdmin;

