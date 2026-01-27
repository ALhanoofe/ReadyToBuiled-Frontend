import './App.css'

import { Routes, Route } from 'react-router-dom'

import Home from './components/Home'
import Project from './components/Project'


const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home/:id" element={<Project />} />
      </Routes>
    </>
  )
}

export default App
