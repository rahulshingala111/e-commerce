import React, { useEffect, useState } from "react"
import Card from "../../Component/Card/Card"
import { AxiosResponse } from "axios"
import ApiCall from "../../../constants/ApiCall"
import { ParamsProps, ProductInterface } from "../../../constants/Interfaces"
import './ProductList.css'
import CONSTANTS from "../../../constants/constants"
import { generateQuery } from "../../../constants/Helper"
const Produclist: React.FC<ParamsProps> = ({ params }) => {

    const [product, setProducts] = useState<Array<ProductInterface>>([])
    console.log("product lisrt page", params);


    useEffect(() => {
        const callme = async () => {
            try {
                const urlString = generateQuery(params)
                const apicall: AxiosResponse = await ApiCall.get(CONSTANTS.API_ENDPOINTS.PRODUCT.FETCH(urlString))
                if (apicall.status) {
                    setProducts(apicall.data);
                } else {
                    setProducts([])
                }

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