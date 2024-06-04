import { NOW, column, defineTable, isNotNull } from "astro:db";
import { defineDb } from "astro:db";

const User = defineTable({
  columns: {
    name: column.text(),
  },
});

const Comment = defineTable({
  columns: {
    user: column.text(),
    comment: column.text(),
    date: column.date({ default: NOW }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { User, Comment },
});
