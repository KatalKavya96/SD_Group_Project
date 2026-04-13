import { User } from "../models/User";

type RawUser = {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string | null;
  phoneNumber: string | null;
  address: string | null;
};

export class UserFactory {
  static create(raw: RawUser): User {
    return new User(
      raw.id,
      raw.firstName,
      raw.lastName,
      raw.email,
      raw.phoneNumber,
      raw.address
    );
  }
}