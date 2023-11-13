import { z } from "zod";
import { first_name } from "../validations/firstname-validation";
import { last_name } from "../validations/lastname-validation";
import { birthday } from "../validations/birthday-validation";
import { status } from "../validations/status-validation";

const edituserschema = z.object({
  first_name: first_name,
  last_name: last_name,
  birthday: birthday,
  status: status,
  //image
});

export default edituserschema;
