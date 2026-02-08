import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  GetProjectById,
  DeleteProjectDetail,
} from "../services/ProjectServices"
import "../style/detail.css"

const ProjectDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)

  useEffect(() => {
    const handleProject = async () => {
      const projectData = await GetProjectById(id)
      setProject(projectData)
    }
    handleProject()
  }, [id])

  const handleDelete = async () => {
    await DeleteProjectDetail(id)
    navigate("/home")
  }

  return (
    <>
      <div className="projectDetail" key={project?._id}>
        <h2>Name:{project?.name}</h2>
        <p>Description:{project?.description}</p>
        <p>Category:{project?.category}</p>
        <p>Language:{project?.language}</p>
      </div>
      <div className="actions">
        <button onClick={() => navigate(`/detail/edit/${id}`)}>Edit</button>

        <button onClick={handleDelete} className="delete">
          Delete
        </button>
      </div>
    </>
  )
}
export default ProjectDetails
