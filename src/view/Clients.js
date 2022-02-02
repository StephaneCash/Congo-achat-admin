import { Button, Card, Grid } from "@material-ui/core";
import { PersonAdd, SupervisedUserCircleOutlined } from "@material-ui/icons";
import LeftBar from "../includes/LeftBar";
import Load from "../includes/Load";
import NavBar from "../includes/NavBar";
import "../css/Clients.css";
import { db } from "../config/FirebaseConfig";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import DetailClient from "../modal/DetailClient";
import AddClient from "../modal/add-Client";

function Clients(props) {

    const collectionClients = collection(db, 'users');

    const [showModalA, setShowModalA] = useState(false);

    const addModalHandle = () => {
        setShowModalA(true)
    };

    const closeModalAdd = () => {
        setShowModalA(false);
    };

    const [data, setData] = useState([]);
    const [inputValueSearch, setInputValueSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [idClient, setIdClient] = useState();

    const getClients = async () => {
        const dataClients = await getDocs(collectionClients);
        setData(dataClients.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    useEffect(() => {
        getClients();
    }, []);

    const handleInput = (e) => {
        let value = e.target.value;
        setInputValueSearch(value.toLowerCase());
    };

    const detailClient = (id) => {
        setShowModal(true);
        setIdClient(id);
    };

    const closeModal = () => {
        setShowModal(false);
        getClients();
    }

    return (
        <>
            <div className="clients">
                <NavBar />
                <div className="d-flex">
                    <Grid xs={2} sm={2}>
                        <LeftBar />
                    </Grid>
                    <Grid xs={10} sm={10} style={{ marginTop: "80px", padding: "10px", backgroundColor: "#efefef" }}>
                        <Card style={{ padding: "10px" }}>
                            <div className="col-12" style={{ marginTop: "5px", textAlign: "center" }}>
                                <h4 className="align-center"> Gestion Clients <SupervisedUserCircleOutlined /> </h4>
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
                                        onClick={addModalHandle}
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
                                            <th>Nom d'utilisateur</th>
                                            <th>Numéro de téléphone</th>
                                            <th>Date de création</th>
                                            <th>Status</th>
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
                                                        }).map((val, index) => {
                                                            return (
                                                                <>
                                                                    <tr key={index}>
                                                                        <td>
                                                                            {
                                                                                index + 1
                                                                            }
                                                                        </td>

                                                                        <td>{val.name}</td>
                                                                        <td>{val.username}</td>
                                                                        <td>{val.phoneNumber}</td>
                                                                        <td></td>
                                                                        <td>{val.status}</td>

                                                                        <td style={{ textAlign: 'center', width: "200px", border: "1px solid silver !important" }}>
                                                                            <button type="button"
                                                                                className="btn btnChange">
                                                                                <i className="fa fa-edit"></i>
                                                                            </button>
                                                                            <button type="button"
                                                                                onClick={() => detailClient(val.id)}
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
                            </div>

                        </Card>
                    </Grid>
                </div>
            </div>
            <DetailClient
                show={showModal}
                close={closeModal}
                data={idClient}
                getClients={getClients}
            />
            <AddClient
                show={showModalA}
                close={closeModalAdd}
            />
        </>
    );
}

export default Clients;