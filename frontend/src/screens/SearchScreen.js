import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';

export default function SearchScreen(props) {
    const { name = 'all', category = 'all' } = useParams();
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    const productCategoryList = useSelector((state) => state.productCategoryList);
    const {
        loading: loadingCategories,
        error: errorCategories,
        categories,
    } = productCategoryList;
    useEffect(() => {
        dispatch(
            listProducts({
                name: name !== 'all' ? name : '',
                category: category !== 'all' ? category : '',
            })
        );
    }, [category, dispatch, name]);

    const getFilterUrl = (filter) => {
        const filterCategory = filter.category || category;
        const filterName = filter.name || name;
        return `/search/category/${filterCategory}/name/${filterName}`;
    };
    return (
        <div>
            <div className="row justify-content-center">
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <div className="col display-3 mt-2"><u>{products.length} Results</u></div>
                )}
            </div>


            <div className="container">
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <>
                        {products.length === 0 && (
                            <MessageBox>No Product Found</MessageBox>
                        )}
                        <div className="row center">
                            {products.map((product) => (
                                <Product key={product._id} product={product}></Product>
                            ))}
                        </div>
                    </>
                )}</div>


        </div>
    );
}