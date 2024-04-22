

import CarouselExample from "../../components/Carousel/Carousel"
import "./Home.css"

export const Home = () => {

    return (
        <>
            <div className="home-design bg-secondary d-flex justify-content-center align-center">
                <div className="container-carosuel">
                    <CarouselExample />
                </div>
            </div>
           
        </>
    )

}