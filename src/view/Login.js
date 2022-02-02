import { TextField, Button, Card, CardContent, Grid } from "@material-ui/core";
import { Person } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/Styles";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../config/useContextComponent";


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
            minHeight: "70vh",
            padding: "20px 20px",
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

    const { modalState, toggleModals } = useContext(UserContext);

    const inputs = useRef([]);

    const addInputs = (el) => {
        if (el && !inputs.current.includes(el)) {
            inputs.current.push(el);
        }
    }

    const classes = useStyles();

    const [valuesInput, setValuesInput] = useState({
        username: "", password: "",
    });

    const handleInput = (e) => {
        e.persist();
        setValuesInput({
            ...valuesInput, [e.target.name]: e.target.value
        });

        if (e.target.value !== "") {
            //setUserValid("")
        }
    }

    let navigate = useNavigate();

    const [etatBtn, setEtatBtn] = useState(false);
    const [userValid, setUserValid] = useState("");
    const [passValid, setPassValid] = useState("");

    const loginSubmit = (e) => {
        e.preventDefault();

        let username = document.getElementsByName('username')[0];
        let pass = document.getElementsByName('password')[0];

        console.log(passValid);

        if (username.value === "") {
            setUserValid("Veuillez renseigner le username svp.");
            return false;
        }
        if (username.value !== "") {
            setUserValid("");
        }
        if (pass.value === "") {
            setPassValid("Veuillez renseigner le password svp.");
            return false;
        }

        if (pass.value !== "") {
            setPassValid("");
        }

        return true;
    }

    return (
        <div className="login">
            {
                modalState.signUpModal && (
                    <>
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
                                    <form onSubmit={loginSubmit}>
                                        <Grid sm={12} xs={12} item={true}>
                                            <CardContent>
                                                <TextField
                                                    ref={addInputs}
                                                    className={classes.input}
                                                    id="username"
                                                    type="text"
                                                    variant="outlined"
                                                    label="Entrer votre username"
                                                    name="username"
                                                    onChange={handleInput}
                                                    value={valuesInput.username}
                                                />
                                                {userValid !== "" && (<>
                                                    <p style={{ color: "red", fontSize: "14px", marginTop: "-10px", marginBottom: "25px" }}>
                                                        {userValid !== "" ? (<>{userValid}</>) : ""}
                                                    </p>
                                                </>)}
                                                <TextField
                                                    ref={addInputs}
                                                    className={classes.input}
                                                    id="password"
                                                    type="password"
                                                    variant="outlined"
                                                    label="Entrer votre password"
                                                    onChange={handleInput}
                                                    value={valuesInput.password}
                                                    name="password"
                                                />
                                                {passValid !== "" && (<>
                                                    <p style={{ color: "red", fontSize: "14px", marginTop: "-10px", marginBottom: "25px" }}>
                                                        {passValid !== "" ? (<>{passValid}</>) : ""}
                                                    </p>
                                                </>)}

                                            </CardContent>
                                        </Grid>
                                        <Grid sm={12} xs={12} item={true}>
                                            <CardContent>
                                                {etatBtn === true ? (
                                                    <>
                                                        <Button
                                                            type="submit"
                                                            className={classes.btnSub}
                                                            variant="contained"
                                                            color="secondary"
                                                        >
                                                            C <span className="textLog">onnexion <i className="fa fa-refresh fa-spin"></i></span></Button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Button
                                                            type="submit"
                                                            className={classes.btnSub}
                                                            variant="contained"
                                                            color="secondary">
                                                            S <span className="textLog">e connecter</span></Button>
                                                    </>
                                                )}

                                            </CardContent>
                                        </Grid>
                                    </form>
                                </Grid>


                            </Card>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default Login;