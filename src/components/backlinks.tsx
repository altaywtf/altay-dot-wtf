import Link from "next/link";
import { Suspense } from "react";
import { getBacklinks } from "@/lib/backlinks";
import { BacklinkScroller } from "./backlink-scroller";

const BACKLINK_SOURCE_QUERY_PARAM = "backlinkSource";

export const Backlinks: React.FC<{
  path: string;
}> = ({ path }) => {
  const backlinks = getBacklinks(path);

  return (
    <>
      <Suspense fallback={null}>
        <BacklinkScroller
          backlinkSourceQueryParam={BACKLINK_SOURCE_QUERY_PARAM}
        />
      </Suspense>

      {backlinks.length > 0 && (
        <div className="flex flex-col gap-2 rounded-sm bg-neutral-900 p-4">
          <h4 className="text-sm font-semibold">Backlinks</h4>

          <ul className="list-outside list-disc pl-4 space-y-1">
            {backlinks.map((backlink) => (
              <li key={backlink.path} className="text-sm">
                <Link
                  className="hover:underline"
                  href={`${backlink.path}?${BACKLINK_SOURCE_QUERY_PARAM}=${path}`}
                >
                  {backlink.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
