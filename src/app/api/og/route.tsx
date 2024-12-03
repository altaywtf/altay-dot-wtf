import { OpenGraphImage } from "@/lib/og/OpenGraphImage";
import type { Book, Page, ParsedQuery, Post } from "@/lib/og/types";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const loadFont = async () => {
  const url = new URL(
    "../../fonts/GT-America-Standard-Bold.ttf",
    import.meta.url,
  );

  return (await fetch(url)).arrayBuffer();
};

const parseRequest = (request: NextRequest): ParsedQuery => {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") as ParsedQuery["type"];

  switch (type) {
    case "post":
      return {
        oneliner: searchParams.get("oneliner") as Post["oneliner"],
        title: searchParams.get("title") as Post["title"],
        type,
      };

    case "book":
      return {
        author: searchParams.get("author") as Book["author"],
        coverImagePath: searchParams.get(
          "coverImagePath",
        ) as Book["coverImagePath"],
        title: searchParams.get("title") as Book["title"],
        type,
      };

    case "page":
      return {
        title: searchParams.get("title") as Page["title"],
        type,
      };
  }
};

export const GET = async (req: NextRequest) => {
  const query = parseRequest(req);
  const fontData = await loadFont();

  return new ImageResponse(<OpenGraphImage query={query} />, {
    fonts: [
      {
        data: fontData,
        name: "GT-America-Standard-Bold",
        style: "normal",
      },
    ],
    height: 686,
    width: 1200,
  });
};
