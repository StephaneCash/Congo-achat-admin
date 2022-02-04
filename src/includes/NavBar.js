import { AppBar, Avatar, Badge, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { Mail, Notifications, SettingsPower } from "@material-ui/icons";
import { db } from "../config/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useUserAuth } from "../config/useContextComponent";
import { Link, useNavigate } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    tooBar: {
        display: "flex",
        justifyContent: 'space-between',
        backgroundColor: '#c72f3c'
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

    const {user} = useUserAuth();
    console.log("User", user);

    const getAnnonces = async () => {
        const dataAnnonces = await getDocs(annoncesData);
        setData(dataAnnonces.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    useEffect(() => {
        getAnnonces();
    }, []);

    let navigate = useNavigate();

    const logOut = () =>{
        navigate("/");
    }

    return (
        <>
            <AppBar position="fixed">
                <Toolbar className={classes.tooBar}>
                    <Typography variant="h6" component="h2" className={classes.logoLg}>
                        Congo Achat
                    </Typography>
                    <Typography variant="h6" component="h2" className={classes.logoSm}>
                        Congo Achat
                    </Typography>
                    <div className={classes.icons}>
                        <Badge badgeContent={4} color="secondary" className={classes.badge}>
                            <Mail color="white" />
                        </Badge>
                        <Badge badgeContent={data.length} color="secondary" className={classes.badge}>
                            <Notifications color="white" />
                        </Badge>
                        <Avatar alt={user.email.toUpperCase()} src="s"/>
                        <SettingsPower className={classes.logout} onClick={logOut}  />
                    </div>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default NavBar;