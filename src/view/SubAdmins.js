import { Card, Grid, Button } from '@material-ui/core';
import { Build, PersonAdd, Check, Close } from '@material-ui/icons';
import React from 'react';
import LeftBar from '../includes/LeftBar';
import NavBar from '../includes/NavBar';
import { db } from "../config/FirebaseConfig";
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import Load from '../includes/Load';
import "../css/SubAdmins.css";
import AddSousAdmin from '../modal/add-SouAdmins';
import swal from 'sweetalert';

function SubAdmins() {

    const subAdmins = collection(db, 'subAdmins');

    const initializeValues = { id: "", email: "", name: "", number: "", };
    const [formData, setFormData] = useState(initializeValues);

    const [data, setData] = useState([]);
    const [idDetail, setIdDetail] = useState();
    const [inputValueSearch, setInputValueSearch] = useState("");

    const getSubAdmins = async () => {
        const dataSubAdmin = await getDocs(subAdmins);
        setData(dataSubAdmin.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const onChange = (e) => {
        const { value, id } = e.target;
        setFormData({ ...formData, [id]: value });
    }

    const handleSubmitSubAdmin = async (e) => {
        e.preventDefault();

        if (formData.id) {
            const docSousAdmin = doc(db, 'subAdmins', formData.id);
            await updateDoc(docSousAdmin, formData);
            getSubAdmins();
            swal({ title: "Succès", icon: 'success', text: `Sous admin modifié avec succès` });
            setFormData(initializeValues);
            handleCloseModal();
        } else {
            await addDoc(subAdmins, formData);
            getSubAdmins();
            handleCloseModal();
            swal({ title: "Succès", icon: 'success', text: `Sous admin ajouté avec succès` });
            setFormData(initializeValues);
        }
    }

    const handleDeleteSubAdmin = async (id) => {
        const subAdminDoc = doc(db, 'subAdmins', id);

        swal({
            title: "Avertissement.",
            text: "Etes-vous sûr de vouloir supprimer ce sous-admin ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                deleteDoc(subAdminDoc)
                getSubAdmins();
                swal('Sous-admin supprimé avec succès', {
                    icon: "success",
                });
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const detailSudAdmin = (id) => {
        setIdDetail(id);
    };

    const handleInput = (e) => {
        setInputValueSearch(e.target.value);
    }

    const [etatModal, setEtatModal] = useState(false);

    const addSudAdminModal = () => {
        setEtatModal(true);
    };

    const updateSubAdminModal = (val) => {
        setEtatModal(true);
        setFormData(val);
    };

    const handleCloseModal = () => {
        setEtatModal(false);
    };

    useEffect(() => {
        getSubAdmins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let dataS = {};
    let docData = "";
    let etatBtn = false;

    data.forEach(val => {
        if (val.id === idDetail) {
            dataS.catName = val.name;
            docData = val.status;
            if (val.status === 'Actif') {
                dataS.status = "Bloqué";
                etatBtn = true;
            } else if (val.status === 'Bloqué') {
                dataS.status = "Actif";
            }
            dataS.description = val.email;
        }
    });

    console.log("DATA S : : ", dataS)

    const handleBloquerSubAdmin = (id) => {
        setIdDetail(id);

        const catCol = doc(db, 'subAdmins', id);
        let msg = "";
        let msgConf = "";
        if (docData === 'Actif') {
            msg = 'Etes-vous sûr de vouloir bloquer ce sous-admin ?';
            msgConf = 'Sous-admin bloqué avec succès';
        } else if (docData === 'Bloqué') {
            msg = 'Etes-vous sûr de vouloir débloquer ce sous-admin ?';
            msgConf = 'Sous-admin débloqué avec succès';
        }

        swal({
            title: "Avertissement.",
            text: msg,
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                updateDoc(catCol, dataS);
                swal(msgConf, {
                    icon: "success",
                });
                getSubAdmins();
            }
        })
    };

    return (
        <>
            <div className="subAdmins">
                <NavBar />
                <Grid item className="d-flex">
                    <Grid item xs={2}>
                        <LeftBar />
                    </Grid>
                    <Grid xs={10} item style={{ marginTop: "80px", padding: "10px", backgroundColor: "#efefef" }}>
                        <Card style={{ padding: "10px" }}>
                            <div className="col-12" style={{ marginTop: "5px", textAlign: "center" }}>
                                <h4 className="align-center"> {data.length} Sub Admins <Build /> </h4>
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
                                                    onChange={handleInput}
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
                                        onClick={addSudAdminModal}
                                        type="button"
                                        variant="contained"
                                        style={{ float: "right", backgroundColor: "#973c44", color: "#fff" }}
                                    >
                                        <PersonAdd />
                                    </Button>

                                </div>
                            </div>

                            <div className="col-12 mt-3">
                                <div className="sudAdminsList">
                                    <table className="table table-bordered table-borderless table-hover">
                                        <thead style={{ backgroundColor: "#efefef" }}>
                                            <tr>
                                                <th>#</th>
                                                <th>Nom </th>
                                                <th>Numéro De Téléphone </th>
                                                <th>E-mail </th>
                                                <th>Status</th>
                                                <th>Date De Création </th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data.length > 0 ? (
                                                    <>
                                                        {
                                                            data.filter((val) => {
                                                                let value = val.name.toLowerCase();
                                                                return value.includes(inputValueSearch);
                                                            }).map((val, index) => (

                                                                <tr key={index}>
                                                                    <td>
                                                                        {
                                                                            index + 1
                                                                        }
                                                                    </td>

                                                                    <td>{val.name}</td>
                                                                    <td>{val.numero}</td>
                                                                    <td>{val.email}</td>
                                                                    <td>
                                                                        {
                                                                            val.status === "Actif" ?
                                                                                <>
                                                                                    {val.status}
                                                                                    <Check style={{ color: 'green', fontSize: '20px' }} />
                                                                                </> :
                                                                                <>
                                                                                    {val.status} <Close style={{ color: 'red', fontSize: '20px' }} />
                                                                                </>
                                                                        }
                                                                    </td>
                                                                    <td>{val.time}</td>

                                                                    <td style={{ textAlign: 'center', width: "200px", border: "1px solid silver !important" }}>
                                                                        <button type="button"
                                                                            onClick={() => updateSubAdminModal(val)}
                                                                            className="btn btnChange">
                                                                            <i className="fa fa-edit"></i>
                                                                        </button>
                                                                        <button type="button"
                                                                            onClick={() => detailSudAdmin(val.id)}
                                                                            className="btn btnChange">
                                                                            <i className="fa fa-info"></i>
                                                                        </button>
                                                                        <button type="button"
                                                                            onClick={() => handleDeleteSubAdmin(val.id)}
                                                                            className="btn btnChange">
                                                                            <i className="fa fa-trash"></i>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))

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
                                </div>
                            </div>
                        </Card>

                        {idDetail !== undefined && (<>
                            <Grid xs={12} ys={12} style={{ marginTop: "10px" }}>
                                <Card>
                                    <div className="detailSudAdmin">
                                        {data.map((val, index) => {
                                            if (val.id === idDetail) {
                                                return (
                                                    <>
                                                        <table className="table table-bordered table-borderless table-hover">
                                                            <tbody key={index}>
                                                                <tr>
                                                                    <td colSpan="2px" style={{ textAlign: 'center', fontSize: '15px' }}>Détail et opérations</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ fontSize: '15px' }}>Nom</td>
                                                                    <td>{val.name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Email</td>
                                                                    <td>{val.email}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2px">
                                                                        <Button variant="outlined" onClick={() => handleBloquerSubAdmin(val.id)}>
                                                                            {
                                                                                etatBtn ? <span style={{color:"red"}}>Bloquer</span> : 
                                                                                <span style={{color:"green"}}>Débloquer</span> 
                                                                            }
                                                                        </Button> Status : {val.status}
                                                                    </td>

                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </>
                                                )
                                            }
                                        })}
                                    </div>
                                </Card>
                            </Grid>

                        </>)}
                    </Grid>

                </Grid>
            </div>
            <AddSousAdmin
                show={etatModal}
                close={handleCloseModal}
                onChange={onChange}
                data={formData}
                handleSubmitSubAdmin={handleSubmitSubAdmin}
            />
        </>
    );
}

export default SubAdmins;
