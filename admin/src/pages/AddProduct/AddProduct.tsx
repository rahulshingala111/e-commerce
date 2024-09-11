import axios from "axios";
import { useState } from "react";

const AddProduct = () => {
    const [product_name, setProduct_name] = useState<string>("");
    const [product_description, setProduct_description] = useState<string>("");
    const [product_price, setProduct_price] = useState<string>("");
    const [product_image_url, setProduct_image_url] = useState<string>("");

    const clearForm = () => {
        setProduct_name("")
        setProduct_description("")
        setProduct_price("")
        setProduct_image_url("")
    };

    const handleFile = (e: React.FormEvent<EventTarget>) => {
        //@ts-expect-error just ignore this
        setProduct_image_url(e.target.files[0])
    }

    const handleInsert = async (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();

        const form = new FormData();
        form.append("file", product_image_url)

        const apicall = await axios.post(`http://localhost:3002/product/add?product_name=${product_name}&product_description=${product_description}&product_price=${product_price}`, form, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        if (apicall.data.status) {
            clearForm();
            alert("success");
        }
    };

    return (
        <>
            <h1>Add Product</h1>
            <form onSubmit={handleInsert}>
                <div>
                    <label htmlFor="productname">product name</label>
                    <input
                        type="text"
                        id="productname"
                        value={product_name}
                        onChange={(e) => {
                            setProduct_name(e.target.value);
                        }}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="productdescription">product description</label>
                    <textarea
                        id="productdescription"
                        cols={30}
                        rows={5}
                        value={product_description}
                        onChange={(e) => {
                            setProduct_description(e.target.value);
                        }}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="price">price</label>
                    <input
                        type="number"
                        id="price"
                        minLength={1}
                        maxLength={100000}
                        value={product_price}
                        onChange={(e) => {
                            setProduct_price(e.target.value);
                        }}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="image">image</label>
                    <input
                        type="file"
                        id="image"
                        onChange={handleFile}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Insert</button>
                </div>
            </form>
        </>
    );
};
export default AddProduct;
