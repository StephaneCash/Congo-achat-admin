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
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: "auto",
        zIndex: "10000"
    },
}))

const AddUser = (props) => {

    const classes = useStyles();

    const data = props.data;

    const onChange = props.onChange;

    let ListError = [];
    ListError = props.ListErr;

    const handleSubmitUser = props.handleSubmitUser;

    const { id, username, email, name, phoneNumber, province, city, balance } = data;

    return (
        <>
            <Modal show={props.show} className={classes.modal} id="add-user">
                <Modal.Header>
                    {id ? `Editer ${name}` : `Ajout d'un utilisateur`}
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <TextField
                                            label="Username"
                                            variant="outlined"
                                            type="text"
                                            className="form-control 
                                            mt-2" id="username"
                                            onChange={e => onChange(e)}
                                            placeholder="Un username"
                                            value={username}
                                        />

                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            type="text"
                                            variant="outlined"
                                            className="form-control mt-3"
                                            id="email"
                                            label="Email"
                                            onChange={e => onChange(e)}
                                            placeholder="Adresse email"
                                            value={email}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            type="text"
                                            label="Nom"
                                            variant="outlined"
                                            className="form-control mt-3"
                                            id="name"
                                            onChange={e => onChange(e)}
                                            placeholder="Un nom"
                                            value={name}
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <TextField
                                            type="text"
                                            label="Téléphone"
                                            className="form-control mt-2"
                                            id="phoneNumber"
                                            placeholder="Un numéro de téléphone"
                                            onChange={e => onChange(e)}
                                            variant="outlined"
                                            value={phoneNumber}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            type="text"
                                            className="form-control mt-3"
                                            placeholder="Province"
                                            id="province"
                                            label="Province"
                                            variant="outlined"
                                            onChange={e => onChange(e)}
                                            value={province}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            type="text"
                                            className="form-control mt-3"
                                            id="city"
                                            label="City"
                                            variant="outlined"
                                            onChange={e => onChange(e)}
                                            placeholder="Une ville"
                                            value={city}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            type="text"
                                            variant="outlined"
                                            className="form-control mt-3"
                                            id="balance"
                                            label="Balance"
                                            onChange={e => onChange(e)}
                                            placeholder="Une balance"
                                            value={balance}
                                        />
                                        <span style={{ color: "red" }}> {ListError.balance} </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer style={{paddingRight: "30px"}}>
                    <Button type="submit" className="btn" onClick={props.close}>Annuler</Button>
                    <Button
                        type="submit"
                        className="btn"
                        style={{ backgroundColor: 'white', color: '#555', marginLeft:"10px" }}
                        onClick={() => handleSubmitUser()}
                    >
                        {id ? "Editer" : "Ajouter"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddUser;