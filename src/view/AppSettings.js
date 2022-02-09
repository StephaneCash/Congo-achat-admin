import { Button, Card, TextField, Typography } from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import { Grid } from '@mui/material';
import React from 'react';
import LeftBar from '../includes/LeftBar';
import NavBar from '../includes/NavBar';
import { getDocs, collection } from 'firebase/firestore';
import { db } from "../config/FirebaseConfig";
import { useState, useEffect } from "react";
import Load from '../includes/Load';
import "../css/AppSettings.css";

function AppSettings() {

    const [etat, setEtat] = useState(false);
    const [showCategory, setShowCategory] = useState(false);

    const [data, setData] = useState([]);
    const appSettingsCollection = collection(db, 'app-settings',);

    const [dataCat, setDataCat] = useState([]);

    const getAppSettings = async () => {
        const dataAppSettings = await getDocs(appSettingsCollection);
        setData(dataAppSettings.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    const changeEtatBtn = () => {
        setEtat(true);
        setShowCategory(true);
    };

    const handleBtnHide = () => {
        setEtat(false);
        setShowCategory(false);
    }

    useEffect(() => {
        getAppSettings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    return (
        <>
            <div className="users appSettings">
                <NavBar />
                <div className="d-flex">
                    <Grid xs={2} item>
                        <LeftBar />
                    </Grid>
                    <Grid xs={10} item style={{ marginTop: "80px", padding: "10px", backgroundColor: "#efefef" }}>
                        <Card style={{ padding: "10px" }}>
                            <div className="col-12" style={{ marginTop: "5px", textAlign: "center" }}>
                                <h4 className="align-center"> App Settings <Settings /> </h4>
                                <h5 style={{ borderBottom: "1px solid #efefef" }}></h5>
                            </div>
                            
                        </Card>
                    </Grid>
                </div>
            </div>
        </>
    )
}

export default AppSettings;
