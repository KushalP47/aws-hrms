import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice.js';
import authService from './aws/auth.js';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);

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
        <Outlet />
      </div>
    </div>
  ) : null;
}

export default App;
