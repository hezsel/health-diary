import axios from 'axios'

export const setBearerToken = (session) => {
  localStorage.setItem('session', JSON.stringify(session))
  axios.defaults.headers.common.Authorization = `Bearer ${session.token}`
}

export const removeBearerToken = () => {
  localStorage.clear()
}

const axiosWrapper = async (history, req) => {
  const session = JSON.parse(localStorage.getItem('session'))
  if (session) setBearerToken(session)
  const rootApi = process.env.REACT_APP_ROOT_API
  try {
    const res = await axios({
      ...req,
      url: `${rootApi}${req.url}`,
    })
    return res
  } catch (err) {
    if (err.response.status === 401) {
      removeBearerToken()
      history.push('/Login')
    }
    throw err
  }
}

export default axiosWrapper
