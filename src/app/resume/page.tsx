import type { Metadata } from "next";
import { Markdown } from "@/components/md";
import { readMarkdownFile } from "@/lib/utils/md";
import { getOpenGraphImage } from "@/lib/utils/open-graph";

export const generateMetadata = async (): Promise<Metadata> => ({
  openGraph: {
    images: getOpenGraphImage({
      title: "My Resume",
      type: "page",
    }),
  },
  title: "Resume",
});

export default function ResumePage() {
  return (
    <section className="px-4 py-8 print:invert sm:px-0">
      <Markdown>{readMarkdownFile("resume.md")}</Markdown>
    </section>
  );
}
