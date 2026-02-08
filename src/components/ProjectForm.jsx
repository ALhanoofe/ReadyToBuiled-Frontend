import { useState } from "react"
import { CreateProjectDetail } from "../services/ProjectServices"
import { useNavigate } from "react-router-dom"

const ProjectForm = () => {
  const navigate = useNavigate()

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


  const addProject = async (e) => {
    e.preventDefault()

    const createdProject = await CreateProjectDetail(newProject)
    setNewProject(emptyProject)
    return createdProject
  }

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value })

  }

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append("name", newProject.name)
    formData.append("description", newProject.description)
    formData.append("category", newProject.category)
    formData.append("language", newProject.language)
    formData.append("price", newProject.price)
    formData.append("status", newProject.status)

    if (imageFile) {
      formData.append("image", imageFile)
    }
ء
    const createdProject = await CreateProjectDetail(formData)
    navigate(`/projectDetail/${createdProject._id}`)
  }


  return (
    <div className="project-page">
      <div className="project-card">
        <h1></h1>

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

          <input
            type="file"
            name="image/*"
            onChange={handleImageChange}

          />

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
