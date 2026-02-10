import { NavLink } from "react-router-dom"
import { Signout } from "../services/Auth"
import { CheckSession } from "../services/Auth"
import { useEffect, useState } from "react"

const Nav = () => {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"))
  const handleLogOut = () => {
    Signout()
    setIsLoggedIn(false)
    setUser(null)
  }

  useEffect(() => {
    const handleUser = async () => {
      const session = await CheckSession()
      if (session?.user) {
        setUser(session?.user)
        setIsLoggedIn(true)
      }
    }

    handleUser()
  }, [user])


  return (
    <nav className="navbar">
      <h4>Ready To Build</h4>
      <div>

        {isLoggedIn ? (
          <>
            <NavLink to="home">🏠 Home</NavLink>
            <NavLink to="profile">👤 My Profile</NavLink>

            {user?.userType === "developer" && (
              <NavLink to="folders">📁 My Folder</NavLink>
            )}

            {user?.userType === "customers" && (
              <>
                <NavLink to="ProjectForm">➕ Add New Project</NavLink>

                <NavLink to="/mineProject">📁 My project</NavLink>
              </>
            )}
            <NavLink to="/" onClick={handleLogOut}>
              🚪 Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/">Sign In</NavLink>
            <> </>
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
