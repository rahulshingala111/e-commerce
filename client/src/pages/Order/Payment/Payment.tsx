
interface PaymentProps {
    step: number
}
const Payment: React.FC<PaymentProps> = ({ step }) => {
    console.log(step);

    return (
        <h1>Paymnet</h1>
    )
}
export default Payment