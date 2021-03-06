import '../css/Users.css';
import { useState, useEffect } from "react";
import AddUser from "../modal/add-user";
import _ from "lodash";
import NavBar from "../includes/NavBar";
import { Button, Card, Grid } from "@material-ui/core";
import LeftBar from "../includes/LeftBar";
import { Cancel, CheckCircleSharp, PersonAdd } from "@material-ui/icons";
import swal from "sweetalert";
import DetailUser from "../modal/detailUser";
import { db } from "../config/FirebaseConfig";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import Load from '../includes/Load';

function Users() {

    const [data, setData] = useState([]);
    const [dataInput, setDataInput] = useState('');

    const usersCollection = collection(db, "users");

    const initialiseValues = { id: "", username: "", email: "", name: "", phoneNumber: "", province: "", city: "", balance: "", status: "" };
    const [formData, setFormData] = useState(initialiseValues);

    const [etatModal, setEtatModal] = useState(false);
    const [ListErr, setListErr] = useState(initialiseValues);

    const [detailUser, setDetailUser] = useState();
    const [detailModal, seteDtailModal] = useState(false);

    const onChange = (e) => {
        //console.log(e);
        const { value, id } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmitUser = async (e) => {

        e.preventDefault();

        if (formData.id) {
            const userDoc = doc(db, 'users', formData.id);
            await updateDoc(userDoc, formData)
            getUsers();
            setEtatModal(false);
            swal({ title: "Succès", icon: 'success', text: `User édité avec succès` });
            setFormData(initialiseValues);
            setListErr(initialiseValues);
            setFormData(initialiseValues);
        }
        else {

            await addDoc(usersCollection, formData);

            getUsers();
            setEtatModal(false);
            swal({ title: "Succès", icon: 'success', text: `User ajouté avec succès` });
            setFormData(initialiseValues);
            setListErr(initialiseValues);

        }
    }

    const showModalAddUser = () => {
        setEtatModal(true);
    }

    const closeModalDetailUser = () => {
        seteDtailModal(false);
    }

    const getUsers = async () => {
        const dataUsers = await getDocs(usersCollection);
        setData(dataUsers.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    useEffect(() => {
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = (e) => {
        let value = e.target.value.toLowerCase();
        setDataInput(value);
    }

    const cloeModalAddUser = () => {
        setEtatModal(false);
        setFormData(initialiseValues);
        getUsers();
    };

    const handleDetailUser = (id) => {
        setDetailUser(id);
        seteDtailModal(true);
        getUsers();
    }

    const handleUpdateUser = (val) => {
        setFormData(val);
        showModalAddUser();
    };

    const handleDeleteUser = async (id) => {

        const userDoc = doc(db, 'users', id);
        swal({
            title: "Avertissement.",
            text: "Etes-vous sûr de vouloir supprimer cet utilisateur ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                deleteDoc(userDoc)
                getUsers();
                swal('User supprimé avec succès', {
                    icon: "success",
                });
            }
        }).catch((error) => {
            console.log(error);
        })
    };

    return (<>
        <div className="users">
            <NavBar />
            <Grid item className="d-flex">
                <Grid item xs={2}>
                    <LeftBar />
                </Grid>
                <Grid item xs={10} style={{ marginTop: "80px", padding: "10px", backgroundColor: "#efefef" }}>
                    <Card style={{ padding: "10px" }}>
                        <div className="col-12" style={{ marginTop: "5px", textAlign: "center" }}>
                            <h4 className="align-center"> {data.length} Users <i className="fa fa-user-circle"></i> </h4>
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
                                                placeholder="Rechercher..."
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
                                    className='btn-voir-tout'
                                    type="button"
                                    onClick={showModalAddUser}
                                    variant="contained"
                                    style={{ float: "right", backgroundColor: "#ed145b", color: "#fff" }}
                                >
                                    <PersonAdd />
                                </Button>

                            </div>
                        </div>

                        <div className="col-12 mt-3 dataUsers" >
                            <table className="table table-bordered table-borderless table-hover">
                                <thead style={{ backgroundColor: "#efefef" }}>
                                    <tr>
                                        <th>#</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>City, Province</th>
                                        <th>Balance</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.length > 0 ? (
                                            <>
                                                {
                                                    data.filter(val => {
                                                        return val.name.toLowerCase().includes(dataInput);
                                                    }).map((val, index) => (
                                                        <tr key={val.id}>
                                                            <td>
                                                                {
                                                                    index + 1
                                                                }
                                                            </td>

                                                            <td>{val.username}</td>
                                                            <td>{val.email}</td>
                                                            <td>{val.name}</td>
                                                            <td>{val.phoneNumber}</td>
                                                            <td>{val.province}</td>
                                                            <td>
                                                                {val.balance} {val.balance.length > 0 ? 'CDF' : ''}
                                                            </td>
                                                            <td>
                                                                {
                                                                    val.status === "Actif" ?
                                                                        <>
                                                                            <span style={{ color: "green" }}>{val.status} </span>
                                                                            <CheckCircleSharp style={{ marginLeft: '5px', color: 'green', fontSize: '22px' }} />
                                                                        </> :
                                                                        <>
                                                                            <span style={{ color: "red" }}>{val.status} </span>
                                                                            <Cancel style={{ marginLeft: '5px', color: 'red', fontSize: '20px' }} />
                                                                        </>
                                                                }
                                                            </td>
                                                            <td style={{ textAlign: 'center', width: "200px", border: "1px solid silver !important" }}>
                                                                <button type="button"
                                                                    onClick={() => handleUpdateUser(val)}
                                                                    className="btn btnChange">
                                                                    <i className="fa fa-edit"></i>
                                                                </button>
                                                                <button type="button"
                                                                    onClick={() => handleDetailUser(val.id)}
                                                                    className="btn btnChange">
                                                                    <i className="fa fa-info"></i>
                                                                </button>
                                                                <button type="button"
                                                                    onClick={() => handleDeleteUser(val.id)}
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
                    </Card>
                    <DetailUser
                        show={detailModal}
                        data={detailUser}
                        close={closeModalDetailUser}
                        getU={getUsers}
                    />
                </Grid>
            </Grid>
        </div>

        <AddUser
            show={etatModal}
            close={cloeModalAddUser}
            data={formData}
            onChange={onChange}
            handleSubmitUser={handleSubmitUser}
            ListErr={ListErr}
        />
    </>);
}

export default Users;