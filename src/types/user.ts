import z from "zod";

export const z_signin = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const z_signup = z.object({
  email: z.string().email({ message: "This is not a valid email." }),
  password: z.string().min(6, "Password should be minimum 6 characters."),
  confirmedPassword: z
    .string()
    .min(6, "Password should be minimum 6 characters."),
  name: z.string().min(3, "Name should be minimum 3 characters."),
});

export type z_signin_type = z.infer<typeof z_signin>;
export type z_signup_type = z.infer<typeof z_signup>;
