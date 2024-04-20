import { useState } from "react";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import "./Register.css"
import { useNavigate } from "react-router-dom";
import {registerCall } from "../../services/apiCalls";


export const Register = () => {

    const [credentials,setCredentials] = useState({
        firstName:"",
        email:"",
        password:"",
    })

    const navigate = useNavigate()

    const [msg, setMsg] = useState("");

    const inputHandler = (e) => {

        setCredentials((prevSate) => ({
            ...prevSate,
            [e.target.name]: e.target.value
        }));
        console.log(credentials);
    }

    const registerMe = async() =>{
        try {
            //Function to register....
            const res = await registerCall(credentials);
            console.log(res);
            setMsg(res.data.message);

            if (res.data) {
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }
        } catch (error) {
            console.log(error)
        }



    }

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 p-0">
                    <div className="login-container registerElementsDesign bg-secondary">
                        <CustomInput
                            typeProp={"text"}
                            nameProp={"firstName"}
                            handlerProp={(e) => inputHandler(e)}
                            placeholderProp={"name"}
                        />
                        <CustomInput
                            typeProp={"email"}
                            nameProp={"email"}
                            handlerProp={(e) => inputHandler(e)}
                            placeholderProp={"email"}
                        />
                        <CustomInput
                            typeProp={"password"}
                            nameProp={"password"}
                            handlerProp={(e) => inputHandler(e)}
                            placeholderProp={"password"}
                        />
                        <div className="options d-flex">
                            <CustomButton
                                title={"Register"}
                                className={"regularButtonClass"}
                                functionEmit={registerMe}
                            />
                            <a className="p-2 link-white" href="/login">Do you have an account? Login</a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

}