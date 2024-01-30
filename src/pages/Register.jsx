import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";

import React from 'react'

const Register = () => {
    const firebase = useFirebase();
     const [email,setEmail] = useState('');
     const [password,setPassword] = useState('');

     const handleSumbit = async (e) => {
        e.preventDefault();
        console.log("Sign In User ...");
        const res = await firebase.signInUser(email,password);
        console.log("Successfully",res);
     }
    return (
    <div className='container'>
        <h1>Register Page</h1>
        <Form onSubmit={handleSumbit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={(e) => {
        setEmail(e.target.value)
      }} type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={
        (e) => {
          setPassword(e.target.value)
        }
      } type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create Account
      </Button>
    </Form>
    </div>
  )
}

export default Register
