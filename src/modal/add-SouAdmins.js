import { Modal } from "react-bootstrap";
import "../css/addUserModal.css";
import { makeStyles } from "@material-ui/core/styles"
import { Button, TextField } from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    modal: {
    },
}))

const AddSousAdmin = (props) => {

    const classes = useStyles();

    const data = props.data;
    const onChange = props.onChange;
    const handleSubmitSubAdmin = props.handleSubmitSubAdmin;

    const { id, email, name, numero, } = data;
    data.status = "Actif";
    let tempsNow = new Date();
    data.time = tempsNow.toString().substring(0, 25);

    return (
        <>
            <Modal show={props.show} className={classes.modal} id="add-user">
                <Modal.Header>
                    {id ? `Editer ${name}` : `Ajout sous-admin`}
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmitSubAdmin}>
                        <div className="col-12">
                            <TextField
                                label="Email"
                                variant="outlined"
                                placeholder='Email'
                                id="email"
                                style={{ width: '100%' }}
                                required
                                onChange={(e) => onChange(e)}
                                value={email}
                            />
                            <br /><br />
                            <TextField
                                placeholder="Name"
                                variant="outlined"
                                style={{ width: '100%' }}
                                label="Name"
                                required
                                id='name'
                                onChange={(e) => onChange(e)}
                                value={name}
                            />
                            <br /><br />

                            <TextField
                                variant="outlined"
                                label="Numéro de téléphone"
                                placeholder="Numéro phone"
                                style={{ width: '100%' }}
                                required
                                onChange={(e) => onChange(e)}
                                value={numero}
                                id='numero'
                            />
                        </div>
                        <div className="mt-3">
                            <Button
                                type="submit"
                                variant="outlined"
                                className="btn"
                                style={{ backgroundColor: 'white', color: 'green', marginLeft: '10px', float: "right", border: '1px solid green' }}
                            >
                                {id ? "Editer" : "Ajouter"}
                            </Button>
                            <Button className="btn" variant="outlined"
                                style={{ float: "right", marginLeft: "15px", border: "1px solid red", color: "red" }}
                                onClick={props.close}>Annuler</Button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer style={{ paddingRight: "30px" }}>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddSousAdmin;