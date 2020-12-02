import immunizationService from './immunization'
import immunizationCodeService from './immunizationCode'
import userService from './user'

export const immunization = immunizationService 
export const immunizationCode = immunizationCodeService 
export const user = userService 

export default {
  immunization,
  immunizationCode,
  user,
}
