import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetProjectDetails } from "../services/ProjectServices";
import '../style/detail.css'



const MineProject = (
  { user }
) => {
  const [projects, setProjects] = useState([])

  useEffect(() => {

    const handleProject = async () => {
      const allProjects = await GetProjectDetails()

      const myProjects = allProjects.filter(
        (project) => project.userId?._id === user?.id
      )
      setProjects(myProjects)

    }

    handleProject()
  })



  return (
    <>
      <div className="projectDetails">
        <div className="channel-header">
          <h1>My Projects</h1>
          {/*
          <Link to={`/postForm/${id}`} className="add-post-btn">
            + Add New Post
          </Link> */}
        </div>

        <div className="projectDetail">
          {projects.map((project) => (
            <div className="card" key={project._id}>
              <Link to={`/projectDetail/${project._id}`}>
                <h2>{project.name}</h2>
              </Link>
            </div>
          ))}
        </div>





      </div>
    </>
  )

}
export default MineProject
