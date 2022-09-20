import './login.css'
import React from 'react'
import { useState } from 'react';
import { auth } from '../Firebase';
import { signInWithEmailAndPassword,  onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';


function Login() {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [user, setUser] = useState(null);
  let [loader, setLoader] = useState(false);
  let [error, setError] = useState("");

  const trackEmail = (e) => {
    setEmail(e.target.value)
  }
  const trackPassword = (e) => {
    setPassword(e.target.value)
  }

  const login = async () => {
    // alert(email + " " + password)
    try {
      setLoader(true);
      let userCred = await signInWithEmailAndPassword(auth, email, password)
      console.log(userCred);
      setUser(userCred.user);
    } catch (err) {
      setError(err.message);
      // after some time => remove error message
      setTimeout(() => {
        setError("");
      }, 2000);
    }
    setLoader(false);
  }

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
      } else {
        // User is signed out
        // ...
        setUser(null);
      }
    });
  }, [])

  return (
    <>
      {
        error !== "" ? <h1>{error}</h1> :
          loader === true ? <h1>...Loading</h1> :
            user != null ? <></> :
              <>
                <div className='login-box'>
                  <form className='inner'>

                  <input onChange={trackEmail} type="email" value={email} placeholder="Enter Email" />
                  <br />
                  <input onChange={trackPassword} type="password" value={password} placeholder="Password" />
                  <br />
                  <button onClick={login}>Login</button>
                  <br />
                  Don't have an account? <a href="./signup">Signup</a>
                  </form>
                </div>
              </>

      }


    </>
  )
}

export default Login