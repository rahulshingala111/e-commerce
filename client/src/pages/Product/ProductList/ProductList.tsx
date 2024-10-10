import React, { useEffect, useState } from "react"
import Card from "../../Component/Card/Card"
import { AxiosResponse } from "axios"
import ApiCall from "../../../constants/ApiCall"
import { ParamsProps, ProductInterface } from "../../../constants/Interfaces"
import './ProductList.css'
const Produclist: React.FC<ParamsProps> = ({ params }) => {

    const [product, setProducts] = useState<Array<ProductInterface>>([])
    console.log(params);


    useEffect(() => {
        const callme = async () => {
            try {

                let queryParams = new String('')

                if (params.category_id) {
                    queryParams = `category_id=${params.category_id}`
                } else {
                    queryParams = `category_id=0`
                }
                if (params.brand_id) {
                    queryParams = queryParams + '&' + `brand_id=${params.brand_id}`
                }

                const apicall: AxiosResponse = await ApiCall.get(`/product/get?${queryParams}`)
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