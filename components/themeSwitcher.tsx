// components/ThemeSwitcher.jsx
'use client'; // Ensure this is a Client Component

import { useTheme } from '@/contexts/ThemeContext'; // Adjust path as needed
import { MoonIcon, SunIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'; // Or use any icon library you prefer

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    const themeOptions = [
        { id: 'light', label: 'Light', icon: <SunIcon className="h-4 w-4" /> },
        { id: 'dark', label: 'Dark', icon: <MoonIcon className="h-4 w-4" /> },
        { id: 'system', label: 'System', icon: <ComputerDesktopIcon className="h-4 w-4" /> },
    ];

    return (
        <div className="flex items-center space-x-2"> {/* Container for the row */}
            {themeOptions.map((option) => (
                <button
                    key={option.id}
                    onClick={() => setTheme(option.id)}
                    aria-label={`Switch to ${option.label} theme`}
                    title={`Switch to ${option.label} theme`} // Optional: for tooltip
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors
                        ${
                            theme === option.id
                                ? 'bg-primary text-primary-foreground' // Active theme button style
                                : 'bg-muted text-muted-foreground hover:bg-accent' // Inactive button style
                        }
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
                >
                    {option.icon}
                    <span>{option.label}</span>
                </button>
            ))}
        </div>
    );
}