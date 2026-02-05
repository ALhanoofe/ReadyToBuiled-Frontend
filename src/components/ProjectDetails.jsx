import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetProjectById } from "../services/ProjectServices";
import '../style/detail.css'



const ProjectDetails = () => {
  const { id } = useParams()
  const [project, setProject] = useState(null)

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
      <div className="projectDetail" key={project?._id}>
        <h2>Name:{project?.name}</h2>
        <p>Description:{project?.description}</p>
        <p>Category:{project?.category}</p>
        <p>Language:{project?.language}</p>


      </div>
    </>
  )

}
export default ProjectDetails
