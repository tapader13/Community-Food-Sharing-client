import { Outlet } from 'react-router';
import Navbar from './Navbar';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default HomePage;
