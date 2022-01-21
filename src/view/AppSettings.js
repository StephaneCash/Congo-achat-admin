import { Card, TextField } from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import { Grid } from '@mui/material';
import React from 'react';
import LeftBar from '../includes/LeftBar';
import NavBar from '../includes/NavBar';
import { getDocs, collection } from 'firebase/firestore';
import { db } from "../config/FirebaseConfig";
import { useState, useEffect } from "react";

function AppSettings() {

    const [data, setData] = useState([]);
    const appSettingsCollection = collection(db, 'app-settings');

    const [dataProvinces, setDataProvinces] = useState([]);
    const provincesCollection = collection(db, 'provinces');

    const getAppSettings = async () => {
        const dataAppSettings = await getDocs(appSettingsCollection);
        setData(dataAppSettings.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    const getProvinces = async () => {
        const provinces = await getDocs(provincesCollection);
        setDataProvinces(provinces.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    useEffect(() => {
        getAppSettings();
        getProvinces();
    });

    return (
        <>
            <div className="users">
                <NavBar />
                <Grid className="d-flex">
                    <Grid xs={2} sm={2}>
                        <LeftBar />
                    </Grid>
                    <Grid xs={10} sm={10} style={{ marginTop: "80px", padding: "10px", backgroundColor: "#efefef" }}>
                        <Card style={{ padding: "10px" }}>
                            <div className="col-12" style={{ marginTop: "5px", textAlign: "center" }}>
                                <h4 className="align-center"> App Settings <Settings /> </h4>
                                <h5 style={{ borderBottom: "1px solid #efefef" }}></h5>
                            </div>
                            <div className="col-6">
                                <table className="table table-striped">
                                    <tbody>
                                        {
                                            data.map((val, index) => {
                                                return (
                                                    <div key={index}>
                                                        <TextField
                                                            className="mt-1"
                                                            value={val.adPrice}
                                                            type="number"
                                                            variant='outlined' 
                                                            label="Add Price" />

                                                        <TextField
                                                            value={val.mPaisaID}
                                                            type="number"
                                                            variant='outlined' 
                                                            label="Mpsa ID" />
                                                    </div>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default AppSettings;
