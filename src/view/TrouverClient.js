import { Navigation } from '@material-ui/icons';
import { Card, Grid } from '@mui/material';
import React from 'react';
import LeftBar from '../includes/LeftBar';
import NavBar from '../includes/NavBar'
    ; import ReactMapGL, { Marker, Popup, FullscreenControl, NavigationControl } from "react-map-gl";
import { useState } from "react";

function TrouverClient() {

    const fullscreenControlStyle = {
        right: 10,
        top: 10
    };

    const navControlStyle = {
        bottom: 20,
        right: 10
    };

    const [viewport, setViewport] = useState({
        latitude: -2.9814344,
        longitude: 23.8222636,
        width: "auto",
        height: "75vh",
        zoom: 4,
        pitch: 0
    });

    return (
        <>
            <div className="users appSettings">
                <NavBar />
                <div className="d-flex">
                    <Grid xs={2} item>
                        <LeftBar />
                    </Grid>
                    <Grid xs={10} item style={{ marginTop: "80px", padding: "10px", backgroundColor: "#efefef" }}>
                        <Card style={{ padding: "10px" }}>
                            <div className="col-12" style={{ marginTop: "5px", textAlign: "center" }}>
                                <h4 className="align-center"> Clients Localisation<Navigation /> </h4>
                                <h5 style={{ borderBottom: "1px solid #efefef" }}></h5>
                            </div>
                            <Card>
                                <ReactMapGL
                                    mapStyle="mapbox://styles/mapbox/navigation-night-v1"
                                    {...viewport}
                                    mapboxApiAccessToken="pk.eyJ1IjoiY2FzaHN0ZXBoIiwiYSI6ImNremU2bnJnOTBlOGIyd25yMjJkYTQ2azcifQ.ngDRR6DnLlrJKnoQhssxNQ"
                                    onViewportChange={viewport => {
                                        setViewport(viewport)
                                    }}
                                >
                                    <FullscreenControl style={fullscreenControlStyle} />
                                    <NavigationControl style={navControlStyle} />
                                </ReactMapGL>
                            </Card>
                        </Card>
                    </Grid>
                </div>
            </div>
        </>
    );
}

export default TrouverClient;
