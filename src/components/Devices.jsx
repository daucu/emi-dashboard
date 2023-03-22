import React, { useState, useEffect } from 'react'
import Base from './Base/Base'

import { API } from '../constant';
import axios from 'axios';
import Loading from './Loading';

const Devices = () => {

  const [devices, setDevices] = useState([]);
  const [IsLoading, setIsLoading] = useState(false)

  const getDevices = () => {
    setIsLoading(true);
    axios.get(`${API}/devices`,
      {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(res => {
        setDevices(res.data);
      })
      .catch(err => console.log(err))
      .finally(() => { setTimeout(() => setIsLoading(false), 1000); })
  }

  useEffect(() => {
    getDevices();
  }, [])

  return (
    <Base>
      <div style={{ padding: "20px" }}>


        <Loading loading={IsLoading}>
          <div className='table_div'>
            <table>
              <thead>
                <tr>
                  <th>Device</th>
                  <th>Price</th>
                  <th>IMEI No</th>
                  <th>User</th>
                  <th>Seller</th>
                  <th>Seller Email</th>
                </tr>
              </thead>
              {!IsLoading && (
                <tbody>
                  {devices.length > 0
                    && devices.map((device, index) => (
                      <tr>
                        <td>{device.device_name}</td>
                        <td>{device.device_price}</td>
                        <td>{device.imei_no}</td>
                        <td>{device.user?.name || "N/A"}</td>
                        <td>{device.seller?.name || "N/A"}</td>
                        <td>{device.seller?.email || "N/A"}</td>
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

export default Devices