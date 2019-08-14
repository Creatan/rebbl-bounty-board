import express from 'express'
import User from '../models/user'

const router = express.Router()


async function getUser(req, res) {
  console.log('get user', req.user)
  if (req.user) {
    const user = await User.findOne({ _id: req.user._id }).exec()
    const { _id, __v, ...userData } = user.toObject()
    console.log(userData)
    res.json(userData)
  } else { res.json({}) }
}

router.get('/', getUser)

export default router