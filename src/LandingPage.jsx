import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice.js';
import authService from './aws/auth.js';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// Importing the image
import buildingsImage from './assets/buildings.svg'; // Adjust the path based on your file structure
import Groups from './assets/Group.svg';

function LandingPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  const logoSrc = Groups;

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
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-black p-4 flex justify-start items-center">
            <img src={logoSrc} alt="Logo" className="h-8" /> {/* Adjust height as needed */}
        </header>

        {/* Main Content */}
        <main className="flex-1 bg-white flex flex-col items-center justify-center">
            <div className="w-full h-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                {/* Left Box */}
                <div className="bg-white border-4 border-yellow p-8 rounded-lg shadow-lg flex flex-col justify-between">
                    <div className="flex flex-col items-center justify-center h-full">
                        <h2 className="text-black text-3xl font-bold mb-4 text-center">Welcome to HRConnect...</h2>
                        <p className="text-black text-lg text-center">
                            Welcome to HRConnect, Our platform offers advanced analytics, 24/7 customer service, and innovative solutions designed to propel your business forward. Join us to unlock your full potential and explore a future of endless possibilities.
                        </p>
                    </div>
                    <div className="flex space-x-4 justify-center">
                      <Link to="/auth/signup">
                          <button className="bg-black text-yellow px-6 py-3 text-lg rounded-md hover:bg-yellow hover:text-black transition duration-300">
                              Sign Up
                          </button>
                      </Link>
                      <Link to="/auth/login">
                          <button className="bg-black text-yellow px-6 py-3 text-lg rounded-md hover:bg-yellow hover:text-black transition duration-300">
                              Login
                          </button>
                      </Link>
                  </div>
                </div>

                {/* Illustration */}
                <div className="flex justify-center border-4 border-black">
                    <img src={buildingsImage} alt="Illustration" className="w-full h-auto rounded-lg shadow-lg" />
                </div>
            </div>
        </main>

        {/* Footer */}
        <footer className="bg-black p-8 flex flex-col md:flex-row items-start md:items-center justify-between text-yellow">
            <img src={logoSrc} alt="Logo" className="h-12 mb-4 md:mb-0" /> {/* Adjust height as needed */}
            <div className="flex flex-col md:flex-row md:space-x-8">
                <div className="mb-4 md:mb-0">
                    <h4 className="text-xl font-semibold">Company</h4>
                    <ul className="space-y-2">
                        <li>About Us</li>
                        <li>Careers</li>
                        <li>Blog</li>
                    </ul>
                </div>
                <div className="mb-4 md:mb-0">
                    <h4 className="text-xl font-semibold">Contact</h4>
                    <ul className="space-y-2">
                        <li>Email: contact@yourcompany.com</li>
                        <li>Phone: +123 456 7890</li>
                    </ul>
                </div>
            </div>
        </footer>
    </div>
) : null;
}

export default LandingPage;
