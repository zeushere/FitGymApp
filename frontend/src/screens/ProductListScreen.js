import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, deleteProduct, listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants';

function ProductListScreen(props) {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;
    const productCreate = useSelector(state => state.productCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;
    const productDelete = useSelector((state) => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;
    useEffect(() => {
        if (successCreate) {
            dispatch({ type: PRODUCT_CREATE_RESET });
            props.history.push(`/product/${createdProduct._id}/edit`);
        }
        if (successDelete) {
            dispatch({ type: PRODUCT_DELETE_RESET });
        }
        dispatch(listProducts(''));
    }, [createdProduct, dispatch, props.history, successCreate, successDelete]);

    const deleteHandler = (product) => {
        if (window.confirm('Are you sure to delete?')) {
            dispatch(deleteProduct(product._id));
        }
    };
    const createHandler = () => {
        dispatch(createProduct());
    }
    return (

        <div>
            <h1 className="display-2 text-center">Products </h1>
            { <div className="row justify-content-center">
                <button type="button" className="btn btn-primary rounded-pill create-product mb-5" onClick={createHandler}><h1 className="display-5">Create Product</h1></button>
            </div>

            }
            { loadingDelete && <LoadingBox></LoadingBox>}
            { errorDelete && <MessageBox variant='danger'>{errorDelete}</MessageBox>}
            { loadingCreate && <LoadingBox></LoadingBox>}
            { errorCreate && <MessageBox variant='danger'>{errorCreate}</MessageBox>}
            {
                loading ? (<LoadingBox></LoadingBox>
                ) :
                    error ? (<MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                        <div className="table-responsive-md">
                            <table className="table table-secondary table-hover">
                                <thead className="align-middle text-center">
                                    <tr>
                                        <th>PRODUCT ID</th>
                                        <th>NAME</th>
                                        <th>PRICE</th>
                                        <th>CATEGORY</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>

                                {products.map((product) => (
                                    <tbody className="align-middle text-center">
                                        <tr key={product._id}>
                                            <td>{product._id} </td>
                                            <td>{product.name} </td>
                                            <td>{product.price} </td>
                                            <td>{product.category} </td>
                                            <td>
                                                <button type="button" className="btn btn-primary btn-lg m-2" onClick={() => props.history.push(`/product/${product._id}/edit`)}>Edit</button>
                                                <button type="button" className="btn btn-primary btn-lg" onClick={() => { deleteHandler(product) }}>Delete</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}

                                <thead className="align-middle text-center">
                                    <tr>
                                        <th>Numbers of products:{products.length}</th>
                                        <th>-</th>
                                        <th>

                                        </th>
                                        <th>-</th>
                                        <th>-</th>
                                    </tr>
                                </thead>

                            </table>
                        </div>
                    )
            }

        </div >


    );
}

export default ProductListScreen;