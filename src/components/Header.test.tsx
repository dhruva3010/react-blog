import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';

test('renders Header component', () => {
  render(
    <Router>
      <Header />
    </Router>
  );
  
  const logoElement = screen.getByText(/MyBlog/i);
  expect(logoElement).toBeInTheDocument();

  const homeLink = screen.getByText(/Home/i);
  expect(homeLink).toBeInTheDocument();

  const createPostLink = screen.getByText(/Create Post/i);
  expect(createPostLink).toBeInTheDocument();
});