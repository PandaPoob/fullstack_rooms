export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserSignupForm extends UserCredentials {
  first_name: string;
  last_name: string;
  password_confirm: string;
  birthday: string;
}

export interface UserEdit {
  first_name: string;
  last_name: string;
  birthday: string;
  status?: { id: string; title: string };
  avatar_img?: string;
}
