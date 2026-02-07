import type { APIRoute, GetStaticPaths } from "astro";
import fs from "node:fs";
import { join } from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { getPosts } from "@/lib/posts";
import { getBooks } from "@/lib/books";
import { getDictionaryEntries } from "@/lib/dictionary";

const SITE_TITLE = "altay.wtf";

const fontPath = join(process.cwd(), "src/fonts/Inter-Bold.ttf");
const fontData = fs.readFileSync(fontPath);

export const getStaticPaths: GetStaticPaths = () => {
  const posts = getPosts();
  const books = getBooks();
  const dictEntries = getDictionaryEntries();

  const paths = [
    { params: { slug: "index" }, props: { title: SITE_TITLE } },
    { params: { slug: "resume" }, props: { title: "Resume" } },
    { params: { slug: "posts" }, props: { title: "Writing" } },
    { params: { slug: "books" }, props: { title: "Book notes" } },
    { params: { slug: "dictionary" }, props: { title: "Dictionary" } },
    ...posts.map((post) => ({
      params: { slug: `posts/${post.slug}` },
      props: { title: post.title },
    })),
    ...books.map((book) => ({
      params: { slug: `books/${book.slug}` },
      props: { title: `${book.title} by ${book.authors.join(", ")}` },
    })),
    ...dictEntries.map((entry) => ({
      params: { slug: `dictionary/${entry.slug}` },
      props: { title: entry.title },
    })),
  ];

  return paths;
};

export const GET: APIRoute = async ({ props }) => {
  const { title } = props as { title: string };

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          backgroundColor: "#0a0a0a",
          fontFamily: "Inter",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "48px",
                      fontWeight: 700,
                      color: "#e5e5e5",
                      lineHeight: 1.2,
                      maxWidth: "900px",
                    },
                    children: title,
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "24px",
                      color: "#fbbf24",
                    },
                    children: SITE_TITLE,
                  },
                },
              ],
            },
          },
        ],
      },
    } as any,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: 1200 },
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return new Response(new Uint8Array(pngBuffer), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
