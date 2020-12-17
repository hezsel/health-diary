import axios from '../axios'

export const create = async (type, referenceId, file) => {
  const attachment = new FormData()
  attachment.append('attachment', file)
  try {
    const res = await axios([], {
      method: 'post',
      url: '/attachment',
      params: { type, id: referenceId },
      data: attachment,
    })
    return res.data
  } catch (err) {
    throw err
  }
}

export const get = async (id) => {
  console.log(id)
  try {
    const res = await axios([], {
      method: 'get',
      url: `/attachment/${id}`,
    })
    return res.data
  } catch (err) {
    alert('Houve um erro buscando o anexo.')
    return []
  }
}

export const remove = async (id) => {
  try {
    const res = await axios([], {
      method: 'delete',
      url: `/attachment/${id}`,
    })
    return res.data
  } catch (err) {
    alert('Houve um erro deletando o anexo.')
    return {}
  }
}


export default {
  remove, 
  create,
  get,
}
