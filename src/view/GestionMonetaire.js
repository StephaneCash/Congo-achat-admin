import { Card, Grid, TextField, Button } from '@material-ui/core';
import { MonetizationOn } from '@material-ui/icons';
import React from 'react';
import LeftBar from '../includes/LeftBar';
import NavBar from '../includes/NavBar';
import { db } from "../config/FirebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import Load from '../includes/Load';
import FlashMessage from "react-flash-message";

function GestionMonetaire() {
    const [data, setData] = useState([]);
    const appSettings = collection(db, 'app-settings');

    const [poste, setPoste] = useState();
    const [pub, setPub] = useState();
    const [mpsa, setMpsa] = useState();
    const [airtel, setAirtel] = useState();
    const [orange, setOrange] = useState();
    const [cdf, setCdf] = useState();
    const [taux, setTaux] = useState();

    const getAppSettings = async () => {
        const dataApp = await getDocs(appSettings);
        setData(dataApp.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    useEffect(() => {
        getAppSettings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [etat, setEtat] = useState(false)

    const submitData = async (e) => {
        e.preventDefault();
        setEtat(true);
    };

    const handleSubmitUser = (e) => {
        setOrange(e.target.value)
    }

    return (
        <>
            <div className="provinces">
                <NavBar />
                <div className="d-flex">
                    <Grid xs={2} item>
                        <LeftBar />
                    </Grid>
                    <Grid xs={10} item style={{ marginTop: "80px", padding: "10px", backgroundColor: "#efefef" }}>
                        <Card style={{ padding: "10px" }}>
                            <div className="col-12" style={{ marginTop: "5px", textAlign: "center" }}>
                                <h4 className="align-center"> <MonetizationOn /> Gestion monétaire  </h4>
                                <h5 style={{ borderBottom: "1px solid #efefef" }}></h5>
                            </div>
                            <div className="col-12 p-5">
                                {data.length > 0 ? (
                                    <>
                                        <form onSubmit={submitData}>
                                            {
                                                data.map((val, index) => (
                                                    <div className="row" key={index}>
                                                        <div className="col-5">
                                                            Prix du poste : <br />
                                                            <TextField
                                                                required
                                                                variant="filled"
                                                                value={val.adPrice}
                                                                style={{ width: '80%' }}
                                                                onChange={e => setPoste(e.target.value)}
                                                            />
                                                            <br />
                                                            <br />
                                                            Prix de la publicité : <br />
                                                            <TextField
                                                                required
                                                                variant="filled"
                                                                style={{ width: '80%' }}
                                                                value={val.adPriceForPublicity}
                                                                onChange={e => setPub(e.target.value)}
                                                            />
                                                            <br />
                                                            <br />
                                                            Compte M-pesa : <br />
                                                            <TextField
                                                                required
                                                                variant="filled"
                                                                value={val.mPaisaID}
                                                                style={{ width: '80%' }}
                                                                onChange={e => setMpsa(e.target.value)}
                                                            />
                                                            <br />
                                                            <br />
                                                            Compte Airtel Money : <br />
                                                            <TextField
                                                                required
                                                                variant="filled"
                                                                style={{ width: '80%' }}
                                                                value={val.airtelMoney}
                                                                onChange={e => setAirtel(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="col-5">
                                                            Compte Orange Money : <br />
                                                            <TextField
                                                                required
                                                                variant="filled"
                                                                style={{ width: '80%' }}
                                                                value={val.orangeMoney}
                                                                onChange={handleSubmitUser}
                                                            />
                                                            <br />
                                                            <br />
                                                            CDF OU USD : <br />
                                                            <TextField
                                                                style={{ width: '80%' }}
                                                                required
                                                                variant="filled"
                                                                value={val.adPriceinUSD}
                                                                onChange={e => setCdf(e.target.value)}
                                                            />
                                                            <br />
                                                            <br />
                                                            Taux du jour :<br />
                                                            <TextField
                                                                required
                                                                style={{ width: '80%' }}
                                                                variant="filled"
                                                                value={val.tauxEchange}
                                                                onChange={e => setTaux(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="col-2 mt-4">
                                                            <Button
                                                                style={{ color: "green", border: '1px solid green' }}
                                                                variant="outlined"
                                                                type="submit"
                                                            >
                                                                Modifier
                                                                <i className="fa fa-edit" style={{ marginLeft: "5px" }}></i>
                                                            </Button>
                                                        </div>
                                                        {
                                                            etat &&
                                                            <FlashMessage>
                                                                <p
                                                                    style={{
                                                                        color: "white", border: "1px solid silver", borderRadius: "5px",
                                                                        padding: "15px", marginTop: "20px", backgroundColor: 'rgb(158, 211, 158)',
                                                                    }}>Données modifiées avec succès !</p>
                                                            </FlashMessage>
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </form>
                                    </>
                                ) : (
                                    <div style={{ textAlign: "center", marginTop: "10px" }}>
                                        <Load />
                                    </div>
                                )}
                            </div>
                        </Card>
                    </Grid>
                </div>
            </div>
        </>
    );
}

export default GestionMonetaire;
