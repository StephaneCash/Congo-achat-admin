import { Card, Checkbox, Grid, Button } from '@material-ui/core';
import { Build, PersonAdd } from '@material-ui/icons';
import React from 'react';
import LeftBar from '../includes/LeftBar';
import NavBar from '../includes/NavBar';
import { db } from "../config/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import Load from '../includes/Load';
import "../css/SubAdmins.css";

function SubAdmins() {

    const subAdmins = collection(db, 'subAdmins');

    const [data, setData] = useState([]);

    const getSubAdmins = async () => {
        const dataSubAdmin = await getDocs(subAdmins);
        setData(dataSubAdmin.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    useEffect(() => {
        getSubAdmins();
    }, []);

    return (
        <>
            <div className="subAdmins">
                <NavBar />
                <Grid className="d-flex">
                    <Grid xs={2} sm={2}>
                        <LeftBar />
                    </Grid>
                    <Grid xs={10} sm={10} style={{ marginTop: "80px", padding: "10px", backgroundColor: "#efefef" }}>
                        <Card style={{ padding: "10px" }}>
                            <div className="col-12" style={{ marginTop: "5px", textAlign: "center" }}>
                                <h4 className="align-center"> Sub Admins <Build /> </h4>
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
                                                />
                                                <div className="input-group-append">
                                                    <i className="input-group-text fa fa-search fa-1x" aria-hidden="true"></i>
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
                                            <th>Nom </th>
                                            <th>Numéro De Téléphone </th>
                                            <th>E-mail </th>
                                            <th>Date De Création </th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.length > 0 ? (
                                                <>
                                                    {
                                                        data.map((val, index) => {
                                                            return (
                                                                <>
                                                                    <tr key={index}>
                                                                        <td>
                                                                            {
                                                                                index + 1
                                                                            }
                                                                        </td>

                                                                        <td>{val.name}</td>
                                                                        <td>{val.numero}</td>
                                                                        <td>{val.email}</td>
                                                                        <td>{val.time}</td>

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
                                                        })

                                                    }
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
                                <nav className="d-flex justify-content-center">
                                    <ul className="pagination">

                                    </ul>
                                </nav>
                            </div>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

export default SubAdmins;
