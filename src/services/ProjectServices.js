import Client from "./api"

export const GetProjects = async () => {
  try {
    const res = await Client.get('/projects')
    return res.data

  } catch (error) {
    throw error
  }
}


export const GetProjectById = async (projectId) => {
  try {
    const res = await Client.get(`/projects/${projectId}`)
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


// -------------------------------------------------------------------------

export const GetProjectDetails = async () => {
  try {
    const res = await Client.get('/detail')
    return res.data

  } catch (error) {
    throw error
  }
}

export const GetProjectDetailByProject = async (projectId) => {
  try {
    const res = await Client.get(`/detail/${projectId}`)
    return res.data
  } catch (error) {
    throw error
  }
}