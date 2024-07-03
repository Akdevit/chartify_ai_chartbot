import React, { useEffect } from 'react';
import { SignedIn, SignedOut, SignIn, UserButton, useAuth } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
    const navigate = useNavigate();
    const { isSignedIn } = useAuth();
    const redirectUrl = '/Chartify'; // The URL to redirect to after a successful login

    useEffect(() => {
        if (isSignedIn) {
            navigate(redirectUrl);
        }
    }, [isSignedIn, navigate, redirectUrl]);

    return (
        <>
            <div className='w-[100%] h-[100vh] flex justify-center items-center bg-[#212121]'>
                <SignedOut>
                    <SignIn afterSignInUrl={redirectUrl} />
                </SignedOut>

                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>


        </>
    );
}

export default LogIn;
