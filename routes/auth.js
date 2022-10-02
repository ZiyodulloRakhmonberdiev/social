const router = require('express').Router()
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//REGISTER
router.post('/register', async (req, res) => {
  try {
    // generate new password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    })

    // save user &   respond
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (err) {
    res.status(500).json(err)
  }
})

//LOGIN

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    !user && res.status(401).json('User not found!')

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json('Wrong password')

    res.status(200).json(user)

    // const hashedPassword = CryptoJS.AES.decrypt(
    // user.password,
    // process.env.PASS_SEC
    // )
    // const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

    // OriginalPassword !== req.body.password &&
    //   res.status(401).json('Wrong credentials!')

    // const accessToken = jwt.sign(
    //   {
    //     id: user._id,
    //     isAdmin: user.isAdmin
    //   },
    //   process.env.JWT_SEC,
    //   { expiresIn: '3d' }
    // )

    // const { password, ...others } = user._doc

    // res.status(200).json({ ...others, accessToken })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
