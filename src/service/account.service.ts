import { FilterQuery } from "mongoose";
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
  return AccountModel.findOne(query).lean();
}

// update account
export async function updateAccount(
  query: FilterQuery<AccountDocument>,
  update: any
) {
  return AccountModel.findOneAndUpdate(query, update, { new: true }).lean();
}
