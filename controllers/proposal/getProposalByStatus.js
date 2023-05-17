const Proposal = require("../../models/proposal");
const User = require("../../models/user");
const mongoose = require("mongoose");
const Freelancer = require("../../models/freelancer");
const Gig = require("../../models/gig");


// const getProposalByStatus = async (req, res) => {
//   try {
//     const pipeline = [];

//     if (req.body.gig_token_id != null) {
//       pipeline.push(
//         {
//           $match: {
//             freelancer_address: req.user.wallet_address,
//             gig_token_id: req.body.gig_token_id,
//             isDeleted: false,
//             isActive: true
//           }
//         }
//       );
//     } else {
//       pipeline.push(
//         {
//           $match: {
//             client_address: req.user.wallet_address,
//             isDeleted: false,
//             isActive: true
//           }
//         }
//       );
//     }

//     pipeline.push(
//       {
//         $lookup: {
//           from: "gigs",
//           localField: "gig_token_id",
//           foreignField: "tokenId",
//           as: "gig_detail"
//         }
//       }
//     );

//     if (req.body.gig_token_id != null) {
//       pipeline.push(
//         {
//           $lookup: {
//             from: "users",
//             localField: "client_address",
//             foreignField: "wallet_address",
//             as: "user"
//           }
//         }
//       );
//     } else {
//       pipeline.push(
//         {
//           $lookup: {
//             from: "freelancers",
//             localField: "freelancer_address",
//             foreignField: "wallet_address",
//             as: "freelancer"
//           }
//         }
//       );

//       pipeline.push(
//         {
//           $addFields: {
//             gig_detail: {
//               $mergeObjects: [
//                 { $arrayElemAt: ["$gig_detail", 0] },
//                 {
//                   freelancer: {
//                     $arrayElemAt: ["$freelancer", 0]
//                   }
//                 }
//               ]
//             }
//           }
//         }
//       );
//     }

//     const proposalWithUserData = await Proposal.aggregate(pipeline);
//     console.log("proposalWithUserData", proposalWithUserData);
//     res.status(200).json(proposalWithUserData);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };
// module.exports = { getProposalByStatus };

const getProposalByStatus = async (req, res) => {
  try {
    console.log("PRPOSAL");
    let proposals;
    if (req.body.gig_token_id != null) {
      proposals = await Proposal.find({
        freelancer_address: req.user.wallet_address,
        gig_token_id: req.body.gig_token_id,
        isDeleted: false,
        isActive: true,
      });
    } else {
      proposals = await Proposal.find({
        client_address: req.user.wallet_address,
        isDeleted: false,
        isActive: true,
      });
    }

    const proposalWithUserData = await Promise.all(
      proposals.map(async (proposal) => {
        let proposalData = { ...proposal._doc };

        if (proposal?.gig_token_id != null) {
          console.log("ssss");
          const gig_detail = await Gig.findOne({
            tokenId: proposal.gig_token_id,
            isDeleted: false,
            isActive: true,
          });

          proposalData = { ...proposalData, gig_detail };
          console.log("pro data", proposalData);
        }

        if (req.body.gig_token_id != null) {
          if (proposal?.client_address) {
            const user = await User.findOne({
              wallet_address: proposal.client_address,
              isDeleted: false,
              isActive: true,
            });
            proposalData = { ...proposalData, user };
          }
        } else {
          const freelancer = await Freelancer.findOne({
            wallet_address: proposal.freelancer_address,
            isDeleted: false,
            isActive: true,
          });

          // console.log("Freelancer", freelancer);
          // console.log("proposalData.gig_detail", proposalData.gig_detail);
          const returnData = {
            ...proposalData,
            gig_detail: {
              ...proposalData.gig_detail._doc,
              freelancer: {
                ...freelancer._doc,
              },
            },
          };

          return returnData;
        }
        return proposalData;
      })
    );
    console.log("proposalWithUserData", proposalWithUserData);
    res.status(200).json(proposalWithUserData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
module.exports = { getProposalByStatus };
