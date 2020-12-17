const { S3 } = require('aws-sdk')
const { ServiceUnavailableError } = require('../errors')
const {
  aws: {
    accessKeyId,
    secretAccessKey,
    signatureVersion,
    region,
    bucketName: defaultBucketName,
    signedUrlExpireSeconds,
    importerAccessKeyId,
    importerSecretAccessKey,
    importerRegion,
  },
} = require('../configs')

const s3default = new S3({
  accessKeyId,
  secretAccessKey,
  signatureVersion,
  region,
})

const s3Importer = new S3({
  accessKeyId: importerAccessKeyId,
  secretAccessKey: importerSecretAccessKey,
  signatureVersion,
  region: importerRegion,
})

const getFileToDownload = (
  key,
  s3 = s3default,
  bucketName = defaultBucketName,
) => (
  s3.getObject({
    Bucket: bucketName,
    Key: key,
  })
).promise()

const getAttachmentContentType = (extension) => {
  const contentTypes = {
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    pdf: 'application/pdf',
    wav: 'audio/wav',
    avi: 'video/avi',
    mp4: 'video/mp4',
    webm: 'video/webm',
    mp3: 'audio/mpeg',
    csv: 'text/csv',
  }
  return contentTypes[extension] || 'application/octet-stream'
}

const getSignedUrlToDownload = (
  key,
  { originalName, extension },
  s3 = s3default,
  bucketName = defaultBucketName,
) => (
  s3.getSignedUrl('getObject', {
    Bucket: bucketName,
    Key: key,
    Expires: signedUrlExpireSeconds,
    ResponseContentDisposition: `inline; filename=${originalName}`,
    ResponseContentType: getAttachmentContentType(extension),
  })
)

const uploadFile = async ({
  key,
  body,
},
  s3 = s3default,
  bucketName = defaultBucketName,
) => s3.upload({
  Bucket: bucketName,
  Key: key,
  Body: body,
}, async (err) => {
  if (err) {
    throw new ServiceUnavailableError({
      message: 'Upload unavailable',
      errorCode: 'upload_unavailable',
    })
  }
}).promise()

module.exports = {
  getSignedUrlToDownload,
  uploadFile,
  s3Importer,
  getFileToDownload,
}
