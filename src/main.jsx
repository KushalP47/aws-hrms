import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './LandingPage.jsx'
import './index.css'
import { Signup, Login, Logout, ConfirmSignup } from './pages/Auth'
import { EmployeeAttendance, EmployeeDashboard, EmployeeLeaves, EmployeeFeedback, EmployeePayrolls } from './pages/Employee'
import { AdminAttendance, AdminDashboard, AdminLeaves, AdminFeedback, AdminPayrolls } from './pages/Admin'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store/store.js';


const router = createBrowserRouter([
  {
    path: '/landing-page',
    element: <LandingPage />,
  },
  {
    path: '/admin',
    element: <LandingPage />,
    children: [
      {
        path: '/admin/dashboard',
        element: <AdminDashboard />
      },{
        path: '/admin/attendance',
        element: <AdminAttendance />
      },{
        path: '/admin/leaves',
        element: <AdminLeaves />
      },{
        path: '/admin/feedback',
        element: <AdminFeedback />
      },{
        path: '/admin/payrolls',
        element: <AdminPayrolls />
      }
    ]
  },
  {
    path: '/employee',
    element: <LandingPage />,
    children: [
      {
        path: '/employee/dashboard',
        element: <EmployeeDashboard />
      },{
        path: '/employee/attendance',
        element: <EmployeeAttendance />
      },{
        path: '/employee/leaves',
        element: <EmployeeLeaves />
      },{
        path: '/employee/feedback',
        element: <EmployeeFeedback />
      },{
        path: '/employee/payrolls',
        element: <EmployeePayrolls />
      }
    ]
  },{
    path: '/auth',
    element: <LandingPage />,
    children: [
      {
        path: '/auth/logout',
        element: <Logout />
      },{
        path: '/auth/signup',
        element: <Signup />
      },{
        path: '/auth/login',
        element: <Login />
      },{
        path: '/auth/confirm-signup',
        element: <ConfirmSignup />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router}/>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
