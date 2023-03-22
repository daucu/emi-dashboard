import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import Users from "./components/Users";
import Devices from "./components/Devices";
import Sellers from './components/Sellers.';
import Login from './components/auth/Login';
import Protect from './components/helper/Protect';
import Transactions from './components/Transactions';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Protect Component={Dashboard} />,
  }, 
  {
    path: '/login',
    element: <Protect Component={Login} reverse={true} />,
  },
  {
    path: '/users',
    element: <Protect Component={Users} />,
  },
  {
    path: '/sellers',
    element: <Protect Component={Sellers} />,
  },
  {
    path: '/devices',
    element: <Protect Component={Devices} />,
  },
  {
    path: '/transactions',
    element: <Protect Component={Transactions} />,
  },
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
