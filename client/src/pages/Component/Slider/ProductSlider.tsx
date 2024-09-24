import Slider from 'react-slick';

const ProductSlider = () => {
    const settings = {
        dots: true, // Enables dots below the slider
        infinite: true, // Infinite loop sliding
        speed: 500, // Transition speed
        slidesToShow: 1, // Shows one image at a time
        slidesToScroll: 1, // Scrolls one image at a time
        autoplay : true,
        autoplayspeed : 3000
    };

    const images = [
        'https://media.giphy.com/media/12mRllHWXpt4M8/giphy.gif?cid=790b76118ps8cu83c9vbo6oynpovdrkta46l09m759l1ofwz&ep=v1_gifs_search&rid=giphy.gif&ct=g',
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHBzOGN1ODNjOXZibzZveW5wb3Zkcmt0YTQ2bDA5bTc1OWwxb2Z3eiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/OnpOKZnzkMnVS/giphy.gif',
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHBzOGN1ODNjOXZibzZveW5wb3Zkcmt0YTQ2bDA5bTc1OWwxb2Z3eiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/jO3guf6Wf47T2/giphy.gif',
    ]

    return (

        <div className="product-slider">
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={`Product image ${index + 1}`} style={{ width: '100%', height: '40vh' }} />
                    </div>
                ))}
            </Slider>
        </div>
    )
}
export default ProductSlider;