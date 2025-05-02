import { createBrowserRouter } from 'react-router-dom';

// Person
import ListPersonsPage from '../pages/ListPersonsPage';
import CreatePersonPage from '../pages/CreatePersonPage';
import EditPersonPage from '../pages/EditPersonPage';

// Subject
import ListSubjectsPage from '../pages/ListSubjectsPage';
import CreateSubjectPage from '../pages/CreateSubjectPage';
import EditSubjectPage from '../pages/EditSubjectPage';

// Classroom
import ListClassroomPage from '../pages/ListClassroomPage';
import CreateClassroomPage from '../pages/CreateClassroomPage';
// import EditClassroomPage from '../pages/EditClassroomPage'; // Si planeas editar en el futuro

// Voleyball
import ListVoleyballPage from '../pages/ListVoleyballPage';
import CreateVoleyballPage from '../pages/CreateVoleyballPage';
import EditVoleyballPage from '../pages/EditVoleyballPage';

export const router = createBrowserRouter([
  // Person
  { path: "/", element: <ListPersonsPage /> },
  { path: "/create", element: <CreatePersonPage /> },
  { path: "/edit/:id", element: <EditPersonPage /> },

  // Subject
  { path: "/subjects", element: <ListSubjectsPage /> },
  { path: "/subjects/create", element: <CreateSubjectPage /> },
  { path: "/subjects/edit/:id", element: <EditSubjectPage /> },

  // Classroom
  { path: "/classrooms", element: <ListClassroomPage /> },
  { path: "/classrooms/create", element: <CreateClassroomPage /> },
  { path: "/classrooms/edit/:id", element: <EditVoleyballPage /> },

  // Voleyball
  { path: "/voleyballs", element: <ListVoleyballPage /> },
  { path: "/voleyballs/create", element: <CreateVoleyballPage /> },
  { path: "/voleyballs/edit/:id", element: <EditVoleyballPage /> },
]);
