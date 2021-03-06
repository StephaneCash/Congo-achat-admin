import { Card, Grid, Button } from '@material-ui/core';
import { Build, PersonAdd, CheckCircleSharp, Cancel } from '@material-ui/icons';
import React from 'react';
import LeftBar from '../includes/LeftBar';
import NavBar from '../includes/NavBar';
import { db } from "../config/FirebaseConfig";
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import Load from '../includes/Load';
import "../css/SubAdmins.css";
import AddSousAdmin from '../modal/add-SouAdmins';
import swal from 'sweetalert';
import { getAuth, updateEmail } from "firebase/auth";
import { createUserWithEmailAndPassword } from 'firebase/auth';

function SubAdmins() {

    const auth = getAuth();

    console.log(auth.getUser)

    const subAdmins = collection(db, 'subAdmins');

    const initializeValues = { id: "", email: "", password: "", confirmPassword: "", status: '' };
    const [formData, setFormData] = useState(initializeValues);

    const [data, setData] = useState([]);
    const [idDetail, setIdDetail] = useState();
    const [inputValueSearch, setInputValueSearch] = useState("");

    const [msgError, setMsgError] = useState('');

    const getSubAdmins = async () => {
        const dataSubAdmin = await getDocs(subAdmins);
        setData(dataSubAdmin.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const onChange = (e) => {
        const { value, id } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const validationPassword = () => {
        let isValid = true;
        if (formData.password !== '' && formData.confirmPassword !== '') {
            if (formData.password !== formData.confirmPassword) {
                isValid = false;
                setMsgError('Les deux mots de passe ne correspondent pas');
            } else {
                setMsgError('');
            }
        }
        return isValid;
    };


    const handleSubmitSubAdmin = async (e) => {
        e.preventDefault();

        if (validationPassword()) {
            if (formData.id) {
                updateEmail(auth.currentUser, formData.email).then((res) => {
                    console.log(res)
                }).catch((err) => {
                    console.log(err);
                })
                /*const docSousAdmin = doc(db, 'subAdmins', formData.id);
                await updateDoc(docSousAdmin, formData);
                getSubAdmins();
                swal({ title: "Succ??s", icon: 'success', text: `Sous admin modifi?? avec succ??s` });
                setFormData(initializeValues);
                handleCloseModal();*/
            } else {
                await addDoc(subAdmins, formData);
                createUserWithEmailAndPassword(auth, formData.email, formData.password)
                    .then((res) => {
                        console.log(res.user);
                        getSubAdmins();
                        handleCloseModal();
                        swal({ title: "Succ??s", icon: 'success', text: `Sous admin ajout?? avec succ??s` });
                        setFormData(initializeValues);

                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }

        }

        // console.log(formData)

        /* if (formData.id) {
             const docSousAdmin = doc(db, 'subAdmins', formData.id);
             await updateDoc(docSousAdmin, formData);
             getSubAdmins();
             swal({ title: "Succ??s", icon: 'success', text: `Sous admin modifi?? avec succ??s` });
             setFormData(initializeValues);
             handleCloseModal();
         } else {
             await addDoc(subAdmins, formData);
             getSubAdmins();
             handleCloseModal();
             swal({ title: "Succ??s", icon: 'success', text: `Sous admin ajout?? avec succ??s` });
             setFormData(initializeValues);
         }*/
    }

    const handleDeleteSubAdmin = async (id) => {
        const subAdminDoc = doc(db, 'subAdmins', id);

        swal({
            title: "Avertissement.",
            text: "Etes-vous s??r de vouloir supprimer ce sous-admin ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                deleteDoc(subAdminDoc)
                getSubAdmins();
                swal('Sous-admin supprim?? avec succ??s', {
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
            dataS.catName = val.email;
            docData = val.status;
            if (val.status === 'Actif') {
                dataS.status = "Bloqu??";
                etatBtn = true;
            } else if (val.status === 'Bloqu??') {
                dataS.status = "Actif";
            }
        }
    });

    const handleBloquerSubAdmin = (id) => {
        setIdDetail(id);

        const catCol = doc(db, 'subAdmins', id);
        let msg = "";
        let msgConf = "";
        if (docData === 'Actif') {
            msg = 'Etes-vous s??r de vouloir bloquer ce sous-admin ?';
            msgConf = 'Sous-admin bloqu?? avec succ??s';
        } else if (docData === 'Bloqu??') {
            msg = 'Etes-vous s??r de vouloir d??bloquer ce sous-admin ?';
            msgConf = 'Sous-admin d??bloqu?? avec succ??s';
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
                                <h4 className="align-center"> {data.length} Sous-Administrateurs <Build /> </h4>
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
                                        className='btn-voir-tout'
                                        onClick={addSudAdminModal}
                                        type="button"
                                        variant="contained"
                                        style={{ float: "right", backgroundColor: "#ed145b", color: "#fff" }}
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
                                                <th>Num??ro De T??l??phone </th>
                                                <th>E-mail </th>
                                                <th>Status</th>
                                                <th>Date De Cr??ation </th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data.length > 0 ? (
                                                    <>
                                                        {
                                                            data.map((val, index) => (

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
                                                                                    <span style={{ color: "green" }}>{val.status}</span>
                                                                                    <CheckCircleSharp style={{ marginLeft: "5px", color: 'green', fontSize: '20px' }} />
                                                                                </> :
                                                                                <>
                                                                                    <span style={{ color: "red" }}>{val.status}</span>
                                                                                    <Cancel style={{ marginLeft: "5px", color: 'red', fontSize: '20px' }} />
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
                                                                    <td colSpan="2px" style={{ textAlign: 'center', fontSize: '15px' }}>D??tail et op??rations</td>
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
                                                                                etatBtn ? <span style={{ color: "red" }}>Bloquer</span> :
                                                                                    <span style={{ color: "green" }}>D??bloquer</span>
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
                msgError={msgError}
            />
        </>
    );
}

export default SubAdmins;
