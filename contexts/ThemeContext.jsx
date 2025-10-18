// contexts/ThemeContext.jsx
'use client'; // Ensure this is a Client Component

import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('system'); // Default to 'system'

    useEffect(() => {
        // Check for saved theme preference or default to 'system'
        const savedTheme = localStorage.getItem('theme') || 'system';
        setTheme(savedTheme);

        // Apply the theme class to the document root
        const root = window.document.documentElement;

        // Remove existing theme classes
        root.classList.remove('light', 'dark');

        // Determine effective theme
        let effectiveTheme = savedTheme;
        if (savedTheme === 'system') {
            effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        // Apply the effective theme class
        root.classList.add(effectiveTheme);

        // Listen for system theme changes if 'system' is active
        const handleSystemThemeChange = (e) => {
            if (savedTheme === 'system') {
                root.classList.remove('light', 'dark');
                root.classList.add(e.matches ? 'dark' : 'light');
            }
        };

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', handleSystemThemeChange);

        // Cleanup listener on unmount or theme change
        return () => {
            mediaQuery.removeEventListener('change', handleSystemThemeChange);
        };
    }, []); // Empty dependency array means this runs once on mount

    const setThemeAndSave = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme); // Save preference

        const root = window.document.documentElement;

        // Remove existing theme classes
        root.classList.remove('light', 'dark');

        // Determine effective theme
        let effectiveTheme = newTheme;
        if (newTheme === 'system') {
            effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        // Apply the effective theme class
        root.classList.add(effectiveTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme: setThemeAndSave }}>
            {children}
        </ThemeContext.Provider>
    );
};