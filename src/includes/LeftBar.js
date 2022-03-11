import { Container, makeStyles, Typography } from "@material-ui/core";
import {
    ApartmentTwoTone, Build, Category, Dashboard,
    MonetizationOn, People, Settings, LocationOn, Announcement, PostAddRounded, NotificationsActive
} from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import "../css/Menu.css";


const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        backgroundColor: "#333",
        height: "100vh",
        color: '#fff',
        border: "1px solid silver",
        position: "fixed",
        width: "15%",
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(4),
        [theme.breakpoints.up("sm")]: {
            marginBottom: theme.spacing(1.5),
            fontSize: "18px",
            cursor: 'pointer',
        },
    },
    text: {
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    icon: {
        marginRight: theme.spacing(1),
        [theme.breakpoints.up("sm")]: {
            fontSize: "18px"
        }
    }
}));

const LeftBar = () => {

    const classes = useStyles();

    return (
        <>
            <Container className={classes.container} id="conatiner">
                <div className={classes.item}>
                    <NavLink to="/dashboard" className="d-flex">
                        <Dashboard className={classes.icon} id="icon" />
                        <Typography className={classes.text} >
                            Dashboard
                        </Typography>
                    </NavLink>
                </div>
                <div className={classes.item}>
                    <NavLink to="/users" className="d-flex">
                        <People className={classes.icon} id="icon" />
                        <Typography className={classes.text}>
                            Utilisateurs
                        </Typography>
                    </NavLink>
                </div>
                <div className={classes.item}>
                    <NavLink to="/annonces" className="d-flex">
                        <Announcement className={classes.icon} id="icon" />
                        <Typography className={classes.text}>
                            Annonces
                        </Typography>
                    </NavLink>
                </div>
                <div className={classes.item}>
                    <NavLink to="/subAdmins" className="d-flex">
                        <Build className={classes.icon} />
                        <Typography className={classes.text}>
                            Sous Admins
                        </Typography>
                    </NavLink>
                </div>
                <div className={classes.item}>
                    <NavLink to="/findClient" className="d-flex">
                        <LocationOn className={classes.icon} />
                        <Typography className={classes.text}>
                            Trouver vos clients
                        </Typography>
                    </NavLink>
                </div>
                <div className={classes.item}>
                    <NavLink to='/gestion-monetaire' className="d-flex">
                        <MonetizationOn className={classes.icon} />
                        <Typography className={classes.text}>
                            Gestion monétaire
                        </Typography>
                    </NavLink>
                </div>
                <div className={classes.item}>
                    <NavLink to="/categories" className="d-flex">
                        <Category className={classes.icon} />
                        <Typography className={classes.text}>
                            Catégories
                        </Typography>
                    </NavLink>
                </div>
                <div className={classes.item}>
                    <NavLink to="/postes" className="d-flex">
                        <PostAddRounded className={classes.icon} />
                        <Typography className={classes.text}>
                            Postes
                        </Typography>
                    </NavLink>
                </div>
                <div className={classes.item}>
                    <NavLink to="/provinces" className="d-flex">
                        <ApartmentTwoTone className={classes.icon} />
                        <Typography className={classes.text}>
                            Provinces
                        </Typography>
                    </NavLink>
                </div>
                <div className={classes.item}>
                    <NavLink to="/notifications" className="d-flex">
                        <NotificationsActive className={classes.icon} />
                        <Typography className={classes.text}>
                            Notifications
                        </Typography>
                    </NavLink>
                </div>
            </Container>
        </>
    );
}

export default LeftBar;