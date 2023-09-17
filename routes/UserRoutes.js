const { UserProfile, Users } = require("../controllers/UserController");
const { auth } = require("../middlewares/AuthMiddleware")
const router = require("express").Router();

router.get("/", auth, UserProfile)
router.get('/all-users', Users)


module.exports = router