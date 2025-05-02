import './App.css'
import { useState } from 'react'
import ClassroomTable from './components/ClassroomTable'
import BookTable from './components/BookTable'

function App() {
  const [view, setView] = useState('home')

  return (
    <div className="container mt-4">
      <h1>React Tables Navigation</h1>
      <div className="mb-4">
        <button className="btn btn-primary me-2" onClick={() => setView('classroom')}>Ver Aulas</button>
        <button className="btn btn-success" onClick={() => setView('book')}>Ver Libros</button>
      </div>
      {view === 'classroom' && <ClassroomTable />}
      {view === 'book' && <BookTable />}
      {view === 'home' && (
        <div className="alert alert-info">Selecciona una tabla para visualizar los datos.</div>
      )}
    </div>
  )
}

export default App
