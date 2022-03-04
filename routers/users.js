const router = require("express").Router();
const { json } = require("express");
const User1 = require("../models/User");

//create user
//[POST] /api/users-table/register
router.post("/register", async (req, res) => {
  try {
    const newUser = new User1({
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      status: req.body.status,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all users
//[GET] /api/users-table
router.get("/", async (req, res) => {
  try {
    const user = await User1.find({});
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/danang-users", async (req, res) => {
  try {
    const users = await User1.find({ address: "Đà Nẵng" }).exec();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all users have password greater than 6
//[GET] /api/users-table/long-passwords
router.get("/long-passwords", async (req, res) => {
  try {
    const currentUser = await User1.find({});
    const passwordUser = await Promise.all(
      currentUser.filter((e) => {
        return e.password.length > 6;
      })
    );
    // res.json(passwordUser);
    res.status(200).json(passwordUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update state = 1
//[put] /api/users-table/state/:id
router.put("/state/:id", async (req, res) => {
  try {
    const currentUser = await User1.findById(req.params.id);
    if (currentUser.userId === req.body.userId) {
        await currentUser.updateOne({ $set: {
            status: req.body.status,
        } });
        res.status(200).json("Your state has been updated.");
    } else {
      res.status(404).json("There're something wrong!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
