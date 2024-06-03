import type { APIRoute } from "astro";
import { db, Comment } from "astro:db";
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const { authorId, comment } = data;

  // if (!authorId) {
  //     return new Response(null, {
  //         status: 403,
  //         statusText:
  //             "You do not have access to make this request. Please authenticate and try again.",
  //     });
  // }

  if (!comment) {
    return new Response(null, {
      status: 400,
      statusText: "No comment submitted",
    });
  } else {
    await db.insert(Comment).values({ comment });
    return new Response(null, {
      status: 200,
      statusText: "OK",
    });
  }
};
