import { createBrowserRouter } from 'react-router-dom';
import { ListClassroomsPage } from '../pages/ListClassroomsPage';
import { CreateClassroomPage } from '../pages/CreateClassroomPage';
import { EditClassroomPage } from '../pages/EditClassroomPage';
import { Layout } from '../components/Layout';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <ListClassroomsPage />,
            },
            {
                path: 'classrooms',
                element: <ListClassroomsPage />,
            },
            {
                path: 'classrooms/create',
                element: <CreateClassroomPage />,
            },
            {
                path: 'classrooms/edit/:id',
                element: <EditClassroomPage />,
            },
        ],
    },
]); 