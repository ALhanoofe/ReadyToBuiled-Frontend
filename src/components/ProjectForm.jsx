import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {CreateProjectDetail,GetProjectById,UpdateProjectDetail} from "../services/ProjectServices"
const ProjectForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const emptyProject = {
    name: "",
    description: "",
    category: "",
    language: "",
    price: "",
    status: "",
  }

  const [newProject, setNewProject] = useState(emptyProject)

    useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        const data = await GetProjectById(id)
        setNewProject(data)
      }
      fetchProject()
    }
  }, [id])

  const addProject = async (e) => {
    e.preventDefault()

    const createdProject = await CreateProjectDetail(newProject)
    setNewProject(emptyProject)
    return createdProject
  }

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let createdProject
    if (id) {
      createdProject = await UpdateProjectDetail(id, newProject)
    } else {
      createdProject = await addProject(e)
    }

    navigate(`/projectDetail/${createdProject._id}`)
  }

  return (
    <div className="project-page">
      <div className="project-card">


        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={newProject.name}
            onChange={handleChange}
            placeholder="Project Name"
            required
          />

          <textarea
            name="description"
            value={newProject.description}
            onChange={handleChange}
            placeholder="Project Description"
            required
          />

          <input
            type="text"
            name="category"
            value={newProject.category}
            onChange={handleChange}
            placeholder="Category"
            required
          />

          <input
            type="text"
            name="language"
            value={newProject.language}
            onChange={handleChange}
            placeholder="Technology / Language"
            required
          />

          <input
            type="number"
            name="price"
            value={newProject.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />

          <select
            name="status"
            value={newProject.status}
            onChange={handleChange}
          >
            <option value="Select Status"></option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default ProjectForm
