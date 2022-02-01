import { Button, Card, Grid } from '@material-ui/core';
import { PersonAdd } from '@material-ui/icons';
import React from 'react';
import LeftBar from '../includes/LeftBar';
import Load from '../includes/Load';
import NavBar from '../includes/NavBar';

function Provinces() {
  return <>
    <div className="provinces">
                <NavBar />
                <div className="d-flex">
                    <Grid xs={2} sm={2}>
                        <LeftBar />
                    </Grid>
                    <Grid xs={10} sm={10} style={{ marginTop: "80px", padding: "10px", backgroundColor: "#efefef" }}>
                        <Card style={{ padding: "10px" }}>
                            <div className="col-12" style={{ marginTop: "5px", textAlign: "center" }}>
                                <h4 className="align-center"> Gestion Provinces  </h4>
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
                                            <th>Nom</th>
                                            <th>Nom d'utilisateur</th>
                                            <th>Numéro de téléphone</th>
                                            <th>Date de création</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                </table>
                            </div>

                        </Card>
                    </Grid>
                </div>
            </div>
  </>;
}

export default Provinces;
