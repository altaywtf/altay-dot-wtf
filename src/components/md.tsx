"use client";

import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import slug from "remark-slug";

import { MDCodeBlock } from "./md-code-block";
import { MDLink } from "./md-link";

export const Markdown: React.FC<{ children: string }> = ({ children }) => (
  <article className="prose prose-neutral leading-normal dark:prose-invert prose-headings:mb-1 prose-pre:m-0 prose-pre:p-0 prose-img:m-auto prose-img:rounded">
    <ReactMarkdown
      components={{
        a: (props) => <MDLink href={props.href || ""}>{props.children}</MDLink>,

        code: (props) => {
          const { children, className, inline, ...rest } = props;

          if (inline) {
            return (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          }

          return <MDCodeBlock {...props} />;
        },
      }}
      remarkPlugins={[slug, gfm]}
    >
      {children}
    </ReactMarkdown>
  </article>
);
