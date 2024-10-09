import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CreatePost from './CreatePost';
import { createPost } from '../api/posts';

jest.mock('../api/posts');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

test('renders CreatePost component', () => {
  render(
    <Router>
      <CreatePost />
    </Router>
  );

  expect(screen.getByText('Create New Post')).toBeInTheDocument();
  expect(screen.getByLabelText('Title')).toBeInTheDocument();
  expect(screen.getByLabelText('Content')).toBeInTheDocument();
  expect(screen.getByLabelText('Image URL')).toBeInTheDocument();
  expect(screen.getByLabelText('Video URL')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Create Post' })).toBeInTheDocument();
});

test('submits form with valid data', async () => {
  (createPost as jest.Mock).mockResolvedValue({ id: '1', title: 'Test Post', content: 'Test Content' });

  render(
    <Router>
      <CreatePost />
    </Router>
  );

  fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test Post' } });
  fireEvent.change(screen.getByLabelText('Content'), { target: { value: 'Test Content' } });
  fireEvent.change(screen.getByLabelText('Image URL'), { target: { value: 'https://example.com/image.jpg' } });
  fireEvent.change(screen.getByLabelText('Video URL'), { target: { value: 'https://example.com/video.mp4' } });

  fireEvent.click(screen.getByRole('button', { name: 'Create Post' }));

  await waitFor(() => {
    expect(createPost).toHaveBeenCalledWith({
      title: 'Test Post',
      content: 'Test Content',
      image: 'https://example.com/image.jpg',
      video: 'https://example.com/video.mp4',
    });
  });
});