import { createBrowserRouter, Outlet, Link } from 'react-router-dom';

// Importamos las páginas que acabas de crear
import PersonsList from '../pages/PersonsList';
import PersonPage from '../pages/PersonPage';

import ClassroomsList from '../pages/ClassroomsList';
import ClassroomPage from '../pages/ClassroomPage';

import SubjectsList from '../pages/SubjectsList';
import SubjectPage from '../pages/SubjectPage';

import CareersList from '../pages/CareersList';
import CareerPage from '../pages/CareerPage';

// Este componente "Layout" es el menú que se verá en todas las pantallas
const Layout = () => (
  <div className="min-h-screen bg-gray-50 font-sans">
    {/* Barra de Navegación Superior */}
    <nav className="bg-slate-900 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xl font-bold tracking-wider text-blue-400 border-b-2 border-transparent hover:border-blue-400 transition cursor-default">
          SISTEMA ACADÉMICO
        </div>
        
        <div className="flex gap-2 md:gap-6 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <Link to="/" className="hover:text-white text-gray-300 font-medium px-3 py-1 rounded hover:bg-slate-800 transition">Personas</Link>
          <Link to="/classrooms" className="hover:text-white text-gray-300 font-medium px-3 py-1 rounded hover:bg-slate-800 transition">Aulas</Link>
          <Link to="/subjects" className="hover:text-white text-gray-300 font-medium px-3 py-1 rounded hover:bg-slate-800 transition">Materias</Link>
          <Link to="/careers" className="hover:text-white text-gray-300 font-medium px-3 py-1 rounded hover:bg-slate-800 transition">Carreras</Link>
        </div>
      </div>
    </nav>

    {/* Aquí se renderiza el contenido de cada página */}
    <main className="container mx-auto p-4 mt-4">
      <Outlet />
    </main>
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // RUTAS PERSONAS
      { path: "/", element: <PersonsList /> },
      { path: "/persons/new", element: <PersonPage /> },
      { path: "/persons/edit/:id", element: <PersonPage /> },

      // RUTAS AULAS
      { path: "/classrooms", element: <ClassroomsList /> },
      { path: "/classrooms/new", element: <ClassroomPage /> },
      { path: "/classrooms/edit/:id", element: <ClassroomPage /> },

      // RUTAS MATERIAS
      { path: "/subjects", element: <SubjectsList /> },
      { path: "/subjects/new", element: <SubjectPage /> },
      { path: "/subjects/edit/:id", element: <SubjectPage /> },

      // RUTAS CARRERAS
      { path: "/careers", element: <CareersList /> },
      { path: "/careers/new", element: <CareerPage /> },
      { path: "/careers/edit/:id", element: <CareerPage /> },
    ]
  }
]);