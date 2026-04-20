import { convexBetterAuthNextJs } from "@convex-dev/better-auth/nextjs";

// this comes from convex-better-auth doc, it sets up the authentication handler and helper functions for the app to use in handling authentication with convex.
export const {
  handler,
  preloadAuthQuery,
  isAuthenticated,
  getToken,
  fetchAuthQuery,
  fetchAuthMutation,
  fetchAuthAction,
} = convexBetterAuthNextJs({
  convexUrl: process.env.NEXT_PUBLIC_CONVEX_URL!,
  convexSiteUrl: process.env.NEXT_PUBLIC_CONVEX_SITE_URL!,
});

