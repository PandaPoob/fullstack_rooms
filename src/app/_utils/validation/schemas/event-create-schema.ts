import { z } from "zod";
import { stringValidation } from "../validations/string-validation";
import {
  maxFirstNameLen,
  maxdescriptionLen,
  minFirstNameLen,
} from "../validationVariables";
import { date } from "../validations/date-validation";
import { time } from "../validations/time-validation";

const createeventschema = z.object({
  title: stringValidation(minFirstNameLen, maxFirstNameLen, "Title"),
  roomId: z.string({
    required_error: `RoomId is required`,
    invalid_type_error: `RoomId must be a string`,
  }),
  description: z
    .string()
    .max(maxdescriptionLen, `Description max length is ${maxdescriptionLen}`)
    .optional(),
  location: z
    .string()
    .max(maxFirstNameLen, `Location max length is ${maxFirstNameLen}`)
    .optional(),
  startDate: date,
  startTime: time,
  endDate: date,
  endTime: time,
});
export default createeventschema;
