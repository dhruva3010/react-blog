import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PostDetail from './PostDetail';
import { usePost } from '../hooks/usePost';

jest.mock('../hooks/usePost');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
}));

const mockPost = {
  id: '1',
  title: 'Test Post',
  content: 'This is a test post content.',
  image: 'https://example.com/image.jpg',
  video: 'https://example.com/video.mp4',
};

test('renders PostDetail component', async () => {
  (usePost as jest.Mock).mockReturnValue({
    post: mockPost,
    loading: false,
    error: null,
  });

  render(
    <Router>
      <PostDetail />
    </Router>
  );

  await waitFor(() => {
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('This is a test post content.')).toBeInTheDocument();
    expect(screen.getByAltText('Test Post')).toBeInTheDocument();
    const videoElement = screen.getByTitle('video-player');
    expect(videoElement).toBeInTheDocument();
    expect(videoElement).toHaveAttribute('src', mockPost.video);
    expect(screen.getByText('Back to Home')).toBeInTheDocument();
  });
});

test('renders loading state', () => {
  (usePost as jest.Mock).mockReturnValue({
    post: null,
    loading: true,
    error: null,
  });

  render(
    <Router>
      <PostDetail />
    </Router>
  );

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('renders error state', () => {
  (usePost as jest.Mock).mockReturnValue({
    post: null,
    loading: false,
    error: 'Failed to fetch post',
  });

  render(
    <Router>
      <PostDetail />
    </Router>
  );

  expect(screen.getByText('Error: Failed to fetch post')).toBeInTheDocument();
});