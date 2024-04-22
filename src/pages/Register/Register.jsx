import { useEffect, useState } from "react";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import "./Register.css"
import { useNavigate } from "react-router-dom";
import { registerCall } from "../../services/apiCalls";
import { inputValidator } from "../../utils/validators";


export const Register = () => {

    const [credentials, setCredentials] = useState({
        firstName: "",
        email: "",
        password: "",
    })

    const [isValidContent, setIsValidContent] = useState({
        email: "",
        password: ""
    })

    const [registerError, setRegisterError] = useState("")

    const navigate = useNavigate()

    const inputValidatorHandler = (e) => {
        const errorMessage = inputValidator(e.target.value, e.target.name)
        setIsValidContent((prevSate) => ({
            ...prevSate,
            [e.target.name]: errorMessage
        }))
    }

    const inputHandler = (e) => {

        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));

    }

    const errorText=""

    const registerMe = async (e) => {
        try {
            //Function to register....
            const res = await registerCall(credentials);
            setMsg(res.data.message);

            if (res.data) {
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }
        } catch (error) {
            console.log(error)
            const errorMessage = error.response.data.message;
            setRegisterError(errorMessage)
        }
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 p-0">
                    <div className="login-container registerElementsDesign bg-secondary">
                        <CustomInput
                            errorText={errorText}
                            typeProp={"text"}
                            nameProp={"firstName"}
                            handlerProp={(e) => inputHandler(e)}
                            placeholderProp={"name"}
                            onBlurHandler={(e) => inputValidatorHandler(e)}
                        />
                        <div className="d-flex ml-4">
                            <CustomInput
                                errorText={errorText}
                                typeProp={"email"}
                                nameProp={"email"}
                                handlerProp={(e) => inputHandler(e)}
                                placeholderProp={"email"}
                                onBlurHandler={(e) => inputValidatorHandler(e)}
                            />
                        </div>
                        <div className="d-flex ml-4">
                            <CustomInput
                                errorText={errorText}
                                typeProp={"password"}
                                nameProp={"password"}
                                handlerProp={(e) => inputHandler(e)}
                                placeholderProp={"password"}
                                onBlurHandler={(e) => inputValidatorHandler(e)}
                            />

                        </div>
                        <div className="options d-flex">
                            <CustomButton
                                title={"Register"}
                                className={"regularButtonClass"}
                                functionEmit={registerMe}
                            />
                            <a className="p-2 link-white" href="/login">Do you have an account? Login</a>
                        </div>
                        <h5>{registerError}</h5>

                    </div>
                </div>
            </div>
        </div>
    )

}