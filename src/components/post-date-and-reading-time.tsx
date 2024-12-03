import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/utils/date";

export const PostDateAndReadingTime = ({ post }: { post: Post }) => (
  <div className="flex flex-row gap-1 text-neutral-400">
    {formatDate(post.date)}
    <span>·</span>
    {post.readingTime}
  </div>
);
