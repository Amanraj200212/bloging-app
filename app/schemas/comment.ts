import { Id } from "@/convex/_generated/dataModel";
import z from "zod";

//here we create comment schema for comments & for validating data that comes from reack hook form

export const commentSchema = z.object({
  body: z.string().min(3),
  postId: z.custom<Id<"posts">>() //cuz we alrdy define id in comments.ts in convex folder
})