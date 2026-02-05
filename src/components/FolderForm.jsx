import { useState } from 'react'
import { CreateFolder } from '../services/ProjectServices'
import { useNavigate } from 'react-router-dom'
import '../style/folder.css'


const FolderForm = () => {
  let navigate = useNavigate()

  const emptyFolder = {
    pname: "",
    language: "",
    description: "",
  }
  const [newFolder, setNewFolder] = useState(emptyFolder)

  const addFolder = async (e) => {
    const createdFolder = await CreateFolder(newFolder)
    setNewFolder(emptyFolder)
    return createdFolder
  }

  const handleChange = (e) => {
    setNewFolder({ ...newFolder, [e.target.name]: e.target.value })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    const createdFolder = await addFolder()
    navigate(`/folders/${createdFolder._id}`)
  }

  return (
    <div className="project-page">
      <div className="project-card">
        <h1></h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="pname"
            value={newFolder.pname}
            onChange={handleChange}
            placeholder="Folder Name"
            required
          />

          <input
            type="text"
            name="language"
            value={newFolder.language}
            onChange={handleChange}
            placeholder="Folder Language"
            required
          />


          <textarea
            name="description"
            value={newFolder.description}
            onChange={handleChange}
            placeholder="Folder Description"
            required
          />
          <button type="submit">Create Folder</button>
        </form>
      </div>
    </div>
  )








}

export default FolderForm
