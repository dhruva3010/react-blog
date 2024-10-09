import React from 'react';
import { Link } from 'react-router-dom';
import { PenTool } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <PenTool className="mr-2" />
          MyBlog
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-blue-200">Home</Link></li>
            <li><Link to="/create" className="hover:text-blue-200">Create Post</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;