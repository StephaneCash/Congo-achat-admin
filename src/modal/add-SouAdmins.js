import { Modal } from "react-bootstrap";
import "../css/addUserModal.css";
import { makeStyles } from "@material-ui/core/styles"
import { Button, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 700,
        backgroundColor: 'white',
        border: "2px solid silver",
        boxShadow: theme.shadows[5],
        top: '36%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: "auto",
        zIndex: "10000"
    },
}))

const AddSousAdmin = (props) => {

    const classes = useStyles();

    /*const data = props.data;

    const onChange = props.onChange;

    let ListError = [];
    ListError = props.ListErr;

    const handleSubmitUser = props.handleSubmitUser;

    const { id, username, email, name, phoneNumber, province, city, balance } = data;*/

    return (
        <>
            <Modal show={props.show} className={classes.modal} id="add-user">
                <Modal.Header>
                    {/*id ? `Editer ${name}` : `Ajout d'un utilisateur`*/} Add sous admin
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="col-12">
                            <TextField
                                label="Name"
                                variant="outlined"
                                placeholder='Name'
                                style={{width: '100%'}}
                            />
                            <br /><br />
                            <TextField
                                placeholder="Email"
                                variant="outlined"
                                style={{width: '100%'}}
                                label="Email"
                            />
                            <br /><br />

                            <TextField
                                variant="outlined"
                                label="Numéro de téléphone"
                                placeholder="Numéro phone"
                                style={{width: '100%'}}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer style={{paddingRight: "30px"}}>
                    <Button type="submit" className="btn" variant="outlined" onClick={props.close}>Annuler</Button>
                    <Button
                        type="submit"
                        variant="outlined"
                        className="btn"
                        style={{ backgroundColor: 'white', color: '#555', marginLeft: '10px'}}
                    >
                        Ajouter
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddSousAdmin;