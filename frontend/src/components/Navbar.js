/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { listProductCategories } from '../actions/productActions';
import { signout } from '../actions/userActions';
import CartScreen from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import OrderListScreen from '../screens/OrderListScreen';
import OrderScreen from '../screens/OrderScreen';
import PaymentMethodScreen from '../screens/PaymentMethodScreen';
import PlaceOrderScreen from '../screens/PlaceOrderScreen';
import ProductEditScreen from '../screens/ProductEditScreen';
import ProductListScreen from '../screens/ProductListScreen';
import SearchScreen from '../screens/SearchScreen';
import ProductScreen from '../screens/ProductScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SigninScreen from '../screens/SigninScreen';
import UserEditScreen from '../screens/UserEditScreen';
import UserListScreen from '../screens/UserListScreen';
import AdminRoute from './AdminRoute';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import SearchBox from './SearchBox';
import useWindowDimensions from './WindowDimension';
import PrivateRoute from './PrivateRoute';
import ShippingAddressScreen from '../screens/ShippingAddressScreen';
import ChartScreen from '../screens/ChartScreen';

const Navbar = props => {
    const cart = useSelector((state) => state.cart);
    const { height, width } = useWindowDimensions();
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    const { cartItems } = cart;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    const signoutHandler = () => {
        dispatch(signout());
    };
    const productCategoryList = useSelector((state) => state.productCategoryList);
    const {
        loading: loadingCategories,
        error: errorCategories,
        categories,
    } = productCategoryList;

    useEffect(() => {
        dispatch(listProductCategories());
    }, [dispatch]);


    return (
       <>

            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container-fluid">
                    <span className="navbar-brand">
                        <img width="30" height="30" src="https://cdn.pixabay.com/photo/2016/12/17/15/50/logo-1913689__480.png" alt="" onClick={() =>
                            sidebarIsOpen ? setSidebarIsOpen(false) : setSidebarIsOpen(true)} />
                    </span>
                    <Link to="/" className="nav-item active mr-auto ml-auto nav-name display-4">FitGym</Link>
                    <Link className="nav-item cart" to="/cart">
                        <img width="30" height="30" src="https://cdn3.iconfinder.com/data/icons/user-interface-vol-4-5/16/shopping_cart_bag_shop_shopcart_tray_favorite-512.png" />

                    </Link>{cartItems.length > 0 && (
                        <i className="badge">{cartItems.length}</i>
                    )}

                    <button className="navbar-toggler ml-2" type="button"
                        data-toggle="collapse" data-target="#navbarMenu">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarMenu">
                        <ul className={cartItems.length > 0 ? 'navbar-nav mr-auto mb-2 mt-md-2 ' : width > 800 ? 'ml-5 navbar-nav mr-auto mb-2 mt-md-2' : ' navbar-nav mr-auto mb-2 mt-md-2'}>
                            {userInfo ? (
                                <li className="nav-item dropdown">
                                    <Link href="#" id="navbarDarkDropDown1" role="button"
                                        data-toggle="dropdown" className="nav-link dropdown-toggle btn btn-primary btn-lg text-white mt-2"><strong>My Account</strong></Link>
                                    <ul class="dropdown-menu" aria-labelledby="navbarDarkDropDown1">
                                        <li><Link className="dropdown-item display-6" to="/profile">User Profile</Link></li>
                                        <li><Link className="dropdown-item display-6" to="/orderhistory">Order History</Link></li>
                                        <li><Link className="dropdown-item display-6" to="/#signout" onClick={signoutHandler}>Sign Out</Link></li>
                                    </ul>
                                </li>
                            ) : (<li><Route><Link className="nav-link mt-2 btn btn-primary btn-lg text-white" to="/signin">Sign In</Link></Route></li>)}
                            {userInfo && userInfo.isAdmin ?
                                (<li className={width > 700 ? ("nav-item dropdown ml-md-3") : ("nav-item dropdown ml-md-3 mt-2")}>
                                    <Link href="#" id="navbarDarkDropDown2" role="button"
                                        data-toggle="dropdown" className="nav-link dropdown-toggle btn btn-primary btn-lg mt-2 text-white "><strong>Admin Panel</strong></Link>
                                    <ul class="dropdown-menu" aria-labelledby="navbarDarkDropDown2">
                                        <li><Link to="/charts" className="dropdown-item display-6">Charts</Link></li>
                                        <li><Link to="/productlist" className="dropdown-item display-6">Products</Link></li>
                                        <li><Link to="/orderlist" className="dropdown-item display-6">Orders</Link></li>
                                        <li><Link to="/userlist" className="dropdown-item display-6">Users</Link></li>
                                    </ul>
                                </li>) : (<></>)}
                        </ul>
                        <Route
                            render={({ history }) => (
                                <SearchBox history={history}></SearchBox>
                            )}
                        ></Route>
                    </div>
                </div>
            </nav>
            <div></div>

            <aside className={sidebarIsOpen ? 'open' : ''}>
                <ul className="categories">
                    <li>
                        <strong>Categories</strong>
                        <button
                            onClick={() => setSidebarIsOpen(false)}
                            className="close-sidebar"
                            type="button"
                        >
                            <i className="fa fa-close"></i>
                        </button>
                    </li>
                    {loadingCategories ? (
                        <LoadingBox></LoadingBox>
                    ) : errorCategories ? (
                        <MessageBox variant="danger">{errorCategories}</MessageBox>
                    ) : (
                        categories.map((c) => (
                            <li key={c}>
                                <Link
                                    to={`/search/category/${c}`}
                                    onClick={() => setSidebarIsOpen(false)}
                                >
                                    {c}
                                </Link>
                            </li>
                        ))
                    )}
                </ul>
            </aside>
            
</>
    );
};

export default Navbar;