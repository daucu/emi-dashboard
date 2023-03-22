import React, { useEffect, useState } from 'react'
import Base from './Base/Base'

import { API } from '../constant';
import axios from 'axios';
import Loading from './Loading';

const Transactions = () => {

  const [transactions, setTransactions] = useState([]);
  const [IsLoading, setIsLoading] = useState(false)

  const getAllTransactions = () => {
    setIsLoading(true);
    axios.get(`${API}/transactions`)
      .then(res => {
        setTransactions(res.data.transaction);
      })
      .catch(err => console.log(err))
      .finally(() => { setTimeout(() => setIsLoading(false), 1000); })
  }

  useEffect(() => {
    getAllTransactions();
  }, [])

  return (
    <Base>
      <div style={{ padding: "20px" }}>


        <Loading loading={IsLoading}>
          <div className='table_div'>
            <table>
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>User</th>
                  <th>Seller</th>
                  <th>Txn. Mode</th>
                </tr>
              </thead>
              {!IsLoading && (
                <tbody>
                  {transactions.length > 0
                    && transactions.map((transaction, index) => (
                      <tr key={transaction._id}>
                        <td>{transaction.amount}</td>
                        <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
                        <td>{transaction?.user_id?.name || "N/A"}</td>
                        <td>{transaction?.seller?.name || "N/A"}</td>
                        <td>{transaction?.status}</td>
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
export default Transactions