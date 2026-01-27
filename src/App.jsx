import "./App.css"
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import SignIn from "./components/SignIn"
import Register from "./components/Register"
import { useState, useEffect } from "react"
import { CheckSession } from "./services/Auth"
// import Nav from './components/Nav'
import Nav from "./components/Nav"
// import RequireAuth from "./components/RequireAuth"
import Profile from "./components/Profile"
import ProjectForm from "./components/ProjectForm"

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
      <header>{/* <Nav user={user} handleLogOut={handleLogOut} /> */}</header>
      <header>
        <Nav user={user} handleLogOut={handleLogOut} />
      </header>
      <Routes>
        <Route path="/" element={<SignIn setUser={setUser} />} />
        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />

        <Route path="/ProjectForm" element={<ProjectForm />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="profile" element={<Profile />} />

        <Route path="/ProjectForm" element={<ProjectForm />} />
      </Routes>
    </>
  )
}

export default App
