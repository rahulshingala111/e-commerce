import { useState } from "react";
import ApiCall from "../../constants/ApiCall";



const AddCategories = () => {

    const [categories_name, setCategories_name] = useState<string>("");
    const [categories_description, setCategories_description] = useState<string>("");

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

    return (
        <>
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
        </>
    );
};
export default AddCategories;
