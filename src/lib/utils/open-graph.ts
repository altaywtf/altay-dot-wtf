import { APP_URL } from "@/config/constants";

// TODO: Replace with dynamic OG image generation in Astro v2
const OG_IMAGE_URL = `${APP_URL}/images/meta-bg.png`;

type OGImageParams = {
  title?: string;
  [key: string]: string | undefined;
};

export const getOpenGraphImage = (params: OGImageParams) => {
  return {
    alt: params?.title || "altay.wtf",
    url: OG_IMAGE_URL,
  };
};
