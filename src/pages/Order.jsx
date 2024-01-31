import { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";

function Order() {
    const firebase = useFirebase();
    useEffect(() => {
        const fetchData = async () => {
            const result = await firebase.fetchOrder();
            if (result) {
                console.log(result.docs);
            } else {
                console.error("Fetch order returned null");
            }
        };

        fetchData();
    }, []);
  return (
    <div>
      <h1>Order</h1>
    </div>
  )
}

export default Order
