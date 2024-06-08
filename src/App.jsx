import React from 'react'
import { Outlet } from 'react-router-dom'

function App() {

  

  return (
    <div className="min-h-screen flex flex-wrap content-between bg-white">
      <div className="w-full block">
        <Outlet />
      </div>
    </div>
  )
}

export default App
