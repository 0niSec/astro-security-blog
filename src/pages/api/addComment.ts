import type { APIRoute } from "astro";
import { db, Comment } from "astro:db";
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const { user, comment } = data;

  // If the user isn't passed in the form POST then return a 403
  if (!user) {
    return new Response(null, {
      status: 403,
      statusText:
        "You do not have access to make this request. Please authenticate and try again.",
    });
  }

  // This shouldn't really happen but if somehow the form is submitted without a comment then return a 400
  if (!comment) {
    return new Response(null, {
      status: 400,
      statusText: "No comment submitted",
    });
  } else {
    await db.insert(Comment).values({ user, comment });
    return new Response(null, {
      status: 200,
      statusText: "OK",
    });
  }
};
