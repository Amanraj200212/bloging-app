// that is used for creating schema for our blog post that goinh to store in convex database by name of "POSTS"

import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

//this is for post when ever we need another data then we define here
export default defineSchema({
  posts: defineTable({
    title:  v.string(),
    body: v.string(),
    authorId: v.string(),
    // for image upload
    imageStorageId: v.optional(v.id("_storage")),
  })
  
    //for making to search our blog
    .searchIndex("search_title", {
      searchField: "title",
  })
    .searchIndex("search_body", {
      searchField: "body",
  }),
  
  //create new table for comment
  comments: defineTable({
    postId: v.id("posts"),
    authorId: v.string(),
    authorName: v.string(),
    body: v.string(),
  }),

  
})