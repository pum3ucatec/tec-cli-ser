// router/Router.tsx
import { createBrowserRouter } from 'react-router-dom';
import ListPersonsPage from '../pages/ListPersonsPage';
import CreatePersonPage from '../pages/CreatePersonPage';
import EditPersonPage from '../pages/EditPersonPage';

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
]);
