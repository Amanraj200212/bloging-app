"use client"

import { logInSchema } from "@/app/schemas/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function Login(){
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm({
      // herer resolver used for validation of the form data using zod schema 
      resolver: zodResolver(logInSchema),
      defaultValues:{
        email: "",
        password: "",
      }
    })
  
  function onSubmit(data: z.infer<typeof logInSchema>){
    startTransition( async() => {
      await authClient.signIn.email({
        email: data.email,
        password: data.password,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged in successfully!");
            router.push("/");
          },
          onError: (error) => {
            toast.error(error.error.message);
          }
        }
      })
    })
  }

  return(
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Log In</CardTitle>
        <CardDescription>Welcome back! Please enter your credentials to log in.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} >
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({field, fieldState}) => (
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input aria-invalid={fieldState.invalid} type="email" placeholder="example@email.com" {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({field, fieldState}) => (
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input aria-invalid={fieldState.invalid} type="password" placeholder="********" {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button disabled={isPending} className="text-white">
              {isPending ? 
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Loading...</span>
                </> 
                : (
                  <span >Log In</span>
              )}
            </Button> 
            
            <Link href="/auth/sign-up" className="text-sm ">
              Dont have an account? <span className="text-primary">Sign up</span> 
            </Link>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}