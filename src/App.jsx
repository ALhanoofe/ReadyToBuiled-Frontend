import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import SignIn from './components/SignIn'
import Register from './components/Register'
import { useState, useEffect } from "react"
import { CheckSession } from './services/Auth'
// import Nav from './components/Nav'


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
    const token = localStorage.getItem('token')

    if (token) {
      checkToken()
    }
  }, [])

  return (
    <>
    <header>
        {/* <Nav user={user} handleLogOut={handleLogOut} /> */}
      </header>
      <Routes>
        <Route path="/" element={<SignIn setUser={setUser} />} />
        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
