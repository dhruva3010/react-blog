import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';
import { formatDate } from '../utils/dateUtils';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out ${
        isHovered ? 'sm:scale-105 sm:shadow-lg' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {post.image && (
        <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-600 mb-2">{post.content.slice(0, 100)}...</p>
        <div className="flex justify-between items-center">
          <Link 
            to={`/post/${post.id}`} 
            className={`inline-block text-blue-600 hover:text-blue-800 transition-all duration-300 ease-in-out ${
              isHovered ? 'sm:transform sm:translate-x-2' : ''
            }`}
          >
            Read more
          </Link>
          <span className="text-sm text-gray-500">{formatDate(post.created_at)}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;