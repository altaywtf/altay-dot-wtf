"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const useScrollToBacklinkSource = (backlinkSourceQueryParam: string) => {
  const query = useSearchParams();
  const source = query.get(backlinkSourceQueryParam);

  useEffect(() => {
    if (source && typeof source === "string") {
      const anchors = document.querySelectorAll("a");

      for (let i = 0; i < anchors.length; i++) {
        const anchor = anchors[i];

        if (anchor.href.includes(source)) {
          anchor.scrollIntoView({ behavior: "smooth", block: "center" });
          anchor.classList.add("scrolled-source-link");
          break;
        }
      }
    }
  }, [source]);
};

export const BacklinkScroller = (props: {
  backlinkSourceQueryParam: string;
}) => {
  useScrollToBacklinkSource(props.backlinkSourceQueryParam);
  return null;
};
