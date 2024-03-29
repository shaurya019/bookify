import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import { useNavigate } from 'react-router-dom';

function Cards(props) {
    const firebase = useFirebase();
    const navigate = useNavigate();
     const [url,setUrl] = useState(null);


     useEffect(()=>{
        firebase.getURL(props.imageURL).then((url) => setUrl(url));
     },[]);

  return (
    <Card style={{ width: '18rem', margin:'25px'}}>
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          Book Cost is {props.price},
        </Card.Text>
        <button onClick={e => navigate(props.link)} >Click</button>
      </Card.Body>
    </Card>
  );
}

export default Cards;