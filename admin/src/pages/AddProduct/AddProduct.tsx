import axios from "axios";
import { useState } from "react";

const AddProduct = () => {


    const [email, setEmail] = useState<string>('')
    const [name, setName] = useState<string>('')


    const handleInsert = async () => {
        if (email && name)
            console.log("handleInsert");
        const apicall = await axios.post('http://localhost:3002/product/add', {
            email: email,
            name: name
        })
        console.log(apicall);

    }

    return (
        <>
            <h1>Add Product</h1>
            <form>
                <div>
                    <label htmlFor="email">email</label>
                    <input type="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>

                </div>
                <div>
                    <label htmlFor="name">name</label>
                    <input type="text" id="name" onChange={(e) => setName(e.target.value)}></input>
                </div>

                <div>
                    <button onClick={handleInsert}>Insert</button>
                </div>

                {/* <label htmlFor="email">name</label>
                <input type="text" id="email"></input>

                <label htmlFor="email">name</label>
                <input type="text" id="email"></input>

                <label htmlFor="email">name</label>
                <input type="text" id="email"></input>

                <label htmlFor="email">name</label>
                <input type="text" id="email"></input> */}


            </form>
        </>
    )
}
export default AddProduct