import { getBacklinks } from "@/lib/backlinks";
import Link from "next/link";
import { BacklinkScroller } from "./backlink-scroller";

const BACKLINK_SOURCE_QUERY_PARAM = "backlinkSource";

export const Backlinks: React.FC<{
  path: string;
}> = ({ path }) => {
  const backlinks = getBacklinks(path);

  return (
    <>
      <BacklinkScroller
        backlinkSourceQueryParam={BACKLINK_SOURCE_QUERY_PARAM}
      />

      {backlinks.length > 0 && (
        <div className="flex flex-col gap-2 rounded bg-neutral-900 p-4">
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
