export class User {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string | null,
    public readonly email: string | null,
    public readonly phoneNumber: string | null,
    public readonly address: string | null
  ) {}

  getFullName(): string {
    return `${this.firstName} ${this.lastName ?? ""}`.trim();
  }

  hasEmail(): boolean {
    return !!this.email;
  }

  hasPhone(): boolean {
    return !!this.phoneNumber;
  }
}