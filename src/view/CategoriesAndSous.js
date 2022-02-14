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

function CategoriesAndSous(props) {

    const [data, setData] = useState([]);
    const categoryCollection = collection(db, 'categories');
    const [inputValueSearch, setInputValueSearch] = useState('');
    const [showModal, setShowModal] = useState(false);

    const initializeValues = { id: "", catName: "", description: "", subCategory: "", };
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
        console.log(id, ' : ', value)
    }

    const addSudAdminModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const updateSubAdminModal = () => {

    };

    const detailSudAdmin = () => {

    };

    const handleDeleteSubAdmin = () => {

    };

    const handleInput = (e) => {
        let value = e.target.value;
        setInputValueSearch(value.toLowerCase());
    };

    const handleSubmitSubAdmin = async (e) => {
        e.preventDefault();

        if (formData.id) {
            const docSousAdmin = doc(db, 'categories', formData.id);
            await updateDoc(docSousAdmin, formData);
            getCaterory()
            swal({ title: "Succès", icon: 'success', text: `Catégorie modifiée avec succès` });
            setFormData(initializeValues);
        } else {
            await addDoc(categoryCollection, formData);
            getCaterory()
            swal({ title: "Succès", icon: 'success', text: `Catégorie ajoutée avec succès` });
            setFormData(initializeValues);
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
                                <h4 className="align-center"> Catégories et Sous Catégories <Category /> </h4>
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
                                        style={{ float: "right", backgroundColor: "#973c44", color: "#fff" }}
                                    >
                                        <Add />
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
                                                <th>Description </th>
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
        </div>
    )
}

export default CategoriesAndSous