import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { projectId, prompt, formData } = req.body;

    const generatedImage = {
      user: projectId,
      model: "gpt-image-1",
      image: formData.images,
      prompt,
      quality: "high",
      size: formData.imageSize,
    };

    res.status(200).json(generatedImage);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
