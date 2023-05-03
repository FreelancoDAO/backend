const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();
const request = require('request');

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const Bucket = process.env.BUCKET_NAME;

const upload = async (buffer, opts) => {
  const location = `https://${Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${opts.folderName}/${opts.fileName}`;
  console.log(location);
  try {
    const response = await s3Client.send(
      new PutObjectCommand({
        Bucket, 
        Key: `${opts.folderName}/${opts.fileName}`,
        Body: buffer,
        ContentType: opts.mime,
        ACL: 'public-read'
      })
    );

    return { ...response, Location: location };
  } catch (err) {
    console.log('upload fail: ', err);
    throw err;
  }
};

const deleteUpload = async (key) => {
  try {
    console.log(`File Delete Request :  ${key}`);
    const response = await s3Client.send(
      new DeleteObjectCommand({
        Bucket,
        Key: key
      })
    );
    console.log(`Delete from s3 successfully for key : ${key}`);
    return response;
  } catch (err) {
    console.log(`Delete uploaded fail for key: ${key}`, err);
    throw err;
  }
};

const getUpload = async (key) => {
  try {
    console.log(`File Get Request :  ${key}`);
    const response = await s3Client.send(
      new GetObjectCommand({
        Bucket,
        Key: key
      })
    );
    console.log(`Get from s3 successfully for key : ${key}`);
    return response.Body;
  } catch (err) {
    console.log(`Get uploaded fail for key: ${key}`, err);
    throw err;
  }
};


const getBufferFromAttachment = (opts) => {
  return new Promise((resolve, reject) => {
    request(opts, (err, res, data) => {
      if (err) reject(err);
      resolve(data);
    })
  });
};

module.exports = { upload, deleteUpload, getUpload, getBufferFromAttachment };