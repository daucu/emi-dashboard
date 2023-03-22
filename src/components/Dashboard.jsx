import React from 'react'
import Base from './Base/Base'

import '../styles/dashboard.css'
import { FaUsers } from 'react-icons/fa';
import { BiDevices } from 'react-icons/bi';
import { MdPayment, MdPendingActions } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { BsCash, BsShopWindow } from 'react-icons/bs';
import { GrTransaction } from 'react-icons/gr';

import axios from 'axios';
import { API } from '../constant';

const Dashboard = () => {

   const [paymentsInfo, setPaymentsInfo] = React.useState({});
   const [stats, setStats] = React.useState({});

   React.useEffect(() => {
      axios
      .get(`${API}/dashboard/payments`,
      {
         headers: {
            token: localStorage.getItem('token')
         },
      })
      .then((res) => {
         setPaymentsInfo(res.data);
      })
      .catch((err) => {
         console.log(err);
      });
   }, []);

   React.useEffect(() => {
      axios
      .get(`${API}/dashboard/stats`,
      {
         headers: {
            token: localStorage.getItem('token')
         },
      })
      .then((res) => {
         setStats(res.data);
      })
      .catch((err) => {
         console.log(err);
      });
   }, []);

   // commafy
   const commafy = (num) => {
      var str = num.toString().split('.');
      if (str[0].length >= 5) {
         str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
      }
      if (str[1] && str[1].length >= 5) {
         str[1] = str[1].replace(/(\d{3})/g, '$1 ');
      }
      return str.join('.');
   };


   return (
      <Base>
         <div>
            <div className="p-6 grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
               <div className="p-4 transition-shadow bg-[#ffffff] border rounded-lg shadow-sm hover:shadow-lg">
                  <div className="flex items-start justify-between">
                     <div className="flex flex-col space-y-2">
                        <span className="text-gray-800">Total Payments</span>
                        <span className="text-lg font-semibold">
                           {commafy(paymentsInfo.total_payments || 0)}
                        </span>
                     </div>
                     <div className="p-6 bg-gray-200 items-center text-center justify-center rounded-md">
                        <MdPayment
                           size={25}
                           color="#187FFF"
                           className="font-bold"
                        />
                     </div>
                  </div>
               </div>
               <div className="p-4 transition-shadow bg-[#ffffff] border rounded-lg shadow-sm hover:shadow-lg">
                  <div className="flex items-start justify-between">
                     <div className="flex flex-col space-y-2">
                        <span className="text-gray-800">Pending Payments</span>
                        <span className="text-lg font-semibold">
                        {commafy(paymentsInfo.pending_payments || 0)}
                        </span>
                     </div>
                     <div className="p-6 bg-gray-200 items-center text-center justify-center rounded-md">
                        <MdPendingActions size={28} color={"#f0831d"} className="font-bold" />
                     </div>
                  </div>
               </div>
               <div className="p-4 transition-shadow bg-[#ffffff] border rounded-lg shadow-sm hover:shadow-lg">
                  <div className="flex items-start justify-between">
                     <div className="flex flex-col space-y-2">
                        <span className="text-gray-800">Cancled Payments</span>
                        <span className="text-lg font-semibold">
                        {commafy(paymentsInfo.success_payments|| 0)}
                        </span>
                     </div>
                     <div className="p-6 bg-gray-200 items-center text-center justify-center rounded-md">
                        <RxCross2 size={28} color={"red"} className="font-bold" />
                     </div>
                  </div>
               </div>

               <div className="p-4 transition-shadow bg-[#ffffff] border rounded-lg shadow-sm hover:shadow-lg">
                  <div className="flex items-start justify-between">
                     <div className="flex flex-col space-y-2">
                        <span className="text-gray-800">Total Loans</span>
                        <span className="text-lg font-semibold">
                           {commafy(paymentsInfo.total_loan|| 0)}
                        </span>
                     </div>
                     <div className="p-6 bg-gray-200 items-center text-center justify-center rounded-md">
                        <BsCash size={25} color="#c587ff" className="font-bold" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="p-6 grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 xl:gap-6 lg:gap-6 md:gap-4 sm:gap-3">
            <div className="report-card flex flex-col">
               <div className="card">
                  <div className="card-body border p-5 flex bg-white flex-col">
                     <div className="flex flex-row justify-between items-center">
                        <FaUsers size={28} className={"text-indigo-700"} />
                        {/* <span className="rounded-full px-3 py-2 text-white badge bg-teal-400 text-xs">
                           {stats.total_users || 0}
                           <i className="fal fa-chevron-up ml-1"></i>
                        </span> */}
                     </div>

                     <div className="mt-8">
                        <h1 className="h5 num-4 text-3xl">{stats.total_users || 0}</h1>
                        <p className="capitalize text-gray-400 font-bold">Users</p>
                     </div>
                  </div>
               </div>
               <div className="footer bg-white p-1 mx-4 border border-t-0 rounded rounded-t-none"></div>
            </div>

            <div className="report-card">
               <div className="card">
                  <div className="card-body border p-5 flex bg-white flex-col">
                     <div className="flex flex-row justify-between items-center">
                        <BsShopWindow size={28} className={"text-red-700"} />
                        {/* <span className="rounded-full px-3 py-2 text-white badge bg-red-400 text-xs">
                           {stats.total_devices || 0}
                           <i className="fal fa-chevron-down ml-1"></i>
                        </span> */}
                     </div>

                     <div className="mt-8">
                        <h1 className="h5 num-4 text-3xl">{stats.total_devices || 0}</h1>
                        <p className="capitalize text-gray-400 font-bold">Sellers</p>
                     </div>
                  </div>
               </div>
               <div className="footer bg-white p-1 mx-4 border border-t-0 rounded rounded-t-none"></div>
            </div>

            <div className="report-card">
               <div className="card">
                  <div className="card-body border p-5 flex bg-white flex-col">
                     <div className="flex flex-row justify-between items-center">
                        <BiDevices size={28} className={"text-yellow-700"} />
                        {/* <span className="rounded-full py-2 px-3 text-white badge bg-teal-400 text-xs">
                           {stats.total_devices || 0}
                           <i className="fal fa-chevron-up ml-1"></i>
                        </span> */}
                     </div>

                     <div className="mt-8">
                        <h1 className="h5 num-4 text-3xl">{stats.total_devices || 0}</h1>
                        <p className="capitalize text-gray-400 font-bold">
                           Devices
                        </p>
                     </div>
                  </div>
               </div>
               <div className="footer bg-white p-1 mx-4 border border-t-0 rounded rounded-t-none"></div>
            </div>
            <div className="report-card">
               <div className="card">
                  <div className="card-body border p-5 flex bg-white flex-col">
                     <div className="flex flex-row justify-between items-center">
                        <GrTransaction size={28} className={"text-green-700"} />
                        {/* <span className="rounded-full px-3 py-2 text-white badge bg-teal-400 text-xs">
                           {stats.total_transactions || 0}
                           <i className="fal fa-chevron-up ml-1"></i>
                        </span> */}
                     </div>

                     <div className="mt-8">
                        <h1 className="h5 num-4 text-3xl">{stats.total_transactions || 0}</h1>
                        <p className="capitalize font-bold text-gray-400">
                           Transactions
                        </p>
                     </div>
                  </div>
               </div>
               <div className="footer bg-white p-1 mx-4 border border-t-0 rounded rounded-t-none"></div>
            </div>

         
         </div>

      </Base>
   )
}

export default Dashboard