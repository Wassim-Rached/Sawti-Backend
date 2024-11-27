import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Account Schema
const accountSchema = new mongoose.Schema<AccountDocument>({
  cin: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  votedFor: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate" },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Candidate" }],
});

export interface AccountInput {
  cin: string;
  firstName: string;
  lastName: string;
  password: string;
  votedFor?: mongoose.Schema.Types.ObjectId;
  favorites?: mongoose.Schema.Types.ObjectId[];
}

export interface AccountDocument extends AccountInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

accountSchema.pre("save", async function (next) {
  let account = this as unknown as AccountDocument;

  if (!account.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hashSync(account.password, salt);

  account.password = hash;

  return next();
});

const AccountModel = mongoose.model<AccountDocument>("Account", accountSchema);

export default AccountModel;
