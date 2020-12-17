const cuid = require('cuid')
const {
  isNil,
  last,
} = require('ramda')
const { uploadFile, getSignedUrlToDownload } = require('../../storage/s3')
const { Attachment } = require('../../database')
const { ConflictError, BadRequestError } = require('../../errors')

const verifyIfExists = (data) => {
  if (isNil(data)) {
    throw new ConflictError({
      message: `attachment is not valid`,
      errorCode: `attachment_invalid`,
      errors: {
        exams: `attachment does not exists`,
      },
    })
  }
}

const verifyIfIsValidFile = async (file) => {
  if (isNil(file)) {
    throw new BadRequestError({
      errorCode: 'invalid_file',
      message: 'This file is invalid',
    })
  }
}

const getExtension = (fileName) => {
  const names = fileName.split('.')

  return names.length > 1 ? last(names) : null
}

const generateFileName = extension => (isNil(extension) ? `att_${cuid()}` : `att_${cuid()}.${extension}`)

const create = async (user, file, { type, id }) => {
  await verifyIfIsValidFile(file)

  const extension = getExtension(file.originalname)
  const originalFileName = file.originalname
  const fileName = generateFileName(extension)
  const attachmentData = {
    originalFileName,
    fileName,
    extension,
    userId: user.id,
  }

  attachmentData[`${type}Id`] = id

  await uploadFile({
    key: `${user.id}/${fileName}`,
    body: file.buffer,
  })

  const attachment = await Attachment.create(attachmentData)

  return attachment
}

const show = async (user, id) => {
  const attachment = await Attachment.findOne({
    where: {
      userId: user.id,
      id,
    }
  })
  await verifyIfExists(attachment)

  return {
    signedUrlToDownload: await getSignedUrlToDownload(
      `${user.id}/${attachment.fileName}`,
      attachment,
    ),
  }
}

const remove = async (user, id) => {
  const attachment = await Attachment.findOne({
    where: {
      userId: user.id,
      id,
    }
  })
  await verifyIfExists(attachment)

  await attachment.destroy()

  return attachment
}

module.exports = {
  create,
  show,
  remove,
}
