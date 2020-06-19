import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Lottie from 'react-lottie';
import animationData from '../lotties/14463-blue-bubbles.json'

const initialState = {
  username: '',
  password: ''
}

const Login = (props) => {
  const [user, setUser] = useState(initialState)
  const [isLoading, setIsLoading] =useState(false)
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route


  // Helpers ``````````````
  const handleChange = e => {
    setUser({...user, [e.target.name]:e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault()

    setIsLoading(true)
    axiosWithAuth()
    .post('/api/login', user)
    .then(res=> {
      console.log(res)
      window.localStorage.setItem('token', res.data.payload)
      props.history.push('/bubblePage')
    })
    .catch(err=>{
      console.log(err)
    })
    .finally(()=>{
      setIsLoading(false)
    })
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>

      <form onSubmit={handleSubmit}>
        <input
          type='username'
          name='username'
          placeholder='username'
          value={user.username}
          onChange={handleChange}
        />

        <input
          type='password'
          name='password'
          placeholder='password'
          value={user.password}
          onChange={handleChange}
        />
  {isLoading && <Lottie options={defaultOptions}
              height={200}
              width={200}
        />}
        <button>submit</button>
      </form>

    </>
  );
};

export default Login;
