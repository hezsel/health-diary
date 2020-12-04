import axios from '../axios'

export const list = async (filters = {}) => {
  try {
    const res = await axios([], {
      method: 'get',
      url: '/diagnostic',
      params: filters,
    })
    return res.data.diagnostics
  } catch (err) {
    alert('Houve um erro buscando exames.')
    return []
  }
}

export const remove = async (id) => {
  try {
    const res = await axios([], {
      method: 'delete',
      url: `/diagnostic/${id}`,
    })
    return res.data
  } catch (err) {
    alert('Houve um erro deletando o exame.')
    return {}
  }
}

export const create = async (data) => {
  try {
    const res = await axios([], {
      method: 'post',
      url: '/diagnostic',
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
      url: `/diagnostic/${id}`,
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
