import type { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from 'cloudinary';

const tags = ['people', 'life'];

export default function handler(_: NextApiRequest, response: NextApiResponse) {
  return cloudinary.api.resources({
    resource_type: 'image',
    type: 'upload',
    prefix: 'war',
    max_results: 100,
  })
    .then(({ resources }) => response.status(200).json(JSON.stringify(resources)))
    .catch(error => {
      console.error(error);
      return response.status(500).json({ message: 'Something went wrong' });
    });
}