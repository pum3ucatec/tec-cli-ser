import { Link } from 'react-router-dom';

export const Navigation = () => {
    return (
        <nav className="bg-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-xl font-bold text-indigo-600">
                                School Manager
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                to="/classrooms"
                                className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-indigo-600"
                            >
                                Classrooms
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}; 