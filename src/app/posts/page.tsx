import type { Metadata } from "next";
import Link from "next/link";
import { BackButton } from "@/components/back-button";
import { Page } from "@/components/page";
import { postsCopy } from "@/config/copy";
import { getPosts } from "@/lib/posts";
import { getOpenGraphImage } from "@/lib/utils/open-graph";
import { PostDateAndReadingTime } from "../../components/post-date-and-reading-time";

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

export default async function PostsPage() {
  const posts = getPosts();

  return (
    <>
      <div className="mb-6">
        <BackButton />
      </div>

      <Page header={postsCopy}>
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <div className="flex flex-col gap-1" key={post.slug}>
              <div>
                <Link
                  className="font-medium text-amber-400 hover:text-amber-200"
                  href={post.path}
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
}
