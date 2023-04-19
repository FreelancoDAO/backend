const Freelancer = require("../../models/freelancer");

const getProfile = async (req, res) => {

  const id = req.params.id;
  try {
    const user = await Freelancer.findById(id);

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    return res.send({ user });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

module.exports = { getProfile };
