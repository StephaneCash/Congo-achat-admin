import { Card, CardActions, Button, CardMedia, Grid, makeStyles, Typography, CardHeader } from "@material-ui/core";
import LeftBar from "../includes/LeftBar";
import NavBar from "../includes/NavBar";
import { db } from "../config/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import Load from "../includes/Load";
import "../css/essai.css";
import DetailAnnonce from "../modal/DetailAnnonce";
import { Announcement } from "@material-ui/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "../css/Annonces.css";

const useStyles = makeStyles((theme) => ({
    griddash: {
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            display: "block",
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const detailAnnonce = (id) => {
        setIdDetail(id);
        setEtatModal(true);
    };

    const closeModal = () => {
        setEtatModal(false);
        getAnnonces();
    };
    let tabPhotos = {};

    for (let i = 0; i < data.length; i++) {
        tabPhotos = { ...data[i].photos }
    }
    console.log(tabPhotos)

    return (
        <>
            <NavBar />
            <Grid item container>
                <Grid item xs={2}>
                    <LeftBar />
                </Grid>
                <Grid item xs={10} style={{ marginTop: "80px", padding: "10px", backgroundColor: "#efefef" }}>
                    <Grid item sm={12}>
                        <Card style={{ padding: "10px" }}>
                            <div className="col-12" style={{ marginTop: "15px", textAlign: "center" }}>
                                <h4 className="align-center"> {data.length} Annonces <Announcement /> </h4>
                                <h5 style={{ borderBottom: "1px solid #efefef" }}></h5>
                            </div>
                            <div className={classes.griddash}>
                                <Grid item={true} id="stat" xs={12}>
                                    <div className="gallery pictures">
                                        {data.length > 0 && (<>
                                            {data.map((val, index) => {
                                                return (
                                                    <div className="pics" key={index}>
                                                        <Card sx={{ maxWidth: 34 }}>
                                                            <CardHeader
                                                                subheader={val.subCategory}
                                                            />
                                                            <CardMedia
                                                                component="img"
                                                                height="150"
                                                                onClick={() => detailAnnonce(val.id)}
                                                                image={val.photos[0] || val.photos[1] || val.photos[2] || val.photos[3] || val.photos[4]}
                                                            />
                                                            <CardActions disableSpacing>
                                                                <Typography>
                                                                    <strong style={{ fontSize: '20px' }}>{val.productName}</strong> <br />
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
                                        </>)
                                        }

                                    </div>
                                    {data.length <= 0 && (<>
                                        <Grid xs={12} className="loader" item={true}>
                                            <Load style={{ color: 'red' }} />
                                        </Grid>
                                    </>)}
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