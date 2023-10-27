import { z } from "zod";
import { title } from "../validations/note-title-validation";
import { text } from "../validations/note-text-validation";

//validation schema for creating a note
const createnoteschema = z.object({
  //assembling our validations
  title: title,
  text: text,
});

export default createnoteschema;
