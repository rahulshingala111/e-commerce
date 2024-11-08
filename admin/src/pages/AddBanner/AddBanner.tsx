import { useState } from "react"
import ApiCall from "../../constants/ApiCall"

const AddBanner: React.FC = () => {


    const [category, setCategory] = useState<string>()
    const [status, setStatus] = useState<string | null>()

    const [file, setFile] = useState()



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(file, category, status);

        if (file && category && status) {

            const form = new FormData()
            form.append("file", file)
            form.append('category', category)
            form.append('status', status)

            const apiCall = await ApiCall.post(`/banner?category=${category}&status=${status}`, form)
            console.log(apiCall);

  
        } else {
            alert('fill form proper')
        }

    }

    const handleFile = (e: unknown) => {
        //@ts-expect-error just ignore this
        setFile(e.target.files[0])
        console.log(e.target.files[0]);


    }

    const handleStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        const value = e.target.value
        if (value === '1') {
            setStatus('true')
        } else if (value === '0') {
            setStatus('false')
        } else {
            setStatus(null)
        }
    }

    return (
        <div>
            <h1>Add banner</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="category">category</label>
                        <input id="category" type="text" onChange={(e) => setCategory(e.target.value)} />
                    </div>
                    {/* <div>
                        <label htmlFor="category">path</label>
                        <input id="category" type="text" />
                    </div> */}
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
                        <label htmlFor="category">status </label>
                        <select onChange={handleStatus} defaultValue={''}>
                            <option value={''} disabled>select</option>
                            <option value={1}>true</option>
                            <option value={0}>false</option>
                        </select>
                    </div>
                    <div>
                        <button type="submit">submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default AddBanner