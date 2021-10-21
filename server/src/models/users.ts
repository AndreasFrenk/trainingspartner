import mongoose, { Schema } from "mongoose";

export interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password?: string;
  createdAt: Date;
  // profileImage: { data: Buffer, contentType: String };
  profileImage: String;
  edited: boolean;
  profile: {
    sports: Array<string>,
    age: Number,
    location: {
      city: string,
      country: string,
      loc: {
        type: string,
        coordinates: Array<Number>,
      }
    }
  }
}

const userSchema: Schema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  profileImage: { type: String },
  edited: {type: Boolean, default: false},
  profile: {
    sports: {type: [String]},
    age: {type: Number},
    location: {
      city: {type: String},
      country: {type: String},
      loc: {
        type: {
          type: String,
          enum: ['Point']
        },
        coordinates: {
          type: [Number]
        }
      }
    }
  }  
});

userSchema.index({"profile.location.loc": '2dsphere'})

const User = mongoose.model<IUser>("User", userSchema);

export default User;
