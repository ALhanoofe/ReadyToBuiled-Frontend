import { useEffect, useState } from "react"
import { CheckSession } from "../services/Auth"
import { GetRequestsForUser, UpdateRequestStatus } from "../services/Request"
import '../style/profile.css'


const Profile = () => {
  const [user, setUser] = useState(null)
  const [requests, setRequests] = useState([])

  useEffect(() => {
    const handleProfile = async () => {
      const session = await CheckSession()
      setUser(session)
    }

    handleProfile()
  }, [])

  const filterRequestsByUser = (data, user) => {
  if (user.userType === "developer") {
    return data.filter((r) => r.developerId._id.toString() === user.id.toString())
  } else if (user.userType === "customers") {
    return data.filter((r) => r.projectId.userId._id.toString() === user.id.toString())
  }
  return []
}




  useEffect(() => {
    const fetchRequests = async () => {
      if (!user?.id) return

      try {
        let data = await GetRequestsForUser(user.id)

        setRequests(filterRequestsByUser(data, user))



      } catch (error) {
        console.error(error)
      }
    }

    fetchRequests()
  }, [user])

  const handleStatusChange = async (requestId, status) => {
  if (user.userType !== "customers") return
  await UpdateRequestStatus(requestId, status)

  const data = await GetRequestsForUser(user.id)
  setRequests(filterRequestsByUser(data, user))
}





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

        <h2>My Request</h2>
        <br></br>
        <br />
        <div className="requests-grid">
          {requests.length === 0 ? (
            <p>No requests yet</p>
          ) : (
            requests.map((req) => (
              <div key={req._id} className="card">
                <p>
                  <strong>Project:</strong> {req.projectId?.name}
                </p>
                <p>
                  <strong>Status:</strong> {req.stats}
                </p>

                {req.stats === "pending" && (user.userType === "customer" || user.userType === "customers") && (
  <div>
    <button onClick={() => handleStatusChange(req._id, "approve")}>Approve</button>
    <button onClick={() => handleStatusChange(req._id, "reject")}>Reject</button>
  </div>
)}

              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default Profile
