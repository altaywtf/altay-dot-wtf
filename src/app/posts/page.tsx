import type { Post } from "@/lib/posts";

import { API_URL, postsCopy } from "@/config";
import { getOpenGraphImage } from "@/lib/utils/openGraph";
import ArtificialBackButton from "@/ui/ArtificialBackButton";
import Page from "@/ui/Page";
import type { Metadata } from "next";
import Link from "next/link";

import { PostDateAndReadingTime } from "./components/PostDateAndReadingTime";

const fetchData = (): Promise<{ posts: Post[] }> =>
  fetch(`${API_URL}/posts`).then((res) => res.json());

export const generateMetadata = async (): Promise<Metadata> => ({
  openGraph: {
    images: getOpenGraphImage({
      title: postsCopy.title,
      type: "page",
    }),
    title: postsCopy.title,
  },
  title: postsCopy.title,
});

const PostsPage = async () => {
  const { posts } = await fetchData();

  return (
    <>
      <div className="mb-6">
        <ArtificialBackButton href="/" label="altay.wtf" />
      </div>

      <Page header={postsCopy}>
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <div className="flex flex-col gap-1" key={post.slug}>
              <div>
                <Link
                  className="font-medium text-amber-400 hover:text-amber-200"
                  href={`/blog/${post.slug}`}
                >
                  {post.title}
                </Link>
              </div>

              <p>{post.oneliner}</p>

              <div className="text-sm">
                <PostDateAndReadingTime post={post} />
              </div>
            </div>
          ))}
        </div>
      </Page>
    </>
  );
};

export default PostsPage;
