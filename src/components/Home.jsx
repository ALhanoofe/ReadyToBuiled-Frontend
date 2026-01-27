import { useEffect, useState } from "react";
import { GetProjects } from "../services/ProjectServices"
import { Link } from "react-router-dom"



const Home = ({ }) => {

  const [projects, setProjects] = useState([])

  useEffect(() => {
    const handleProjects = async () => {
      const data = await GetProjects()
      setProjects(data)
    }
    handleProjects()
  }, [])

  return (
    <>
      <div className="projects">
        <h1>project page </h1>
        <div className="grid col-4">
          {projects.map((project) => (
            <div className="card" key={project._id}>
              <Link to={`/home/${project._id}`}>
                <h2>{project.pname}</h2>
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