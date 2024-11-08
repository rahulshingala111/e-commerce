import { useEffect, useState } from 'react'
import './NewArrival.css'
import ApiCall from '../../../constants/ApiCall'
import CONSTANTS from '../../../constants/constants';
import { useNavigate } from 'react-router-dom';

interface NewArrivalInterface {
    id: number,
    img_path: string
}


const NewArrival: React.FC = () => {
    const navigate = useNavigate()

    const [productImage, setProductImage] = useState<Array<NewArrivalInterface>>([]);

    useEffect(() => {
        callAPI()
    }, [])

    const callAPI = async () => {
        try {
            const apiCall = await ApiCall.get('/product/arrival/new')
            if (apiCall.status) {
                console.log(apiCall);
                setProductImage(apiCall.data)
            } else {
                console.log('error');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="new-arrivals-section">
            <div className="new-arrivals-left">
                <h2>NEW ARRIVALS</h2>
            </div>
            <div className="new-arrivals-right">
                {productImage.length > 0 ? (
                    <div className="new-arrivals-images">
                        {productImage.map((element: NewArrivalInterface) => (
                            <img onClick={() => {
                                navigate(CONSTANTS.ROUTES.ITEM_PAGE.ITEM(element.id))
                            }}
                                key={element.id}
                                src={CONSTANTS.path.server_url + '/' + element.img_path}
                                className="each-new-arrival-image"
                            />
                        ))}
                        {productImage.map((element) => (
                            <img
                                key={element.id}
                                src={CONSTANTS.path.server_url + '/' + element.img_path}
                                className="each-new-arrival-image"
                            />
                        ))}
                        {productImage.map((element) => (
                            <img
                                key={element.id}
                                src={CONSTANTS.path.server_url + '/' + element.img_path}
                                className="each-new-arrival-image"
                            />
                        ))}
                        {productImage.map((element) => (
                            <img
                                key={element.id}
                                src={CONSTANTS.path.server_url + '/' + element.img_path}
                                className="each-new-arrival-image"
                            />
                        ))}
                    </div>
                ) : (
                    <p>No New Arrivals</p>
                )}
            </div>
        </div>
    )
}
export default NewArrival