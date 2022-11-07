import mongoose from 'mongoose';
import { TimeConstants } from '../constants';

const { Schema } = mongoose;

const linkSchema = new Schema({
  userId: {
    required: true,
    type: String,
  },
  fullUrl: {
    required: true,
    type: String,
  },
  subpart: {
    required: true,
    type: String,
  },
  createdAt: {
    required: true,
    type: Date,
    default: new Date(),
    // set to 1 hour
    expires: TimeConstants.mongoExp,
  },
});

export default mongoose.model('Link', linkSchema);
