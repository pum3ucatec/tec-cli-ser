import { useNavigate } from 'react-router-dom';
import { ClassroomForm } from '../components/ClassroomForm';
import { classroomService } from '../services/classroomService';
import { CreateClassroomDto } from '../types/Classroom';

export const CreateClassroomPage = () => {
    const navigate = useNavigate();

    const handleSubmit = async (classroom: CreateClassroomDto) => {
        try {
            await classroomService.create(classroom);
            navigate('/classrooms');
        } catch (error) {
            console.error('Failed to create classroom:', error);
            alert('Failed to create classroom. Please try again.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create New Classroom</h1>
            <div className="max-w-2xl">
                <ClassroomForm
                    onSubmit={handleSubmit}
                    onCancel={() => navigate('/classrooms')}
                />
            </div>
        </div>
    );
}; 