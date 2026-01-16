import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import ConnectionStatus from './ConnectionStatus';

export default function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />

            {/* Main content area */}
            <div className="lg:ml-64 transition-all duration-300 pt-16 lg:pt-0">
                <main className="p-4 md:p-6 lg:p-8 max-w-[1920px] mx-auto">
                    <Outlet />
                </main>
            </div>

            {/* Backdrop for mobile/tablet when sidebar is open */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Connection status indicator */}
            <ConnectionStatus />
        </div>
    );
}
