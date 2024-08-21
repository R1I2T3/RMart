import { v2 as cloudinary } from "cloudinary";
import { env } from "@/env";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_secret: env.CLOUDINARY_API_SECRET,
  api_key: env.CLOUDINARY_API_KEY,
});

export const fileUpload = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  const imageUrl = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, function (error, result) {
        if (error) {
          reject(error);
          return;
        }
        resolve(result?.secure_url);
      })
      .end(buffer);
  });
  return imageUrl;
};

export const deleteFile = async (uri: string) => {
  await cloudinary.uploader.destroy(
    uri.split("/").pop()?.split(".")[0] as string
  );
};
