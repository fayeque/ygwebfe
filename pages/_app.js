import '../styles/global.css'
import { AuthProvider } from '../context/AuthContext';
import { useState, useEffect } from 'react'
import Header from '../components/header';
import AdminRoute from '../components/AdminRoute';

function App({ Component, pageProps,router }) {

  const [isClient, setIsClient] = useState(false);
  const [groupId,setGroupId] = useState(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Optionally render a loading spinner
  }

  const isAdminRoute = router.pathname.startsWith('/admin');
  const PageComponent = isAdminRoute ? AdminRoute(Component) : Component;
  console.log("router.pathname " , router.pathname);
  console.log("groupId here ",groupId);


  return (
    <>
    <AuthProvider>
      <Header isAdminRoute={isAdminRoute} groupId={groupId}/>
      <PageComponent {...pageProps}  setGroupId={setGroupId}/>
    </AuthProvider>
    </>
  );
}

export default App;
