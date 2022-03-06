import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import './Login.css'
import { useDispatch } from 'react-redux';
import { login } from './features/counter/userSlice';

function Login() {

    const [formFields, setFormFields] = useState({
        name: '',
        email: '',
        img: '',
        password: ''
    })

    const dispatch = useDispatch();

    const registerClick = (e) => {
        e.preventDefault();

        if (!formFields.name || !formFields.email) {
            return alert(`Please, complete the folow fields ${!formFields.name ? 'name ' : ''} ${!formFields.password ? 'password' : ''}`)
        }
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, formFields.email, formFields.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            updateProfile(auth.currentUser, {
                displayName: formFields.name, 
                photoURL: formFields.img
            })
            .then(() => {
                // Profile updated!
                dispatch(login({
                    email: userCredential.user.email,
                    uid: userCredential.user.uid,
                    displayName: formFields.name,
                    photoURL: formFields.img
                }))
            })
            .catch((error) => {
                // An error occurred
                console.error(error)
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode, errorMessage)
            // ..
          });
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const { email, password } = e.target
        console.log(email, password)
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            dispatch(login({
                email: user.email,
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL
            }))
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode, errorMessage)
        });
    }

    const handleChange = (e) => {
        setFormFields({
            ...formFields,
            [e.target.name]:e.target.value
        })

    }

  return (
    <div className='login' >
        <img 
            alt='linkedin_logo' 
            src='/linkedin-logo-with-text.png'
            className='logo-login'
        />

        <form onSubmit={handleLogin}>
            <input 
                placeholder='Full name (required if registering)' 
                type='text'
                name='name'
                value={formFields.name}
                onChange={handleChange}
            />

            <input 
                placeholder='Profile Pic URL (optional)' 
                type='text'
                name='img'
                value={formFields.img}
                onChange={handleChange}
            />

            <input 
                placeholder='Email' 
                type='email'
                name='email'
                value={formFields.email}
                onChange={handleChange}
            />

            <input 
                placeholder='Password' 
                type='password'
                name='password'
                value={formFields.password}
                onChange={handleChange}
            />

            <button >Sign in</button>

            <p className='register__now'>Not a member?{" "} <span type='submit' role='link' className='login__register' onClick={registerClick}>Register Now</span></p>
        </form>        
    </div>
  )
}

export default Login