import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePost } from '../hooks/usePost';
import { ArrowLeft } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { post, loading, error } = usePost(id || '');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (post) {
      setTimeout(() => setIsVisible(true), 50);
    }
  }, [post]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className={`max-w-3xl mx-auto transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
        <ArrowLeft className="mr-2" size={20} />
        Back to Home
      </Link>
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 mb-4">{formatDate(post.created_at)}</p>
      {post.image && (
        <img src={post.image} alt={post.title} className="w-full h-64 object-cover mb-4 rounded" />
      )}
      {post.video && (
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <iframe
            src={post.video}
            title="video-player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded"
          ></iframe>
        </div>
      )}
      <div className="prose max-w-none">
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default PostDetail;