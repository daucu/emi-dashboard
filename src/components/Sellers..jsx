import React, { useState, useEffect } from 'react';
import Base from './Base/Base'

import { API } from '../constant';
import axios from 'axios';
import Loading from './Loading';
import { AiOutlinePlus } from 'react-icons/ai';
import '../styles/seller.css';

const Sellers = () => {

  const [users, setUsers] = useState([]);
  const [IsLoading, setIsLoading] = useState(false)

  const [showForm, setShowForm] = useState(false);
  const [seller, setSeller] = useState({
    name: '',
    email: '',
    password: '',
  });

  const getAllUsers = () => {
    setIsLoading(true);
    axios.get(`${API}/users/role/seller`)
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => console.log(err))
      .finally(() => { setTimeout(() => setIsLoading(false), 500); })
  }

  useEffect(() => {
    getAllUsers();
  }, [])



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSeller({ ...seller, [name]: value });
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API}/register`, {
      ...seller,
      role: 'seller'
    })
      .then(res => {
        console.log(res.data);
        setIsLoading(true);
        setSeller({
          name: '',
          email: '',
          password: '',
        });
        setShowForm(false);
        setUsers([...users, res.data]);
        setIsLoading(false);
      })
      .catch(err => console.log(err))
  }

  return (
    <Base>
      <div style={{ padding: "20px" }}>

        <div className='flex py-4'>

          <div 
          onClick={() => setShowForm(!showForm)}
          className='p-3 cursor-pointer bg-teal-500 text-white rounded-md shadow-md flex items-center gap-x-2'>
            <AiOutlinePlus size={20} />
            <h3>
              Add New Seller
            </h3>
          </div>
        </div>

        <form className='sellerAddForm' style={{
          height: showForm ? '250px' : '0',
        }} onSubmit={handleFormSubmit}>
          <div className='sellerAddInputs'>
            <input value={seller.name} onChange={handleInputChange} className="sellerInput" type="text" name='name' placeholder='Name' />
            <input value={seller.email} onChange={handleInputChange} className="sellerInput" type="text" name="email" placeholder='Email' />
            <input value={seller.password} onChange={handleInputChange} className="sellerInput" type="password" name="password" placeholder='Password' />
          </div>

          <input type="submit" value="Add" className='addSellerBtn' />
        </form>



        <Loading loading={IsLoading}>
          <div className='table_div'>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                </tr>
              </thead>
              {!IsLoading && (
                <tbody >
                  {users.length > 0
                    && users.map((user, index) => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user?.address || "N/A"}</td>
                      </tr>
                    ))}
                </tbody>
              )}
            </table>
          </div>
        </Loading>
      </div>
    </Base>
  )
}

export default Sellers;