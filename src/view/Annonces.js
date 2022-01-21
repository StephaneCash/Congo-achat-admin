import { Card, CardActions, Button, CardMedia, Grid, makeStyles, Typography, CardHeader } from "@material-ui/core";
import LeftBar from "../includes/LeftBar";
import NavBar from "../includes/NavBar";
import "../css/Annonces.css";
import { db } from "../config/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import Load from "../includes/Load";
import "../css/essai.css";
import DetailAnnonce from "../modal/DetailAnnonce";
import { Announcement } from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
    griddash: {
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            display: "block"
        },
    },
    stat: {
        [theme.breakpoints.down("sm")]: {
            maxWidth: "10%",
            marginTop: "10px",
        }
    },
}));

const Annonces = () => {

    const annoncesData = collection(db, 'ads');
    const [data, setData] = useState([]);

    const [idDetail, setIdDetail] = useState();
    const [etatModal, setEtatModal] = useState(false);

    const classes = useStyles();

    const getAnnonces = async () => {
        const dataAnnonces = await getDocs(annoncesData);
        setData(dataAnnonces.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    useEffect(() => {
        getAnnonces();
    }, []);

    const detailAnnonce = (id) => {
        setIdDetail(id);
        setEtatModal(true);
    }

    const closeModal = () => {
        setEtatModal(false);
    }

    return (
        <>
            <NavBar />
            <Grid container>
                <Grid item sm={2} xs={2}>
                    <LeftBar />
                </Grid>
                <Grid item sm={10} xs={10} style={{ marginTop: "80px", padding: "10px", backgroundColor: "#efefef" }}>
                    <Grid sm={12}>
                        <Card style={{ padding: "10px" }}>
                            <div className="col-12" style={{ marginTop: "15px", textAlign: "center" }}>
                                <h4 className="align-center">  Annonces <Announcement /> </h4>
                                <h5 style={{ borderBottom: "1px solid #efefef" }}></h5>
                            </div>
                            <div className={classes.griddash}>
                                <Grid item={true} id="stat" xs={12} sm={12}>
                                    <div className="gallery">
                                        {data.length > 0 ? (<>
                                            {data.map((val, index) => {
                                                return (
                                                    <div className="pics" key={index}>
                                                        <Card sx={{ maxWidth: 345 }}>
                                                            <CardHeader
                                                                subheader={val.subCategory}
                                                            />
                                                            <CardMedia
                                                                component="img"
                                                                height="194"
                                                                image={val.photos}
                                                            />
                                                            <CardActions disableSpacing>
                                                                <Typography>
                                                                    <strong style={{ fontSize: '26px' }}>{val.productName}</strong> <br />
                                                                    {val.province}, {val.city}
                                                                </Typography>
                                                                <Typography variant="h5"></Typography>
                                                            </CardActions>
                                                            <CardActions>
                                                                <Button variant='outlined' onClick={() => detailAnnonce(val.id)}>Détail</Button>
                                                            </CardActions>
                                                        </Card>
                                                    </div>
                                                )
                                            })}
                                        </>) : (<>
                                            <div className="loader" style={{ margin: '0 auto' }}>
                                                <Load style={{ margin: '0 auto', color: 'red'}} />
                                            </div>
                                        </>)}

                                    </div>
                                </Grid>
                            </div>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>

            <DetailAnnonce
                show={etatModal}
                id={idDetail}
                close={closeModal}
            />
        </>
    );
}

export default Annonces;