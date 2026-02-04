import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetProjectById } from "../services/ProjectServices";



const ProjectDetails = () => {
  const { id } = useParams()
  const [project, setProject] = useState([])

  useEffect(() => {
    if (!id) return

    const handleProject = async () => {
      const projectData = await GetProjectById(id)
      setProject(projectData)

    }

    handleProject()
  }, [id])



  return (

    <>
      <h1>{project && project.name}</h1>
      <div className="projectDetails">
        <div className="project" key={project._id}>
          <h2>name:{project.name}</h2>
          <h3>category:{project.category}</h3>
          <h3>Description:{project.description}</h3>
          <h3>Language:{project.language}</h3>
        </div>
      </div>
    </>
  )

}
export default ProjectDetails
