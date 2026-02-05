import { NavLink } from "react-router-dom"
import { Signout } from "../services/Auth"


const Nav = () => {
  const handleLogOut = () => {
    Signout()
  }
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
            <NavLink to="/" onClick={handleLogOut}>Logout</NavLink>
            <NavLink to="Folder">My Folder</NavLink>


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
