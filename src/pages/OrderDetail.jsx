import React , { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import {useParams} from "react-router-dom"

function OrderDetailPage() {
    const firebase = useFirebase();
    const params = useParams();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        firebase.getOrder(params.bookId).then(orders => setOrders(orders));
    },[]);
    return (
        <div>
          <h1>Orders</h1>
          {Array.isArray(orders) && orders.length > 0 ? (
            orders.map((order) => {
              const data = order.data();
              return (
                <div key={order.id}>
                  <h3>Email: {data.userEmail}</h3>
                  <h3>Qty: {data.qty}</h3>
                </div>
              );
            })
          ) : (
            <p>No orders available.</p>
          )}
        </div>
      );
      
  )
}

export default OrderDetailPage
