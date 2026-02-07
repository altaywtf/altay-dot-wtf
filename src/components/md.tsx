import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export function Markdown({ children }: { children: string }) {
  return (
    <article className="prose prose-neutral leading-normal dark:prose-invert prose-headings:mb-1 prose-img:m-auto prose-img:rounded-sm prose-hr:my-8 prose-hr:bg-neutral-800 prose-hr:h-px prose-hr:border-0 prose-a:text-amber-400 prose-a:no-underline prose-a:hover:underline">
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
            rehypePlugins: [
              rehypeSlug,
              [rehypePrettyCode, { theme: "dark-plus" }],
            ],
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </article>
  );
}
