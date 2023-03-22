import React, { useEffect, useState } from 'react'
import Base from './Base/Base'

import { API } from '../constant';
import axios from 'axios';
import Loading from './Loading';

const Users = () => {

  const [users, setUsers] = useState([]);
  const [IsLoading, setIsLoading] = useState(false)

  const getAllUsers = () => {
    setIsLoading(true);
    axios.get(`${API}/users/role/user`)
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => console.log(err))
      .finally(() => { setTimeout(() => setIsLoading(false), 1000); })
  }

  useEffect(() => {
    getAllUsers();
  }, [])

  return (
    <Base>
      <div style={{ padding: "20px" }}>


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
                <tbody>
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

export default Users