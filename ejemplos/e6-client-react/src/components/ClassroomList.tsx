import { useState, useEffect } from 'react';
import { Classroom } from '../types/classroom';
import { classroomService } from '../services/classroomService';
import { useNavigate } from 'react-router-dom';

export const ClassroomList = () => {
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

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
        if (window.confirm('Are you sure you want to delete this classroom?')) {
            try {
                await classroomService.delete(id);
                setClassrooms(classrooms.filter(c => c.id !== id));
                setError(null);
            } catch (err) {
                setError('Failed to delete classroom');
                console.error(err);
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Classrooms</h1>
                <button
                    onClick={() => navigate('/classrooms/new')}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add New Classroom
                </button>
            </div>

            <div className="grid gap-4">
                {classrooms.map((classroom) => (
                    <div
                        key={classroom.id}
                        className="border p-4 rounded shadow hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-semibold">{classroom.name}</h2>
                                <p className="text-gray-600">Capacity: {classroom.capacity}</p>
                                <p className="text-gray-600">Location: {classroom.location}</p>
                                <p className="text-gray-600">
                                    Status: {classroom.isActive ? 'Active' : 'Inactive'}
                                </p>
                            </div>
                            <div className="space-x-2">
                                <button
                                    onClick={() => navigate(`/classrooms/edit/${classroom.id}`)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(classroom.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}; 