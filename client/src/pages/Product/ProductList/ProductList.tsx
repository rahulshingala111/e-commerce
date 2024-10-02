import React, { useEffect, useState } from "react"
import Card from "../../Component/Card/Card"
import { AxiosResponse } from "axios"
import ApiCall from "../../../constants/ApiCall"
import { ParamsProps, ProductInterface } from "../../../constants/Interfaces"

const Produclist: React.FC<ParamsProps> = ({ params }) => {

    const [product, setProducts] = useState<Array<ProductInterface>>([])
    console.log(params);


    useEffect(() => {
        const callme = async () => {
            try {
                if (params.category_id) {
                    const apicall: AxiosResponse = await ApiCall.get(`/product/get?category_id=${params.category_id}`)
                    setProducts(apicall.data);
                } else {
                    const apicall: AxiosResponse = await ApiCall.get(`/product/get?category_id=0`)
                    setProducts(apicall.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        callme();
    }, [params])


    return (
        product.length > 0 ?
            product.map((element: ProductInterface) => (
                <Card key={element.id} product={element} />
            ))
            : <p>No item found</p>
    )
}
export default Produclist