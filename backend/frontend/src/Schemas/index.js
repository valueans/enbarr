import * as Yup from "yup";

export const signUpSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(8).required("Please enter your password"),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

export const loginSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(8).required("Please enter your password"),
});

export const verifyOtpSchema = Yup.object({
  otp1: Yup.string().max(1).required("please enter otp"),
  otp2: Yup.string().max(1).required("please enter otp"),
  otp3: Yup.string().max(1).required("please enter otp"),
  otp4: Yup.string().max(1).required("please enter otp"),
});

export const changePasswordSchema = Yup.object({
  password: Yup.string().min(8).required("Please enter your password"),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

export const feedbackSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  message: Yup.string().min(1).required("please enter your message"),
});

export const resetEmailSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
});
