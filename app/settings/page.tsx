'use client';

import ThemeSwitcher from '@/components/themeSwitcher'; 

export default function SettingsPage() {
    return (
        <div className="p-4"> {/* Add some padding or layout as needed */}
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Theme</label>
                <ThemeSwitcher />
            </div>
            
        </div>
    );
}