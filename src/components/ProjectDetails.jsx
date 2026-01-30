import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetProjectDetails } from "../services/ProjectServices";



const Project = () => {
  const { id } = useParams()
  const [projects, setProjects] = useState([])


  useEffect(() => {
    const fetchProject = async () => {
      const data = await GetProjectDetails()
      setProjects(data)
    }

    fetchProject()

  }, [id])


  return (

    <>
      <h1>projects D</h1>
      <div className="projectDetails">
        {projects.map((project) => (
          <div className="project" key={project._id}>
            <h2>name:{project.name}</h2>
            <h3>category:{project.category}</h3>
            <h3>Description:{project.description}</h3>
            <h3>Language:{project.language}</h3>
          </div>
        ))}
      </div>
    </>
  )

}
export default Project
