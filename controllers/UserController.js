const User = require("../models/UserModel");


module.exports.UserProfile = async (req, res,) => {
  try {
    const user = req.user
    return res.json({ email: user.email, image: user.image, username: user.username });
  } catch (error) {
    console.error(error);
  }
};


module.exports.Users = async (req, res) => {
  try {
    const users = await User.find().limit(10);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};