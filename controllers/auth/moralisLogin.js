const moralis = require("moralis").default;

const moralisLogin = async (req, res) => {
  // await moralis.start({
  //   apiKey: "nEa0BnSIj0IwqHvmRZFjr3tM90Ay20SZFSwEZwq9XX6FmDVkxQSl8xdbQm6bdSBF",
  // });
  const { address, chain, network } = req.body;
  // try {
  // const config = {
  //   domain: "",freelanco
  //   statement: "Please sign this message to confirm your identity.",
  //   uri: "https://freelanco.com",
  //   timeout: 60,
  // };
  const config = {
    domain: "free",
    statement: "Please sign this message to confirm your identity.",
    uri: "https://freelanco.com",
    timeout: 60,
  };

  const result = await moralis.Auth.requestMessage({
    address,
    chain,
    ...config,
  });

  res.status(200).json(result);
  // } catch (err) {
  //   res.status(400).json({ err });
  // }
};

module.exports = { moralisLogin };
