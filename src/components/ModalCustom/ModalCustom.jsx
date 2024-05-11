import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../CustomInput/CustomInput";
import { updateProfile, updateProfileById } from "../../services/apiCalls";
import "./ModalCustom.css"
import { inputValidator } from "../../utils/validators";

function ModalCustom({ profileData, userId, inputHandler, token , path, functionEmit}) {
    const [show, setShow] = useState(false);

    const [isValidContent, setIsValidContent] = useState({
        firstName: "",
        email: "",
        lastName: ""
    })
    const navigate = useNavigate();

    const handleClose = () =>{
        //double navigate to force the profile to be reloaded when canceling profile data modification
        //so that it calls the API again and retrieves them
        navigate("/")
        setTimeout(() => {
            if(path==="/users"){
                navigate("/users")
            }else{
                navigate("/profile")
            }
        })
        setShow(false);
    } 

    const inputValidatorHandler = (e) => {
        const errorMessage = inputValidator(e.target.value, e.target.name)
        setIsValidContent((prevSate) => ({
            ...prevSate,
            [e.target.name]: errorMessage
        }))
    }

    const handleUpdate = () => {
        if(isValidContent.email !== "" || isValidContent.lastName !== "" || isValidContent.firstName !== ""){
            alert("Check inputs")
        }else{
            if(path==="/users"){
                updateProfileById(profileData,profileData.id,token)
            }else{
                updateProfile(profileData, token)
            }
            
        }
    }

    

    return (
        <>
            <Button className={path==="/users" ? "btnModifyId" : ""} variant="primary" onClick={() => {
                path==="/users" && functionEmit(userId)
                setShow(true)
            }}>
                Modify
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{path==="/users" ? "User Profile" : "My Profile"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CustomInput
                        typeProp="text"
                        nameProp="firstName"
                        placeholderProp="firstName"
                        value={profileData.firstName}
                        isDisabled=""
                        handlerProp={inputHandler}
                        onBlurHandler={(e) => inputValidatorHandler(e)}
                        errorText={isValidContent.firstName}
                    />
                    <CustomInput
                        typeProp="text"
                        nameProp="lastName"
                        placeholderProp="lastName"
                        value={profileData.lastName}
                        isDisabled=""
                        handlerProp={inputHandler}
                        onBlurHandler={(e) => inputValidatorHandler(e)}
                        errorText={isValidContent.lastName}
                    />
                    <CustomInput
                        typeProp="email"
                        nameProp="email"
                        placeholderProp="email"
                        value={profileData.email}
                        isDisabled=""
                        handlerProp={inputHandler}
                        onBlurHandler={(e) => inputValidatorHandler(e)}
                        errorText={isValidContent.email}
                    />    
                    {path==="/users" && (
                    <CustomInput
                        typeProp="password"
                        nameProp="password"
                        placeholderProp="password"
                        value={profileData?.password}
                        isDisabled=""
                        handlerProp={inputHandler}
                        onBlurHandler={(e) => inputValidatorHandler(e)}
                        errorText={"Change password"}
                    /> )}
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btnClose" variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button className="btnSave" variant="primary" onClick={() => {
                        handleUpdate() 
                        handleClose()
                    }}>
                        Save 
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCustom;