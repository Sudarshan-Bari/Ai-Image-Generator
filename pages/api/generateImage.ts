import path from 'path';
import fs from 'fs';
import axios, { AxiosError } from 'axios';
import FormData from 'form-data';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { prompt } = req.body;

      if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
        return res.status(400).json({ message: 'Prompt must be a non-empty string.' });
      }

      const payload = {
        prompt,
        output_format: 'webp',
      };

      const response = await axios.postForm(
        `https://api.stability.ai/v2beta/stable-image/generate/core`,
        axios.toFormData(payload, new FormData()),
        {
          validateStatus: undefined,
          responseType: 'arraybuffer',
          headers: {
            Authorization: `Bearer ${process.env.STABILITY_API_KEY}`, // Replace with your key
            Accept: 'image/*',
          },
        }
      );

      if (response.status === 200) {
        // Save the image to the `public` folder
        const fileName = `generated_${Date.now()}.webp`;
        const filePath = path.resolve('./public', fileName);
        fs.writeFileSync(filePath, Buffer.from(response.data));

        // Return the public URL
        const publicUrl = `/${fileName}`;
        return res.status(200).json({ imageUrl: publicUrl });
      } else {
        throw new Error(`${response.status}: ${response.data.toString()}`);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('Axios Error:', error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.error('General Error:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
      return res.status(500).json({ message: 'Failed to generate image' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
