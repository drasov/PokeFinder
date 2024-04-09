import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  const goToLogin = () => {
    router.push('/login');
  };

  console.log('Home component rendered');
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button onClick={goToLogin}>Go to Login</button>
    </div>
  );
};

export default Home;
