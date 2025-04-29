import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push('/login');
      }
    }, [loading, user, router]);

    if (loading || typeof window === 'undefined') {
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };
}

export default withAuth;
