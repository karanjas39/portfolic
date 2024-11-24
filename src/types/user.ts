import z from "zod";

export const z_signin = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type z_signin_type = z.infer<typeof z_signin>;
