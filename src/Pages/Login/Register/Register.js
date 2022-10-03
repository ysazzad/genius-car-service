import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

const Register = () => {
    const [
        createUserWithEmailAndPassword,
        user
    ] = useCreateUserWithEmailAndPassword(auth);
    const navigate = useNavigate()
    const handleFormRegister = event => {
        event.preventDefault()
        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value
        createUserWithEmailAndPassword(email, password)
        console.log(name, email, password);
    }
    if (user) {
        navigate('/home')
    }
    return (
        <div className='w-50 p-5 bg-success mx-auto'>
            <h1 className='text-center text-primary'>Please Register</h1>
            <Form onSubmit={handleFormRegister}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control name="name" type="text" placeholder="Enter Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Enter email" />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <p>Already have an account? <Link className='text-danger fw-bold text-decoration-none' to={`/login`}>please Login</Link> </p>
        </div>
    );
};

export default Register;