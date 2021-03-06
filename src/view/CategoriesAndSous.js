import { Card, Grid, Button } from '@material-ui/core';
import { Category, Add } from '@material-ui/icons';
import React from 'react';
import LeftBar from '../includes/LeftBar';
import NavBar from '../includes/NavBar';
import { db } from "../config/FirebaseConfig";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import Load from '../includes/Load';
import AddCategory from '../modal/add-Category';
import swal from 'sweetalert';
import DetailCategory from '../modal/DetailCategory';

function CategoriesAndSous(props) {

    const [data, setData] = useState([]);
    const categoryCollection = collection(db, 'categories');
    const [inputValueSearch, setInputValueSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState();
    const [showModalDetail, setShowModalDetail] = useState(false);

    const initializeValues = { id: "", catName: "", description: "", subCategory: [], };
    const [formData, setFormData] = useState(initializeValues);

    const getCaterory = async () => {
        const dataCategory = await getDocs(categoryCollection);
        setData(dataCategory.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    useEffect(() => {
        getCaterory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChange = (e) => {
        const { value, id } = e.target;
        setFormData({ ...formData, [id]: value });
    }

    const addSudAdminModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setShowModalDetail(false);
    };

    const updateSubAdminModal = (val) => {
        setFormData(val);
        addSudAdminModal();
    };

    const detailSudAdmin = (id) => {
        setId(id);
        setShowModalDetail(true)
    };
    const handleDeleteCategory = async (id) => {
        const subAdminDoc = doc(db, 'categories', id);

        swal({
            title: "Avertissement.",
            text: "Etes-vous s??r de vouloir supprimer cette cat??gorie ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                deleteDoc(subAdminDoc)
                getCaterory();
                swal('Cat??gorie supprim??e avec succ??s', {
                    icon: "success",
                });
            }
        }).catch((error) => {
            console.log(error);
        })
    }
    const handleInput = (e) => {
        let value = e.target.value;
        setInputValueSearch(value.toLowerCase());
    };

    const handleSubmitSubAdmin = async (e) => {
        e.preventDefault();

        if (formData.id) {
            const docSousAdmin = doc(db, 'categories', formData.id);
            await updateDoc(docSousAdmin, formData);
            getCaterory();
            swal({ title: "Succ??s", icon: 'success', text: `Cat??gorie modifi??e avec succ??s` });
            setFormData(initializeValues);
            closeModal();
        } else {
            await addDoc(categoryCollection, formData);
            getCaterory();
            swal({ title: "Succ??s", icon: 'success', text: `Cat??gorie ajout??e avec succ??s` });
            setFormData(initializeValues);
            closeModal();
        }
    }

    return (
        <div>
            <div className="categories">
                <NavBar />
                <div className="d-flex">
                    <Grid xs={2} item>
                        <LeftBar />
                    </Grid>
                    <Grid xs={10} item style={{ marginTop: "80px", padding: "10px", backgroundColor: "#efefef" }}>
                        <Card style={{ padding: "10px" }}>
                            <div className="col-12" style={{ marginTop: "5px", textAlign: "center" }}>
                                <h4 className="align-center"> Cat??gories et Sous Cat??gories <Category /> </h4>
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
                                                    onChange={handleInput}
                                                />
                                                <div className="input-group-append">
                                                    <i
                                                        style={{ height: '40px', lineHeight: '30px' }}
                                                        className="input-group-text fa fa-search fa-1x"
                                                        aria-hidden="true"></i>
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
                                        style={{ float: "right", backgroundColor: "#ed145b", color: "#fff" }}
                                    >
                                        <Add />
                                    </Button>

                                </div>
                            </div>
                            <div className="col-12 mt-3">
                                <div className="sudAdminsList tableGestionMonetaire">
                                    <table className="table table-bordered table-borderless table-hover">
                                        <thead style={{ backgroundColor: "#efefef" }}>
                                            <tr>
                                                <th>#</th>
                                                <th>Nom </th>
                                                <th>Description </th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data.length > 0 ? (
                                                    <>
                                                        {
                                                            data.filter((val)=>{
                                                                return val.catName.toLowerCase().includes(inputValueSearch);
                                                            }).map((val, index) => (

                                                                <tr key={index}>
                                                                    <td>
                                                                        {
                                                                            index + 1
                                                                        }
                                                                    </td>

                                                                    <td>{val.catName}</td>
                                                                    <td>{val.description}</td>

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
                                                                            onClick={() => handleDeleteCategory(val.id)}
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
                    </Grid>
                </div>
            </div>
            <AddCategory
                show={showModal}
                closeModal={closeModal}
                onChange={onChange}
                data={formData}
                handleSubmitSubAdmin={handleSubmitSubAdmin}
            />
            <DetailCategory
                show={showModalDetail}
                close={closeModal}
                data={id}
            />
        </div>
    )
}

export default CategoriesAndSous