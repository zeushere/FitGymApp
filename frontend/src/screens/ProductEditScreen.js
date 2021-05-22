import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

function ProductEditScreen(props) {
    const productId = props.match.params.id;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [inStock, setInStock] = useState('');
    const [description, setDescription] = useState('');
    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;
    

    const productUpdate = useSelector(state => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

    const dispatch = useDispatch();
    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            props.history.push('/productlist');

        }
        if (!product || (product._id) !== productId || successUpdate) {
            dispatch(detailsProduct(productId));
            dispatch({ type: PRODUCT_UPDATE_RESET });
        }
        else {
            setName(product.name);
            setPrice(product.price);
            setCategory(product.category);
            setInStock(product.inStock);
            setDescription(product.description);
            setImage(product.image);
        }

    }, [product, dispatch, productId, successUpdate, props.history]);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
            _id: productId,
            name, price, image, category, inStock, description,
        }));
    };
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFromData = new FormData();
        bodyFromData.append('image', file);
        setLoadingUpload(true);

        try {
            const { data } = await Axios.post('/api/uploads', bodyFromData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`,
                }
            });
            setImage(data);
            setLoadingUpload(false);
        }
        catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    };
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div><h1 className="display-2 text-center">Edit Product - <span className="text-success">{name}</span> </h1>
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                </div>
                {loading ? (<LoadingBox></LoadingBox>) : error ? (<MessageBox variant="danger">{error}</MessageBox>) : (
                    <>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input id="name" type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}></input> </div>
                        <div>
                            <label htmlFor="price">Price</label>
                            <input id="price" type="text" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)}></input>

                        </div>  <div>
                            <label htmlFor="image">Image</label>
                            <input id="image" type="text" placeholder="Enter image" value={image} onChange={(e) => setImage(e.target.value)}></input>
                        </div><div>
                            <label htmlFor="imageFile">Image File</label>

                            <input type="file" id="imageFile" label="Choose File" onChange={uploadFileHandler}></input>
                            {loadingUpload && <LoadingBox></LoadingBox>}
                            {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}

                        </div> <div>
                            <label htmlFor="category">Category</label>
                            <input id="category" type="text" placeholder="Enter category" value={category} onChange={(e) => setCategory(e.target.value)}></input>

                        </div>         <div className="d-inline">
                        <label htmlFor="inStock">in Stock</label>
                        <input
                            id="inStock"
                            className="ml-2"
                            type="checkbox"
                            checked={inStock}
                            onChange={(e) => setInStock(e.target.checked)}
                        ></input>
                    </div> <div>
                            <label htmlFor="description">Description</label>
                            <textarea rows="3" id="description" type="text" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

                        </div>
                        <div>
                            <div className="row justify-content-center">
                                <button type="submit" className="btn btn-primary rounded-pill create-product mt-4 mb-5"><h1 className="display-5">Update Product</h1></button>
                            </div>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}

export default ProductEditScreen;