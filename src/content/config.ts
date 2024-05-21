import { defineCollection, z } from "astro:content";

const DIFFICULTY = ["Easy", "Medium", "Hard", "Insane"] as const;
const OS = ["Windows", "Linux"] as const;

export const collections = {
    writeup: defineCollection({
        type: "content",
        schema: z.object({
            title: z.string(),
            topics: z.array(z.string()), // A tag listing of the types of topics
            description: z.string(),
            pubDate: z.coerce.date(),
            updatedDate: z.coerce.date().optional(),
            heroImage: z.string().optional(),
            difficulty: z.enum(DIFFICULTY),
            os: z.enum(OS),
            isActive: z.boolean(),
        }),
    }),
};
