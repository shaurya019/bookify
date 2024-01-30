import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from "../context/firebase";

function List() {
  const firebase = useFirebase();
    const [name,setName] = useState('');
     const [isBnNumber,setIsBnNumber] = useState('');
     const [price,setPrice] = useState('');
     const [coverPic,setCoverPic] = useState('');

     const handleSumbit =  async (e) => {
      e.preventDefault();
      await firebase.handleListData(name, isBnNumber, price, coverPic);
     }

  return (
     <Form onSubmit={handleSumbit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Book Name</Form.Label>
        <Form.Control onChange={(e) => {
        setName(e.target.value)
      }} value={name} type="text" placeholder="Enter Book Name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter ISBN</Form.Label>
        <Form.Control onChange={(e) => {
        setIsBnNumber(e.target.value)
      }} value={isBnNumber} type="text" placeholder="Enter ISBN" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Price</Form.Label>
        <Form.Control onChange={(e) => {
        setPrice(e.target.value)
      }} value={price} type="text" placeholder="Enter Price" />
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Cover Pic</Form.Label>
        <Form.Control onChange={(e) => {
        setCoverPic(e.target.files[0])
      }} type="file" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
  )
}

export default List
