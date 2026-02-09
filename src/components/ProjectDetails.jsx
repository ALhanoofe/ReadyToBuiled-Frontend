import { useEffect, useState } from "react"
import { GetProjectById, DeleteProjectDetail } from "../services/ProjectServices"
import { CreateRequest } from "../services/Request"
import "../style/detail.css"
import { CheckSession } from "../services/Auth"
import { useParams, useNavigate } from "react-router-dom"
import "../style/detail.css"

const ProjectDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [userId, setUser] = useState(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const handleProject = async () => {
      const projectData = await GetProjectById(id)
      setProject(projectData)
    }
    handleProject()
    const getUser = async () => {
      const session = await CheckSession()
      setUser(session.id)
    }
    getUser()
  }, [id])

  const handleRequest = async () => {
    try {
      console.log("Sending request with:", {
        developerId: userId,
        projectId: project._id,
        customerId: project.user,
        stats: "pending",
      });

      await CreateRequest({
        developerId: userId,
        projectId: project._id,
        customerId: project.user,
        stats: "pending",
      })

      setMessage("Request sent successfully")
    } catch (error) {
      console.log("ERROR:", error.response?.data)
      setMessage("You already requested this project")
    }
  }

  const handleDelete = async () => {
    await DeleteProjectDetail(id)
    navigate("/home")
  }

  return (
    <>
      <div className="projectDetail" key={project?._id}>
        {project?.image && (
          <img
            className="project-image"
            src={`http://localhost:3000${project.image}`}
            alt="project"
          />
        )}
        <h2>Name:{project?.name}</h2>
        <p>Description:{project?.description}</p>
        <p>Category:{project?.category}</p>
        <p>Language:{project?.language}</p>
        <br />

        {userId && <button onClick={handleRequest}>Request To Build This Website</button>}

        {message && <p>{message}</p>}

        <div className="actions">
          {project?.userId === userId && (
            <>
              <button onClick={() => navigate(`/detail/edit/${id}`)}>Edit</button>
              <button onClick={handleDelete} className="delete">Delete</button>
            </>
          )}
        </div>
      </div>
    </>
  )

}

export default ProjectDetails
