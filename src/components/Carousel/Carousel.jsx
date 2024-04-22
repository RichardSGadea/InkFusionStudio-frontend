import Carousel from 'react-bootstrap/Carousel';
import "./Carousel.css"

function CarouselExample() {
    return (
        <Carousel slide={false}>
            <Carousel.Item>
                <img
                    className='img-studio'
                    src="../../../public/img/estudio0.jpg"
                    alt="First slide"
                />
                <Carousel.Caption>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className='img-studio'
                    src="../../../public/img/estudio1.jpg"
                    alt="Second slide"
                />
                <Carousel.Caption>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className='img-studio'
                    src="../../../public/img/estudio2.jpg"
                    alt="Third slide"
                />
                <Carousel.Caption>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default CarouselExample;