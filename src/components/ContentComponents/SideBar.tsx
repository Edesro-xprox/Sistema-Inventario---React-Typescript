import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, CubeIcon } from '@heroicons/react/24/outline';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    // Handle settings button click
    navigate("/loginPage");
  }

  return (
    <div className={`bg-gray-800 text-white transition-all duration-300 h-screen flex flex-col ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="flex items-center justify-between p-4">
        <h1 className={`text-xl font-bold ${!isOpen && 'hidden'}`}>Menú</h1>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-gray-700">
          {/* Icon placeholder - you can use an icon library like react-icons */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      <nav className="flex-grow">
        <ul>
          <li>
            <Link to="/content/products" className="flex items-center p-4 hover:bg-gray-700">
              {/* Icon placeholder */}
              <CubeIcon className="h-6 w-5 text-white-600 mr-4" />
              <span className={`${!isOpen && 'hidden'}`}>Productos</span>
            </Link>
          </li>
          {/* Add other menu items here */}
        </ul>
      </nav>
      {/* New button at the bottom */}
      <div className="p-4 border-t border-gray-700">
        <button className="flex items-center w-full p-4 hover:bg-gray-700 rounded-md" onClick={handleSettingsClick}>
          {/* Icon placeholder */}
          <span className="mr-4">
            <ArrowLeftIcon className="h-6 w-5 text-white-600" />
          </span>
          <span className={`${!isOpen && 'hidden'}`}>Volver al login</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
