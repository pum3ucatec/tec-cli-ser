// router/Router.tsx
import { createBrowserRouter } from 'react-router-dom';
import ListPersonsPage from '../pages/ListPersonsPage';
import CreatePersonPage from '../pages/CreatePersonPage';
import EditPersonPage from '../pages/EditPersonPage';
import ListSubjetsPage from '../pages/ListSubjectsPage';
import CreateSubjectPage from '../pages/CreateSubjectPage';
import EditSubjectPage from '../pages/EditSubjectPage';
import ClassroomTable from '../components/ClassroomTable';
import BookTable from '../components/BookTable';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <div style={{ padding: 24 }}>
      <h1>React Tables Navigation</h1>
      <div style={{ marginBottom: 24 }}>
        <a href="/classrooms" className="btn btn-primary me-2">Ver Aulas</a>
        <a href="/books" className="btn btn-success">Ver Libros</a>
      </div>
      <div className="alert alert-info">Selecciona una tabla para visualizar los datos.</div>
    </div>,
  },
  {
    path: '/classrooms',
    element: <ClassroomTable />,
  },
  {
    path: '/books',
    element: <BookTable />,
  },
  {
    path: '/persons',
    element: <ListPersonsPage />,
  },
  {
    path: '/create',
    element: <CreatePersonPage />,
  },
  {
    path: '/edit/:id',
    element: <EditPersonPage />,
  },
  {
    path: '/subjects',
    element: <ListSubjetsPage />,
  },
  {
    path: '/subjects/create',
    element: <CreateSubjectPage />,
  },
  {
    path: '/subjects/edit/:id',
    element: <EditSubjectPage />,
  },
]);
