const { Signup, Login, UploadImage } = require("../controllers/AuthController");
const { userVerification, auth } = require("../middlewares/AuthMiddleware")
const User = require("../models/UserModel")
const router = require("express").Router();

router.post("/", userVerification)
router.post("/signup", Signup);
router.post('/login', Login);
router.post('/upload-image', auth, UploadImage);

router.get("/count", async (req, res) => {
    try {
      const count = await User.countDocuments();
      const random = Math.floor(Math.random() * 9) + 1;
      const elementCount = count.toString() + random.toString();
      res.json({ elementCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  });

module.exports = router