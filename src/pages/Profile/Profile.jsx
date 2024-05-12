import { useEffect, useState } from "react"
import { CustomButton } from "../../components/CustomButton/CustomButton"
import "./Profile.css"
import { CustomInput } from "../../components/CustomInput/CustomInput"
import { useDispatch, useSelector } from "react-redux"
import { getUserData } from "../../app/Slices/userSlice"
import { bringProfile, updateProfile } from "../../services/apiCalls"
import ModalCustom from "../../components/ModalCustom/ModalCustom"
import { useLocation} from "react-router-dom"
import { inputValidator } from "../../utils/validators"

export const Profile = () => {

    const [optionMenu, setOptionMenu] = useState("")

    const [profileData, setProfileData] = useState({
        firstName: "",
        lastName: "",
        email: ""
    })
    const [changePassword, setChangePassword] = useState({
        yourPassword: "",
        newPassword: "",
        newPasswordRepeat: "",
    })
    const [isValidPassword, setIsValidPassword] = useState({
        yourPassword: "",
        newPassword: "",
        newPasswordRepeat: "",
    })


    const [msgError, setMsgError] = useState("");

    const location = useLocation()
    const path = location.pathname

    const myPassport = useSelector(getUserData)
    const token = myPassport.token

    const inputHandler = (e) => {
        setProfileData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const passwordInputHandler = (e) => {
        setChangePassword((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const passwordInputValidatorHandler = (e) => {
        const errorMessage = inputValidator(e.target.value, e.target.name)
        setIsValidPassword((prevSate) => ({
            ...prevSate,
            [e.target.name]: errorMessage
        }))
    }

    useEffect(() => {
        const fetchProfile = async () => {
            const myProfileData = await bringProfile(token)
            setProfileData(myProfileData)
        }
        fetchProfile()
    }, [])

    const updatePassword = async (change) => {
        //Function to update password
        try {
            if (change.newPassword !== change.newPasswordRepeat) {
                setMsgError("New password doesn't match")
                return;
            }
            const res = await updateProfile(change, token)
            if(res.data.message==="User profile updated successfully"){
                setMsgError("User profile updated successfully")
            }
        } catch (error) {
            setMsgError(error.response.data.message)
        }
    }

    return (
        <div className="settingsDesign bg-secondary container-fluid">
            <div className="row">
                <div className="col-12 col-md-4 p-0">
                    <div className="sidePanel d-flex flex-column justify-content-start align-items-start w-100">
                        <CustomButton
                            title={"Modified Profile"}
                            functionEmit={() => {
                                setOptionMenu("Modified Profile")
                            }}
                            className={"btnModify w-100"}
                        />
                        <CustomButton
                            title={"Change Password"}
                            functionEmit={() => setOptionMenu("Change Password")}
                            className={"btnModify w-100"}
                        />
                    </div>
                </div>
                <div className="col-12 col-md-8">
                    {
                        optionMenu == "Modified Profile" ? (
                            <div className="centralPanel d-flex align-items-center justify-content-center w-100">
                                <div>
                                    <h1>USER PROFILE</h1>
                                    <CustomInput
                                        errorText={""}
                                        typeProp="text"
                                        nameProp="firstName"
                                        handlerProp={(e) => inputHandler(e)}
                                        placeholderProp="firstName"
                                        value={profileData.firstName}
                                        isDisabled={"disabled"}
                                    />
                                    <CustomInput
                                        errorText={""}
                                        typeProp="text"
                                        nameProp="lastName"
                                        handlerProp={(e) => inputHandler(e)}
                                        placeholderProp="lastName"
                                        value={profileData.lastName}
                                        isDisabled={"disabled"}
                                    />
                                    <CustomInput
                                        errorText={""}
                                        typeProp="email"
                                        nameProp="email"
                                        handlerProp={(e) => inputHandler(e)}
                                        placeholderProp="email"
                                        value={profileData.email}
                                        isDisabled={"disabled"}
                                    />
                                    <ModalCustom
                                        profileData={profileData}
                                        inputHandler={inputHandler}
                                        token={token}
                                        path={path}
                                    />
                                </div>
                            </div>
                        ) : optionMenu == "Change Password" ? (
                            <div className="centralPanel d-flex flex-column align-items-center justify-content-center w-100">
                                <h1>CHANGE PASSWORD</h1>
                                <CustomInput
                                    typeProp="password"
                                    nameProp="yourPassword"
                                    handlerProp={(e) => passwordInputHandler(e)}
                                    onBlurHandler={(e) => passwordInputValidatorHandler(e)}
                                    placeholderProp="your password"
                                    errorText={isValidPassword.yourPassword}

                                />
                                {changePassword.yourPassword.length > 0 &&
                                    <>
                                        <CustomInput
                                            typeProp="password"
                                            nameProp="newPassword"
                                            handlerProp={(e) => passwordInputHandler(e)}
                                            onBlurHandler={(e) => passwordInputValidatorHandler(e)}
                                            placeholderProp="new password"
                                            errorText={isValidPassword.newPassword}
                                        />
                                        <CustomInput
                                            typeProp="password"
                                            nameProp="newPasswordRepeat"
                                            handlerProp={(e) => passwordInputHandler(e)}
                                            onBlurHandler={(e) => passwordInputValidatorHandler(e)}
                                            placeholderProp="write the new password again"
                                            errorText={isValidPassword.newPassword}
                                        />

                                        <CustomButton
                                            title={"Save"}
                                            functionEmit={() => updatePassword(changePassword)}
                                        />
                                        <p className="passwordError">{msgError}</p>

                                    </>
                                }

                            </div>
                        ) : (
                            <div className="centralPanel d-flex align-items-center justify-content-center w-100">
                                <h1>SETTINGS</h1>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>

    )
}