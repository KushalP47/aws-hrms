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
        path: '/dashboard',
        element: <AdminDashboard />
      },{
        path: '/attendance',
        element: <AdminAttendance />
      },{
        path: '/leaves',
        element: <AdminLeaves />
      },{
        path: '/feedback',
        element: <AdminFeedback />
      },{
        path: '/payrolls',
        element: <AdminPayrolls />
      }
    ]
  },
  {
    path: '/employee',
    element: <LandingPage />,
    children: [
      {
        path: '/dashboard',
        element: <h1>Employee Dashboard</h1>
      },{
        path: '/attendance',
        element: <EmployeeAttendance />
      },{
        path: '/leaves',
        element: <EmployeeLeaves />
      },{
        path: '/feedback',
        element: <EmployeeFeedback />
      },{
        path: '/payrolls',
        element: <EmployeePayrolls />
      }
    ]
  },{
    path: '/auth',
    element: <LandingPage />,
    children: [
      {
        path: '/logout',
        element: <Logout />
      },{
        path: '/signup',
        element: <Signup />
      },{
        path: '/login',
        element: <Login />
      },{
        path: '/confirm-signup',
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
