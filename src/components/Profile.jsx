import { useEffect, useState } from "react"
import { CheckSession } from "../services/Auth"

const Profile = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const handleProfile = async () => {
      const session = await CheckSession()
      console.log(user)
      setUser(session)
    }

    handleProfile()
  }, [])

  if (!user) return <p>Please register</p>

  return (
    <>
      <div className="profile">
        <h1>Profile</h1>
        <br></br>
        <h3>Name: {user.name}</h3>
        <h3>Username: {user.username}</h3>
        <h3>Email: {user.email}</h3>
        <h3>Phone Number: {user.phoneNumber}</h3>
        <h3></h3>
        <br></br>
        <br />

        <h2>My Projects</h2>
        <br></br>
        <br />
        <div className="grid col-4"></div>
      </div>
    </>
  )
}

export default Profile
