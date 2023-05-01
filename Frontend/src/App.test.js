import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import App from './App';

test('Render the app', () => {
  render(<App />);
  const BrowserRouter = screen.getByTestId('router');
  expect(BrowserRouter).toBeInTheDocument();
});
