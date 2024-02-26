enum UserType {
  "CLIENT",
  "WORKER",
}

export interface IUserRequest {
  username: string;
  email: string;
  userType: UserType;
  address?: string;
  delivery?: boolean;
}

export interface IUserLogin {
  username: string;
  email: string;
}
