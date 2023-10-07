import { UserCredentials } from "./usercredentials.model";

export interface UserSignupForm extends UserCredentials {
  first_name: string;
  last_name: string;
  password_confirm: string;
  birthday: string;
}