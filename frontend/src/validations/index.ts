import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

export const registerValidationSchema = Yup.object().shape({
  name: Yup.string().required("*Fname is required"),
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "*Invalid Email")
    .required("*Email is required"),
  password: Yup.string().required("*Password is required"),
  confirmPassword: Yup.string()
    .required("*Confirm Password is required")
    .test("passwords-match", "*Passwords must match", function (value) {
      return value === this.parent.password;
    }),
});