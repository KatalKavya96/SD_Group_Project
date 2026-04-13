export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string | null,
    public readonly phoneNumber: string | null,
    public readonly email: string | null,
    public readonly address: string | null,
    public readonly govtId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {
    if (!this.phoneNumber && !this.email) {
      throw new Error("User must have at least phone number or email");
    }
  }

  public hasEmail(): boolean {
    return !!this.email;
  }

  public hasPhone(): boolean {
    return !!this.phoneNumber;
  }

  public getFullName(): string {
    return `${this.firstName} ${this.lastName ?? ""}`.trim();
  }

  public getContactInfo(): object {
    if (this.hasEmail() && this.hasPhone()) {
      return { email: this.email!, phone: this.phoneNumber! };
    } else if (this.hasEmail()) {
      return { email: this.email! };
    } else if (this.hasPhone()) {
      return { phone: this.phoneNumber! };
    } else 
        return {};
  }

  public toJSON() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      email: this.email,
      address: this.address,
      govtId: this.govtId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}