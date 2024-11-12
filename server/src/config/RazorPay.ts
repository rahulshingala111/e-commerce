import Razorpay from "razorpay";

const RazorPayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID_DEV!,
    key_secret: process.env.RAZORPAY_KEY_SECRET_DEV!
})

export default RazorPayInstance;
