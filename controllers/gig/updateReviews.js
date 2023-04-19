const Gig = require("../../models/gig");
const Proposal = require("../../models/proposal");
const User = require("../../models/user");

const updateReviews = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }
    let resp;
    // Create a new review object
    const newReview = {
      rating: req.body.rating,
      comment: req.body.comment,
      wallet_address: req.body.wallet_address,
    };

    console.log("REQ:BPDY: ", req.body);

    if (req.body.client_address) {
      let client = await User.find({
        wallet_address: req.body.client_address,
      });
      client = client[0];
      console.log("Client found", client);
      if (
        !client.reviews.filter(
          (review) => review.wallet_address == req.user.wallet_address
        ).length
      ) {
        client.reviews.push(newReview);

        console.log("Review aded to client found", client);
        const ratingSum = client.reviews.reduce((total, review) => {
          return total + review.rating;
        }, 0);
        const newRating = ratingSum / client.reviews.length;
        client.rating = newRating;

        // Save the updated gig to the database
        resp = await client.save();
      }
    } else {
      //CLIENT GIVING TO FREELANCER
      //FIRST GOES INTO PROPOSAL, IF ALREADY IN PROPOSAL THEN DO NOT ADD ANOTHER INTO GIGS OR PROPOSAL
      const proposal = await Proposal.findById(req.body.proposal_id);

      if (
        proposal &&
        proposal.reviews.length == 0 &&
        proposal.status == "Completed"
      ) {
        //push to proposals as well
        console.log("ADDING TO PROPOSAL");
        proposal.reviews.push(newReview);
        gig.reviews.push(newReview);
        // Calculate the new average rating for the gig
        const ratingSum = gig.reviews.reduce((total, review) => {
          return total + review.rating;
        }, 0);
        const newRating = ratingSum / gig.reviews.length;
        gig.rating = newRating;

        // Save the updated gig to the database
        await proposal.save();

        resp = await gig.save();
      } else {
        res.status(404).json({ message: "Review Already There" });
      }
    }

    res.json(resp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  updateReviews,
};
