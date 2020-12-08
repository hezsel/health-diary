import axios from '../axios'

export const list = async (filters = {}) => {
  try {
    const res = await axios([], {
      method: 'get',
      url: '/schedule',
      params: filters,
    })
    return res.data.schedules
  } catch (err) {
    alert('Houve um erro buscando lembretes.')
    return []
  }
}

export const remove = async (id) => {
  try {
    const res = await axios([], {
      method: 'delete',
      url: `/schedule/${id}`,
    })
    return res.data
  } catch (err) {
    alert('Houve um erro deletando o lembrete.')
    return {}
  }
}

export const create = async (data) => {
  try {
    const res = await axios([], {
      method: 'post',
      url: '/schedule',
      data,
    })
    return res.data
  } catch (err) {
    throw err
  }
}

export const update = async (id, data) => {
  try {
    const res = await axios([], {
      method: 'put',
      url: `/schedule/${id}`,
      data,
    })
    return res.data
  } catch (err) {
    throw err
  }
}

export default {
  list,
  remove, 
  create,
  update,
}
