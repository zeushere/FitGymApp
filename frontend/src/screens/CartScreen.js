import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';
import useWindowDimensions from '../components/WindowDimension';

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const { height, width } = useWindowDimensions();
  const monthArray= [1,2,3,4,5,6,7,8,9,10,11,12];
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };
  return (

    <div className="row">
      <div className="container">
        <div className="row">
          <div className="col mt-3 justify-content-start">
            <span className="display-2">Shopping Cart</span>
          </div>
        </div>
        <div className="row">
          <div className="col-8 mt-3 display-2 text-left align-self-center" style={width > 800 ? { fontSize: "200%" } : { fontSize: "97%" }}>Sum (<span className="text-danger">{cartItems.length}</span> items) :
               <span className="text-danger"> {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}</span> PLN</div>
          <div className="col-4 mt-3 display-2 text-right align-self-center"> <button
            type="button"
            onClick={checkoutHandler}
            className="btn btn-primary" style={{ fontSize: "60%" }}
            disabled={cartItems.length === 0}
          >
            Checkout
              </button></div>
        </div>

      </div>  {
        cartItems.length === 0 ? (
          <>
            <div className="row">
              <hr className="mt-5 mb-5" style={{ border: "0px", borderTop: "5px solid blue" }}></hr>

            </div>
            <MessageBox>

              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          </>
        ) : (
          <div className="row">
            <ul>
              {cartItems.map((item) => (
                <li key={item.product}>
                  <div className="container">
                    <div className="row">
                      <hr className="mt-5 mb-5" style={{ border: "0px", borderTop: "5px solid blue" }}></hr>

                    </div>
                    <div className="col-12">

                      <div className="text-center">
                        <Link className="display-5 text-danger" to={`/product/${item.product}`}>{item.name}</Link>
                      </div>
                      <div className="row">
                        <div className="col mt-2 mb-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="mb-1 img-fluid" style={{ height: "20rem" }}
                          ></img></div>
                        <div className="col my-auto">
                          <div className="col display-6"><span style={width > 600 ? { fontSize: "100%" } : { fontSize: "80%" }}>{item.price} PLN</span></div>
                          <select
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            }
                          >
                            {monthArray.map((x) => (
                              <option key={x } value={x}>
                                {x}
                              </option>
                            ))}
                          </select>
                          <div className="mt-2" >
                            <button style={width > 800 ? { width: "75%" } : { width: "100%" }}
                              type="button" className="btn btn-info rounded-pill mt-2 mb-5 p-0 text-center"
                              onClick={() => removeFromCartHandler(item.product)}
                            >
                              <h1 style={{ fontSize: "200%" }}>Delete</h1>
                            </button>

                          </div>

                        </div>


                      </div>
                    </div>

                  </div>




                </li>
              ))}
            </ul>
          </div>)
      }
    </div >


  );
}
