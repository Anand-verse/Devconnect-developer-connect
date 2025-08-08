import React ,{useState , useEffect} from 'react';
import axios from 'axios';


const Profile = () => {
  const [user ,setUser] = useState(null);

  useEffect(()=>{
    const token = localStorage.getItem('token');

    if(!token){
        alert('Not logged in');
        return;
    }

     axios.get(' https://devconnect-developer-connect.onrender.com/api/profile' ,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then((res)=>{
        setUser(res.data);
    }).catch((err)=>{
        console.error(err);
        alert('Unauthorized or expired token');
        
    });
  }, []);

  if (!user) return <p>Loading profile...</p>

  const handleLogout=()=>{
    localStorage.removeItem('token');
    window.location.href = '/login'
  }

  return (
    <>
    <h1>Profile</h1>
    <div>
        <h2>Welcome , {user?.name}</h2>
        <p>Email:{user?.email}</p>
    </div>
    <button className='logout-btn' 
    onClick={handleLogout}>
        Logout</button>
    </>
  );
};

export default Profile;