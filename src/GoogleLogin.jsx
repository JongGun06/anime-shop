import React from 'react';
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';


const GoogleLogin = () => {
    let navigate = useNavigate()
    let {setUser} = useUser()
    let provider = new GoogleAuthProvider()
    function SignInWithGoogle() {
        signInWithPopup(auth, provider)
        .then((result) => {
            let user = result.user
            let userPhoto = user.photoURL
            setUser({ photo: userPhoto, name: user.displayName})
            navigate('/todolist')
        })
    }

    return (
        <div>
            <button onClick={SignInWithGoogle}>Sign in with google</button>
        </div>
    );
}

export default GoogleLogin;
