import { put } from "@vercel/blob/client";

export const UploadVideo = async (blob: Blob) => {
  const filename = `user/transcript.txt`;
  const transcript = await put(filename, blob, {
    access: "public",
    handleUploadUrl: "/api/upload",
  });

  console.log("printing blob");
  console.log(transcript);

  return transcript;
};
