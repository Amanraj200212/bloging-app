import { createAuthClient } from "better-auth/react";
import { convexClient } from "@convex-dev/better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [convexClient()],
});

//this comes from convex-better-auth doc, it creates an auth client that can be used in the app to handle authentication with convex.