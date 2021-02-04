import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Clear local storage-button', () => {
  render(<App />);
  const linkElement = screen.getByText('Clear local storage');
  expect(linkElement).toBeInTheDocument();
});
