import { Markdown } from "@/components/md";
import { readMarkdownFile } from "@/lib/utils/md";
import { getOpenGraphImage } from "@/lib/utils/open-graph";
import type { Metadata } from "next";

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
    <section className="px-4 py-8 print:invert sm:px-0 prose-hr:my-8 prose-hr:opacity-50">
      <Markdown>{readMarkdownFile("resume.md")}</Markdown>
    </section>
  );
}
