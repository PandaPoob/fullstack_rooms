import { z } from "zod";
import { stringValidation } from "../../validations/string-validation";
import { maxRoomTitleLen, minRoomTitleLen } from "../../validationVariables";
import { file_img } from "../../validations/file-img-validation";

const createroomschema = z.object({
  title: stringValidation(minRoomTitleLen, maxRoomTitleLen, "Title"),
  cover_img: file_img,
});

export default createroomschema;
