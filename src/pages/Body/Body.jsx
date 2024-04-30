import { Navigate, Route, Routes } from "react-router-dom"
import { Home } from "../Home/Home"
import { Landing } from "../Landing/Landing"
import { Login } from "../Login/Login"
import { Register } from "../Register/Register"
import { Profile } from "../Profile/Profile"
import { Users } from "../Users/Users"
import { Appointments } from "../Appointments/Appointments"



export const Body = () => {

    return (

        <>
            <Routes>
                {/* Routes no exist */}
                <Route path="*" element={<Navigate to="/"/>}/>

                {/* Routes exist */}
                <Route path="/" element={<Landing />}/>
                <Route path="/home" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/users" element={<Users />}/>
                <Route path="/appointments" element={<Appointments/>}/>
                
            </Routes>
        
        </>

    )

}