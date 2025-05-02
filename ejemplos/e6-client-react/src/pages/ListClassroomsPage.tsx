import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Classroom } from '../types/Classroom';
import { classroomService } from '../services/classroomService';

export const ListClassroomsPage = () => {
    const navigate = useNavigate();
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadClassrooms();
    }, []);

    const loadClassrooms = async () => {
        try {
            const data = await classroomService.getAll();
            setClassrooms(data);
            setError(null);
        } catch (err) {
            setError('Failed to load classrooms');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this classroom?')) {
            return;
        }

        try {
            await classroomService.delete(id);
            await loadClassrooms();
        } catch (err) {
            setError('Failed to delete classroom');
            console.error(err);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Classrooms</h1>
                <button
                    onClick={() => navigate('/classrooms/create')}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    Create New
                </button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Capacity</th>
                            <th className="py-3 px-6 text-left">Location</th>
                            <th className="py-3 px-6 text-center">Status</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {classrooms.map((classroom) => (
                            <tr key={classroom.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">{classroom.name}</td>
                                <td className="py-3 px-6 text-left">{classroom.capacity}</td>
                                <td className="py-3 px-6 text-left">{classroom.location}</td>
                                <td className="py-3 px-6 text-center">
                                    <span
                                        className={`${
                                            classroom.isActive
                                                ? 'bg-green-200 text-green-600'
                                                : 'bg-red-200 text-red-600'
                                        } py-1 px-3 rounded-full text-xs`}
                                    >
                                        {classroom.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex item-center justify-center">
                                        <button
                                            onClick={() => navigate(`/classrooms/edit/${classroom.id}`)}
                                            className="text-yellow-500 hover:text-yellow-700 mx-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(classroom.id)}
                                            className="text-red-500 hover:text-red-700 mx-2"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}; 