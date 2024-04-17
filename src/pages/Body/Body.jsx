import { Navigate, Route, Routes } from "react-router-dom"
import { Home } from "../Home/Home"
import { Landing } from "../Landing/Landing"
import { Login } from "../Login/Login"



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
                
            </Routes>
        
        </>

    )

}