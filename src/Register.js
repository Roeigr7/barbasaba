import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from './firebase';
import { createUser } from './firestoreService';

const Register = () => {
  const [phoneInput, setPhoneInput] = useState('');

  const phoneHandler = e => {
    setPhoneInput(e.target.value);
  };
  const out = () => {
    firebase
      .auth()
      .signOut()
      .then(
        function () {
          console.log('Signed Out');
        },
        function (error) {
          console.error('Sign Out Error', error);
        }
      );
  };
  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible',
        callback: response => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
        },
      }
    );
  };
  const onSignInSubmit = e => {
    setUpRecaptcha();
    const phoneNumber = `+${phoneInput.toString()}`;
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(confirmationResult => {
        console.log('cskk,', confirmationResult);
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        const code = window.prompt('Enter OTP');
        confirmationResult
          .confirm(code)
          .then(result => {
            // User signed in successfully.
            const user = result.user;
            console.log('User is sign in');
            createUser(user.phoneNumber);

            // ...
          })
          .catch(error => {
            // User couldn't sign in (bad verification code?)
            // ...
          });
      })
      .catch(error => {
        console.log('cs');
        console.log(error);
      });
  };
  return (
    <div>
      <h1>register</h1>
      <form onSubmit={onSignInSubmit}>
        <label>dsadsa</label>
        <input onChange={phoneHandler} type='number' value={phoneInput} />
        <div id='sign-in-button'></div>
      </form>
      <Link to='/'>About</Link>

      <button onClick={out}>signout</button>
    </div>
  );
};
export default Register;
