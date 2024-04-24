import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../CustomInput/CustomInput";
import { updateProfile } from "../../services/apiCalls";


function ModalCustom({ profileData, inputHandler, token }) {
    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    const handleClose = () =>{
        //doble navigate para forzar a recargar el profile al cancelar la modificación de datos de perfil
        //para que llame de nuevo a la API y los recupere
        navigate("/")
        setTimeout(() => {
            navigate("/profile")
        })
        setShow(false);
    } 
        
    //console.log(profileData);

    const handleUpdate = () => {
        updateProfile(profileData, token)
    }

    return (
        <>
            <Button variant="primary" onClick={() => setShow(true)}>
                Modify
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>My Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CustomInput
                        typeProp="text"
                        nameProp="firstName"
                        placeholderProp="firstName"
                        value={profileData.firstName}
                        isDisabled=""
                        handlerProp={inputHandler}
                    />
                    <CustomInput
                        typeProp="email"
                        nameProp="email"
                        placeholderProp="email"
                        value={profileData.email}
                        isDisabled=""
                        handlerProp={inputHandler}
                    />
                    <CustomInput
                        typeProp="text"
                        nameProp="lastName"
                        placeholderProp="lastName"
                        value={profileData.lastName}
                        isDisabled=""
                        handlerProp={inputHandler}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleUpdate() 
                        handleClose()
                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCustom;