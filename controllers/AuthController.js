const User = require("../models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const username = `${req.body.email.replace(/\s+/g, '_')}${Math.random().toString().substring(2, 7)}`
    const user = await User.create({ email, password, username });
    const token = createSecretToken(user._id);
    res
      .status(201)
      .json({ token, message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};


module.exports.Login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if(!email || !password ){
        return res.json({message:'All fields are required'})
      }
      const user = await User.findOne({ email });
      if(!user){
        return res.json({message:'Incorrect password or email' }) 
      }
      const auth = await bcrypt.compare(password, user.password)
      if (!auth) {
        return res.json({message:'Incorrect password or email' }) 
      }
       const token = createSecretToken(user._id);
       res.status(201).json({ token, message: "User logged in successfully", success: true });
       next()
    } catch (error) {
      console.error(error);
    }
  }



module.exports.UploadImage = async (req, res) => {
    try {
      const { imageUrl } = req.body;
      req.user.image = imageUrl;
      await req.user.save();
  
      res.json({ success: true, message: 'Image uploaded and saved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
  };