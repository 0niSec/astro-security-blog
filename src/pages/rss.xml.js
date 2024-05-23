import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context) {
    const writeups = await getCollection("writeup");
    return rss({
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        site: context.site,
        items: writeups.map((writeup) => ({
            ...writeup.data,
            link: `/blog/writeups/${writeup.slug}/`,
        })),
    });
}
