import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';
import Loading from '../../Shared/Loading/Loading';

const Register = () => {
    const [agree, setAgree] = useState(false)
    const [
        createUserWithEmailAndPassword,
        user,
        loading
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const [updateProfile, updating, error] = useUpdateProfile(auth);
    const navigate = useNavigate()
    const handleFormRegister = async (event) => {
        event.preventDefault()
        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value

        await createUserWithEmailAndPassword(email, password)
        await updateProfile({ displayName: name });
        navigate('/home')

        console.log('Updated profile');


        console.log(name, email, password);
    }
    if (loading || updating) {
        return <Loading></Loading>
    }
    if (user) {
        console.log(user);
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
                    <Form.Check className={`ps-2 ${agree ? 'text-primary' : 'text-warning'}`} onClick={() => setAgree(!agree)} id='terms' type="checkbox" label="Accept term and conditions" />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={!agree}>
                    Register
                </Button>
            </Form>
            <p>Already have an account? <Link className='text-danger fw-bold text-decoration-none' to={`/login`}>please Login</Link> </p>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;