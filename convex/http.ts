import { httpRouter } from "convex/server";
import { authComponent, createAuth } from "./auth";

const http = httpRouter();

authComponent.registerRoutes(http, createAuth);

export default http;

//this comes from convex-better-auth doc, it sets up the http routes for authentication using the auth component and createAuth function.