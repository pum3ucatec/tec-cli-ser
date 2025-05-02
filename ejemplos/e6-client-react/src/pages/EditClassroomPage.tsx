import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ClassroomForm } from '../components/ClassroomForm';
import { classroomService } from '../services/classroomService';
import { Classroom, CreateClassroomDto } from '../types/Classroom';

export const EditClassroomPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [classroom, setClassroom] = useState<Classroom | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadClassroom();
    }, [id]);

    const loadClassroom = async () => {
        try {
            if (!id) throw new Error('No classroom ID provided');
            const data = await classroomService.getById(parseInt(id));
            setClassroom(data);
        } catch (error) {
            console.error('Failed to load classroom:', error);
            alert('Failed to load classroom. Redirecting to list.');
            navigate('/classrooms');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (formData: CreateClassroomDto) => {
        try {
            if (!id) throw new Error('No classroom ID provided');
            await classroomService.update({
                ...formData,
                id: parseInt(id),
            });
            navigate('/classrooms');
        } catch (error) {
            console.error('Failed to update classroom:', error);
            alert('Failed to update classroom. Please try again.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!classroom) {
        return <div>Classroom not found</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Classroom</h1>
            <div className="max-w-2xl">
                <ClassroomForm
                    classroom={classroom}
                    onSubmit={handleSubmit}
                    onCancel={() => navigate('/classrooms')}
                />
            </div>
        </div>
    );
}; 