import { useState } from "react";
import { CustomInput } from "../../components/CustomInput/CustomInput"
import "./Login.css"
import { CustomButton } from "../../components/CustomButton/CustomButton";

export const Login = () => {

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const inputHandler = (e) => {

        setCredentials((prevSate) => ({
            ...prevSate,
            [e.target.name]: e.target.value
        }));
        // console.log(credentials);
    }

    const loginMe = () => {
        //Función que desencadenará el login...
        
    }



    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 p-0">
                    <div className="login-container loginElementsDesign bg-secondary">
                        <CustomInput
                            typeProp={"email"}
                            nameProp={"email"}
                            handlerProp={(e) => inputHandler(e)}
                            placeholderProp={"e-mail"}
                        />
                        <CustomInput
                            typeProp={"password"}
                            nameProp={"password"}
                            handlerProp={(e) => inputHandler(e)}
                            placeholderProp={"password"}
                        />
                        <div className="options d-flex">
                            <CustomButton
                                title={"log me!"}
                                className={"regularButtonClass"}
                                functionEmit={loginMe}
                            />
                            <a className="p-2 link-danger" href="/register">You don't have an account? Register</a>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}