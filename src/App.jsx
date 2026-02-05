import './style/home.css'
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import SignIn from "./components/SignIn"
import Register from "./components/Register"
import { useState, useEffect } from "react"
import { CheckSession } from "./services/Auth"
import Nav from "./components/Nav"
import RequireAuth from "./components/RequireAuth"
import Profile from "./components/Profile"
import ProjectForm from "./components/ProjectForm"
import ProjectDetails from "./components/ProjectDetails"
import Folders from "./components/Folders"
import MyProject from "./components/MyProject"
import FolderForm from "./components/FolderForm"
import MineProject from './components/mineProject'

const App = () => {
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  const checkToken = async () => {
    const userData = await CheckSession()
    setUser(userData)
  }

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      checkToken()
    }
  }, [])

  return (
    <>
      <header>
        <Nav user={user} handleLogOut={handleLogOut} />
      </header>

      <Routes>
        <Route path="/" element={<SignIn setUser={setUser} />} />
        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Home user={user} />} />

        <Route path="/home/:id" element={<MyProject user={user} />} />

        <Route path="/ProjectForm" element={<ProjectForm />} />

        <Route path="/folders" element={<Folders user={user} />} />

        <Route path="/projectDetail/:id" element={<ProjectDetails />} />
        <Route path="/folders/:id" element={<MyProject />} />
        <Route path="/mineProject" element={<MineProject user={user} />} />


        <Route path="/folderForm" element={<FolderForm />} />

        <Route path="profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
