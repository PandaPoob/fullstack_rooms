import { z } from "zod";
import { first_name } from "../validations/firstname-validation";
import { last_name } from "../validations/lastname-validation";
import { email } from "../validations/email-validation";
import { password } from "../validations/password-validation";
import { birthday } from "../validations/birthday-validation";

//validation schema for creating a user
const createuserschema = z.object({
  //assembling our validations
  first_name: first_name,
  last_name: last_name,
  email: email,
  password: password,
  birthday: birthday,
});

export default createuserschema;
