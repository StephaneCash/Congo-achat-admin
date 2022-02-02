import { TextField, Button, Card, CardContent, Grid } from "@material-ui/core";
import { Person } from "@material-ui/icons";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/Styles";
import "../css/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    input: {
        width: "100%",
        marginBottom: "15px",
    },
    container: {
    },
    card: {
        [theme.breakpoints.up("md")]: {
            maxWidth: "30%",
            marginTop: "10px",
            minHeight: "60vh",
            padding: "10px 20px",
            margin: "0 auto",
            border: "1px solid silver"
        },
        [theme.breakpoints.down("sm")]: {
            maxWidth: "70%",
            marginTop: "10px",
            minHeight: "75vh",
            padding: "5px",
            margin: "0 auto"
        },
        [theme.breakpoints.down("xs md")]: {
            marginTop: "10px",
            height: "70vh",
            padding: "5px",
        }
    },
    btnSub: {
        minWidth: "100%",
    },
}))

const Login = () => {

    const classes = useStyles();

    const [valuesInput, setValuesInput] = useState({
        username: "", password: "",
    });

    const handleInput = (e) => {
        e.persist();
        setValuesInput({
            ...valuesInput, [e.target.name]: e.target.value
        });
    }

    let navigate = useNavigate();

    let errorsList = {};

    console.log(errorsList);

    const [etatBtn, setEtatBtn] = useState(false);

    let username = document.querySelector("#username");
    let password = document.querySelector('#password');

    const loginSubmit = (e) => {

        setEtatBtn(true);
        const data = {
            username: valuesInput.username,
            password: valuesInput.password,
        }
    }

    return (
        <div className="login">
            <div className={classes.container}>
                <Card className={classes.card}>
                    <Grid>
                        <Grid sm={12} xs={12} item={true}>
                            <CardContent>
                                <div className="icon">
                                    <div className=""><Person fontSize="large" /></div>
                                    <div className="text">Se connecter</div>
                                </div>
                            </CardContent>
                        </Grid>
                        <Grid sm={12} xs={12} item={true}>
                            {errorsList.length > 0 ? (<p><span>{errorsList.password || errorsList.username}</span></p>) : ""}
                            <CardContent>
                                <TextField
                                    className={classes.input}
                                    id="username"
                                    type="text"
                                    variant="outlined"
                                    label="Entrer votre username"
                                    name="username"
                                    onChange={handleInput}
                                    value={valuesInput.username}
                                />
                                <br />

                                <TextField
                                    className={classes.input}
                                    id="password"
                                    type="password"
                                    variant="outlined"
                                    label="Entrer votre password"
                                    onChange={handleInput}
                                    value={valuesInput.password}
                                    name="password"
                                />


                            </CardContent>
                        </Grid>
                        <Grid sm={12} xs={12} item={true}>
                            <CardContent>
                                {etatBtn === true ? (
                                    <>
                                        <Button
                                            className={classes.btnSub}
                                            variant="contained"
                                            color="secondary" onClick={loginSubmit}>C <span className="textLog">onnexion <i className="fa fa-refresh fa-spin"></i></span></Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            className={classes.btnSub}
                                            variant="contained"
                                            color="secondary" onClick={loginSubmit}>S <span className="textLog">e connecter</span></Button>
                                    </>
                                )}

                            </CardContent>
                        </Grid>
                    </Grid>


                </Card>
            </div>
        </div>
    )
}

export default Login;