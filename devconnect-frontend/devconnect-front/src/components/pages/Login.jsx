import React from 'react'
import {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async ()=>{

       if(  !email || !password){
      return alert('All fields are required');
    }
    const emailRegrex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegrex.test(email)){
      return alert("Invalid email format");
    }

        try {
        const res =    await axios.post('https://devconnect-developer-connect.onrender.com/api/login',{
                email,
                password,
            });
            
            localStorage.setItem('token' , res.data.token);
            alert('Login Successful');
            navigate('/profile');
            console.log(res.data);
            
        } catch (err) {
            console.error(err.response?.data || err.message);
            alert('Invalid credentials')
            
        }
    }

  return (
    <>
    <h1 className='text-2xl font-bold mb-6 text-center'>Login Page</h1>

    <input className='w-full px-4 py-2 mb-4 border rounded-md bg-lime-400'
    type='text'
    placeholder='email'
    value={email}
    onChange={(e)=>setEmail(e.target.value)}/>
    

    <input className='w-full px-4 py-2 mb-6 border rounded-md bg-lime-400'
    type='password'
    placeholder='password'
    value={password}
    onChange={(e)=>setPassword(e.target.value)}/>
    

     <button onClick={handleLogin}>
        Login
    </button>
    </>

   
  )
}

export default Login