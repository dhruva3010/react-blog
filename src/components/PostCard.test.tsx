import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PostCard from './PostCard';

const mockPost = {
  id: '1',
  title: 'Test Post',
  content: 'This is a test post content.',
  image: 'https://example.com/image.jpg'
};

test('renders PostCard component', () => {
  render(
    <Router>
      <PostCard post={mockPost} />
    </Router>
  );
  
  const titleElement = screen.getByText(mockPost.title);
  expect(titleElement).toBeInTheDocument();

  const contentElement = screen.getByText(/This is a test post content/i);
  expect(contentElement).toBeInTheDocument();

  const imageElement = screen.getByAltText(mockPost.title);
  expect(imageElement).toBeInTheDocument();
  expect(imageElement).toHaveAttribute('src', mockPost.image);

  const readMoreLink = screen.getByText(/Read more/i);
  expect(readMoreLink).toBeInTheDocument();
  expect(readMoreLink).toHaveAttribute('href', `/post/${mockPost.id}`);
});