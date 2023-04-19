const axios = require('axios');

const JWT = process.env.PINATA_JWT;

const uploadJson = async (req, res) => {
  try {
    var tokenUriMetadata = JSON.stringify({
      pinataOptions: {
        cidVersion: 1,
      },
      pinataMetadata: {
        name: "IpfsGig",
      },
      pinataContent: {
        image: `ipfs://${req.body?.ipfsImageHash}`,
        title: req.body?.title,
        description: req.body?.description,
        metadata: {
          category: req.body?.category,
          sub_category: req.body?.sub_category,
          skill: req.body?.skill,
          duration: req.body?.duration,
          plans: req.body?.plans,
          wallet_address: req.body?.wallet_address
        },
      }
    });
    var config = {
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT}`,
        pinata_api_key: '47459391babfb6c8050e',
        pinata_secret_api_key: 'b4211056d57eafc6bb997716b4d00e0d0cd76be0589b077ad018de1317a15e4d'
      },
      data: tokenUriMetadata,
    };

    const resp = await axios(config);

    res.status(200).json({ IpfsHash: resp.data.IpfsHash });
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = { uploadJson };
