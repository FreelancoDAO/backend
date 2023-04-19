const fs = require("fs");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");

const JWT = process.env.PINATA_JWT;

const uploadImage = async (req, res) => {

  try {
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

    const resp = await axios(config);
    console.log(resp.data.IpfsHash);
    res.status(200).json({ IpfsHash: resp.data.IpfsHash });
  }
  catch (err) {
    res.status(500).send(err);
  }

};

module.exports = { uploadImage };