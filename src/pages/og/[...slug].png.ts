import type { APIRoute, GetStaticPaths } from "astro";
import fs from "node:fs";
import { join } from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { getPosts } from "@/lib/posts";
import { getBooks } from "@/lib/books";
import { getDictionaryEntries } from "@/lib/dictionary";

const SITE_TITLE = "altay.wtf";
const WIDTH = 1200;
const HEIGHT = 686;

const fontPath = join(process.cwd(), "src/fonts/Inter-Bold.ttf");
const fontData = fs.readFileSync(fontPath);

function toDataUrl(filePath: string): string | null {
  try {
    const data = fs.readFileSync(filePath);
    const ext = filePath.endsWith(".png") ? "png" : "jpeg";
    return `data:image/${ext};base64,${data.toString("base64")}`;
  } catch {
    return null;
  }
}

const bgDataUrl = toDataUrl(join(process.cwd(), "public/images/meta-bg.png"))!;
const avatarDataUrl = toDataUrl(join(process.cwd(), "public/images/avatar.png"))!;

type OgProps = {
  title: string;
  type: "post" | "book" | "page";
  subtitle?: string;
  authors?: string;
  coverImageDataUrl?: string | null;
};

export const getStaticPaths: GetStaticPaths = () => {
  const posts = getPosts();
  const books = getBooks();
  const dictEntries = getDictionaryEntries();

  const paths = [
    { params: { slug: "index" }, props: { title: SITE_TITLE, type: "page" } },
    { params: { slug: "resume" }, props: { title: "Resume", type: "page" } },
    { params: { slug: "posts" }, props: { title: "Writing", type: "page" } },
    { params: { slug: "books" }, props: { title: "Book notes", type: "page" } },
    { params: { slug: "dictionary" }, props: { title: "Dictionary", type: "page" } },
    ...posts.map((post) => ({
      params: { slug: `posts/${post.slug}` },
      props: {
        title: post.title,
        type: "post" as const,
        subtitle: post.oneliner,
      },
    })),
    ...books.map((book) => ({
      params: { slug: `books/${book.slug}` },
      props: {
        title: book.title,
        type: "book" as const,
        authors: book.authors.join(", "),
        coverImageDataUrl: toDataUrl(
          join(process.cwd(), `public/images/books/${book.slug}/cover.png`),
        ),
      },
    })),
    ...dictEntries.map((entry) => ({
      params: { slug: `dictionary/${entry.slug}` },
      props: { title: entry.title, type: "page" as const },
    })),
  ];

  return paths;
};

function buildHeader() {
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "20px",
      },
      children: [
        {
          type: "img",
          props: {
            src: avatarDataUrl,
            width: 120,
            height: 120,
            style: {
              borderRadius: "50%",
              border: "3px solid #525252",
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              fontSize: "3rem",
              color: "#e5e5e5",
            },
            children: SITE_TITLE,
          },
        },
      ],
    },
  };
}

function buildPostContent(title: string, subtitle?: string) {
  const children: any[] = [
    {
      type: "div",
      props: {
        style: { fontSize: "5rem", color: "#e5e5e5", lineHeight: 1.1 },
        children: title,
      },
    },
  ];

  if (subtitle) {
    children.push({
      type: "div",
      props: {
        style: { fontSize: "4rem", color: "#a1a1a1", lineHeight: 1.1 },
        children: subtitle,
      },
    });
  }

  return {
    type: "div",
    props: {
      style: { display: "flex", flexDirection: "column", gap: "16px" },
      children,
    },
  };
}

function buildBookContent(title: string, authors?: string, coverImageDataUrl?: string | null) {
  const textChildren: any[] = [
    {
      type: "div",
      props: {
        style: { fontSize: "5rem", color: "#e5e5e5", lineHeight: 1.1 },
        children: title,
      },
    },
  ];

  if (authors) {
    textChildren.push({
      type: "div",
      props: {
        style: { fontSize: "4rem", color: "#a1a1a1", lineHeight: 1.1 },
        children: `by ${authors}`,
      },
    });
  }

  const rowChildren: any[] = [
    {
      type: "div",
      props: {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          flex: 1,
        },
        children: textChildren,
      },
    },
  ];

  if (coverImageDataUrl) {
    rowChildren.push({
      type: "img",
      props: {
        src: coverImageDataUrl,
        height: 400,
        style: {
          borderRadius: "8px",
          border: "2px solid #404040",
          objectFit: "contain",
        },
      },
    });
  }

  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "40px",
        flex: 1,
      },
      children: rowChildren,
    },
  };
}

function buildPageContent(title: string) {
  return {
    type: "div",
    props: {
      style: { fontSize: "5rem", color: "#e5e5e5", lineHeight: 1.1 },
      children: title,
    },
  };
}

function buildOgImage(props: OgProps) {
  let content: any;
  if (props.type === "post") {
    content = buildPostContent(props.title, props.subtitle);
  } else if (props.type === "book") {
    content = buildBookContent(props.title, props.authors, props.coverImageDataUrl);
  } else {
    content = buildPageContent(props.title);
  }

  return {
    type: "div",
    props: {
      style: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px 80px",
        fontFamily: "Inter",
        color: "#e5e5e5",
        backgroundImage: `url(${bgDataUrl})`,
        backgroundSize: "1200px 686px",
      },
      children: [buildHeader(), content],
    },
  };
}

export const GET: APIRoute = async ({ props }) => {
  const ogProps = props as OgProps;

  const svg = await satori(buildOgImage(ogProps) as any, {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      {
        name: "Inter",
        data: fontData,
        weight: 700,
        style: "normal",
      },
    ],
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: WIDTH },
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
