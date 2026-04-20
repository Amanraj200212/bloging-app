// after createing table by using schema.ts then we mutataion(create,edit remove ....) our data to database

import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";
import { Doc } from "./_generated/dataModel";

//#1 for creating post this is called convex function or server function
export const createPost = mutation({

  // arg= arguments thats comes from clients side(shcema) and aslo define thier types
  args:{ 
    title: v.string(), 
    body: v.string(), 
    imageStorageId: v.id("_storage")
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if(!user) {
      throw new ConvexError("Not Authenticated");
    }

    const blogArticle = await ctx.db.insert("posts", {
      title: args.title, 
      body: args.body,
      authorId: user._id,
      imageStorageId: args.imageStorageId,
    })

    return blogArticle;
  },
});

//#2 [queries Docs] , this is for fetching data from convex data
export const getPosts = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db
      .query("posts")
      .order("desc")
      .collect();

      //[Generating file URLs in queries] docs for genrate images url after creatiing theri storage id ....
    return await Promise.all(
      posts.map( async (post) => {
        
        //for getting image url
        const resolvedImageUrl = post.imageStorageId !==  undefined ? await ctx.storage.getUrl(post.imageStorageId) : null ;

        return {
          ...post,
          imageUrl: resolvedImageUrl,
        }
      })
    )
  }
});


//here we create imageurl for uplaoding image to our convex by ["uplaod file storage doc convex"]
export const generateImageUploadUrl = mutation({
  args: {},
  handler: async(ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if(!user) {
      throw new ConvexError("Not Authenticated")
    }

    return await ctx.storage.generateUploadUrl()
  }
});


// get individual post by thier PostIds
export const getPostById = query({
  args: {
    postId: v.id("posts")
  },
  handler: async( ctx, args) => {
    const post = await ctx.db.get(args.postId);

    //here we get image url
    const resolvedImageUrl = post?.imageStorageId !== undefined ? await ctx.storage.getUrl(post.imageStorageId) : null;
    
    return {
      ...post,
      imageUrl: resolvedImageUrl
    }
  },

});


//searching post by postid in posts table
interface searchResultsTypes{
  _id: string;
  title: string;
  body: string;
}

export const searchPosts = query({
  args: {
    userSearchTerm: v.string(),
    limit: v.number(),
  },
  handler: async(ctx, args) => {
    const limit = args.limit;

    const results: Array<searchResultsTypes> = [];

    //for avoid duplicacy [already seen blog not come again] ,match in title or body match so we check post._id
    const seen = new Set();

    const pushDocs = async (docs: Array<Doc<"posts">>) => {
      for(const doc of docs) {
        if(seen.has(doc._id)) continue;

        seen.add(doc._id);
        results.push({
          _id: doc._id,
          title: doc.title,
          body: doc.body,
        });
        if(results.length >= limit) break;
      }
    };

    const titleMatches = await ctx.db
      .query("posts")
      .withSearchIndex("search_title",(q) => q.search('title', args.userSearchTerm))
      .take(limit);

    await pushDocs(titleMatches);

    if(results.length < limit){
      const bodyMatches = await ctx.db
        .query("posts")
        .withSearchIndex("search_body", (q) => q.search("body", args.userSearchTerm))
        .take(limit);

      await pushDocs(bodyMatches);
    }

    return results;
  },
})