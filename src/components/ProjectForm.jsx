import { useEffect, useState } from "react"
import {
  CreateProjectDetail,
  GetProjectById,
  UpdateProjectDetail,
} from "../services/ProjectServices"
import { useNavigate, useParams } from "react-router-dom"

const ProjectForm = () => {
  const navigate = useNavigate()
  const { id, folderId } = useParams()

  const emptyProject = {
    name: "",
    description: "",
    category: "",
    language: "",
    price: "",
    status: "",
    image: "",
  }
  const [newProject, setNewProject] = useState(emptyProject)
  const [imageFile, setImageFile] = useState(null)

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        const projectData = await GetProjectById(id)
        setNewProject({
          name: projectData.name || "",
          description: projectData.description || "",
          category: projectData.category || "",
          language: projectData.language || "",
          price: projectData.price || "",
          status: projectData.status || "",
          image: projectData.image || "",
        })
      }
      fetchProject()
    }
  }, [id])

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let savedProject

    const formData = new FormData()

    formData.append("name", newProject.name)
    formData.append("description", newProject.description)
    formData.append("category", newProject.category)
    formData.append("language", newProject.language)
    formData.append("price", newProject.price)
    formData.append("status", newProject.status)
    if (folderId) {
      formData.append("folderId", folderId)
    }
    if (imageFile) {
      formData.append("image", imageFile)
    }

    if (id) {
      savedProject = await UpdateProjectDetail(id, formData)
    } else {
      savedProject = await CreateProjectDetail(formData)
    }

    navigate(`/projectDetail/${savedProject._id}`)
  }

  return (
    <div className="project-page">
      <div className="project-card">
        <h1>Project Form</h1>

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

          <input type="file" accept="image/*" onChange={handleImageChange} />

          <select
            name="status"
            value={newProject.status}
            onChange={handleChange}
          >
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
