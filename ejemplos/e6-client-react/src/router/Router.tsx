// router/Router.tsx
import { createBrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ListPersonsPage from '../pages/ListPersonsPage';
import CreatePersonPage from '../pages/CreatePersonPage';
import EditPersonPage from '../pages/EditPersonPage';
import ListSubjectsPage from '../pages/ListSubjectsPage';
import CreateSubjectPage from '../pages/CreateSubjectPage';
import EditSubjectPage from '../pages/EditSubjectPage';
import ListClassroomsPage from '../pages/ListClassroomsPage';
import CreateClassroomPage from '../pages/CreateClassroomPage';
import EditClassroomPage from '../pages/EditClassroomPage';

export const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Página no encontrada</h1>
          <p className="text-gray-600">La página que estás buscando no existe.</p>
          <Link to="/" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  },
  {
    path: "/",
    element: <ListPersonsPage />,
  },
  {
    path: "/create",
    element: <CreatePersonPage />,
  },
  {
    path: "/edit/:id",
    element: <EditPersonPage />,
  },
  {
    path: "/subjects",
    element: <ListSubjectsPage />,
  },
  {
    path: "/subjects/create",
    element: <CreateSubjectPage />,
  },
  {
    path: "/subjects/edit/:id",
    element: <EditSubjectPage />,
  },
  {
    path: "/classroom",
    element: <ListClassroomsPage />,
  },
  {
    path: "/classroom/create",
    element: <CreateClassroomPage />,
  },
  {
    path: "/classroom/edit/:id",
    element: <EditClassroomPage />,
  },
]);
