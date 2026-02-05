import { Outlet } from 'react-router-dom';
import SideBar from '../components/ContentComponents/SideBar.tsx';

const Content = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Content;
