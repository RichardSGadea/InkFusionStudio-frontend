import { Link } from "react-router-dom"
import "./Landing.css"
import { CustomButton } from "../../components/CustomButton/CustomButton"
import CustomToast from "../../components/CustomToast/CustomToast"

export const Landing = () => {

    //Landing page

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
                                <div className="d-flex">
                                    <CustomToast
                                        btnProp={<CustomButton
                                            title={"Gallery"}
                                            className={" btnToast fs-5 w-100 m-0 p-0 "}
                                        />}
                                        titleProp={"Message"}
                                        contentProp={
                                            <div className="">
                                                <span>
                                                Coming Soon: Our website is currently under construction. Exciting updates are on the way!
                                                </span>
                                            </div>
                                        }
                                    />
                                    <Link to="/login" className="btn fs-5 btn-light p-0 m-0">
                                        Login
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