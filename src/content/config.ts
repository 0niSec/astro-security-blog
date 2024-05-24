import { defineCollection, z } from "astro:content";

const DIFFICULTY = ["Easy", "Medium", "Hard", "Insane"] as const;
const OS = ["Windows", "Linux"] as const;

export const collections = {
    writeup: defineCollection({
        type: "content",
        schema: ({ image }) =>
            z.object({
                title: z.string(),
                topics: z.array(z.string()), // A tag listing of the types of topics
                description: z.string(),
                pubDate: z.coerce.date(),
                updatedDate: z.coerce.date().optional(),
                heroImage: image().refine((img) => img.width >= 720, {
                    message: "Hero image must be at least 1080px wide",
                }),
                heroAlt: z.string(),
                difficulty: z.enum(DIFFICULTY),
                os: z.enum(OS),
                isActive: z.boolean(),
            }),
    }),
};
