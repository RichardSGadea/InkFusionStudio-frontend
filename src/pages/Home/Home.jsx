

import { useNavigate } from "react-router-dom"
import CarouselExample from "../../components/Carousel/Carousel"
import { CustomButton } from "../../components/CustomButton/CustomButton"
import "./Home.css"
import CustomToast from "../../components/CustomToast/CustomToast"

export const Home = () => {

    const navigate = useNavigate()


    return (
        <>
            <div className="container-fluid bg-secondary">
                <div className="row">
                    <div className="col-sm-12 col-xl-6 d-flex justify-content-center align-items-center">
                        <div>
                            <h1>INK FUSION STUDIO</h1>
                            <p>Welcome to the art that adorns your skin! Your story, our strokes.</p>
                            <p>Step into our sanctuary of ink and creativity, where every line tells a story. Our studio is a haven for those seeking to transform their skin into a canvas of personal expression. Immerse yourself in a space where artistry meets individuality, and let our skilled artists bring your vision to life. Whether it's intricate designs or bold statements, we're here to craft lasting impressions that resonate with you. Welcome to a place where tattoos become tales, and each visit is a chapter in your artistic journey</p>
                            <div className="d-flex">
                                <CustomToast
                                    btnProp={<CustomButton
                                        title={"CONTACT"}
                                        className={" btnToast fs-5 w-100 m-0 p-0 "}
                                    />}
                                    titleProp={"Contact"}
                                    contentProp={
                                        <div className="">
                                            <span>
                                                Tlf: 900000001
                                            </span>
                                            <br />
                                            <span>
                                                Address: Cortes Street number 4.
                                            </span>
                                        </div>
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-xl-6 home-design d-flex justify-content-center align-items-center">
                        <div className="container-carosuel">
                            <CarouselExample />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}