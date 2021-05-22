import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import useWindowDimensions from '../components/WindowDimension';

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push('/payment');
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { height, width } = useWindowDimensions();
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);
  return (

   
      <div className="container">
      <hr className="mt-5 mb-5" style={{ border: "0px", borderTop: "5px solid blue" }}></hr>
      <div class="border border-info rounded row g-0 overflow-hidden shadow-sm  position-relative">
      <div class="p-4 d-flex flex-column">
      <div className = "row">
      <div className = "col-12">
      <h1 className = "card-title">Order Summary</h1>
        </div>
        </div>
      <div className = "row">
   <div className = "col-md-4 col-sm-12 align-self-center mb-sm-4">
      
                  <div className="row mb-sm-4">
                    <div><strong>Items </strong>: {cart.cartItems.length}</div>
                  </div>
               
                  <div className="row">
                    <div><strong>Tax  </strong>:  {cart.taxPrice.toFixed(2)} PLN</div>
                  </div>
                
   </div>
   <div className = "col-md-4 col-sm-12 align-self-center mb-sm-3">
    <div className = "row">
    { cart.cartItems.length !==0 && 
    <div><strong>Sum Order : {cart.totalPrice.toFixed(2)} PLN</strong></div>}
    { cart.cartItems.length ===0 && 
      <div><strong>Sum Order : 0 PLN</strong></div>}
    </div>
   </div>
    
    <div className = "col-md-4 col-sm-12 align-self-center ">
   
    <div className="row justify-content-center display-2 align-self-center">
    <button type="submit" className="btn btn-primary" style={{ fontSize: "60%" }} disabled={cart.cartItems.length === 0} onClick={placeOrderHandler}>Place Order</button>

</div>
</div>
</div>
      </div>
      </div>
      <hr className="mt-5 mb-5" style={{ border: "0px", borderTop: "5px solid blue" }}></hr>
    
      
     

      <div class="row mt-3">
            <div class="col-sm-6">
                <div class="border border-info rounded row g-0 overflow-hidden shadow-sm  position-relative">
                    <div class="col p-4 d-flex flex-column">
                       <h1 className = "card-title">Shipping</h1>
                       <p className="card-text"><strong>Name:</strong> {cart.shippingAddress.fullName} <br/>
                       <strong>Address: </strong> {cart.shippingAddress.address},
                       {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                       ,{cart.shippingAddress.country} </p>
                    </div>
                    
                 </div>
            </div> 
            <div class= {height>300 ? "col-sm-6  align-self-center" : "col-sm-6 mt-5  align-self-center"}>
                <div class="border border-info rounded row g-0 overflow-hidden shadow-sm  position-relative">
                    <div class="col p-4 d-flex flex-column">
                    <h1 className = "card-title">Payment</h1>
                       <p class="card-text mb-auto ">
                       <strong>
                       Method:</strong> {cart.paymentMethod}
                       <br/>
                       {cart.paymentMethod === "PayPal" && <strong>Online payment</strong>}
                       {cart.paymentMethod === "Cash" && <strong>Cash on delivery</strong>}
                       </p>
                    </div>
                    
                 </div>
            </div> 
        </div> 


        <div className = "row mt-3">   
        <div class="col-sm-12">
        <div class="border border-info rounded row g-0 overflow-hidden shadow-sm  position-relative">
            <div class="col p-4 d-flex flex-column">
                <h1 className = "card-title">Order Items</h1>
                {cart.cartItems.length === 0 && <h1><strong>There is no items in cart.</strong></h1>}
                {cart.cartItems.length !== 0 && <hr className="mt-5 mb-5" style={{ border: "0px", borderTop: "5px solid green" }}></hr>}
                <ul>
                  {cart.cartItems.map((item ,index) => (
                    <li key={item.product}>
                      <div className="row">
                      
                        <div className = "col-md-6 col-sm-12 mb-md-0 mb-sm-5">
                        
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-fluid" style={{ height: "20rem" }}
                          ></img>
                        </div>
                        <div className="col-md-6 col-sm-12 align-self-center ">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        

                        
                          {' '}{item.qty} x {item.price}{' PLN'} = <strong>{item.qty * item.price}{' PLN'}</strong>
                        
                        </div>
                        <hr className={index === (cart.cartItems.length-1) ? "mt-5 mb-0" :"mt-5 mb-5" } style={{ border: "0px", borderTop: "5px solid green" }}></hr>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              </div>
                    </div>
                    </div>

      </div>
  );
}
