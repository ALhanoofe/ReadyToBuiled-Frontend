import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { GetProjectDetails } from "../services/ProjectServices"
import "../style/mineProject.css"

const MineProject = ({ user }) => {
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
      <div className="mineProjectPage">
        <div className="mineProjectHeader">
          <h1>My Projects</h1>
        </div>

        <div className="mineProjectGrid">
          {projects.map((project) => (
            <div className="mineProjectCard" key={project._id}>
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
