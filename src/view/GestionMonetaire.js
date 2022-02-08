import { Card, Grid } from '@material-ui/core';
import { MonetizationOn } from '@material-ui/icons';
import React from 'react';
import LeftBar from '../includes/LeftBar';
import NavBar from '../includes/NavBar';

function GestionMonetaire() {
    return (
        <>
            <div className="provinces">
                <NavBar />
                <div className="d-flex">
                    <Grid xs={2} sm={2}>
                        <LeftBar />
                    </Grid>
                    <Grid xs={10} sm={10} style={{ marginTop: "80px", padding: "10px", backgroundColor: "#efefef" }}>
                        <Card style={{ padding: "10px" }}>
                            <div className="col-12" style={{ marginTop: "5px", textAlign: "center" }}>
                                <h4 className="align-center"> <MonetizationOn /> Gestion monétaire  </h4>
                                <h5 style={{ borderBottom: "1px solid #efefef" }}></h5>
                            </div>
                        </Card>
                    </Grid>
                </div>
            </div>
        </>
    );
}

export default GestionMonetaire;
