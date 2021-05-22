import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants';
import useWindowDimensions from '../components/WindowDimension';

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const { height} = useWindowDimensions();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    success: successDeliver,
  } = orderDeliver;
  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay || successDeliver || (order && order._id !== orderId)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, sdkReady, successPay, successDeliver]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  }

  const deliverHandlerWithPayment = () => {
    dispatch(payOrder(order, true));
    dispatch(deliverOrder(order._id));
  }

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className = "container">
      <h1 className ="text-center display-6">Order ID: {order._id}</h1>
      <hr className="mt-5 mb-5" style={{ border: "0px", borderTop: "5px solid blue" }}></hr>
      <div class="border border-info rounded row g-0 overflow-hidden shadow-sm  position-relative">
      <div class="p-4 d-flex flex-column">
      <div className="row">
      <div className = "col-12">
      <h1 className = "card-title">Order Summary</h1>
      </div>
      <div className="row">
      <div className = "col-md-4 col-sm-12 align-self-center mb-sm-4">
      
      <div><strong>Sum of Items : {order.itemsPrice.toFixed(2)} PLN</strong></div>
      <div><strong>Tax : {order.taxPrice.toFixed(2)} PLN</strong></div>
                
    </div>
    <div className = "col-md-4 col-sm-12 align-self-center mb-sm-4">
    <div><strong>Sum of Order : {order.totalPrice.toFixed(2)} PLN</strong></div>
    </div>
    <div className = "col-md-4 col-sm-12 align-self-center mb-sm-4">
      
    {!order.isPaid && order.paymentMethod === "PayPal" && (
      <span>
        {!sdkReady ? (
          <LoadingBox></LoadingBox>
        ) : (
          <>
            {errorPay && (
              <MessageBox variant="danger">{errorPay}</MessageBox>
            )}
            {loadingPay && <LoadingBox></LoadingBox>}

            <PayPalButton
              amount={order.totalPrice}
              onSuccess={successPaymentHandler}
            ></PayPalButton>
          </>
        )}
      </span>
    )}
    {userInfo.isAdmin && order.isPaid && !order.isDelivered && order.paymentMethod === "PayPal" && (
      <span><button type="button" className="btn btn-primary rounded-pill create-product mt-4 mb-5" onClick={deliverHandler}><h1 className="display-6">Deliver</h1></button>

      </span>
    )}
    {userInfo.isAdmin &&  !order.isDelivered && order.paymentMethod === "Cash" && (
      <span><button type="button" className="btn btn-primary rounded-pill create-product mt-4 mb-5" onClick={deliverHandlerWithPayment}><h1 className="display-6">Deliver</h1></button>

      </span>
    )}
    {(!(userInfo.isAdmin)) && order.isPaid && !order.isDelivered && (<span style = {{color: "green"}}>
      <i class="fa fa-check-circle fa-5x" aria-hidden="true"></i>
    </span>)}
    {order.isPaid && order.isDelivered && (<span style = {{color: "green"}}>
      <i class="fa fa-check-circle fa-5x" aria-hidden="true"></i>
    </span>)}
    {!userInfo.isAdmin &&  !order.isDelivered && order.paymentMethod === "Cash" && (<span style = {{color: "green"}}>
    <i class="fa fa-check-circle fa-3x" aria-hidden="true"> Wait for deliver!</i>
  </span>)}
    
                
    </div>
      </div>
      </div>
      </div>
      </div>
      <div class="row mt-3 mb-3">
            <div class="col-sm-6">
                <div class="border border-info rounded row g-0 overflow-hidden shadow-sm  position-relative">
                    <div class="col p-4 d-flex flex-column">
                       <h1 className = "card-title">Shipping</h1>
                       <p className="card-text"><strong>Name:</strong> {order.shippingAddress.fullName} <br/>
                       <strong>Address: </strong> {order.shippingAddress.address},
                       {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                       ,{order.shippingAddress.country} </p>
                       {order.isDelivered ? (
                        <MessageBox variant="success">
                          Delivered at {order.deliveredAt.substring(0, 10)}
                        </MessageBox>
                      ) : (
                        <MessageBox variant="danger">Not Delivered</MessageBox>
                      )}
                    </div>
                    
                 </div>
            </div> 
            <div class= {height>300 ? "col-sm-6  align-self-center" : "col-sm-6 mt-5  align-self-center"}>
                <div class="border border-info rounded row g-0 overflow-hidden shadow-sm  position-relative">
                    <div class="col p-4 d-flex flex-column">
                    <h1 className = "card-title">Payment</h1>
                       <p class="card-text mb-auto ">
                       <strong>
                       Method:</strong> {order.paymentMethod}
                       <br/>
                       {order.paymentMethod === "PayPal" && <strong>Online payment</strong>}
                       {order.paymentMethod === "Cash" && <strong>Cash on delivery</strong>}
                       {order.isPaid ? (
                        <MessageBox variant="success">
                          Paid at {order.paidAt.substring(0, 10)}
                        </MessageBox>
                      ) : (
                        <MessageBox variant="danger">Not Paid</MessageBox>
                      )}
                       </p>
                    </div>
                    
                 </div>
            </div> 
        </div> 
    </div>
  );
}
