import { API_URL, postsCopy } from "@/config";
import { getOpenGraphImage } from "@/lib/utils/openGraph";
import ArtificialBackButton from "@/ui/ArtificialBackButton";
import Backlinks from "@/ui/Backlinks";
import Markdown from "@/ui/Markdown";
import type { Metadata } from "next";

import { PostDateAndReadingTime } from "../components/PostDateAndReadingTime";

type Props = {
  params: { slug: string };
};

const fetchData = async (slug: string) => {
  const { markdown, post } = await fetch(`${API_URL}/posts/${slug}`).then(
    (res) => res.json(),
  );
  const { backlinks } = await fetch(
    `${API_URL}/backlinks?type=posts&slug=${slug}`,
  ).then((res) => res.json());

  return {
    backlinks,
    markdown,
    post,
  };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { post } = await fetchData(params.slug);

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

const Page = async ({ params }: Props) => {
  const { backlinks, markdown, post } = await fetchData(params.slug);

  return (
    <div className="flex flex-col gap-6">
      <ArtificialBackButton href="/posts" label={postsCopy.title} />

      <div className="flex flex-col gap-2">
        <h1>{post.title}</h1>
        <PostDateAndReadingTime post={post} />
      </div>

      <Markdown>{markdown}</Markdown>

      <Backlinks backlinks={backlinks} sourceType="post" sourceURL={post.url} />
    </div>
  );
};

export default Page;
