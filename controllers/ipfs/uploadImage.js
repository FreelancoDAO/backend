// const fs = require("fs");
// const path = require("path");
// const axios = require("axios");
// const FormData = require("form-data");
// const { upload } = require("../../utils/s3Upload");

// const JWT = process.env.PINATA_JWT;

// const uploadImage = async (req, res) => {
//   console.log("data", req.file);
//   try {
//     // const opts = {};
//     // opts.fileName = `${Date.now()}.${req.file.filename}`;
//     // opts.folderName = 'gig_images';
//     // opts.mime = req.file.mimetype;

//     // const fileBuffer = fs.readFileSync(req.file.path);
//     // console.log(fileBuffer);
//     // const aws_response = await upload(fileBuffer, opts);
//     // console.log("d", aws_response.Location);

//     var data = new FormData();
//     data.append("file", fs.createReadStream(req.file.path));
//     data.append("pinataOptions", '{"cidVersion": 1}');
//     data.append(
//       "pinataMetadata",
//       '{"name": "MyFile", "keyvalues": {"company": "Pinata"}}'
//     );

//     var config = {
//       method: "post",
//       url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//       headers: {
//         Authorization: `Bearer ${JWT}`,
//         ...data.getHeaders(),
//       },
//       data: data,
//     };

//     const resp = await axios(config);
//     console.log(resp.data.IpfsHash);
//     res.status(200).json({ IpfsHash: resp.data.IpfsHash });
//   }
//   catch (err) {
//     console.log(err);
//     res.status(500).send(err);
//   }

// };

// module.exports = { uploadImage };


const fs = require("fs");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");
const { upload } = require("../../utils/s3Upload");

const JWT = process.env.PINATA_JWT;

const uploadImage = async (req, res) => {
  console.log("data", req.file);
  try {
    const opts = {};
    opts.fileName = `${Date.now()}.${req.file.filename}`;
    opts.folderName = 'gig_images';
    opts.mime = req.file.mimetype;

    const fileBuffer = fs.readFileSync(req.file.path);
    console.log(fileBuffer);

    const awsPromise = upload(fileBuffer, opts);
    const ipfsPromise = new Promise(async (resolve, reject) => {
      var data = new FormData();
      data.append("file", fs.createReadStream(req.file.path));
      data.append("pinataOptions", '{"cidVersion": 1}');
      data.append(
        "pinataMetadata",
        '{"name": "MyFile", "keyvalues": {"company": "Pinata"}}'
      );

      var config = {
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        headers: {
          Authorization: `Bearer ${JWT}`,
          ...data.getHeaders(),
        },
        data: data,
      };

      try {
        const resp = await axios(config);
        console.log(resp.data.IpfsHash);
        resolve(resp.data.IpfsHash);
      } catch (error) {
        reject(error);
      }
    });

    const [awsResponse, ipfsResponse] = await Promise.all([
      awsPromise,
      ipfsPromise,
    ]);
    const images = {
      awsImageLink: awsResponse.Location,
      ipfsImageHash: ipfsResponse
    }
    console.log("d", awsResponse.Location);
    console.log(ipfsResponse);
    res.status(200).json(images);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { uploadImage };
