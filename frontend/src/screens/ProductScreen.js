import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createReview, detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  const monthArray= [1,2,3,4,5,6,7,8,9,10,11,12];

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Please enter comment and rating');
    }
  };
  return (
    <>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (<>
        <div className="row mt-2">
          <div className="col-12 text-left">

            <Link style={{ width: "100%" }} className="text-white text-left" to="/"> <button type="button" className="btn btn-info rounded-pill back-button mt-3 mb-5 pl-1 text-center"><h1 style={{ fontSize: "200%" }}>Back</h1></button></Link>
          </div>
        </div>
        <div className="bg-light p-4 mb-5 rounded text-center">
          <h2 className="font-italic">About <span className="text-info bold font-weight-bold">{product.name}</span></h2>
          <p>{product.description}. Recommended product that will allow you to achieve your dream goal. <span className="font-weight-bold">{product.name}</span> costs only <span className="font-weight-bold">{product.price} PLN</span>. Try it and you will see!</p>
        </div>

        <div className="container">
          <div className="row align-items-center">

            <div className="col-6">
              <img
                style={{ maxWidth: "100%", height: "60rem" }}
                src={product.image}
                alt={product.name}
              ></img>
            </div>

            <div className="col-6">
              <ul>
                <li className="mb-2">
                  <span className="display-3">{product.name}</span>
                </li>
                <li className="font-weight-bold mb-2">
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </li>
                <li className="d-inline">

                  <span>Status: </span>

                  {product.inStock == true ? (
                    <span className="success">In Stock</span>
                  ) : (
                    <span className="danger">Unavailable</span>
                  )}


                </li>
                {product.inStock == true && (
                  <>
                    <li className="mb-2">

                      <span>Subscription Time: </span>

                      <select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {monthArray.map(
                          (x) => (
                            <option key={x} value={x}>
                              {x}
                            </option>
                          )
                        )}
                      </select>
                    </li>
                    <li>
                      <button
                        onClick={addToCartHandler}
                        className="button btn-info">
                        <h3>Add to Cart</h3>
                      </button>
                    </li>
                  </>
                )}
              </ul>

            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="row text-center">
            <h1 className="display-3">Reviews</h1>
          </div>
          <div>
            {product.reviews.length === 0 && (
              <MessageBox>There is no review</MessageBox>
            )} </div>
          <div>
            <ul>
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <hr />
                  <strong>{review.name}</strong>
                  <strong><Rating rating={review.rating} caption=" "></Rating></strong>
                  <p><strong>Date of publication: </strong>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <li>
                <hr />
                {userInfo ? (
                  <div className="row">
                    <form className="form" onSubmit={submitHandler}>
                      <div>

                        <span className="display-2 text-center">Write review</span>
                      </div>
                      <div>
                        <label htmlFor="rating"><strong>Select Rating</strong></label>
                        <select
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1- Poor</option>
                          <option value="2">2- Fair</option>
                          <option value="3">3- Good</option>
                          <option value="4">4- Very good</option>
                          <option value="5">5- Excelent</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="comment"><strong>Write Comment</strong></label>
                        <textarea
                          id="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </div>
                      <div>
                        <label />
                        <button className="button btn-info" type="submit">
                          Submit
                      </button>
                      </div>

                      <div>
                        {loadingReviewCreate && <LoadingBox></LoadingBox>}
                        {errorReviewCreate && (
                          <MessageBox variant="danger">
                            {errorReviewCreate}
                          </MessageBox>
                        )}
                      </div>

                    </form>
                  </div>
                ) : (
                  <MessageBox>
                    Please <Link to="/signin">Sign In</Link> to write a review
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
        </div>
      </>
      )
      }
    </>
  );
}
