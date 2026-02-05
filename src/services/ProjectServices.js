import Client from "./api"

export const GetFolders = async () => {
  try {
    const res = await Client.get('/folders')
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


export const GetFolderById = async (projectId) => {
  try {
    const res = await Client.get(`/folders/${projectId}`)
    return res.data
  } catch (error) {
    throw error

  }
}

export const GetFoldersForUser = async (userId) => {
  try {
    const res = await Client.get(`/folders/user/${userId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// -------------------------------------------------------------------------

export const GetProjectDetails = async () => {
  try {
    const res = await Client.get('/detail')
    return res.data

  } catch (error) {
    throw error
  }
}

export const GetProjectDetailByFolder = async (folderId) => {
  try {
    const res = await Client.get(`/detail/folder/${folderId}`)
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