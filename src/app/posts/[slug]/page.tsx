import type { Metadata } from "next";
import { BackButton } from "@/components/back-button";
import { Backlinks } from "@/components/backlinks";
import { Markdown } from "@/components/md";
import { PostDateAndReadingTime } from "@/components/post-date-and-reading-time";
import { postsCopy } from "@/config/copy";
import { getPost, getPosts } from "@/lib/posts";
import { getOpenGraphImage } from "@/lib/utils/open-graph";

type Props = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = async () => {
  return getPosts().map((post) => ({ slug: post.slug }));
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;
  const { post } = getPost(params.slug);

  return {
    description: post.oneliner,
    openGraph: {
      authors: ["altaywtf"],
      description: post.oneliner,
      images: getOpenGraphImage({
        oneliner: post.oneliner,
        title: post.title,
        type: "post",
      }),
      modifiedTime: post.date,
      title: post.title,
      type: "article",
    },
    title: post.title,
  };
};

export default async function Page(props: Props) {
  const params = await props.params;
  const { post, markdown } = getPost(params.slug);

  return (
    <div className="flex flex-col gap-6">
      <BackButton href="/posts" label={postsCopy.title} />

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">{post.title}</h1>
        <PostDateAndReadingTime post={post} />
      </div>

      <Markdown>{markdown}</Markdown>

      <Backlinks path={post.path} />
    </div>
  );
}
