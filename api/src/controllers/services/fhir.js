const {
  path,
  pick,
  isNil,
  isEmpty,
  either,
  without,
  pipe,
  reject,
  keys,
} = require('ramda')
const {
  create: createImmunization,
  getById: getImmunizationById,
} = require('./immunization') 
const {
  create: createDiagnostic,
  getById: getDiagnosticById,
} = require('./diagnostic') 
const { list: listDiagnosticCodes } = require('./diagnosticCode')
const { list: listImmunizationCodes } = require('./immunizationCode')
const { ConflictError, BadRequestError } = require('../../errors')

const verifyIfExists = (type, data) => {
  if (isNil(data)) {
    throw new ConflictError({
      message: `${type} is not valid`,
      errorCode: `${type}_invalid`,
      errors: {
        exams: `${type} does not exists`,
      },
    })
  }
}

const verifyIfHasRequiredFields = (required, data) => {
  const isFieldEmptyOrNull = either(isNil, isEmpty)
  const requiredFiledsOk = pipe(pick, reject(isFieldEmptyOrNull), keys)(required, data)
  if (requiredFiledsOk.length !== required.length) {
    console.log({
      message: 'invalid resource',
      errorCode: `missing_required_fields`,
      errors: {
        required: without(requiredFiledsOk, required)
      },
    })
    throw new BadRequestError({
      message: 'invalid resource',
      errorCode: `missing_required_fields`,
      errors: {
        required: without(requiredFiledsOk, required)
      },
    })
  }
}

const getRelevantDataFromImmunizationFhir = async (attributes) => {
  const code = path(['vaccineCode', 'coding', 0, 'code'], attributes)
  const immunizationCode = await listImmunizationCodes({ code })
  const data = {
    immunizationCodeId: path([0, 'id'], immunizationCode),
    date: attributes.recorded,
    location: attributes.location,
    lotNumber: attributes.lotNumber,
    expirationDate: attributes.expirationDate,
    doseQuantity: attributes.doseQuantity,
    observation: 'importação fhir',
    fhirInput: attributes,
  }

  verifyIfHasRequiredFields(['immunizationCodeId', 'date'], data)

  return data
}

const getRelevantDataFromDiagnosticFhir = async (attributes) => {
  const code = path(['code', 'coding', 0, 'code'], attributes)
  const diagnosticCode = await listDiagnosticCodes({ code })
  const data = {
    diagnosticCodeId: path([0, 'id'], diagnosticCode),
    date: attributes.issued,
    result: attributes.result,
    performer: attributes.performer,
    observation: 'importação fhir',
    fhirInput: attributes,
  }

  verifyIfHasRequiredFields(['diagnosticCodeId', 'date'], data)

  return data
}

const importResource = async (userId, attributes) => {
  console.log(attributes)
  if (attributes.resourceType === 'Immunization') {
    const data = await getRelevantDataFromImmunizationFhir(attributes)
    return createImmunization(userId, data)
  }
  if (attributes.resourceType === 'DiagnosticReport') {
    const data = await getRelevantDataFromDiagnosticFhir(attributes)
    return createDiagnostic(userId, data)
  }
  throw new BadRequestError({
    message: 'invalid resource',
    errorCode: `invalid_resource_type`,
  })
}

const getFhirFromImmunizationData = (data) => {
  const fhirResource = {
    ...(data.fhirInput || {}),
    vaccineCode: {
      text: data.immunizationCode.name,
      coding: [
        {
          code: data.immunizationCode.code,
          system: data.immunizationCode.url,
          display: data.immunizationCode.name,
        }
      ]
    },
    recorded: data.date,
    location: data.location,
    lotNumber: data.lotNumber,
    expirationDate: data.expirationDate,
    doseQuantity: data.doseQuantity,
    resourceType: 'Immunization',
  }

  return fhirResource
}

const getFhirFromDiagnosticData = (data) => {
  const fhirResource = {
    ...(data.fhirInput || {}),
    code: {
      text: data.diagnosticCode.name,
      coding: [
        {
          code: data.diagnosticCode.code,
          system: data.diagnosticCode.url,
          display: data.diagnosticCode.name,
        }
      ]
    },
    issued: data.date,
    result: data.result,
    performer: data.performer,
    resourceType: 'DiagnosticReport',
  }

  return fhirResource
}

const exportResource = async (userId, id, resourceType) => {
  if (resourceType === 'Immunization') {
    const data = await getImmunizationById(userId, id)
    verifyIfExists('immunization', data)
    return getFhirFromImmunizationData(data)
  }
  if (resourceType === 'DiagnosticReport') {
    const data = await getDiagnosticById(userId, id)
    verifyIfExists('diagnostic', data)
    return getFhirFromDiagnosticData(data)
  }
  
}

module.exports = {
  importResource,
  exportResource,
}
