import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { API } from '../../constant';

const Protect = ({ Component, reverse }) => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
  useEffect(() => {
    setLoading(true);
    axios.get(`${API}/login/check`, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(res => {
        if(reverse && res?.data?.logged_in){
            navigate('/')
        }
        else if(!res?.data?.logged_in){
            navigate('/login')
        }
    })
    .catch(err => {
        navigate('/login')
    })
    .finally(() => {
        setLoading(false);
    });

  }, []);

  return (
    <div>
        {!loading && <Component />}
    </div>
  )
}

export default Protect