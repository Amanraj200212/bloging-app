import { ConvexError, v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { authComponent } from "./auth"


// #1 for create comment to convex database
export const createComment = mutation({
  //here we need only two things from client their comment and on postId
  args: {
    postId: v.id("posts"),
    body: v.string(),
  },
  handler : async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if(!user) {
      throw new ConvexError("Not Authenticated")
    }

    const comment = await ctx.db.insert("comments", {
      postId: args.postId,
      body: args.body,
      authorId: user._id,
      authorName: user.name,
    })

    return comment;
  }
})


//#2 for get comment
export const getCommentByPostId = query({
  args: {
    postId: v.id("posts")
  },
  handler: async (ctx, args) => {
    const data = await ctx.db.query("comments")
      .filter((q) => q.eq(q.field("postId"), args.postId))
      .order("desc")
      .collect();

    return data;
  }
}) 