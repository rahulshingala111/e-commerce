import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import ApiCall from '../../../constants/ApiCall';
import CONSTANTS from '../../../constants/constants';

interface ImageMetadataInterface {
    img_path: string
}

const ProductSlider = () => {
    const SliderSettings = {
        dots: true, // Enables dots below the slider
        infinite: true, // Infinite loop sliding
        speed: 500, // Transition speed
        slidesToShow: 1, // Shows one image at a time
        slidesToScroll: 1, // Scrolls one image at a time
        autoplay: true,
        autoplayspeed: 3000
    };

    const [bannerImages, setBannerImages] = useState<Array<string>>([])

    useEffect(() => {
        const callme = async () => {
            try {
                const bannerImages = await ApiCall.get('/media/banner/front')
                if (bannerImages.data.length > 0) {
                    const ArrayOfObjectURLs = await fetchAllBanners(bannerImages.data)
                    console.log("ArrayOfObjectURLs", ArrayOfObjectURLs);
                    setBannerImages(ArrayOfObjectURLs)
                }
            } catch (error) {
                console.log(error);
            }
        }
        callme()
    }, [])

    const fetchAllBanners = (banners: Array<ImageMetadataInterface>): Promise<Array<string>> => {
        const ObjectUrls = banners.map(async (element: ImageMetadataInterface) => {
            try {
                const imageBlob: Blob = await ApiCall.get(CONSTANTS.path.server_url + '/' + element.img_path, {
                    responseType: 'blob'
                })
                return URL.createObjectURL(imageBlob)
            } catch (error) {
                console.log(error);
                throw new Error("error fatching image");
            }
        })
        return Promise.all(ObjectUrls)
    }

    return (

        <div className="product-slider">
            <Slider {...SliderSettings}>
                {bannerImages.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={`Product image ${index + 1}`} style={{ width: '100%', height: '55vh' }} />
                    </div>
                ))}
            </Slider>
        </div>
    )
}
export default ProductSlider;