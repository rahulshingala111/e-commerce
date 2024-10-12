import { useEffect, useState } from 'react';
import './Order.css'
import ApiCall from '../../constants/ApiCall';
import { AddressInterface } from '../../constants/Interfaces'
import CONSTANTS from '../../constants/constants';
// import Payment from './Payment/Payment';
// import Reivew from './Review/Review';


const Order: React.FC = () => {

    const [addresses, setAddresses] = useState<Array<AddressInterface>>([])

    const [selectedAddresses, setSelectedAddresses] = useState<number>()

    const [step, setStep] = useState<number>(1)


    useEffect(() => {
        const callme = async () => {
            const fetchAddress = await ApiCall.get(CONSTANTS.API_ENDPOINTS.USER.FETCH_ADDRESS);
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
            setStep(2)
        } else {
            alert('select address first')
        }
    }

    return (
        <>
            <h1>Step {step} out of 3</h1>
            {
                step === 1 && (
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
            {
                step === 2 && (
                    // <Payment step={step} />
                    <div>
                        <h1>select Payment Method</h1>
                        <button onClick={() => setStep(1)} >Back</button>
                        <button onClick={() => setStep(3)}>Next</button>

                    </div>
                )
            }
            {
                step === 3 && (
                    // <Reivew step={step} />
                    <div>
                        <h1>Review your Product</h1>
                        <button onClick={() => setStep(2)} >Back</button>
                        <button onClick={() => alert('order placed')}>Next</button>
                    </div>
                )
            }
        </>
    )
}
export default Order;