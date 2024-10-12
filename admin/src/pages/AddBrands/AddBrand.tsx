import { useState } from "react"
import ApiCall from "../../constants/ApiCall"
import { API_ENDPOINTS } from "../../constants/ApiEndpoints"

const AddBrand = () => {
    const [brand, setBrand] = useState<string>()


    const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        try {
            const insert = await ApiCall.post(API_ENDPOINTS.BRANDS_POST, {
                brand: brand
            })
            console.log(insert);
            if (insert.status) {
                alert('success')
            } else {
                alert('faliled')
            }

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div>
            <h1>add brand</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" placeholder="enter brand name in samll letter" onChange={(e) => setBrand(e.target.value)} />
                </div>
                <div>
                    <button type="submit">submit</button>
                </div>
            </form>
        </div>
    )
}
export default AddBrand