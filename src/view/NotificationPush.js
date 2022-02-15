import { Card, Grid, makeStyles } from "@material-ui/core";
import LeftBar from "../includes/LeftBar";
import NavBar from "../includes/NavBar";
import { db } from "../config/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import Load from "../includes/Load";
import { NotificationsActive } from "@material-ui/icons";

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

const NotificationPush = () => {


    const collectionNotifications = collection(db, 'notifications');
    const [data, setData] = useState([]);

    const classes = useStyles();

    const getNotifications = async () => {
        const dataNotifications = await getDocs(collectionNotifications);
        setData(dataNotifications.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

  /* useEffect(() => {
        const msg = firebase.messaging();
        msg.requestPermission().then(() => {
            return msg.getToken();
        }).then((data) => {
            console.warn('Token ', data);
        })
    })*/

    useEffect(() => {
        getNotifications();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                                <h4 className="align-center"> {data.length} Notifications Push  <NotificationsActive /> </h4>
                                <h5 style={{ borderBottom: "1px solid #efefef" }}></h5>
                            </div>
                            <div className="container">

                            </div>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default NotificationPush;