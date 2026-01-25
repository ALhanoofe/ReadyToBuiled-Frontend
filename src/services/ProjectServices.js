import Client from "./api"


export const GetProjects = async () => {
  try {
    const res = await Client.get('/projects')
    return res.data

  } catch (error) {
    throw error
  }
}