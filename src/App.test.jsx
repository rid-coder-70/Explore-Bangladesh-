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
    
    // Brand name is split into "Bangla" and "Go" with different colors
    const brandElements = screen.getAllByText(/Bangla/i);
    expect(brandElements.length).toBeGreaterThan(0);
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
    
    // We use getAllByText because Navbar renders both desktop and mobile links
    expect(screen.getAllByText(/Home/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Gallery/i).length).toBeGreaterThan(0);
  });
});
