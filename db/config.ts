import { column, defineTable, isNotNull } from "astro:db";
import { defineDb } from "astro:db";

// const Author = defineTable({
//     columns: {
//         id: column.number({ primaryKey: true }),
//         name: column.text(),
//     },
// });

const Comment = defineTable({
    columns: {
        // authorId: column.number({ references: () => Author.columns.id }),
        comment: column.text(),
    },
});

// https://astro.build/db/config
export default defineDb({
    tables: { Comment },
});
