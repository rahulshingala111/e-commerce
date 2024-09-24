import { useEffect, useState } from "react"
import Card from "../../Component/Card/Card"
import { AxiosResponse } from "axios"
import ApiCall from "../../../constants/ApiCall"
import { Product } from "../../../constants/Interfaces"

const Produclist = () => {

    const [product, setProducts] = useState<Array<Product>>([])

    useEffect(() => {
        const callme = async () => {
            try {
                const apicall: AxiosResponse = await ApiCall.get('/product/ten')
                setProducts(apicall.data);
            } catch (error) {
                console.log(error);
            }
        }
        callme();
    }, [])
    

    return (
        product.length > 0 ?
            product.map((element: Product) => (
                <Card key={element.id} product={element} />
            ))
            : <p>No item found</p>
    )
}
export default Produclist