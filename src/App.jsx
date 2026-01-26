import './App.css'

import { Routes, Route } from 'react-router-dom'

import Home from './components/Home'
import ProjectForm from './components/ProjectForm'

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />




        <Route path='/ProjectForm' element={
            <RequireAuth>
              <ProjectForm />
            </RequireAuth >
          }
          />
      </Routes>
    </>
  )
}

export default App

