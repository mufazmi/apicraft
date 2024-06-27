import { Schema, model, Types, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import Constants from '../utils/constants';

export interface IUser {
  name: string;
  email?: string;
  mobile?: string;
  password?: string;
  image?: string;
  type?: string;
  web_token?: string;
  android_token?: string;
  is_email_verified?: boolean;
  is_staff?: boolean;
  is_admin?: boolean;
  is_mobile_verified?: boolean;
}

export interface IUserDocument extends Document, IUser {}

const userSchema: Schema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    mobile: {
      type: String,
      required: false,
      unique: true,
    },
    image: {
      type: String,
      required: false,
      default:'user.png'
    },
    type: {
      type: String,
      required: false,
      enum:["developer","employee","contractor","owner"],
      default:"owner"
    },
    web_token: {
      type: String,
      required: false,
    },
    android_token: {
      type: String,
      required: false,
    },
    is_email_verified: {
      type: Boolean,
      default: false,
    },
    is_staff: {
      type: Boolean,
      default: false,
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
    is_mobile_verified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: false,
    },
  },
  {
    
timestamps: {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
}

  }
);


userSchema.pre('save', function (this: IUserDocument, next: (err?: Error | null) => void) {
  const user = this;
  if (!user.password && !user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(Constants.AUTH.SALT_FACTOR, (err: Error | null | undefined, salt: string) => {
    if (err != null) {
      return next(err);
    }

    // Ensure salt is not undefined before using it
    bcrypt.hash(user.password!, salt!, (err: Error | null | undefined, hash: string) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      console.log({hash});
      console.log({planePassword:user.password});
      return next();
    });
  });
});

userSchema.pre('updateOne', function (this: any, done: (err?: Error | null) => void) {
  const user = this.getUpdate() as IUser;
  console.log({ user });
  if (!user || !user.password) return done();
  bcrypt.genSalt(Constants.AUTH.SALT_FACTOR, (err: Error | null | undefined, salt: string) => {
    if (err != null) return done(err);

        //@ts-ignore
    bcrypt.hash(user.password, salt!, (err: Error | null, hashedPassword: string) => {
      if (err) return done(err);
      user.password = hashedPassword;

      console.log("update");
      console.log({hashedPassword});
      console.log({planePassword:user.password});
      return done();
    });
  });
});


const UserModel = model<IUser>('User', userSchema, 'users');
export default UserModel;
