export class CreateUserDto {
  userName!: string;

  displayName!: string;

  email!: string;

  password!: string;

  phone!: string;

  age!: string;

  gender!: string;

  address!: string;

  role!: string;
}

export class LoginDto {
  phone!: string;
  password!: string;
}
