import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function (req: VercelRequest, res: VercelResponse) {
  const sourceUrl = req.query.sourceUrl as string | undefined;
  if (!sourceUrl) {
    res.status(400).json({ message: 'sourceUrl is required' });
    return;
  }

  let response;
  try {
    response = await axios.get(sourceUrl);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.warn('Failed to load from url', sourceUrl);
      res.status(error.response?.status || 500).json({
        message: 'Failed to load from url',
        details: error.response?.data,
      });
      return;
    }

    res.status(500).json({
      message: 'Unknown error',
      details: error instanceof Error && error.message,
    });
    return;
  }

  res.status(200).send(response.data);
}
