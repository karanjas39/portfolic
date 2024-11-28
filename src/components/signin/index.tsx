"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { z_signin, z_signin_type } from "@/types/user";
import Link from "next/link";
import PasswordInput from "../ui/passwordInput";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SignIn() {
  const [loading, setLoading] = useState(false);
  const form = useForm<z_signin_type>({
    resolver: zodResolver(z_signin),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit(data: z_signin_type) {
    try {
      setLoading(true);
      const response = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (response?.error) {
        throw new Error(response.error);
      }

      toast({
        description: "You have been logged in successfully.",
      });
      router.push("/");
    } catch (error) {
      const err = error as Error;
      console.error(err.message);
      toast({
        description: "Failed to login right now.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="text-3xl sm:text-4xl">
        <span className="font-bold text-primary">Sign in</span> to your account
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-8 w-[90%] sm:w-[45%] mx-auto flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="user@example.com" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the email address associated with your account.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => <PasswordInput field={field} />}
          />
          <Button type="submit" isLoading={loading}>
            Sign in
          </Button>
        </form>
      </Form>
      <div className="flex items-center gap-1 mt-8">
        <span>New to our platform?</span>
        <Link href="/signup">
          <span className="text-primary font-bold cursor-pointer">
            Sign up now
          </span>
        </Link>
      </div>
    </>
  );
}

export default SignIn;
