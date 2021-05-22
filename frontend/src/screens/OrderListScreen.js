import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';

function OrderListScreen(props) {
    const orderList = useSelector(state => state.orderList);
    const { loading, error, orders } = orderList;
    const orderDelete = useSelector(state => state.orderDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = orderDelete;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: ORDER_DELETE_RESET });
        dispatch(listOrders());

    }, [dispatch, successDelete]);
    const deleteHandler = (order) => {
        if (window.confirm('Are you sure to delete ?')) {
            dispatch(deleteOrder(order._id));
        }
    };
    return (
        <div>

            <h1 className="display-2 text-center">Orders </h1>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div className="table-responsive-md">
                    <table className="table table-secondary table-hover">
                        <thead className="align-middle text-center">
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>

                        {orders.map((order) => (
                            <tbody className="align-middle text-center">
                                {order.isDelivered ? (
                                    <tr key={order._id}>
                                        <th className="delivered">{order._id}</th>
                                        <th className="delivered">{order.createdAt.substring(0, 10)}</th>
                                        <th className="delivered">{order.totalPrice.toFixed(2)}</th>
                                        <th className="delivered">{order.isPaid ? 'Yes' : 'No'}</th>
                                        <th className="delivered">
                                            {order.isDelivered
                                                ? order.deliveredAt.substring(0, 10)
                                                : 'No'}
                                        </th>
                                        <th className="delivered">
                                            <button
                                                type="button"
                                                className="btn btn-primary btn-lg m-2"
                                                onClick={() => {
                                                    props.history.push(`/order/${order._id}`);
                                                }}
                                            >
                                                Details
                  </button>
                                            <button type="button" className="btn btn-primary btn-lg" onClick={() => { deleteHandler(order) }}>Delete</button>
                                        </th>
                                    </tr>) : (<tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice.toFixed(2)}</td>
                                        <td>{order.isPaid ? 'Yes' : 'No'}</td>
                                        <td>
                                            {order.isDelivered
                                                ? order.deliveredAt.substring(0, 10)
                                                : 'No'}
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-primary btn-lg m-2"
                                                onClick={() => {
                                                    props.history.push(`/order/${order._id}`);
                                                }}
                                            >
                                                Details
                  </button>
                                            <button type="button" className="btn btn-primary btn-lg" onClick={() => { deleteHandler(order) }}>Delete</button>
                                        </td>
                                    </tr>)}
                            </tbody>
                        ))}

                        <thead className="align-middle text-center">
                            <tr>
                                <th>Numbers of orders:{orders.length}</th>
                                <th>-</th>
                                <th>-</th>
                                <th>-</th>
                                <th>-</th>
                                <th>-</th>
                            </tr>
                        </thead>

                    </table>
                </div>
            )

            }
        </div>

    );
}

export default OrderListScreen;