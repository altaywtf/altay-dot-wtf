import { getPlaiceholder } from "plaiceholder";
import sharp from "sharp";

type ImageData = {
  blurhash: string;
  buffer: Buffer;
  height: number;
  ratio: number;
  width: number;
};

export const getImageData = async (buffer: Buffer): Promise<ImageData> => {
  const { height, width } = await sharp(buffer).metadata();

  if (!width || !height) {
    throw new Error("Could not get image data");
  }

  const { base64 } = await getPlaiceholder(buffer);

  return {
    blurhash: base64,
    buffer,
    height,
    ratio: width / height,
    width,
  };
};
