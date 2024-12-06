import rehypeShiki from "@shikijs/rehype";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export function Markdown({ children }: { children: string }) {
  return (
    <article className="prose prose-neutral leading-normal dark:prose-invert prose-headings:mb-1 prose-img:m-auto prose-img:rounded prose-hr:my-8 prose-hr:bg-neutral-800 prose-hr:h-px prose-hr:border-0">
      <MDXRemote
        source={children}
        components={{
          a: (props) => {
            const href = props.href;

            if (href?.startsWith("/")) {
              return (
                <Link href={href} {...props}>
                  {props.children}
                </Link>
              );
            }

            if (href?.startsWith("#")) {
              return <a {...props} />;
            }

            return <a target="_blank" rel="noopener noreferrer" {...props} />;
          },
        }}
        options={{
          mdxOptions: {
            rehypePlugins: [rehypeSlug, [rehypeShiki, { theme: "dark-plus" }]],
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </article>
  );
}
