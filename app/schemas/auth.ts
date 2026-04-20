import z from "zod";

// this is schema for sign up form that comes from zod libarary and it will be used to validate the data that comes from the sign up form in the page.tsx file

export const signUpSchema = z.object({
  name: z.string().min(3).max(30),
  email: z.email(),
  password: z.string().min(8).max(30),
})

// we also create signInSchema for login form validation
export const logInSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(30),
})

