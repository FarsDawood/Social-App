import * as zod from "zod";
import { regex } from "./regex";
import { calculateAge } from "./../helpers/date";
export const schema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters"),
    username: zod
      .string()
      .min(1, "Username is required")
      .min(5, "Username must be at least 5 characters")
      .max(20, "Username cannot exceed 20 characters")
      .regex(regex.username, "Username must contain only letters, numbers, periods, or underscores"),
    email: zod.string().nonempty("Email is required").regex(regex.email, "Enter valid email"),
    password: zod
      .string()
      .nonempty("Password is required")
      .regex(
        regex.password,
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      ),
    rePassword: zod.string().nonempty("Confirm Password is required"),
    dateOfBirth: zod
      .string()
      .nonempty("Birth date is required")
      .refine((date) => calculateAge(date) >= 18, "You must be at least 18 years old"),
    gender: zod
      .string()
      .nonempty("Gender is required")
      .regex(/^(male|female)$/, "Gender must be one of (Male, Female)"),
  })
  .refine((data) => data.password == data.rePassword, {
    message: "Password and Confirm Password must be the same",
    path: ["rePassword"],
  });
