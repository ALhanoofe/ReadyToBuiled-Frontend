import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CreateProject } from "../services/ProjectServices"

const ProjectForm = () => {
  const navigate = useNavigate()

  const emptyProject = {
    pname: "",
    category: "",
    type: "",
    duration: "",
    price: "",
    language: "",
    description: "",
    // image: null
  }

  const [newProject, setNewProject] = useState(emptyProject)

  const handleChange = (e) => {
    setNewProject({
      ...newProject,
      [e.target.name]: e.target.value,
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    const createdProject = await CreateProject(newProject)

    setNewProject(emptyProject)
  navigate(`/project/${createdProject._id}`)
}

  return (
    <div className="project-page">
      <div className="project-card">
        <h1>Add New Project</h1>

        <form onSubmit={handleSubmit} >
          <input
            type="text"
            name="pname"
            value={newProject.pname}
            onChange={handleChange}
            placeholder="Project Name"
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

          <select
            name="type"
            value={newProject.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Project Type</option>
            <option value="Ready-made">Ready-made</option>
            <option value="Custom Request">Custom Request</option>
          </select>

          <input
            type="number"
            name="duration"
            value={newProject.duration}
            onChange={handleChange}
            placeholder="Duration (months)"
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
            type="text"
            name="language"
            value={newProject.language}
            onChange={handleChange}
            placeholder="Languages"
            required
          />

          <textarea
            name="description"
            value={newProject.description}
            onChange={handleChange}
            placeholder="Project Description"
            required
          />



          <button type="submit">Submit Project</button>
        </form>
      </div>
    </div>
  )
}

export default ProjectForm
