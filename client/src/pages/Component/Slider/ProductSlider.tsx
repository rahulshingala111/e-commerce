import Slider from 'react-slick';

const ProductSlider = () => {
    const settings = {
        dots: true, // Enables dots below the slider
        infinite: true, // Infinite loop sliding
        speed: 500, // Transition speed
        slidesToShow: 1, // Shows one image at a time
        slidesToScroll: 1, // Scrolls one image at a time
        autoplay: true,
        autoplayspeed: 3000
    };

    const images = [
        'http://localhost:3002/banner/image/2.jpg',
        'http://localhost:3002/banner/image/1.jpg',
        'http://localhost:3002/banner/image/3.jpg',
    ]

    return (

        <div className="product-slider">
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={`Product image ${index + 1}`} style={{ width: '100%', height: '55vh' }} />
                    </div>
                ))}
            </Slider>
        </div>
    )
}
export default ProductSlider;