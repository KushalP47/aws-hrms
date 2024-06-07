import React from 'react'
import { Signup, Login, AuthProvider, Status } from './components'

function App() {

  return (
    <AuthProvider>
      <Status />
      <Signup />
      <Login />
    </AuthProvider>
  )
}

export default App
