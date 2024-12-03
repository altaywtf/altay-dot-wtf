import { BackButton } from "@/components/back-button";
import { Backlinks } from "@/components/backlinks";
import { Markdown } from "@/components/md";
import { postsCopy } from "@/config";
import { getPost } from "@/lib/posts";
import { getOpenGraphImage } from "@/lib/utils/open-graph";
import type { Metadata } from "next";
import { PostDateAndReadingTime } from "../../../components/post-date-and-reading-time";

type Props = {
  params: { slug: string };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
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

export default async function Page({ params }: Props) {
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
