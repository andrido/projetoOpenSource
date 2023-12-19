const aws = require('aws-sdk')
const { PassThrough } = require('nodemailer/lib/xoauth2')

const endpoint = new aws.Endpoint(process.env.ENDPOINT)

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.KEY_ID,
        secretAccessKey: process.env.APP_KEY,

    },
})

const uploadFile = async (file) => {
    const image = await s3.upload({
        Bucket: process.env.BACKBLAZE_BUCKET,
        Key: `imagens/${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype
    }).promise()
    return image
}

const deleteFile = async (path) => {
    const B = await s3.deleteObject({
        Bucket: process.env.BACKBLAZE_BUCKET,
        Key: `imagens/${path[0].produto_imagem.split('/')[5]}`,
    }).promise()
    console.log(B[0])

}




module.exports = { uploadFile, deleteFile }

