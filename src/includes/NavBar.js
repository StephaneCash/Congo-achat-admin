import { AppBar, Avatar, Badge, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { Mail, Notifications, SettingsPower } from "@material-ui/icons";
import { db } from "../config/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useUserAuth } from "../config/useContextComponent";
import { Link } from "react-router-dom";
import logo from "../images/logo.jpeg";

const useStyles = makeStyles((theme) => ({
    tooBar: {
        display: "flex",
        justifyContent: 'space-between',
        backgroundColor: '#ed145b'
    },
    logoLg: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block"
        }
    },
    logoSm: {
        display: "block",
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    icons: {
        display: "flex",
        alignItems: "center"
    },
    badge: {
        marginRight: theme.spacing(2),
    },
    logout: {
        marginLeft: theme.spacing(1),
        cursor: "pointer"
    }
}));

const NavBar = () => {

    const classes = useStyles();
    const annoncesData = collection(db, 'ads');
    const [data, setData] = useState([]);

    const { user, logOut } = useUserAuth();

    const getAnnonces = async () => {
        const dataAnnonces = await getDocs(annoncesData);
        setData(dataAnnonces.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    useEffect(() => {
        getAnnonces();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const logOutHandle = async () => {
        try {
            await logOut();
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <>
            <AppBar position="fixed">
                <Toolbar className={classes.tooBar}>
                    <Typography variant="h6" component="h2" className={classes.logoLg}>
                        Congo Achat <img style={{ width: "5%", }} src={logo} alt="Logo" />
                    </Typography>
                    <Typography variant="h6" component="h2" className={classes.logoSm}>
                        <img style={{ width: "15%", }} src={logo} alt="Logo" />
                    </Typography>
                    <div className={classes.icons}>
                        <Badge badgeContent={4} color="secondary" className={classes.badge}>
                            <Mail />
                        </Badge>
                        <Link to='/annonces'>
                            <Badge badgeContent={data.length} style={{ color: "#fff" }} color="secondary" className={classes.badge}>
                                <Notifications />
                            </Badge>
                        </Link>
                        <Avatar style={{ backgroundColor: "#555" }} alt={user.email.charAt(0).toUpperCase()} src="s" title={user.email} />
                        <SettingsPower className={classes.logout} onClick={logOutHandle} />
                    </div>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default NavBar;