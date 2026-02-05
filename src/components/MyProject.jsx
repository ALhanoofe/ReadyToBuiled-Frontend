import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { GetFolderById, GetProjectDetailByFolder } from "../services/ProjectServices";



const ProjectDetails = () => {
  const { id } = useParams()
  const [folder, setFolder] = useState(null)
  const [projects, setProject] = useState([])

  useEffect(() => {
    if (!id) return

    const handleProject = async () => {
      const folderData = await GetFolderById(id)
      setFolder(folderData)

      const projectData = await GetProjectDetailByFolder(id)
      setProject(projectData)

    }

    handleProject()
  }, [id])



  return (
    <>
      <div className="projectDetails">
        <div className="channel-header">
          <h1>{folder?.pname}</h1>
          {/* 
          <Link to={`/postForm/${id}`} className="add-post-btn">
            + Add New Post
          </Link> */}
        </div>

        <div className="projectDetail">
          {projects.map((project) => (
            <div className="card" key={project._id}>
              <Link to={`/projectsDetail/${project._id}`}>
                <h2>{project.name}</h2>
              </Link>
            </div>
          ))}
        </div>





      </div>
    </>
  )

}
export default ProjectDetails
