import React, { useEffect, useState } from "react"
import Card from "../../Component/Card/Card"
import { AxiosResponse } from "axios"
import ApiCall from "../../../constants/ApiCall"
import { ParamsProps, ProductInterface } from "../../../constants/Interfaces"
import './ProductList.css'
import CONSTANTS from "../../../constants/constants"
const Produclist: React.FC<ParamsProps> = ({ params }) => { 

    const [product, setProducts] = useState<Array<ProductInterface>>([])
    console.log("product lisrt page", params);


    useEffect(() => {
        const callme = async () => {
            try {

                let queryParams = new String('')

                if (params.category_id) {
                    queryParams = `category_id=${params.category_id}`
                } else {
                    queryParams = `category_id=0`
                }
                let brandsArray: Array<number> = []
                if (params.brand_id) {
                    brandsArray = JSON.parse(params.brand_id)
                    console.log("lenghts", brandsArray.length);
                }
                queryParams = queryParams + '&' + `brand_id=[${brandsArray.toString()}]`

                const apicall: AxiosResponse = await ApiCall.get(CONSTANTS.API_ENDPOINTS.PRODUCT.FETCH(queryParams as string))
                setProducts(apicall.data);

            } catch (error) {
                console.log(error);
            }
        }
        callme();
    }, [params])


    return (
        <div className="product-list-2">
            {product.length > 0 ?
                product.map((element: ProductInterface) => (
                    <Card key={element.id} product={element} />
                ))
                : <p>No item found</p>}
        </div>
    )
}
export default Produclist