import { useEffect, useState } from "react"
import { CheckSession } from "../services/Auth"
import { GetRequestsForUser, UpdateRequestStatus } from "../services/Request"


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

  useEffect(() => {
  const fetchRequests = async () => {
    if (!user?.id) return

    try {
      const data = await GetRequestsForUser(user.id)
      setRequests(data)
    } catch (error) {
      console.error("Failed to fetch requests:", error)
    }
  }

  fetchRequests()
}, [user])




  const handleStatusChange = async (requestId, status) => {
    if (!user?._id) return;
    await UpdateRequestStatus(requestId, status)


    const data = await GetRequestsForUser(user._id)
    setRequests(data)
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
        <div className="grid col-4">
          {requests.length === 0 ? (
          <p>No requests yet</p>
        ) : (
          requests.map((req) => (
            <div key={req._id} className="card">
              <p><strong>Project:</strong> {req.projectId?.name}</p>
              <p><strong>Status:</strong> {req.stats}</p>

              {req.stats === "pending" && (
                <div>
                  <button onClick={() => handleStatusChange(req._id, "approve")}>
                    Approve
                  </button>
                  <button onClick={() => handleStatusChange(req._id, "rejects")}>
                    Reject
                  </button>
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
