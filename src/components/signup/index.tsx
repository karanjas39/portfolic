"use client";

import Link from "next/link";
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
import { z_signup, z_signup_type } from "@/types/user";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import PasswordInput from "../ui/passwordInput";
import { useState } from "react";

function SignUp() {
  const [loading, setLoading] = useState(false);
  const form = useForm<z_signup_type>({
    resolver: zodResolver(z_signup),
    defaultValues: {
      email: "",
      password: "",
      confirmedPassword: "",
      name: "",
    },
  });
  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit(data: z_signup_type) {
    try {
      setLoading(true);
      if (data.confirmedPassword !== data.password) {
        return toast({
          description: "Password does not match.",
          variant: "destructive",
        });
      }
      const response = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const resData = await response.json();

      if (resData?.error) {
        throw new Error(resData.error);
      }

      toast({ description: "Account has been created successfully." });
      router.push("/signin");
    } catch (error) {
      const err = error as Error;
      console.error(err.message);
      toast({
        description: err.message || "Failed to signup now.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="text-3xl sm:text-4xl">
        <span className="font-bold text-primary">Create </span> your account
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-8 w-[90%] sm:w-[45%] mx-auto flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Harry Potter" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your full name as it will appear on your profile.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
                  Provide the email address to associate with your account.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <PasswordInput
                field={field}
                description="Choose a strong password to keep your account secure."
              />
            )}
          />
          <FormField
            control={form.control}
            name="confirmedPassword"
            render={({ field }) => (
              <PasswordInput
                field={field}
                label="Confirm Password"
                description="Re-enter your password to confirm."
              />
            )}
          />
          <Button type="submit" isLoading={loading}>
            Sign up
          </Button>
        </form>
      </Form>

      <div className="flex items-center gap-1 mt-8">
        <span>Already have an account?</span>
        <Link href="/signin">
          <span className="text-primary font-bold cursor-pointer">
            Sign in now
          </span>
        </Link>
      </div>
    </>
  );
}

export default SignUp;
