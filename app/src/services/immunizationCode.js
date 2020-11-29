import axios from '../axios'

export const list = async (filters = {}) => {
  try {
    const res = await axios([], {
      method: 'get',
      url: '/immunization_code',
      params: filters,
    })
    return res.data.immunizationCodes
  } catch (err) {
    alert('Houve um erro buscando vacinas.')
    return []
  }
}

export default { list }
