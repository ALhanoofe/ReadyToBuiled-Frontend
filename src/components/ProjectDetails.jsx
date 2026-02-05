import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetProjectById, GetProjectDetailByFolder } from "../services/ProjectServices";



const ProjectDetails = () => {
  const { id } = useParams()
  const [folder, setFolder] = useState([])
  const [projects, setProject] = useState([])

  useEffect(() => {
    if (!id) return

    const handleProject = async () => {
      const folderdata = await GetProjectById(id)
      setFolder(folderdata)

      const projectData = await GetProjectDetailByFolder(id)
      setProject(projectData)

    }

    handleProject()
  }, [id])



  return (
    <>
      <div className="projectDetails">
        <div className="channel-header">
          <h1>{folder && folder.name}</h1>
          {/* 
          <Link to={`/postForm/${id}`} className="add-post-btn">
            + Add New Post
          </Link> */}
        </div>

        <div className="projectDetail">
          {projects.map((project) => (
            <Link to={`//${project._id}`}>
              <h2>{project.name}</h2>
            </Link>

          ))}
        </div>





      </div>
    </>
  )

}
export default ProjectDetails
