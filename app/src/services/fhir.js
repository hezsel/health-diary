import axios from '../axios'

export const importResource = async (data) => {
  try {
    const res = await axios([], {
      method: 'post',
      url: '/fhir',
      data,
    })
    return res.data
  } catch (err) {
    alert('Houve um erro importando o recurso.')
    throw err
  }
}

export const exportResource = async (type, id) => {
  try {
    const res = await axios([], {
      method: 'get',
      url: `/fhir/${type}/${id}`,
    })
    return res.data
  } catch (err) {
    alert('Houve um erro exportando o recurso.')
    return err
  }
}

export default {
  importResource,
  exportResource, 
}
