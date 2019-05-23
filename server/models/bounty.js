import mongoose from 'mongoose'

const BountySchema = mongoose.Schema({
  player: {
    id: Number,
    name: String,
  },
  team: {
    id: Number,
    name: String,
  },
  league: String,
  provider: {
    name: String,
    id: mongoose.Schema.Types.ObjectId,
  },
  requirement: String,
  prize: String,
  reason: String,
  claimed: Boolean,
  season: String,
})

export default mongoose.model('Bounty', BountySchema)