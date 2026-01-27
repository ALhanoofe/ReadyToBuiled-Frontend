import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CreateProject } from "../services/ProjectServices"

const ProjectForm = () => {
  const navigate = useNavigate()

  const emptyProject = {
    name: "",
    description: "",
    category: "",
    language: "",
    status: "",
    price: ""
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

        <form onSubmit={handleSubmit}>

        <form onSubmit={handleSubmit} >
          <input
            type="text"
            name="name"
            value={newProject.name}
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

          <input
            type="text"
            name="language"
            value={newProject.language}
            onChange={handleChange}
            placeholder="Languages / Tech Stack"
            required
            placeholder="Duration (months)"
          />

          <input
            type="number"
            name="price"
            value={newProject.price}
            onChange={handleChange}
            placeholder="Price"
          />

          <select
            name="status"
            value={newProject.status}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option value="available">Available</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <textarea
            name="description"
            value={newProject.description}
            onChange={handleChange}
            placeholder="Project Description"
            required
          />

          {/* image field intentionally skipped */}


          <button type="submit">Submit Project</button>
        </form>
      </div>
    </div>
  )
}

export default ProjectForm
