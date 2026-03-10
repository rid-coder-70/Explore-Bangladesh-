import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { DarkModeProvider } from './context/DarkModeContext';
import Navbar from './components/Navbar';

describe('Navbar Component', () => {
  it('renders brand name', () => {
    render(
      <HelmetProvider>
        <DarkModeProvider>
          <BrowserRouter>
            <Navbar />
          </BrowserRouter>
        </DarkModeProvider>
      </HelmetProvider>
    );
    
    // Check if the brand name is present
    const brandElement = screen.getByText(/Explore Bangladesh/i);
    expect(brandElement).toBeInTheDocument();
  });

  it('contains navigation links', () => {
    render(
      <HelmetProvider>
        <DarkModeProvider>
          <BrowserRouter>
            <Navbar />
          </BrowserRouter>
        </DarkModeProvider>
      </HelmetProvider>
    );
    
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Gallery/i)).toBeInTheDocument();
  });
});
