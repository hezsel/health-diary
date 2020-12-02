import axios from '../axios'

export const list = async (filters = {}) => {
  try {
    const res = await axios([], {
      method: 'get',
      url: '/immunization',
      params: filters,
    })
    return res.data.immunizations
  } catch (err) {
    alert('Houve um erro buscando vacinas.')
    return []
  }
}

export const remove = async (id) => {
  try {
    const res = await axios([], {
      method: 'delete',
      url: `/immunization/${id}`,
    })
    return res.data
  } catch (err) {
    alert('Houve um erro deletando a vacina.')
    return {}
  }
}

export const create = async (data) => {
  try {
    const res = await axios([], {
      method: 'post',
      url: '/immunization',
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
      url: `/immunization/${id}`,
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
