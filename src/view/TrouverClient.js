import { Navigation } from '@material-ui/icons';
import { Card, Grid } from '@mui/material';
import React from 'react';
import LeftBar from '../includes/LeftBar';
import NavBar from '../includes/NavBar';
import ReactMapGL, { Marker, Popup, FullscreenControl, NavigationControl, FlyToInterpolator } from "react-map-gl";
import { useState } from "react";
import MarkerUser from "../modal/MarkerUser";
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
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

    const [etatModal, setEtatModal] = useState(false);

    const closeModal = () => {
        setEtatModal(false);
    };

    const viewDetailUser = () => {
        setEtatModal(true);
        return (
            <>
                <Popup>All</Popup>
            </>
        )
    }

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
                                    <Marker
                                        latitude={-2.9814344}
                                        longitude={23.8222636}
                                        onClick={viewDetailUser}
                                    >
                                        <i className="fa fa-map-marker fa-2x" style={{ color: "red", cursor: "pointer" }}></i>
                                    </Marker>
                                </ReactMapGL>
                            </Card>
                        </Card>
                    </Grid>
                </div>
            </div>

            <MarkerUser
                show={etatModal}
                close={closeModal}
            />
        </>
    );
}

export default TrouverClient;
