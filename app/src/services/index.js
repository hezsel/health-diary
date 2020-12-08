import immunizationService from './immunization'
import immunizationCodeService from './immunizationCode'
import userService from './user'
import diagnosticService from './diagnostic'
import diagnosticCodeService from './diagnosticCode'
import scheduleService from './schedule'

export const immunization = immunizationService 
export const immunizationCode = immunizationCodeService 
export const user = userService
export const diagnostic = diagnosticService 
export const diagnosticCode = diagnosticCodeService 
export const schedule = scheduleService

export default {
  immunization,
  immunizationCode,
  user,
  diagnostic,
  diagnosticCode,
  schedule,
}
