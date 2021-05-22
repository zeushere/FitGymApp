import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Product(props) {
  const { product } = props;
  return (
    <div className="col-sm-6 col-md-6 col-lg-4">
      <div key={product._id} className="card card-product">

        <Link to={`/product/${product._id}`}>
          <img className="card-img-top" style={{ height: "350px"}} src={product.image} alt={product.name} />
        </Link>
        <div className="card-text-overlay display-5"><Link className="card-title-hover text-white" to={`/product/${product._id}`}>Click to buy</Link></div>
        <div className="card-body">

          <div className="card-title col-12"><Link className="card-title" to={`/product/${product._id}`}>
            <strong>{product.name}</strong>
          </Link></div>

          <div className="card-text">
            <Rating
              rating={product.rating}
              numReviews={product.numReviews}
            ></Rating>
            <div className="display-4"><u>{product.price} PLN</u></div>
            <div className="pt-3">
              <Link to={`/product/${product._id}`} className="btn btn-primary"><h3>Read more</h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
