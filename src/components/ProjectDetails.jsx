import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GetProjectById } from "../services/ProjectServices"
import { CreateRequest } from "../services/Request"
import "../style/detail.css"
import { CheckSession } from "../services/Auth"

const ProjectDetails = () => {
  const { id } = useParams()
  const [project, setProject] = useState(null)

  const [userId, setUser] = useState(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!id) return

    const handleProject = async () => {
      const projectData = await GetProjectById(id)
      setProject(projectData)
    }

    handleProject()
  }, [id])

  useEffect(() => {
    const getUser = async () => {
      const session = await CheckSession()
      setUser(session.id)
    }
    getUser()
  }, [])

  const handleRequest = async () => {
    try {
      await CreateRequest({
        developerId: userId,
        projectId: project._id,
        customerId: project.user._id,
        stats: "pending",
      })

      setMessage("Request sent successfully")
    } catch (error) {
      setMessage("You already requested this project")
    }
  }

  return (
    <>
      <div className="projectDetail" key={project?._id}>
        <h2>Name:{project?.name}</h2>
        <p>Description:{project?.description}</p>
        <p>Category:{project?.category}</p>
        <p>Language:{project?.language}</p>
        <br />

        {userId && <button onClick={handleRequest}>Request To Build This Website</button>}

        {message && <p>{message}</p>}
      </div>
    </>
  )
}
export default ProjectDetails
