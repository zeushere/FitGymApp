/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MemoryRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderListScreen from './screens/OrderListScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import SearchScreen from './screens/SearchScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import UserEditScreen from './screens/UserEditScreen';
import UserListScreen from './screens/UserListScreen';
import Footer from './components/Footer';
import useWindowDimensions from './components/WindowDimension';
import Navbar from './components/Navbar';
import ChartScreen from './screens/ChartScreen';

function App() {
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
    <MemoryRouter>
      <div className="page-container">
        <div className="content-wrap">
          <Navbar />

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
          <main className="container">
          <div className="container">
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
          <Route path="/signin" component={SigninScreen} exact></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route path="/product/:id/" component={ProductScreen} exact></Route>

          <Route
              path="/search/name/:name?"
              component={SearchScreen}
              exact
          ></Route>
          <Route
              path="/search/category/:category"
              component={SearchScreen}
              exact
          ></Route>
          <Route
              path="/search/category/:category/name/:name"
              component={SearchScreen}
              exact
          ></Route>
          <PrivateRoute
              path="/profile"
              component={ProfileScreen}
          ></PrivateRoute>
          <AdminRoute path="/productlist" component={ProductListScreen}></AdminRoute>
          <AdminRoute path="/orderlist" component={OrderListScreen}></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>
          <AdminRoute path="/charts" component={ChartScreen}></AdminRoute>
          <Route path="/" component={HomeScreen} exact></Route>
      </div>
          </main>
        </div>

        <Footer />

      </div>

    </MemoryRouter>
  );
}

export default App;
