const aws = require('aws-sdk')

const endpoint = new aws.Endpoint(process.env.ENDPOINT)

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.KEY_ID,
        secretAccessKey: process.env.APP_KEY,

    },
})

const uploadFile = async (path, buffer, mimetype) => {
    const file = await s3.upload({
        Bucket: process.env.BACKBLAZE_BUCKET,
        Key: path,
        Body: buffer,
        ContentType: mimetype
    }).promise()

    return {
        url: file.Location,
        path: file.Key

    }


}

module.exports = { uploadFile }


