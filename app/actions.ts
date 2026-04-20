"use server"

import z from "zod";
import { postSchema } from "./schemas/blog";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";
import { revalidatePath, updateTag } from "next/cache";

// we have also to validate the data on the server side after validate from client side mutation
export async function createBlogAction(values: z.infer<typeof postSchema>){

  try {
    const parsed = postSchema.safeParse(values);
    if(!parsed.success){
      throw new Error("Something went wrong")
    }
  
    //use token for check user authenticated or not then create blog post
    const token = await getToken();

    //for uploading image to server that comes from from client side
    const imageUrl = await fetchMutation(
      api.posts.generateImageUploadUrl,
      {},
      { token }
    );

    const uploadResult = await fetch(imageUrl,{
      method: "POST",
      headers:{
        "Content-Type": parsed.data.image.type 
      },
      body: parsed.data.image
    });

    if(!uploadResult.ok){
      return {
        error: "Failed to upload image",
      };
    }

    const  {storageId} = await uploadResult.json();

    //for upalodng posts to server that comes from client side by create page form
    await fetchMutation(
      api.posts.createPost,
      {
        body: parsed.data.content,
        title: parsed.data.title,
        imageStorageId: storageId,
      },
      {
        token,
      }
    ); 
  } catch {
      return {
        error: "Failed to create Post",
      };
    }
    
  //make blog cache ( check blog page  )
  updateTag("blog");
  // revalidatePath("/blog");
  
  return redirect("/blog");
}