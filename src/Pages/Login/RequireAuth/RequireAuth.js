
import React from 'react';
import { ToastContainer } from 'react-bootstrap';
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';

const RequireAuth = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const [sendEmailVerification, sending, error] = useSendEmailVerification(
        auth
    );
    const location = useLocation();
    if (loading) {
        return <Loading></Loading>
    }
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    if (!user.emailVerified) {
        return <div className='d-flex justify-content-center align-items-center ' style={{ height: "500px" }}>
            <div>
                <h3 className='text-danger'>Your Email s not verified</h3>
                <h5 className='text-success'>please verify your email address</h5>
                <button
                    className='btn btn-primary'
                    onClick={async () => {
                        await sendEmailVerification();
                        toast('Sent email');
                    }}
                >
                    Verify email again
                </button>
                <ToastContainer></ToastContainer>
            </div>
        </div>

    }
    return children;
};

export default RequireAuth;