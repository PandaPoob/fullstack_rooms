import { z } from "zod";
import { first_name } from "../validations/firstname-validation";
import { last_name } from "../validations/lastname-validation";
import { birthday } from "../validations/birthday-validation";
import { status } from "../validations/status-validation";
import { avatar_img_backend } from "../validations/backend-img-validation";

const backendedituserschema = z.object({
  first_name: first_name,
  last_name: last_name,
  birthday: birthday,
  status: status,
  avatar_img: avatar_img_backend,
});

export default backendedituserschema;
