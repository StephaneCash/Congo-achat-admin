import { Modal } from "react-bootstrap";
import "../css/addUserModal.css";
import { makeStyles } from "@material-ui/core/styles"
import { Button, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    modal: {
    },
}))


function AddClient(props) {
    const classes = useStyles();

    return <div className="addClient">
        <Modal show={props.show} className={classes.modal} id="add-user">
            <Modal.Header>
                {/*id ? `Editer ${name}` : `Ajout d'un utilisateur`*/} Ajout client
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="col-12">
                        <TextField
                            label="Name"
                            variant="outlined"
                            placeholder='Name'
                            style={{ width: '100%' }}
                        />
                        <br /><br />
                        <TextField
                            placeholder="Username"
                            variant="outlined"
                            style={{ width: '100%' }}
                            label="Username"
                        />
                        <br /><br />

                        <TextField
                            variant="outlined"
                            label="Numéro de téléphone"
                            placeholder="Numéro phone"
                            style={{ width: '100%' }}
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer style={{ paddingRight: "30px" }}>
                <Button type="submit" className="btn" variant="outlined" onClick={props.close}>Annuler</Button>
                <Button
                    type="submit"
                    variant="outlined"
                    className="btn"
                    style={{ backgroundColor: 'white', color: '#555', marginLeft: '10px' }}
                >
                    Ajouter
                </Button>
            </Modal.Footer>
        </Modal>
    </div>;
}

export default AddClient;
