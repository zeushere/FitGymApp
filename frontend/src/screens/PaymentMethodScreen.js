import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';

export default function PaymentMethodScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push('/shipping');
  }
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push('/placeorder');
  };
  return (
    <div>
      <form className = "text-center" onSubmit={submitHandler}>
      
        <div><h1 className="display-2 mt-4 mb-4 text-center">Payment Method</h1>
        </div>
          <div className = "mb-5">
   
          <div className="btn-group-vertical mb-3">
          <input type="radio" id = "paypal" value = "PayPal" required name="paymentMethod" onChange={(e) => setPaymentMethod(e.target.value)} class="btn-check" id="radioBtn1"/>
          <label for="radioBtn1" className="btn btn-outline-success mb-4 my-auto"><span className = "display-3">PayPal</span></label>
          <input type="radio" id = "cash" value="Cash" onChange={(e) => setPaymentMethod(e.target.value)}  id="cash" name="paymentMethod" class="btn-check" id="radioBtn3"/>
          <label for="radioBtn3" class="btn btn-outline-danger my-auto"><span className = "display-3">Cash</span></label>
           </div>
          <div>
          <label />
          <div className="row justify-content-center">
            <button type="submit" className="btn btn-primary rounded-pill create-product mb-5"><h1 className="display-5">Next Step</h1></button>
          </div>
        </div>
        </div>
    </form>
    </div>
  );
}
