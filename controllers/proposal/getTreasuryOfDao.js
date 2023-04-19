const Proposal = require("../../models/proposal");
const User = require("../../models/user");
const mongoose = require("mongoose");
const Freelancer = require("../../models/freelancer");
const Gig = require("../../models/gig");
const Moralis = require("moralis").default;
// const { EvmChain } = require("@moralisweb3/common-evm-utils");

const getTreasuryOfDao = async (req, res) => {
  try {
    const address = "0x528d30eAf8FD0F872fb2808185b2e798D23eED8e";
    const chain = "80001";

    const response = await Moralis.EvmApi.balance.getNativeBalance({
      address,
      chain,
    });

    if (response) {
      res.status(200).json(response.jsonResponse);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
module.exports = { getTreasuryOfDao };
