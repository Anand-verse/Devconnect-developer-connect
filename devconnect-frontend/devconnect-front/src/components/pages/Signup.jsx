import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [username , setUsername] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')

  const handleChange = async ()=> {

    if(!username || !email || !password){
      return alert('All fields are required');
    }

    if(password.length < 6){
      return alert("Password must be at least 6 characters");
    }

    const emailRegrex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegrex.test(email)){
      return alert("Invalid email format");
    }

    try {
       const res = await axios.post('http://localhost:5000/api/signup',{
            name: username,
            email,
            password,
        });

        alert('User created successfully');
        console.log(res.data);
        
    } catch (err) {
        console.error(err.response?.data || err.message);
        alert('Signup failed');
        
    }
    

  };

  return (
    <>
    <div className="flex flex-row  items-center justify-center h-screen bg-gray-100">

    <div className='bg-white p-8 rounded-lg shadow-md w-96'>
    <h1 className='text-2xl font-bold mb-6 text-center'>SignUP Page</h1>

    <input className='w-full px-4 py-2 mb-4 border rounded-md bg-lime-400'
    
    type='text'
    placeholder='Name'
    value={username} 
    onChange={(e)=>setUsername(e.target.value)}/>

    <input className=' w-full px-4 py-2 mb-4 border rounded-md bg-lime-400'
    type='text'
    placeholder='Email'
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
     />

    <input className='w-full px-4 py-2 mb-6 border rounded-md bg-lime-400'
    type='password'
    placeholder='password'
    value={password}
    onChange={(e)=>setPassword(e.target.value)} />

    <button onClick={ handleChange} 
    className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600'
    > Create Account </button>

</div>
</div>
    </>
  )

  
}

export default Signup;