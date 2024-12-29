import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';


const AdminRoute = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const token = typeof window !== 'undefined' && localStorage.getItem('jwtToken');
    console.log('inside AdminRoute');
    const { isLoggedIn, logout } = useAuth();

    useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        console.log("token here is in 12 ", token)
        logout();
        router.replace('/login'); // Redirect to login if no token
      } else {
        // Optionally, validate token via an API
        // validateToken(token).catch(() => router.replace('/login'));
        try{
        const response = await fetch('`${process.env.NEXT_PUBLIC_API_URL}/api/user/validateToken', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          });
          console.log("response status ",response.status);
          if(response.status == '403'){
            logout();
            router.push("/login");
          }
        } catch (err) {
          console.error('Token validation failed:', err);
          logout();
          router.push('/login'); // Redirect to login if validation fails
        }
      }
    }
    validateToken();
    }, [token]);

    // Render the wrapped component only if token exists
    if (!token) {
        console.log("token here at 41 ",token);
      return null; // Or show a loading spinner
    }
    console.log("token here at 44 ",token);
    return <WrappedComponent {...props} />;
  };
};

export default AdminRoute;
