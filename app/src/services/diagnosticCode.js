import axios from '../axios'

export const list = async (filters = {}) => {
  try {
    const res = await axios([], {
      method: 'get',
      url: '/diagnostic_code',
      params: filters,
    })
    return res.data.diagnosticCodes
  } catch (err) {
    alert('Houve um erro buscando exames.')
    return []
  }
}

export default { list }
