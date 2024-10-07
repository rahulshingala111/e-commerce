import { useEffect, useState } from 'react';
import './Order.css'
import ApiCall from '../../constants/ApiCall';
import { AddressInterface } from '../../constants/Interfaces'


const Order: React.FC = () => {

    const [addresses, setAddresses] = useState<Array<AddressInterface>>([])

    const [selectedAddresses, setSelectedAddresses] = useState<number>()


    useEffect(() => {
        const callme = async () => {
            const fetchAddress = await ApiCall.get('/user/address');
            if (fetchAddress.status) {
                setAddresses(fetchAddress.data)
            }
        }
        callme();
    }, [])

    const handleSubmitAddress = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault()
        if (selectedAddresses) {
            console.log(selectedAddresses);
            alert('selected')
        } else {
            alert('select address first')
        }
    }

    return (
        <>
            <h2>select address you want to deliver</h2>
            <div>
                <form onSubmit={handleSubmitAddress}>
                    {addresses.length > 0 && addresses.map((element: AddressInterface, index: number) => (
                        <div key={index} className='address-border-order'>
                            <label>
                                <input type='radio' checked={selectedAddresses === element.id} value={element.id} onChange={(e) => setSelectedAddresses(Number(e.target.value))} />
                                {element.address_1 + " " + element.address_2 + ", " + element.landmark + ", " + element.city + ", " + element.state + ", " + element.country + ", " + element.postal_code}
                            </label>
                        </div>
                    ))}
                    <div>
                        <button type='submit'>Next</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Order;