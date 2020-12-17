const parseEnvironment = env => ({
  server: {
    port: env.PORT,
  },
  database: {
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialect: env.DB_DIALECT,
    logging: env.DB_LOGGING,
    seederStorage: 'sequelize',
    url: env.DATABASE_URL,
  },
  aws: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    signatureVersion: env.AWS_SIGNATURE_VERSION,
    region: env.AWS_REGION,
    bucketName: env.AWS_BUCKET_NAME,
    signedUrlExpireSeconds: parseInt(
      env.AWS_SIGNED_URL_EXPIRE_SECONDS,
      10,
    ),
    importerAccessKeyId: env.AWS_IMPORTER_S3_KEY,
    importerRegion: env.AWS_IMPORTER_REGION,
    importerSecretAccessKey: env.AWS_IMPORTER_S3_SECRET,
    importerBucketName: env.AWS_IMPORTER_S3_BUCKET_NAME,
  },
})

module.exports = parseEnvironment
