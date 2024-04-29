
import { Navigate} from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getUserData } from "../../app/Slices/userSlice";
import CustomTable from "../../components/CustomTable/CustomTable";
import "./Users.css"

export const Users = () => {

    const [buttonClientsClicked, setButtonClientsClicked] = useState(false);
    const [buttonWorkersClicked, setButtonWorkersClicked] = useState(false);

    const myPassport = useSelector(getUserData)
    const token = myPassport?.token

    const userType = myPassport.decoded.userRole;

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 p-0">
                <div className="users-design bg-secondary w-100 p-2">
                {userType == "admin"
                    ? (
                        <>
                            <button onClick={() => {
                                setButtonClientsClicked(!buttonClientsClicked)
                                const buttonSelected = "clients"
                                sessionStorage.setItem("selected", buttonSelected)
                            }} disabled={buttonWorkersClicked ? "disabled" : ""}>Clients</button>
                            <button onClick={() => {
                                setButtonWorkersClicked(!buttonWorkersClicked)
                                const buttonSelected = "workers"
                                sessionStorage.setItem("selected", buttonSelected)
                            }} disabled={buttonClientsClicked ? "disabled" : ""}>Workers</button>
                            <div>
                                {buttonWorkersClicked ? ("") : buttonClientsClicked ? (<CustomTable />) : ("")}
                                {buttonClientsClicked ? ("") : buttonWorkersClicked ? (<CustomTable />) : ("")}
                            </div>
                        </>
                    ) : (
                        <Navigate to="/" />
                    )
                }
            </div>
                </div>
            </div>
            
        </div>
    )


}