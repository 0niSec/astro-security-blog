import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const ADMIN_EMAIL = import.meta.env.ADMIN_EMAIL;
const DESTINATION_EMAIL = import.meta.env.DESTINATION_EMAIL;

export const POST: APIRoute = async ({ params, request }) => {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
        return new Response(null, {
            status: 404,
            statusText:
                "Please check all items and make sure all are filled out prior to sending.",
        });
    }

    const send = await resend.emails.send({
        from: ADMIN_EMAIL,
        to: [DESTINATION_EMAIL],
        subject: `Contact Form: ${subject}`,
        html: message,
    });

    if (send.data) {
        return new Response(
            JSON.stringify({
                message: send.data,
            }),
            {
                status: 200,
                statusText: "OK",
            },
        );
    } else {
        return new Response(
            JSON.stringify({
                message: send.error,
            }),
            {
                status: 500,
                statusText: "Internal Server Error",
            },
        );
    }
};
