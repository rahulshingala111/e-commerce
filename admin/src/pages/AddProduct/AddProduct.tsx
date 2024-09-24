import axios from "axios";
import { useEffect, useState } from "react";
import ApiCall from "../../constants/ApiCall";
interface Categories {
    id: number,
    name: string,
    description: string
}
const AddProduct = () => {
    const [product_name, setProduct_name] = useState<string>("");
    const [product_description, setProduct_description] = useState<string>("");
    const [product_price, setProduct_price] = useState<string>("");
    const [product_image_url, setProduct_image_url] = useState<string>("");
    const [categories, setCategories] = useState<Array<Categories>>([{
        id: 0,
        name: '',
        description: ''
    }])
    const [product_categorie, setProduct_categorie] = useState<string>('')


    useEffect(() => {
        const callMe = async () => {
            const getCategories = await ApiCall.get('/product/categorie/get')
            console.log(getCategories.data);
            setCategories(getCategories.data)
        }
        callMe();
    }, []);


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

        const apicall = await axios.post(`http://localhost:3002/product/add?product_name=${product_name}&product_description=${product_description}&product_price=${product_price}&product_categorie=${product_categorie}`, form, {
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
                    <label htmlFor="categories">categories</label>
                    <select onChange={(e) => { setProduct_categorie(e.target.value) }}>
                        <option value={0} selected disabled>select</option>
                        {categories.map((element: Categories) => (
                            <option key={element.id} value={element.id}>{element.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <button type="submit">Insert</button>
                </div>
            </form>
        </>
    );
};
export default AddProduct;
