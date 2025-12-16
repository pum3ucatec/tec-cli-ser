import { BrowserRouter, Routes, Route } from 'react-router-dom';
import List from './components/players/List';
import Create from './components/players/Create';
import Edit from './components/players/Edit';

function App() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Gestor de Plantilla</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;