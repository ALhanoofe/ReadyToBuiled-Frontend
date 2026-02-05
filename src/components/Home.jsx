import { useEffect, useState } from "react";
import { GetProjectDetails } from "../services/ProjectServices"
import { Link } from "react-router-dom"



const Home = ({ user }) => {

  const [projects, setProjects] = useState([])

    useEffect(() => {
    const handleProjects = async () => {
      if (!user) return

      try {
        const allProjects = await GetProjectDetails()

        if (user.userType === "customers") {
          const developerProjects = allProjects.filter(
            (project) => project.userId?.userType === "developer"
          )
          setProjects(developerProjects)
        } else {
          const customerProjects = allProjects.filter(
            (project) => project.userId?.userType === "customers"
          )
          setProjects(customerProjects)
        }
      } catch (error) {
        console.error(error)
      }
    }

    handleProjects()
  }, [user])


  return (
    <>
      <div className="projects">
        <h1>project page </h1>
        <div className="grid col-4">
          {projects.map((project) => (
            <div className="card" key={project._id}>
              <Link to={`/projectDetail/${project._id}`}>
                <h2>{project.name}</h2>
                <h3>{project.price}</h3>
              </Link>
            </div>

          ))}
        </div>

      </div>

    </>
  )
}



export default Home
