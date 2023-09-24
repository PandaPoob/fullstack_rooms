import createuserschema from "./create-user-schema";
import { password } from "../validations/password-validation";

export const createuserfrontendschema = createuserschema
  .extend({
    password_confirm: password,
  })
  .superRefine(({ password_confirm, password }, ctx) => {
    if (password_confirm !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords must match",
      });
    }
  });
