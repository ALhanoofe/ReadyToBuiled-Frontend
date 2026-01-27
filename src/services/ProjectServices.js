import Client from "./api"


export const GetProjects = async () => {
  try {
    const res = await Client.get('/projects')
    return res.data

  } catch (error) {
    throw error
  }
}

export const CreateProject = async (projectData) => {
  try {
    const res = await Client.post("/projects", projectData)
    return res.data
  } catch (error) {
    throw error
  }
}
