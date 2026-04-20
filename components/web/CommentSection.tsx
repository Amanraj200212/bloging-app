"use client"

import { Loader2, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "@/app/schemas/comment";
import z from "zod";
import { toast } from "sonner";
import { useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";


export function CommentSection(props: {preLoadedComments: Preloaded<typeof api.comments.getCommentByPostId>} ) {
  const params = useParams<{ postId: Id<"posts"> }>();

  // here we mutate comment data to server
  const createComment = useMutation(api.comments.createComment)

  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      body: "",
      postId: params.postId,
    }
  });

  const [isPending, startTransition] = useTransition();

  //we get preloadedcomment from postId page comment laod already and here we use prop to pass loadedcomments
  const commentData = usePreloadedQuery(props.preLoadedComments);

  function onSubmit(data: z.infer<typeof commentSchema>) {
    startTransition(async() => {
      try{
        await createComment(data);
        toast.success("comment post succesfully.");
        form.reset();
      } catch {
        toast.error("Failed to post comment !")
      }
    });
  }

  //laoding state
  if(commentData === undefined){
    return (
      <Card className="w-full">
        <CardHeader>
          <Skeleton className="h-4 w-2/3"/>
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full aspect-video"/>
        </CardContent>
      </Card>
    )
  }

   return(
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 border-b">
        <MessageSquare className="size-5"/>
        <h2 className="text-xl font-bold">{commentData?.length}</h2>
      </CardHeader>
      <CardContent className="space-y-8">
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)} >
          <Controller 
            name="body"
            control={form.control}
            render={({field, fieldState}) => (
              <Field>
                <FieldLabel>Your Name</FieldLabel>
                <Textarea aria-invalid={fieldState.invalid} placeholder="Share your thoughts..." {...field}/>
                {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
              </Field>
            )}
          />

          <Button variant="default" className="text-white" disabled={isPending}>
            {isPending ? <>
                <Loader2 className="animate-spin size-4" />
                <span>Posting...</span>
              </> : (
                <span>Comment</span>
              )
            }
          </Button>
        </form>

        {commentData?.length > 0 && <Separator className="h-px"/> }
        
        <section className="space-y-6 ">
            {commentData?.map((comment) => (
              <div key={comment._id} className="flex gap-4">
                <Avatar  className="size-10 shrink-0">
                  <AvatarImage  />
                  <AvatarFallback>
                    {comment.authorName
                      ?.trim()
                      .split(/\s+/)
                      .map(word => word[0])
                      .join("")
                      .toUpperCase()
                    }
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between"> 
                    <p className="font-semibold text-sm">{comment.authorName}</p>
                    <p className="text-muted-foreground text-xs">{new Date (comment._creationTime).toLocaleDateString("en-GB")}</p>
                  </div>

                  <p className="text-sm text-foreground/70 whitespace-pre-wrap">{comment.body}</p>
                </div>
              </div>
            ))}
        </section>
      </CardContent>
    </Card>
   )
}