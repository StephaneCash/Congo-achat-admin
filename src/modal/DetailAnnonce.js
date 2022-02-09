import { Modal } from "react-bootstrap";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid } from "@material-ui/core";
import { useState, useEffect } from "react";
import { db } from "../config/FirebaseConfig";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import swal from "sweetalert";
import "../css/ModalDetailAnnonce.css";

const DetailUser = (props) => {

    const [data, setData] = useState([]);
    const usersCollection = collection(db, "ads");

    const getAnnonces = async () => {
        const dataUsers = await getDocs(usersCollection);
        setData(dataUsers.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    useEffect(() => {
        getAnnonces();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleBloquerUser = () => {
        swal({
            title: "Avertissement.",
            text: "Etes-vous sûr de vouloir bloquer cet utilisateur ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                alert("Utilisateur bloqué avec succès")
            }
        })
    }

    const annonceClose  = props.close;

    console.log(annonceClose, 'Function close Modal')

    const deleteAnnonce = async (id) => {
        const annonce = doc(db, 'ads', id);
        swal({
            title: "Avertissement.",
            text: "Etes-vous sûr de vouloir supprimer cette annonce ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                deleteDoc(annonce)
                getAnnonces();
                annonceClose();
                swal('Annonce supprimée avec succès', {
                    icon: "success",
                });

            }
        }).catch((error) => {
            console.log(error);
        })
    };

    const idRecu = props.id;

    let dataS = {};
    let etatBtn = false;

    data.forEach(val => {
        if (val.id === idRecu) {
            dataS.productName = val.productName;
            if (val.status === 'Approved') {
                dataS.status = "Non Approuvé";
                etatBtn = true;
            } else if (val.status === 'Non Approuvé') {
                dataS.status = "Approved";
            }
            dataS.amount = val.amount;
        }
    });

    const handleDesaprove = (id) => {
        const annonces = doc(db, 'ads', id);

        swal({
            title: "Avertissement.",
            text: "Etes-vous sûr de vouloir désapprouver cette annonce ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                updateDoc(annonces, dataS);
                getAnnonces();
                swal('Annonce désapprouvé avec succès', {
                    icon: "success",
                });
            }
        })
    };

    return (
        <div className="modalAnnonce">
            <Modal show={props.show} className="" id="detailAnnonce">
                <Modal.Header>
                    <CardHeader
                        style={{ width: "100%" }}
                        title="Détail annonce"
                        action={
                            <i className="fa fa-close" onClick={props.close} style={{ borderRadius: "5px", cursor: 'pointer', border: '1px solid silver', padding: '10px' }}></i>
                        }
                        avatar={
                            <Avatar style={{ backgroundColor: 'black' }}>
                                {data.map((va) => {
                                    if (va.id === idRecu) {
                                        return va.productName.charAt(0).toUpperCase();
                                    }
                                })}
                            </Avatar>
                        }
                    />
                </Modal.Header>
                <Modal.Body>
                    {
                        data.map((val, index) => {
                            if (val.id === idRecu) {
                                return (
                                    <>

                                        <Card key={index}>
                                            <CardHeader title={val.productName} />
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                alt='Image annonce'
                                                image={val.photos[0] || val.photos[index + 1]}
                                            />
                                            <CardContent>
                                                <Grid xs={12} sm={12} className="mb-2">
                                                    CHF : {val.amount}
                                                </Grid>
                                                <Grid>
                                                    <table className="table table-bordered table-striped">
                                                        <tbody>
                                                            <tr>
                                                                <td>Category</td>
                                                                <td>{val.category}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Sub Category</td>
                                                                <td>{val.subCategory}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Model</td>
                                                                <td>{val.model}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Manufacture Year</td>
                                                                <td>{val.manufactureYear}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Color</td>
                                                                <td>{val.color}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Status</td>
                                                                <td>{val.status}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Expiry Date</td>
                                                                <td>{val.expireDate}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Last Bill Date</td>
                                                                <td>{val.lastBillDate}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </Grid>
                                                <Grid>
                                                    <Card>
                                                        <CardContent>
                                                            <h5>Description</h5>
                                                            {val.description}
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                                <Grid>
                                                    <CardActions>
                                                        <Button variant='outlined' style={{ color: 'orange', border: '1px solid orange' }}>Pause</Button>
                                                        <Button
                                                            variant='outlined'
                                                            color="secondary"
                                                            onClick={() => handleDesaprove(val.id)}
                                                        >
                                                            {etatBtn ? (
                                                                "Désapprouver"
                                                            ) : "Approuver"}
                                                        </Button>
                                                        <Button
                                                            variant='outlined'
                                                            style={{ color: 'red', border: '1px solid red' }}
                                                            onClick={() => deleteAnnonce(val.id)}
                                                        >
                                                            Supprimer
                                                        </Button>
                                                        <Button variant='outlined' style={{ color: 'green', border: '1px solid green' }}>Extend</Button>
                                                    </CardActions>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </>
                                )
                            }
                        })
                    }
                </Modal.Body>
                <Modal.Footer>
                    <CardActions>
                        <Button variant="outlined" onClick={props.close}>Fermer</Button>
                        <Button variant="outlined">Enregistrer</Button>
                    </CardActions>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default DetailUser;