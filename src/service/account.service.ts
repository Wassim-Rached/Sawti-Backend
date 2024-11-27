import mongoose, { FilterQuery } from "mongoose";
import AccountModel, {
  AccountDocument,
  AccountInput,
} from "../models/account.model";
import bcrypt from "bcrypt";

export async function createAccount(input: AccountInput) {
  try {
    const account = await AccountModel.create(input);
    const { password, ...accountWithoutPassword } = account.toJSON();
    return accountWithoutPassword;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function validatePassword({
  cin,
  pass,
}: {
  cin: string;
  pass: string;
}) {
  const account = await AccountModel.findOne({ cin });

  if (!account) {
    return null;
  }

  const isValid = await bcrypt.compare(pass, account.password);

  if (!isValid) return null;

  const { password, ...accountWithoutPassword } = account.toJSON();
  return accountWithoutPassword;
}

export async function findAccount(query: FilterQuery<AccountDocument>) {
  return AccountModel.findOne(query).lean().populate("favorites");
}

// update account
export async function updateAccount(
  query: FilterQuery<AccountDocument>,
  update: any
) {
  return AccountModel.findOneAndUpdate(query, update, { new: true }).lean();
}

// add candidate to favorites
export async function addCandidateToFavorites(
  cin: string,
  candidateId: mongoose.Schema.Types.ObjectId
) {
  const account = await AccountModel.findOne({ cin });

  if (!account) {
    throw new Error("Account not found.");
  }

  if (!account.favorites) {
    account.favorites = [];
  }

  if (account.favorites.includes(candidateId)) {
    throw new Error("Candidate is already in your favorites.");
  }

  account.favorites.push(candidateId);
  await account.save();

  return account.favorites;
}

// Service function to remove a candidate from favorites
export async function removeCandidateFromFavorites(
  cin: string,
  candidateId: mongoose.Schema.Types.ObjectId
) {
  const account = await AccountModel.findOne({ cin });

  if (!account) {
    throw new Error("Account not found.");
  }

  if (!account.favorites) {
    account.favorites = [];
  }

  const index = account.favorites.indexOf(candidateId);
  if (index === -1) {
    throw new Error("Candidate is not in your favorites.");
  }

  account.favorites.splice(index, 1);
  await account.save();

  return account.favorites;
}
