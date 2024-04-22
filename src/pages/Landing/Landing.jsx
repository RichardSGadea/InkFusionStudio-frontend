import { Link } from "react-router-dom"
import "./Landing.css"

export const Landing = () => {

    return (
        <>
            <div className="container-fluid">
                <div className="row overflow-auto">
                    <div className="col-12 p-0 overflow-auto">
                        <div className="page justify-center">
                            <div className="logo-mask animate-fade d-flex justify-center">
                                <video playsInline autoPlay muted loop className="videoTattoo">
                                    <source src="https://www.pexels.com/es-es/download/video/4125750/" />
                                </video>
                            </div>
                            <div className="d-flex justify-content-center flex-column align-items-center">
                                {/* <span className="text-center text-white text-lg">
                                    Ink Fusion Studio
                                </span> */}
                                <div>
                                    <Link to="/login" className="btn">
                                        Login
                                    </Link>
                                    <Link to="/gallery" className="btn">
                                        Gallery
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}