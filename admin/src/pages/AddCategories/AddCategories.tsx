import axios from "axios";
import { useState } from "react";



const AddCategories = () => {




    const [categorie_name, setCategorie_name] = useState<string>("");
    const [categorie_description, setCategorie_description] = useState<string>("");

    const clearForm = () => {
        setCategorie_name("")
        setCategorie_description("")
    };

    const handleInsert = async (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();

        const form = new FormData();

        const apicall = await axios.post(`http://localhost:3002/product/categorie/add?categorie_name=${categorie_name}&categorie_description=${categorie_description}`, form, {
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
            <h1>Add Categories</h1>
            <form onSubmit={handleInsert}>
                <div>
                    <label htmlFor="categoriename">categorie name</label>
                    <input
                        type="text"
                        id="categoriename"
                        value={categorie_name}
                        onChange={(e) => {
                            setCategorie_name(e.target.value);
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
                        value={categorie_description}
                        onChange={(e) => {
                            setCategorie_description(e.target.value);
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
