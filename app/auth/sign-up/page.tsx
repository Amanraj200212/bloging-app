"use client"

import { signUpSchema } from "@/app/schemas/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel,  } from "@/components/ui/field";
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


export default function SignUp(){
  // here i make pending state by using useTransition hook that load ui in background while signing process
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm({
    // herer resolver used for validation of the form data using zod schema 
    resolver: zodResolver(signUpSchema),
    defaultValues:{
      name: "",
      email: "",
      password: "",
    }
  })

  function onSubmit(data: z.infer<typeof signUpSchema>){
    // here i wrap the sign up process in startTransition ,while the sign up process is happening in the background.

    startTransition (async () => {
      await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
  
        fetchOptions: {
          onSuccess: () => {
            toast.success("Account created successfully!");
            router.replace("/");
            router.refresh();
          },
          onError: (error) => {
            toast.error(error.error.message);
          }
        }
      })
    })
  }

  return(
    <Card >
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create a new account to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-y-4">
            <Controller
              name="name"
              control={form.control}
              render={({field, fieldState}) => (
                <Field>
                  <FieldLabel>Full Name</FieldLabel>
                  <Input aria-invalid={fieldState.invalid} placeholder="Enter your name" {...field}/>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({field, fieldState}) => (
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input aria-invalid={fieldState.invalid} type="email" placeholder="example@email.com" {...field}/>
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
                  <span>Creating...</span>
                </> 
                : (
                  <span>Sign Up</span>
              )}
            </Button> 

          <Link href="/auth/login" className="text-sm ">
              Already have an account? <span className="text-primary">Log In</span> 
          </Link>

          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
