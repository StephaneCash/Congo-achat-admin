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

    const [dataProvinces, setDataProvinces] = useState([]);
    //const provincesCollection = collection(db, 'provinces');

    const getAppSettings = async () => {
        const dataAppSettings = await getDocs(appSettingsCollection);
        setData(dataAppSettings.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }


    const getProvinces = async () => {
        
        //const provinces = await getDocs(provincesCollection);
        //setDataProvinces(provinces.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    const changeEtatBtn = () => {
        setEtat(true);
        setShowCategory(true);
    }

    const handleBtnHide = () => {
        setEtat(false);
        setShowCategory(false);
    }

    useEffect(() => {
        getAppSettings();
        //getProvinces();
    });

    return (
        <>
            <div className="users appSettings">
                <NavBar />
                <div className="d-flex">
                    <Grid xs={2} sm={2}>
                        <LeftBar />
                    </Grid>
                    <Grid xs={10} sm={10} style={{ marginTop: "80px", padding: "10px", backgroundColor: "#efefef" }}>
                        <Card style={{ padding: "10px" }}>
                            <div className="col-12" style={{ marginTop: "5px", textAlign: "center" }}>
                                <h4 className="align-center"> App Settings <Settings /> </h4>
                                <h5 style={{ borderBottom: "1px solid #efefef" }}></h5>
                            </div>
                            {data.length <= 0 && (
                                <div className="loader">
                                    <Load />
                                </div>
                            )}
                            <div className="col-6">
                                <table className="table table-striped">
                                    <tbody>
                                        {
                                            data.length > 0 && data.map((val, index) => {
                                                return (
                                                    <div key={index}>
                                                        <TextField
                                                            className="mt-1"
                                                            value={val.adPrice}
                                                            type="number"
                                                            variant='filled'
                                                            label="Add Price" />
                                                        <br />
                                                        <TextField
                                                            value={val.mPaisaID}
                                                            type="number"
                                                            variant='filled'
                                                            label="Mpsa ID" />

                                                    </div>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>

                            <h5 style={{ borderBottom: "1px solid #efefef" }}></h5>
                            <div className='d-flex'>
                                <div className="col-6">
                                    <Typography variant="h5" style={{ marginLeft: "10px" }}>Category</Typography>
                                    {etat === true ? (
                                        <>
                                            <table className="table table-bordered table-bordeless table-striped mt-5" style={{ marginLeft: "10px" }}>
                                                <tbody>
                                                    <tr>
                                                        <th>Category</th>
                                                    </tr>
                                                    <tr>
                                                        <td>Name</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </>
                                    ) : ''}
                                </div>
                                <div className="col-6" className="mt-2" style={{ marginLeft: "100px", width: "100%" }}>

                                    {etat === false ? (
                                        <>
                                            <Button variant="outlined" onClick={changeEtatBtn}>
                                                Afficher
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button variant="outlined" onClick={handleBtnHide}>
                                                Cacher
                                            </Button>
                                        </>
                                    )}
                                    {etat === true && (
                                        <>
                                            <table className="table table-bordered table-bordeless table-striped" style={{ marginRight: "50px", marginTop: "35px" }}>
                                                <tbody>
                                                    <tr>
                                                        <th>Sub Category</th>
                                                    </tr>
                                                    <tr>
                                                        <td>Name</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </>
                                    )}
                                </div>
                            </div>
                        </Card>
                    </Grid>
                </div>
            </div>
        </>
    )
}

export default AppSettings;
