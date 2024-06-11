import React, { useDebugValue, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function AuthLayout({children, isAdmin=false, isAuth=true}) {
    const userStatus = useSelector(state => state.auth.status)
    const adminStatus = useSelector(state => state.auth.isAdmin)
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        setLoader(true)
        if(userStatus == false){
            // no matter what happens but if userStatus is false then navigate to landing page
            navigate('/')
        } else if(isAuth == false && userStatus == true){
            // if user is logged in and isAuth is false then navigate to dashboard
            navigate('/dashboard')
        } else if(adminStatus == false && isAdmin == true){
            // if user is logged in and isAdmin is true then navigate to admin dashboard
            navigate('/dashboard')
        } else if(adminStatus == true && isAdmin == false){
            // if user is logged in and isAdmin is false then navigate to dashboard
            navigate('/admin/dashboard')
        }
        setLoader(false)
    }, [userStatus, navigate, isAdmin, isAuth])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}

export default AuthLayout
