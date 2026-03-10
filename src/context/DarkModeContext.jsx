import React, { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem('exploreBD_darkMode') === 'true';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem('exploreBD_darkMode', isDark);
    }, [isDark]);

    const toggleDark = () => setIsDark(prev => !prev);

    return (
        <DarkModeContext.Provider value={{ isDark, toggleDark }}>
            {children}
        </DarkModeContext.Provider>
    );
}

export function useDarkMode() {
    return useContext(DarkModeContext);
}
