import { useState } from "react";
import { CustomInput } from "../../components/CustomInput/CustomInput"
import "./Login.css"
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { useDispatch } from "react-redux";
import { loginCall } from "../../services/apiCalls";
import { decodeToken } from "react-jwt";
import { login } from "../../app/Slices/userSlice";
import { useNavigate } from "react-router-dom";

export const Login = () => {

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const [msg, setMsg] = useState("");

    const navigate = useNavigate();

    const dispatch = useDispatch()

    const inputHandler = (e) => {

        setCredentials((prevSate) => ({
            ...prevSate,
            [e.target.name]: e.target.value
        }));
        // console.log(credentials);
    }

    const loginMe = async () => {
        //Funtion to login...
        const res = await loginCall(credentials);
        if (res.data.token) {
            //decoded token....
            const uDecoded = decodeToken(res.data.token)

            const passport = {
                token: res.data.token,
                decoded: uDecoded,
            }

            console.log(passport);
            dispatch(login(passport))

            setMsg(`${uDecoded.userRole}, bienvenid@ de nuevo.`)

            setTimeout(() =>{
                navigate("/home")
            }, 3000)
        }
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