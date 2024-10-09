import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('renders Footer component', () => {
  render(<Footer />);
  
  const copyrightText = screen.getByText(/© 2024 MyBlog. All rights reserved./i);
  expect(copyrightText).toBeInTheDocument();
});