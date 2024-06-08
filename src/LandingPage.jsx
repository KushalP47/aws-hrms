import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice.js';
import authService from './aws/auth.js';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    async function getUser() {
      try {
        const user = await authService.getCurrentUser();
        console.log('User:', user);
        if (user) {
          const session = await authService.getSession();
          if (session) {
            const email = session.getIdToken().payload.email;
            const token = session.getIdToken().jwtToken;
            const isAdmin = await authService.getUserRole({ email, token });
            dispatch(login({ email, token, isAdmin }));
            if(isAdmin) {
              navigate('/admin/dashboard');
            }else{
              navigate('/employee/dashboard');
            }
          } else {
            dispatch(logout());
          }
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error('Error:', error);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, [dispatch]);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-white">
      <div className="w-full block">
        
      </div>
    </div>
  ) : null;
}

export default LandingPage;
