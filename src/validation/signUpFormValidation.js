import { regex } from "./regex";
import { validateAge } from "./../helpers/date";
export function getFormValidation(watch) {
  return {
    name: {
      required: { value: true, message: "Name is required" },
      minLength: {
        value: 2,
        message: "Name must be at least 2 characters",
      },
      maxLength: {
        value: 50,
        message: "Name must be at most 50 characters",
      },
    },
    email: {
      required: { value: true, message: "Email is required" },
      pattern: { value: regex.email, message: "Enter valid email" },
    },
    password: {
      required: { value: true, message: "Password is required" },
      pattern: {
        value: regex.password,
        message:
          "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      },
    },
    rePassword: {
      required: {
        value: true,
        message: "Confirm Password is required",
      },
      validate: (value) =>
        value === watch("password") ||
        "Password and Confirm Password must be the same",
    },
    birthDate: {
      required: { value: true, message: "Birth date is required" },
      validate: (value) =>
        validateAge(value) || "You must be at least 18 years old",
    },
    gender: {
      required: { value: true, message: "Gender is required" },
      validate: (gender) =>
        gender == "male" ||
        gender == "female" ||
        "Gender must be one of (Male, Female)",
    },
  };
}
