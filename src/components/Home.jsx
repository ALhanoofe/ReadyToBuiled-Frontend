import { useEffect, useState } from "react";
import { GetProjectDetails } from "../services/ProjectServices"
import { Link } from "react-router-dom"



const Home = ({ user }) => {

  const [projects, setProjects] = useState([])

  useEffect(() => {
    const handleProjects = async () => {
      try {

        const allProjects = await GetProjectDetails()

        if (user.userType === "customers") {
          const developerProjects = allProjects.filter(
            (project) => project.userId.userType === "developer"
          )
          setProjects(developerProjects)
        } else {
          const myProjects = allProjects.filter(
            (project) => project.userId.userType === "customers"
          )
          console.log("myProjects", myProjects)
          setProjects(myProjects)
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
              <Link to={`/home/${project._id}`}>
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