import Client from "./api"


export const GetRequestsForUser = async (userId) => {
  try {
    const res = await Client.get(`/requests/user/${userId}`)
    return res.data
  } catch (error) {
    throw error
  }
}


export const CreateRequest = async (data) => {
  try {
    const res = await Client.post('/requests', data)
    return res.data
  } catch (error) {
    throw error
  }
}


export const UpdateRequestStatus = async (requestId, stats) => {
  try {
    const res = await Client.put(`/requests/${requestId}`, { stats })
    return res.data
  } catch (error) {
    throw error
  }
}

