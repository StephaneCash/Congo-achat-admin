import React from 'react';
import { useState, useEffect } from "react";
import { db } from "../config/FirebaseConfig";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { Modal } from "react-bootstrap";
import { Button, ButtonGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 900,
        backgroundColor: 'white',
        border: "2px solid silver",
        boxShadow: theme.shadows[5],
        top: '26%',
        left: '50%',
        transform: 'translate(-50%, -30%)',
        height: "auto",
        zIndex: "9000"
    },
}))

function DetailClient(props) {

    const [data, setData] = useState([]);
    const usersCollection = collection(db, "users");

    const idRecu = props.data;
    const classes = useStyles();

    const getClients = props.getClients;

    const getUsers = async () => {
        const dataUsers = await getDocs(usersCollection);
        setData(dataUsers.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    let navigate = useNavigate();

    useEffect(() => {
        getUsers();
    }, []);

    const [etat, setEtat] = useState('');

    let dataS = {};

    data.forEach(val => {
        if (val.id === idRecu) {
            dataS.name = val.name;
            if (val.status === 'Actif') {
                dataS.status = "Non actif";
            } else if (val.status === 'Non actif') {
                dataS.status = "Actif";
            }
            dataS.username = val.username;
        }
    });

    const handleDeBloquerUser = (id) => {
        const userDoc = doc(db, 'users', id);

        swal({
            title: "Avertissement.",
            text: "Etes-vous sûr de vouloir débloquer ce client ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                updateDoc(userDoc, dataS);
                swal('Client débloqué avec succès', {
                    icon: "success",
                });
            }
        })
    }

    const handleBloquerUser = (id) => {
        const userDoc = doc(db, 'users', id);

        swal({
            title: "Avertissement.",
            text: "Etes-vous sûr de vouloir bloquer ce client ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                updateDoc(userDoc, dataS);
                swal('Client bloqué avec succès', {
                    icon: "success",
                });
            }
        })
    }

    return <>
        <Modal show={props.show} className={classes.modal} id="detailUser">
            <Modal.Header>Détail Client</Modal.Header>
            <Modal.Body>
                <table className="table table-hover table-striped ">
                    <tbody>
                        {
                            data.map((val, i) => {
                                if (val.id === idRecu) {
                                    return (
                                        <>
                                            <tr key={i}>
                                                <td>Name</td>
                                                <td>{val.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Username</td>
                                                <td>{val.username}</td>
                                            </tr>
                                            <tr>
                                                <td>Phone</td>
                                                <td>{val.phoneNumber}</td>
                                            </tr>
                                            <tr>
                                                <td>Date de création</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Status</td>
                                                <td>{val.status}</td>
                                            </tr>
                                            <tr>
                                                {val.status === "Actif" ? (<>
                                                    <Button
                                                        id="btn"
                                                        variant="outlined"
                                                        style={{ color: "#c72f3c", marginTop: "10px" }}
                                                        onClick={() => handleBloquerUser(val.id)}>
                                                        Bloquer
                                                    </Button>
                                                </>) : (<>
                                                    <Button
                                                        variant="outlined"
                                                        style={{ color: "#c72f3c", marginTop: "10px" }}
                                                        onClick={() => handleDeBloquerUser(val.id)}>
                                                        Débloquer
                                                    </Button>
                                                </>)}
                                            </tr>
                                        </>
                                    )
                                }
                            })
                        }
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outlined" onClick={props.close}>Fermer</Button>
            </Modal.Footer>
        </Modal>
    </>;
}

export default DetailClient;
