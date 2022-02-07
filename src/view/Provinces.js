import { Button, Card, Grid } from '@material-ui/core';
import { PersonAdd } from '@material-ui/icons';
import React from 'react';
import LeftBar from '../includes/LeftBar';
import Load from '../includes/Load';
import NavBar from '../includes/NavBar';
import "../css/Provinces.css";
import { useState, useEffect } from "react";
import { getDocs, addDoc, updateDoc, deleteDoc, doc, collection } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";

function Provinces() {

    const [data, setData] = useState([]);
    const [valueInput, setValueInput] = useState('');

    const collectionProvinces = collection(db, 'provinces');

    const getProvinces = async () => {
        const dataProvinces = await getDocs(collectionProvinces);
        setData(dataProvinces.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    let newArr = [];

    console.log("Data : ", data.provinceCities)

    useEffect(() => {
        getProvinces();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const searchValue = (e) =>{
        let value = e.target.value.toLowerCase();
        setValueInput(value);
    };

    return <>
        <div className="provinces">
            <NavBar />
            <div className="d-flex">
                <Grid xs={2} sm={2}>
                    <LeftBar />
                </Grid>
                <Grid xs={10} sm={10} style={{ marginTop: "80px", padding: "10px", backgroundColor: "#efefef" }}>
                    <Card style={{ padding: "10px" }}>
                        <div className="col-12" style={{ marginTop: "5px", textAlign: "center" }}>
                            <h4 className="align-center"> Gestion Provinces  </h4>
                            <h5 style={{ borderBottom: "1px solid #efefef" }}></h5>
                        </div>

                        <div className="d-flex">

                            <div className="col-5 mt-3">
                                <div className="form-group">
                                    <div className="user-field">
                                        <div className="input-group mb-2">
                                            <input
                                                type="text"
                                                className="form-control input-search "
                                                placeholder="Rechercher"
                                                autoComplete="off"
                                                onChange={searchValue}
                                            />
                                            <div className="input-group-append">
                                                <i style={{height: "40px", paddingTop:"10px"}} className="input-group-text fa fa-search fa-1x" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-7 mt-3">
                                <Button
                                    type="button"
                                    variant="contained"
                                    style={{ float: "right", backgroundColor: "#973c44", color: "#fff" }}
                                >
                                    <PersonAdd />
                                </Button>

                            </div>
                        </div>

                        <div className="col-12 mt-3">
                            <table className="table table-bordered table-borderless table-hover">
                                <thead style={{ backgroundColor: "#efefef" }}>
                                    <tr>
                                        <th>#</th>
                                        <th>Nom</th>
                                        <th>Villes</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        data.length > 0 ? (
                                            <>
                                                {
                                                data.filter((val)=>{
                                                    return val.provinceName.toLowerCase().includes(valueInput);
                                                }).map((val, index) => {
                                                    return (
                                                        <>
                                                            <tr>
                                                                <td>{index + 1}</td>
                                                                <td>{val.provinceName}</td>
                                                                <td>
                                                                    {val.provinceCities}
                                                                </td>
                                                                <td style={{ textAlign: 'center', width: "200px", border: "1px solid silver !important" }}>
                                                                    <button type="button"
                                                                        className="btn btnChange">
                                                                        <i className="fa fa-edit"></i>
                                                                    </button>
                                                                    <button type="button"
                                                                        className="btn btnChange">
                                                                        <i className="fa fa-info"></i>
                                                                    </button>
                                                                    <button type="button"
                                                                        className="btn btnChange">
                                                                        <i className="fa fa-trash"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        </>
                                                    )
                                                })}
                                            </>
                                        ) : (
                                            <>
                                                <tr>
                                                    <td colSpan="8px" style={{ textAlign: 'center' }}>
                                                        <Load />
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    }
                                </tbody>

                            </table>
                        </div>

                    </Card>
                </Grid>
            </div>
        </div>
    </>;
}

export default Provinces;
