import type { APIContext, APIRoute } from "astro";
import { Resend } from "resend";
export const prerender = false;
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
        to: DESTINATION_EMAIL,
        subject: `Contact Form: ${subject}`,
        html: `<b>It works!</b><p>${message}</p>`,
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

// export async function POST(context: APIContext): Promise<Response> {
//     // Parse form data
//     const formData = context.request.formData();
//     const name = (await formData).get("name");
//     const email = (await formData).get("email");
//     const subject = (await formData).get("subject");
//     const message = (await formData).get("message");

//     // Validate form data
//     if (!name || !email || !subject || !message) {
//         return new Response(null, {
//             status: 404,
//             statusText:
//                 "Please check all items and make sure all are filled out prior to sending.",
//         });
//     }

//     // Send the email
//     const emailSent = await sendContactEmail(
//         name as string,
//         email as string,
//         subject as string,
//         message as string,
//     );

//     if (!emailSent) {
//         return new Response("Failed to send email", { status: 500 });
//     }

//     return context.redirect("/contact");
// }

// export async function sendContactEmail(
//     name: string,
//     email: string,
//     subject: string,
//     message: string,
// ): Promise<boolean> {
//     try {
//         const send = await resend.emails.send({
//             from: ADMIN_EMAIL,
//             to: DESTINATION_EMAIL,
//             subject: `0nisec Blog - ${subject}`,
//             html: `
//             <style>
//             p {
//                 margin: 0
//                 padding: 0
//             }
//             </style>
//             <h2>0niSec Blog - ${subject}</h2>
//             <p>From: ${name}</p>
//             <p>Email: ${email}</p>
//             <p>${message}</p>
//             `,
//             text: message,
//         });

//         if (!send.data) {
//             console.error(send.error);
//             return false;
//         }

//         return true;
//     } catch (error) {
//         console.error(error);
//         return false;
//     }
// }
