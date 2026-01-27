import { useEffect, useState } from "react";
import { GetProjectById } from "../services/ProjectServices"
import { useParams } from "react-router-dom";


const ProjectDetails = () => {
  const { id } = useParams()
  const [project, setProjects] = useState(null)


  useEffect(() => {
    if (!id) return

    const fetchProject = async () => {
      const data = await GetProjectById(id)
      console.log(data)
      setProjects(data)
    }

    fetchProject()


  }, [id])

  return (

    <>

      <div className="projectDetails">

      </div>
    </>
  )

}
export default ProjectDetails
