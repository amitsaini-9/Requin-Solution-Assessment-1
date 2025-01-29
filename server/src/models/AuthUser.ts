import mongoose from 'mongoose';

const AuthUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Admin', 'Editor', 'Viewer'],
    required: true
  }
}, {
  timestamps: true
});

export const AuthUser = mongoose.model('AuthUser', AuthUserSchema);