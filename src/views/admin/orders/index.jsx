import { useDocumentTitle, useScrollTop } from 'hooks';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from 'redux/actions/basketActions';

const Orders = () => {
  useDocumentTitle('Welcome | Orders');
  useScrollTop();
  const isLoading = useSelector((state) => state.app.loading);
  const dispatch = useDispatch();
  const orders = dispatch(getOrders());
  console.log('orders' +  JSON.stringify(orders));
  return (
    <div className="loader">
      <h2>Welcome to Order Board {orders.length}</h2>
    </div>
  );
};

export default Orders;
