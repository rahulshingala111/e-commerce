import { useEffect, useState } from "react";
import ApiCall from "../../constants/ApiCall";
import { useNavigate } from "react-router-dom";
interface Categories {
    id: number,
    name: string,
    description: string
}
interface Brands {
    id: number,
    name: string
}
interface SubCategories {
    id: number,
    name: string,
    description: string,
    categories_id: number
}
const AddProduct = () => {

    const navigate = useNavigate()

    const [product_name, setProduct_name] = useState<string>("");
    const [product_description, setProduct_description] = useState<string>("");
    const [product_price, setProduct_price] = useState<string>("");
    const [product_image_url, setProduct_image_url] = useState<string>("");
    const [product_categorie, setProduct_categorie] = useState<string>('')
    const [product_sub_categorie, setProduct_sub_categorie] = useState<string>('')
    const [product_brand, setProduct_brand] = useState<string>('')


    const [categories, setCategories] = useState<Array<Categories>>([])

    const [showSubCategories, setshowSubCategories] = useState<boolean>(false)
    const [subCategories, setSubCategories] = useState<Array<SubCategories>>([])

    const [brands, setBrands] = useState<Array<Brands>>([])



    useEffect(() => {
        const callMe = async () => {
            try {
                const getCategories = await ApiCall.get('/categories')
                console.log(getCategories.data);
                setCategories(getCategories.data);


                const getBrands = await ApiCall.get('/brands')
                console.log(getBrands.data);
                setBrands(getBrands.data)


            } catch (error) {
                console.log(error);

            }

        }
        callMe();
    }, []);

    const getSubCategories = async (categories_id: number | string) => {
        if (categories_id) {
            const getSubCategories = await ApiCall.get(`/subcategories?categories_id=${categories_id}`)
            console.log(getSubCategories);
            setSubCategories(getSubCategories.data)
            setshowSubCategories(true)
        } else {
            console.log('categories_id NOO');
        }
    }


    const clearForm = () => {
        setProduct_name("")
        setProduct_description("")
        setProduct_price("")
        setProduct_image_url("")
        setProduct_brand("")
    };

    const handleCategorySelect = async (target: string) => {
        setProduct_categorie(target)
        await getSubCategories(target)

    }

    const handleFile = (e: React.FormEvent<EventTarget>) => {
        //@ts-expect-error just ignore this
        setProduct_image_url(e.target.files[0])
    }

    const handleInsert = async (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();

        const form = new FormData();
        form.append("file", product_image_url)

        const apicall = await ApiCall.post(`/products?product_name=${product_name}&product_description=${product_description}&product_price=${product_price}&product_categorie=${product_categorie}&product_brand=${product_brand}&sub_categories_id=${product_sub_categorie}`, form, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        navigate('/product/add')
        if (apicall.status) {
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
                {
                    categories.length > 0 && (
                        <div>
                            <label htmlFor="categories">categories</label>
                            <select onChange={(e) => handleCategorySelect(e.target.value)}>
                                <option value={0} selected disabled>select</option>
                                {categories.map((element: Categories) => (
                                    <option key={element.id} value={element.id}>{element.name}</option>
                                ))}
                            </select>
                        </div>
                    )
                }
                {
                    showSubCategories && subCategories.length > 0 && (
                        <div>
                            <label htmlFor="subcategories">sub categories</label>
                            <select onChange={(e) => { setProduct_sub_categorie(e.target.value) }}>
                                <option value={0} selected disabled>select</option>
                                {subCategories.map((element: SubCategories) => (
                                    <option key={element.id} value={element.id}>{element.name}</option>
                                ))}
                            </select>
                        </div>
                    )
                }
                {brands.length > 0 && (
                    <div>
                        <label htmlFor="brands">brands</label>
                        <select onChange={(e) => { setProduct_brand(e.target.value) }}>
                            <option value={0} selected disabled>select</option>
                            {brands.map((element: Brands) => (
                                <option key={element.id} value={element.id}>{element.name}</option>
                            ))}
                        </select>
                    </div>
                )}
                <div>
                    <button type="submit">Insert</button>
                </div>
            </form >
        </>
    );
};
export default AddProduct;
