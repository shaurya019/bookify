import { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function Details() {
    const params = useParams();
    console.log(params);
    const firebase = useFirebase();
    const [data,setData] = useState(null);
    const [url,setUrl] = useState(null);
    const [qty,setQty] = useState(1);

    useEffect(()=>{
        firebase.getBookId(params.bookId).then((value) => setData(value.data()))
    },[]);

    useEffect(()=>{
        if(data){
            const imageURL = data.imageURL;
            firebase.getURL(imageURL).then((url) => setUrl(url));
        }
    },[data]);


    if(data == null) {
        return <>Loading...</>
    }
    const placeOrder = async () => {
        const res = await firebase.placeOrder(params.bookId,qty);
        console.log("Order Placed",res);
    
    }
  return (
    <div className="Container mt-5">
        <h3>Name of Book - {data.name}</h3>
      <img src={url} width="500px"  style={{borderRadius:"10px"}}/>
      <h3>Price Rs. {data.price}</h3>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Qty</Form.Label>
        <Form.Control onChange={
        (e) => {
            setQty(e.target.value)
        }
      } type="number" value={qty}/>
      </Form.Group>
      <Button variant="success" onClick={placeOrder}>Buy Now</Button>

    </div>
  )
}

export default Details
