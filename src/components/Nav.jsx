import { NavLink } from "react-router-dom"
import { Signout } from "../services/Auth"
import { CheckSession } from "../services/Auth"
import { useEffect, useState } from "react";




const Nav = () => {
  const [user, setUser] = useState(null)
  const handleLogOut = () => {
    Signout()
  }

  useEffect(() => {
    const handleUser = async () => {
      const session = await CheckSession()
      setUser(session?.user || session)
    }

    handleUser()
  }, [])

  const isLoggedIn = !!localStorage.getItem("token")

  return (
    <nav className="navbar">
      <h4>Ready To Build</h4>
      <div>
        <NavLink to="home">Home</NavLink>
        <> </>


        {isLoggedIn ? (
          <>
            <NavLink to="ProjectForm">Add New Project</NavLink>
            <NavLink to="profile">My Profile</NavLink>

            {user?.userType === "developer" && (
              <NavLink to="folders">My Folder</NavLink>
            )}

            {user?.userType === "customers" && (
              <NavLink to="/mineProject">my project</NavLink>
            )}
            <NavLink to="/" onClick={handleLogOut}>Logout</NavLink>

          </>

        ) : (
          <>
            <NavLink to="/">Sign In</NavLink>
            <> </>
          </>
        )}


      </div>
    </nav >
  )
}

export default Nav
