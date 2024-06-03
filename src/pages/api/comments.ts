import type { APIRoute } from "astro";
import { db, Comment } from "astro:db";

export const GET: APIRoute = async () => {
    const comments = await db.select().from(Comment);

    return new Response(JSON.stringify(comments), {
        status: 200,
        statusText: "OK",
    });
};
