// router/Router.tsx
import { createBrowserRouter } from 'react-router-dom';
import ListPersonsPage from '../pages/ListPersonsPage';
import CreatePersonPage from '../pages/CreatePersonPage';
import EditPersonPage from '../pages/EditPersonPage';
import ListSubjetsPage from '../pages/ListSubjectsPage';
import CreateSubjectPage from '../pages/CreateSubjectPage';

export const router = createBrowserRouter([
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
    element: <ListSubjetsPage />,
  },
  {
    path: "/subjects/create",
    element: <CreateSubjectPage />,
  },
  {
    path: "/subjects/edit/:id",
    element: <EditPersonPage />,
  },
]);
