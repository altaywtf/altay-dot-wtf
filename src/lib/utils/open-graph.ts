import { APP_URL } from "@/config/constants";

const OG_IMAGE_SERVICE_BASE_URL = `${APP_URL}/api/og`;

type OGImageParamsPost = {
  oneliner: string;
  title: string;
  type: "post";
};

type OGImageParamsBook = {
  author: string;
  coverImagePath: string;
  title: string;
  type: "book";
};

type OGImageParamsPage = {
  title: string;
  type: "page";
};

type OGImageParams = OGImageParamsBook | OGImageParamsPage | OGImageParamsPost;

export const getOpenGraphImage = (params: OGImageParams) => {
  const url = new URL(OG_IMAGE_SERVICE_BASE_URL);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  return {
    alt: params?.title || "",
    url,
  };
};
