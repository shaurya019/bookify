import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";

import React from 'react'

const Login = () => {
    const firebase = useFirebase();
     const [email,setEmail] = useState('');
     const [password,setPassword] = useState('');
     const navigate = useNavigate();

     const handleSumbit = async (e) => {
        e.preventDefault();
        console.log("Login In User ...");
        const res = await firebase.createUser(email,password);
        console.log("Login Successfully",res);
     }

     useEffect (() => {
      console.log('Logged',firebase.isLoggedIn);
        if(firebase.isLoggedIn){
            navigate('/')
        } 
     },[firebase.isLoggedIn, navigate])
    return (
    <div className='container'>
        <h1>Login Page</h1>
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
        Login
      </Button>
    </Form>
    <h1>OR</h1>
    <Button onClick = {firebase.googleSignIn} variant="danger" type="submit">
        Google Login
      </Button>
    </div>
  )
}

export default Login
