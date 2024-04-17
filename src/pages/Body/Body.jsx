import { Navigate, Route, Routes } from "react-router-dom"
import { Home } from "../Home/Home"
import { Landing } from "../Landing/Landing"



export const Body = () => {

    return (

        <>
            <Routes>
                {/* Routes no exist */}
                <Route path="*" element={<Navigate to="/"/>}/>

                {/* Routes exist */}
                <Route path="/" element={<Landing />}/>
            </Routes>
        
        </>

    )

}