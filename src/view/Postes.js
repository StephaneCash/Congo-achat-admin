import { Button, Card, Grid } from '@material-ui/core';
import { Add, PostAddRounded, CheckCircleSharp, Cancel } from '@material-ui/icons'
import React from 'react';
import LeftBar from '../includes/LeftBar'
import NavBar from '../includes/NavBar'
import { useState, useEffect } from "react";
import { db } from "../config/FirebaseConfig";
import { getDocs, doc, updateDoc, deleteDoc, addDoc, collection } from "firebase/firestore";
import Load from '../includes/Load';

function Postes() {

    const annoncesData = collection(db, 'ads');
    const [data, setData] = useState([]);

    const [total, setTotal] = useState("");
    const [page, setPage] = useState(1);
    const [pageNombre, setPageNombre] = useState(10);

    const [idDetail, setIdDetail] = useState();
    const [etatModal, setEtatModal] = useState(false);
    const [dataInput, setDataInput] = useState('');

    const getAnnonces = async () => {
        const dataAnnonces = await getDocs(annoncesData);
        setData(dataAnnonces.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setTotal(data.length);
    }

    console.log(total)

    useEffect(() => {
        getAnnonces();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function showModalAdd() {

    };

    function handleSearch(e) {
        let value = e.target.value.toLowerCase();
        setDataInput(value)
    };

    const indexOfLastPage = page + pageNombre;
    const indexOfFistPage = indexOfLastPage - pageNombre;
    const currentPage = data.slice(indexOfFistPage, indexOfLastPage);

    return (
        <>
            <NavBar />
            <div className="d-flex">
                <Grid xs={2} item>
                    <LeftBar />
                </Grid>
                <Grid xs={10} item style={{ marginTop: "80px", padding: "10px", backgroundColor: "#efefef" }}>
                    <Card style={{ padding: "10px" }}>
                        <div className="col-12" style={{ marginTop: "5px", textAlign: "center" }}>
                            <h4 className="align-center"> Postes <PostAddRounded /> </h4>
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
                                                onChange={handleSearch}
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
                                    onClick={showModalAdd}
                                    variant="contained"
                                    style={{ float: "right", backgroundColor: "#c72f3c", color: "#fff" }}
                                >
                                    <Add />
                                </Button>

                            </div>
                        </div>
                        
                        <div className="col-12 mt-3">
                            <table className="table table-bordered table-borderless table-hover">
                                <thead style={{ backgroundColor: "#efefef" }}>
                                    <tr>
                                        <th>#</th>
                                        <th>Nom produit</th>
                                        <th>Catégorie</th>
                                        <th>Ville</th>
                                        <th>Province</th>
                                        <th>Description</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.length > 0 ? (
                                            <>
                                                <>
                                                    {
                                                        data.filter(val => {
                                                            return val.productName.toLowerCase().includes(dataInput);
                                                        }).map((val, index) => (
                                                            <tr key={val.id}>
                                                                <td>
                                                                    {
                                                                        index + 1
                                                                    }
                                                                </td>

                                                                <td>{val.productName}</td>
                                                                <td>{val.category}</td>
                                                                <td>{val.city}</td>
                                                                <td>{val.province}</td>
                                                                <td>{val.description}</td>
                                                                <td>
                                                                    {
                                                                        val.status === "Approved" &&
                                                                        <>
                                                                            <span style={{ color: "green" }}>{val.status}</span>
                                                                            <CheckCircleSharp style={{ marginLeft: '5px', color: 'green', fontSize: '22px' }} />
                                                                        </>
                                                                    }
                                                                    {
                                                                        val.status === 'Non Approuvé' &&
                                                                        <>
                                                                            <span style={{ color: "red" }}>{val.status}</span>
                                                                            <Cancel style={{ marginLeft: '5px', color: 'red', fontSize: '20px' }} />
                                                                        </>
                                                                    }
                                                                    {
                                                                        val.status === "" &&
                                                                        <>Aucun status n'est défini.</>
                                                                    }
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
                                                        ))
                                                    }
                                                </>
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
        </>
    )
}

export default Postes