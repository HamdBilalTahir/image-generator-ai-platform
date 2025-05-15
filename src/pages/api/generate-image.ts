// pages/api/generate-image.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File as FmFile, Fields, Files } from 'formidable';
import fs from 'fs';
import OpenAI, { toFile } from 'openai';

export const config = {
  api: { bodyParser: false },
};

const client = new OpenAI();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  const form = formidable({ multiples: true, keepExtensions: true });
  form.parse(req, async (err, fields: Fields, files: Files) => {
    if (err) {
      console.error('Form parse error:', err);
      return res.status(500).json({ error: 'Failed to parse form data' });
    }

    // Helper to extract a single string
    const getStr = (v?: string | string[]): string =>
      Array.isArray(v) ? v[0] : (v ?? '');

    const projectId = getStr(fields.projectId);
    const prompt = getStr(fields.prompt);
    const imageSizeRaw = getStr(fields.imageSize);

    // Option B: validate imageSize against allowed values
    const allowedSizes = [
      '256x256',
      '512x512',
      '1024x1024',
      '1536x1024',
      '1024x1536',
      'auto',
    ] as const;
    type ImageSize = (typeof allowedSizes)[number];
    const size: ImageSize = allowedSizes.includes(imageSizeRaw as ImageSize)
      ? (imageSizeRaw as ImageSize)
      : '1024x1024';

    // Collect uploaded files under key "images"
    const raw = files.images;
    const uploaded: FmFile[] = !raw ? [] : Array.isArray(raw) ? raw : [raw];

    if (uploaded.length === 0) {
      return res
        .status(400)
        .json({ error: 'No files uploaded under key "images"' });
    }

    try {
      // Convert each temp file into a FileData for the SDK
      const imageFiles = await Promise.all(
        uploaded.map((file) =>
          toFile(
            fs.createReadStream(file.filepath),
            file.originalFilename ?? 'upload.png',
            { type: file.mimetype ?? 'image/png' }
          )
        )
      );

      // Call the Images Edit endpoint with an array of images
      const rsp = await client.images.edit({
        model: 'gpt-image-1',
        image: imageFiles,
        prompt,
        size,
        user: projectId,
        quality: 'high',
      });

      return res.status(200).json(rsp.data);
    } catch (e: any) {
      console.error('OpenAI call error:', e);
      return res.status(500).json({ error: e.message });
    }
  });
}
