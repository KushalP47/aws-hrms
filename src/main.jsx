import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import { Signup, Login, Dashboard, ConfirmSignup } from './pages'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store/store.js';


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
      <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router}/>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
