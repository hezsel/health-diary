const Joi = require('joi')

module.exports = Joi.object().keys({
  server: Joi.object().keys({
    port: Joi.number().integer()
      .min(1024).max(65535).required(),
  }).required(),
  database: Joi.object().keys({
    username: Joi.string().optional(),
    password: Joi.string().optional(),
    database: Joi.string().optional(),
    host: Joi.string().optional(),
    port: Joi.number().integer()
      .min(1024).max(65535),
    seederStorage: Joi.string().valid(
      'sequelize',
    ).required(),
    dialect: Joi.string().valid(
      'postgres',
    ).required(),
    logging: Joi.boolean().required(),
    url: Joi.string().optional(),
  }).required(),
  aws: Joi.object().keys({
    accessKeyId: Joi.string().required(),
    secretAccessKey: Joi.string().required(),
    signatureVersion: Joi.string().required(),
    region: Joi.string().required(),
    bucketName: Joi.string().required(),
    signedUrlExpireSeconds: Joi.number().required(),
    importerAccessKeyId: Joi.string().optional(),
    importerSecretAccessKey: Joi.string().optional(),
    importerBucketName: Joi.string().optional(),
    importerRegion: Joi.string().optional(),
  }).optional(),
}).required()
