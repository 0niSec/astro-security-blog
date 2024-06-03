import type { APIRoute } from "astro";

export const prerender = false;

const GITHUB_CLIENT_ID = import.meta.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = import.meta.env.GITHUB_CLIENT_SECRET;

export const GET: APIRoute = async ({ request }) => {
    // 1. Create a URL object from the request
    const url = new URL(request.url);

    // 2. Get the search params
    const searchParams = url.searchParams;

    // 3. Get the code
    // https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#1-request-a-users-github-identity
    const code = searchParams.get("code");

    // 4. Get the access_token
    // https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#2-users-are-redirected-back-to-your-site-by-github
    if (code) {
        const res = await fetch(
            `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
            },
        );

        const data = await res.json();

        // The access token here
        const access_token = data.access_token;

        // Use the access_token to get the user "login"
        // https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28
        // const userRes = await fetch(`https://api.github.com/user`, {
        //     method: "GET",
        //     headers: {
        //         Accept: "application/json",
        //         Authorization: `Bearer ${access_token}`,
        //     },
        // });

        // const userData = await userRes.json();
        // const user = userData.login;

        // 5. Check for the access_token and redirect back to /guestbook
        // 6. Store the access_token in a cookie
        if (access_token) {
            return new Response(null, {
                status: 302,
                statusText: "Found",
                headers: {
                    "Set-Cookie": `access_token=${access_token}; Path=/guestbook`,
                    Location: "/guestbook",
                },
            });
        }
    } else {
        return new Response(null, {
            status: 401,
            statusText: "Unauthorized",
            headers: {
                Location: "/guestbook",
            },
        });
    }
};
