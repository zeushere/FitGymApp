import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


export default function OrderHistoryScreen(props) {
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  let sumOfOrders = 0;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);



  return (
    <div>
      <h1 className="display-2 text-center">Order History </h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="table-responsive-sm">
          <table className="table table-secondary table-hover">
            <thead className="align-middle text-center">
              <tr>
                <th>Order ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>STATUS</th>
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
                    <th className="delivered">{order.isPaid && order.isDelivered ? ('Delivered') : order.isPaid ? ('Paid') : ('Not Paid')}</th>


                    <th className="delivered">
                      <button
                        type="button"
                        className="btn btn-primary btn-lg"
                        onClick={() => {
                          props.history.push(`/order/${order._id}`);
                        }}
                      >
                        Details
                  </button>
                    </th>
                  </tr>) : (<tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice.toFixed(2)}</td>
                    <td>{order.isPaid && order.isDelivered ? ('Delivered') : order.isPaid ? ('Paid') : ('Not Paid')}</td>


                    <td>
                      <button
                        type="button"
                        className="btn btn-primary btn-lg"
                        onClick={() => {
                          props.history.push(`/order/${order._id}`);
                        }}
                      >
                        Details
                  </button>
                    </td>
                  </tr>)
                }
              </tbody>
            ))}

            <thead className="align-middle text-center">
              <tr>
                <th>Numbers of orders:{orders.length}</th>
                <th>-</th>
                <th>
                  {orders.map((order) => {
                    sumOfOrders = sumOfOrders + order.totalPrice;
                  })}
                  {sumOfOrders} PLN
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
