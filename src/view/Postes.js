import { Card, Grid } from '@material-ui/core'
import { PostAddRounded } from '@material-ui/icons'
import React from 'react'
import LeftBar from '../includes/LeftBar'
import NavBar from '../includes/NavBar'

function Postes() {
    return (
        <>
            <NavBar />
            <div className="d-flex">
                <Grid xs={2} item>
                    <LeftBar />
                </Grid>
                <Grid xs={10} item style={{ marginTop: "80px", padding: "10px", backgroundColor: "#efefef" }}>
                    <Card style={{ padding: "10px" }}>
                        <div className="col-12" style={{ marginTop: "5px", textAlign: "center" }}>
                            <h4 className="align-center"> Postes <PostAddRounded /> </h4>
                            <h5 style={{ borderBottom: "1px solid #efefef" }}></h5>
                        </div>
                    </Card>
                </Grid>
            </div>
        </>
    )
}

export default Postes