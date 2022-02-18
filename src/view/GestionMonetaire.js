import { Card, Grid, TextField, Button } from '@material-ui/core';
import { MonetizationOn } from '@material-ui/icons';
import React from 'react';
import LeftBar from '../includes/LeftBar';
import NavBar from '../includes/NavBar';
import { db } from "../config/FirebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import Load from '../includes/Load';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function GestionMonetaire() {
    const [data, setData] = useState([]);
    const appSettings = collection(db, 'app-settings');

    const getAppSettings = async () => {
        const dataApp = await getDocs(appSettings);
        setData(dataApp.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const [formData, setFormData] = useState({
        adPrice: "",
        adPriceForPublicity: '',
        adPriceForPublicityUSD: "",
        adPriceinUSD: "",
        airtelMoney: "",
        mPaisaID: "",
        orangeMoney: "",
        tauxEchange: "",
    });

    useEffect(() => {
        getAppSettings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [etat, setEtat] = useState(false)

    const submitData = async (id) => {
        const monetaireDoc = doc(db, 'app-settings', id);
        await updateDoc(monetaireDoc, formData);
        setEtat(true);
        getAppSettings();
        toast.success("Modification effectuée avec succès")
    };

    const handle = (e) => {
        const { value, id } = e.target;
        let valueTarget = value;
        let idTarget = id;
        data[0].adPrice = value 
            console.log("Données du form : ", id, " : ", `${valueTarget}`);
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
                                        <form>
                                            {
                                                data.map((val, index) => (
                                                    <div className="row" key={index}>
                                                        <div className="col-5">
                                                            Prix du poste : <br />
                                                            <TextField
                                                                id="adPrice"
                                                                type="number"
                                                                required
                                                                variant="filled"
                                                                value={val.adPrice}
                                                                style={{ width: '80%' }}
                                                            />
                                                            <br />
                                                            <br />
                                                            Prix de la publicité : <br />
                                                            <TextField
                                                                required
                                                                variant="filled"
                                                                style={{ width: '80%' }}
                                                                id="adPriceForPublicity"
                                                                value={val.adPriceForPublicity}
                                                                onChange={e => handle(e)}
                                                            />
                                                            <br />
                                                            <br />
                                                            Compte M-pesa : <br />
                                                            <TextField
                                                                type="number"
                                                                required
                                                                variant="filled"
                                                                value={val.mPaisaID}
                                                                id="mPaisaID"
                                                                style={{ width: '80%' }} onChange={e => handle(e)}
                                                                onChange={e => handle(e)}
                                                            />
                                                            <br />
                                                            <br />
                                                            Compte Airtel Money : <br />
                                                            <TextField
                                                                required
                                                                variant="filled"
                                                                id="airtelMoney"
                                                                style={{ width: '80%' }}
                                                                value={val.airtelMoney}
                                                                onChange={e => handle(e)}
                                                            />
                                                        </div>
                                                        <div className="col-5">
                                                            Compte Orange Money : <br />
                                                            <TextField
                                                                id="orangeMoney"
                                                                required
                                                                variant="filled"
                                                                style={{ width: '80%' }}
                                                                value={val.orangeMoney}
                                                                onChange={e => handle(e)}
                                                            />
                                                            <br />
                                                            <br />
                                                            CDF OU USD : <br />
                                                            <TextField
                                                                style={{ width: '80%' }}
                                                                required
                                                                variant="filled"
                                                                id="adPriceinUSD"
                                                                value={val.adPriceinUSD}
                                                                onChange={e => handle(e)}
                                                            />
                                                            <br />
                                                            <br />
                                                            Taux du jour :<br />
                                                            <TextField
                                                                type="number"
                                                                required
                                                                style={{ width: '80%' }}
                                                                id="tauxEchange"
                                                                variant="filled"
                                                                value={val.tauxEchange}
                                                                onChange={e => handle(e)}
                                                            />
                                                        </div>
                                                        <div className="col-2 mt-4">
                                                            <Button
                                                                style={{ color: "green", border: '1px solid green' }}
                                                                variant="outlined"
                                                                onClick={() => submitData(val.id)}
                                                            >
                                                                Modifier
                                                                <i className="fa fa-edit" style={{ marginLeft: "5px" }}></i>
                                                            </Button>
                                                        </div>
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
