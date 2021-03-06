import express from 'express'
import crypto from 'crypto'
import passport from 'passport'
import { HttpError } from '../utils'

const router = express.Router()


async function login(req, res, next) {
  req.session.state = crypto.randomBytes(32).toString('hex')
  await req.session.save()
  passport.authenticate('reddit', {
    state: req.session.state,
    duration: 'permanent',
  })(req, res, next)
}

async function auth(req, res, next) {
  if (req.query.state === req.session.state) {
    passport.authenticate('reddit', {
      successRedirect: '/',
      failureRedirect: '/',
    })(req, res, next)
  } else {
    next(new HttpError(403, "State didn't match"))
  }
}

router.get('/reddit', login)
router.get('/reddit/callback', auth)

export default router
