import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';

export const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation />
            <main className="container mx-auto py-4">
                <Outlet />
            </main>
        </div>
    );
}; 