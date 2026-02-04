import Client from "./api"

export const GetFolders = async () => {
  try {
    const res = await Client.get('/folders')
    return res.data
  } catch (error) {
    throw error
  }
}

export const CreateProjectDetail = async (projectData) => {
  try {
    const res = await Client.post("/detail", projectData)
    return res.data
  } catch (error) {
    throw error
  }
}

// -------------------------------------------------------------------------

export const GetProjectDetails = async () => {
  try {
    const res = await Client.get("/detail")
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

export const GetProjectById = async (projectId) => {
  try {
    const res = await Client.get(`/detail/${projectId}`)
    return res.data
  } catch (error) {
    throw error
  }
}
