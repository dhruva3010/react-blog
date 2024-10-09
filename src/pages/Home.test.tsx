import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';
import { usePosts } from '../hooks/usePosts';

jest.mock('../hooks/usePosts');

const mockPosts = [
  { id: '1', title: 'Test Post 1', content: 'Content 1' },
  { id: '2', title: 'Test Post 2', content: 'Content 2' },
];

test('renders Home component', async () => {
  (usePosts as jest.Mock).mockReturnValue({
    posts: mockPosts,
    loading: false,
    error: null,
  });

  render(
    <Router>
      <Home />
    </Router>
  );

  await waitFor(() => {
    expect(screen.getByText('Latest Posts')).toBeInTheDocument();
    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();
  });
});

test('renders loading state', () => {
  (usePosts as jest.Mock).mockReturnValue({
    posts: [],
    loading: true,
    error: null,
  });

  render(
    <Router>
      <Home />
    </Router>
  );

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('renders error state', () => {
  (usePosts as jest.Mock).mockReturnValue({
    posts: [],
    loading: false,
    error: 'Failed to fetch posts',
  });

  render(
    <Router>
      <Home />
    </Router>
  );

  expect(screen.getByText('Error: Failed to fetch posts')).toBeInTheDocument();
});