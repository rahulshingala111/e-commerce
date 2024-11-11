import { useEffect, useState } from 'react'
import './Address.css'
import { AddressInterface } from '../../../../constants/Interfaces'
import ApiCall from '../../../../constants/ApiCall'
import CONSTANTS from '../../../../constants/constants'
const Address: React.FC = () => {


    const [addAddressToggle, setAddAddressToggle] = useState<boolean>(false)

    const [address, setAddress] = useState<Array<AddressInterface>>([])

    const [address_1, setAddress_1] = useState<string>('')
    const [address_2, setAddress_2] = useState<string>('')
    const [landmark, setLandmark] = useState<string>('')
    const [postal_code, setPostal_code] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [state, setState] = useState<string>('')
    const [country, setCountry] = useState<string>('')

    useEffect(() => {
        const callme = async () => {
            const fetchAddress = await ApiCall.get(CONSTANTS.API_ENDPOINTS.USER.FETCH_ADDRESS)
            console.log(fetchAddress);
            if (fetchAddress.status) {
                setAddress(fetchAddress.data)
            }
        }
        callme();
    }, [])

    const handleNewAddress = async (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        console.log("form submit", address_1, address_2, landmark, postal_code, city, state, country);

        const addAddress = await ApiCall.post(CONSTANTS.API_ENDPOINTS.USER.CREATE_ADDRESS, {
            address_1, address_2, landmark, postal_code, city, state, country
        })

        console.log(addAddress);
    }


    return (
        <div>
            <h3>Address</h3>
            Your Adresses
            <div>
                {address.length > 0 && (
                    address.map((element: AddressInterface) => (
                        <div className='address-border' key={element.id}>
                            <p>{element.address_1 + " " + element.address_2 + ", " + element.landmark + ", " + element.city + ", " + element.state + ", " + element.country + ", " + element.postal_code}</p>
                        </div>
                    ))
                )}
            </div>
            <div>
                <button onClick={() => setAddAddressToggle(!addAddressToggle)}>Add Address</button>
                {addAddressToggle && (
                    <div>
                        Add Addresss
                        <form onSubmit={handleNewAddress}>
                            <div>
                                <label htmlFor='address_1'>Address 1</label>
                                <input id='address_1' type='text' value={address_1} onChange={(e) => setAddress_1(e.target.value)} required />
                            </div>
                            <div>
                                <label htmlFor='address_2'>Address 2</label>
                                <input id='address_2' type='text' value={address_2} onChange={(e) => setAddress_2(e.target.value)} required />
                            </div>
                            <div>
                                <label htmlFor='landmark'>landmark</label>
                                <input id='landmark' type='text' value={landmark} onChange={(e) => setLandmark(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor='postal_code'>PIN</label>
                                <input id='postal_code' type='text' value={postal_code} onChange={(e) => setPostal_code(e.target.value)} required />
                            </div>
                            <div>
                                <label htmlFor='city'>city</label>
                                <input id='city' type='text' value={city} onChange={(e) => setCity(e.target.value)} required />
                            </div>
                            <div>
                                <label htmlFor='state'>State</label>
                                <input id='state' type='text' value={state} onChange={(e) => setState(e.target.value)} required />
                            </div>
                            <div>
                                <label htmlFor='country'>Country</label>
                                <input id='country' type='text' value={country} onChange={(e) => setCountry(e.target.value)} required />
                            </div>
                            <button type='submit'>Submit</button>

                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Address