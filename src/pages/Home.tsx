import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import { usePosts } from '../hooks/usePosts';

const Home: React.FC = () => {
  console.log('Home: Rendering Home component');
  const { posts, loading, error } = usePosts();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (posts && posts.length > 0) {
      console.log('Home: Posts loaded, setting visibility');
      setTimeout(() => setIsVisible(true), 50);
    }
  }, [posts]);

  if (loading) {
    console.log('Home: Loading posts');
    return <div className="text-center py-8">Loading...</div>;
  }
  if (error) {
    console.error('Home: Error loading posts', error);
    return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  }

  if (!posts || posts.length === 0) {
    return <div className="text-center py-8">No posts found. Create your first post!</div>;
  }

  console.log('Home: Rendering posts', posts);
  return (
    <div className={`transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <h1 className="text-3xl font-bold mb-6 px-4 sm:px-0">Latest Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-0">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;