export interface UserRegistrationRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}
