import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    id: { type: String, required: true },
    username: { type: String, required: true },
    discriminator: { type: String, required: true },
    avatar: String,
    dates: {
      firstSeen: {
        default: Date.now,
        type: Date
      }
    }
});

export default mongoose.model('Users', UserSchema);