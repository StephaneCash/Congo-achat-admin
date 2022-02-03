import { TextField, Button, Card, CardContent, Grid } from "@material-ui/core";
import { Person } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/Styles";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../config/useContextComponent";


const useStyles = makeStyles((theme) => ({
    input: {
        width: "100%",
        marginBottom: "15px",
    },
    container: {
        paddingTop: "20px"
    },
    card: {
        [theme.breakpoints.up("md")]: {
            maxWidth: "26.5%",
            minHeight: "72vh",
            padding: "20px 20px",
            margin: "0 auto",
            border: "1px solid silver",
            boxShadow: "2px 2px 10px gray",
            backgroundColor: "#ff"
        },
        [theme.breakpoints.down("sm")]: {
            maxWidth: "70%",
            minHeight: "75vh",
            padding: "5px",
            backgroundColor: "#ff",
            margin: "0 auto"
        },
        [theme.breakpoints.down("xs md")]: {
            height: "70vh",
            padding: "5px",
            backgroundColor: "#ff"
        }
    },
    btnSub: {
        minWidth: "100%",
    },
}))

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useUserAuth();

    const classes = useStyles();

    let navigate = useNavigate();

    const loginSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (err) {
            setError(err);
            console.log("Erreur : ", error);
        }
    }

    return (
        <div className="login">
            <>
                <div className={classes.container}>
                    <Card className={classes.card}>
                        <Grid>
                            <Grid sm={12} xs={12} item={true}>
                                <CardContent style={{
                                    border: '1px solid #555',
                                    width: "70px",
                                    height: "70px",
                                    borderRadius: "100%",
                                    textAlign: "center",
                                    margin: "5px auto",
                                    padding: "20px 5px",
                                }}>
                                    <div className="icon">
                                        <div className=""><Person /></div>
                                    </div>

                                </CardContent>
                                <h3 style={{ textAlign: "center" }}>S'identifier</h3>

                            </Grid>
                            <div style={{width: '91%', margin: '0 auto'}}>{error !== "" && <div className="alert alert-danger">{error.code}</div>}</div>
                            <form onSubmit={loginSubmit}>
                                <Grid sm={12} xs={12} item={true}>
                                    <CardContent>
                                        <TextField
                                            className={classes.input}
                                            id="username"
                                            type="text"
                                            required
                                            variant="outlined"
                                            label="Entrer votre username"
                                            name="username"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <TextField
                                            className={classes.input}
                                            id="password"
                                            type="password"
                                            required
                                            variant="outlined"
                                            label="Entrer votre password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            name="password"
                                        />
                                        <GoogleButton className={classes.btnSub} />

                                    </CardContent>
                                </Grid>
                                <Grid sm={12} xs={12} item={true}>
                                    <CardContent>

                                        <Button
                                        style={{height:"50px"}}
                                            type="submit"
                                            className={classes.btnSub}
                                            variant="contained"
                                            color="secondary"
                                        >
                                            S <span className="textLog">e connecter</span>
                                        </Button>

                                    </CardContent>
                                </Grid>
                            </form>
                        </Grid>
                    </Card>
                </div>
            </>
            )
        </div >
    )
}

export default Login;