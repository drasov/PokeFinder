import { useEffect } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      if (typeof window !== 'undefined') {
        if (!localStorage.getItem('token')) {
          router.push('/login');
        }
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
  return Wrapper;
};
export default withAuth;
