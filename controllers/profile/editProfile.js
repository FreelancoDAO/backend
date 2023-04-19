const Freelancer = require("../../models/freelancer");

const editProfile = async (req, res) => {
  const id = req.params.id;
  console.log(id, req.body);
  try {
    const user = await Freelancer.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    return res.send({ user });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

module.exports = { editProfile };
