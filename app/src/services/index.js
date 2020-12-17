import immunizationService from './immunization'
import immunizationCodeService from './immunizationCode'
import userService from './user'
import diagnosticService from './diagnostic'
import diagnosticCodeService from './diagnosticCode'
import scheduleService from './schedule'
import fhirService from './fhir'
import attachmentService from './attachment'

export const immunization = immunizationService 
export const immunizationCode = immunizationCodeService 
export const user = userService
export const diagnostic = diagnosticService 
export const diagnosticCode = diagnosticCodeService 
export const schedule = scheduleService
export const fhir = fhirService
export const attachment = attachmentService

export default {
  immunization,
  immunizationCode,
  user,
  diagnostic,
  diagnosticCode,
  schedule,
  fhir,
  attachment,
}
