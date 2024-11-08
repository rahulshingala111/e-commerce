import { useEffect, useState } from "react";
import ApiCall from "../../constants/ApiCall";

interface CategoriesInterface {
    id: number,
    name: string,
    description: string
}

const AddCategories = () => {

    //categories
    const [categories_name, setCategories_name] = useState<string>("");
    const [categories_description, setCategories_description] = useState<string>("");

    //for sub categories
    const [names_in_categories_name, setNames_in_categories_name] = useState<Array<CategoriesInterface>>([]);
    const [sub_categories_name, setSub_categories_name] = useState<string>()
    const [sub_categories_descri, setSub_categories_descri] = useState<string>()
    const [sub_categories_cate, setSub_categories_cate] = useState<string>()

    useEffect(() => {
        const callme = async () => {
            try {
                const getCategories = await ApiCall.get('/categories')
                if (getCategories.status) {
                    setNames_in_categories_name(getCategories.data)
                } else {
                    console.log("error");
                }
            } catch (error) {
                console.log(error);
            }
        }
        callme()
    }, [])


    const clearForm = () => {
        setCategories_name("")
        setCategories_description("")
    };

    const handleInsert = async (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();

        const form = new FormData();
        const apicall = await ApiCall.post(`/categories?categories_name=${categories_name}&categories_description=${categories_description}`, form, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        if (apicall.status) {
            clearForm();
            alert("success");
        }
    };

    const handleInsert_SubCategoreis = async (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        console.log(sub_categories_name, sub_categories_descri, sub_categories_cate,);


        const InsertSubCartegories = await ApiCall.post('/subcategories', {
            name: sub_categories_name,
            description: sub_categories_descri,
            categories_id: sub_categories_cate
        })
        console.log(InsertSubCartegories);
    }

    const handleRefresh = async (e: React.FormEvent<EventTarget>) => {
        e.preventDefault()
        try {
            const getCategories = await ApiCall.get('/categories')
            if (getCategories.status) {
                setNames_in_categories_name(getCategories.data)
            } else {
                console.log("error");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div>
                <h1>Add Categories</h1>
                <form onSubmit={handleInsert}>
                    <div>
                        <label htmlFor="categoriename">categorie name</label>
                        <input
                            type="text"
                            id="categoriename"
                            value={categories_name}
                            onChange={(e) => {
                                setCategories_name(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="categoriedescription">categorie description</label>
                        <textarea
                            id="categoriedescription"
                            cols={30}
                            rows={5}
                            value={categories_description}
                            onChange={(e) => {
                                setCategories_description(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit">Insert</button>
                    </div>
                </form>
            </div>



            <div>
                <h1>Add Sub Categories</h1>
                <div>
                    <button onClick={handleRefresh}>
                        refresh sub categories list
                    </button>
                </div>
                <form onSubmit={handleInsert_SubCategoreis}>
                    <div>
                        <label htmlFor="subcategoriename">sub_categorie name</label>
                        <input
                            type="text"
                            id="subcategoriename"
                            value={sub_categories_name}
                            onChange={(e) => {
                                setSub_categories_name(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <label>select categories</label>
                    <select onChange={(e) => { setSub_categories_cate(e.target.value); console.log(e.target.value) }}>
                        <option value={undefined} selected disabled>select</option>
                        {names_in_categories_name.length > 0 &&
                            names_in_categories_name.map((element: CategoriesInterface) => (
                                <option value={element.id} key={element.id}>{element.name}</option>
                            ))}
                    </select>
                    <div>
                        <label htmlFor="subcategoriedescription">sub categorie description</label>
                        <textarea
                            id="subcategoriedescription"
                            cols={30}
                            rows={5}
                            value={sub_categories_descri}
                            onChange={(e) => {
                                setSub_categories_descri(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit">Insert</button>
                    </div>
                </form>
            </div>
        </>
    );
};
export default AddCategories;
