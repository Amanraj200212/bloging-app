import z from "zod";

// here we create blog schema for creating a blog post and validating the data that comes from the create blog form
export const postSchema = z.object({
  title: z.string().min(5).max(100),
  content: z.string().min(20),
  image: z.instanceof(File),
})