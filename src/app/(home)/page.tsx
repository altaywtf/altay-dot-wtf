import Image from "next/image";
import Link from "next/link";
import { Markdown } from "@/components/md";
import { booksCopy, homeCopy, postsCopy } from "@/config/copy";
import { readMarkdownFile } from "@/lib/utils/md";

type Project = {
  description: string;
  icon_url: string;
  title: string;
  url: string;
};

const COLLECTIONS: Array<Omit<Project, "icon_url">> = [
  {
    description: "What I've been doing",
    title: "Resume",
    url: "/resume",
  },
  {
    description: postsCopy.description,
    title: postsCopy.title,
    url: "/posts",
  },
  {
    description: booksCopy.description,
    title: booksCopy.title,
    url: "/books",
  },
];

export default async function HomePage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="relative h-28 w-28 overflow-hidden rounded-sm border border-solid border-neutral-800">
        <Image
          alt="avatar"
          fill
          sizes="100%"
          src="/images/avatar.png"
          quality={100}
        />
      </div>

      <div className="flex flex-col gap-4 -mt-2">
        <h1 className="text-xl font-semibold">{homeCopy.title}</h1>
        <Markdown>{readMarkdownFile("home.md")}</Markdown>
      </div>

      <hr className="bg-neutral-900 h-px border-0" />

      <div className="flex flex-col gap-6">
        {COLLECTIONS.map((item) => (
          <div key={item.title}>
            <div className="flex flex-row items-center gap-3">
              <div className="flex flex-1 flex-col">
                <Link
                  className="self-start font-medium text-amber-400 hover:text-amber-200"
                  href={item.url}
                >
                  {item.title}
                </Link>

                <p>{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr className="bg-neutral-900 h-px border-0" />

      <div className="text-sm text-neutral-400">
        <a
          className="hover:text-neutral-300 hover:underline"
          href="mailto:altay@hey.com"
        >
          altay@hey.com
        </a>
      </div>
    </div>
  );
}
