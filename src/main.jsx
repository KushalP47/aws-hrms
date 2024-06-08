import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import { Signup, Login, Dashboard, ConfirmSignup } from './pages'
import { Provider } from 'react-redux'
import store from './store/store.js'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Dashboard />
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
  },
  {
    path: '/',
    element: <h1>About</h1>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
