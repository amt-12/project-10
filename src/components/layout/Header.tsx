import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path 
      ? 'text-primary-700 border-primary-600'
      : 'text-gray-600 hover:text-gray-900 hover:border-gray-300 border-transparent';
  };
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-primary-700">
              <Briefcase className="h-6 w-6 mr-2" />
              <span className="text-xl font-bold">ProjectFlow</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${isActive('/')}`}
            >
              Projects
            </Link>
            <Link 
              to="/create" 
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${isActive('/create')}`}
            >
              New Project
            </Link>
          </nav>
          
          <div className="flex md:hidden">
            <button 
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg 
                className="h-6 w-6" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div className="hidden md:hidden">
        <div className="pt-2 pb-3 space-y-1">
          <Link 
            to="/" 
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              location.pathname === '/' 
                ? 'bg-primary-50 border-primary-500 text-primary-700'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            }`}
          >
            Projects
          </Link>
          <Link 
            to="/create" 
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              location.pathname === '/create' 
                ? 'bg-primary-50 border-primary-500 text-primary-700'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            }`}
          >
            New Project
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;