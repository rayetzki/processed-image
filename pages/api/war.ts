import type { NextApiRequest, NextApiResponse } from "next";
import { ResourceApiResponse, v2 as cloudinary } from 'cloudinary';

export default function handler(_: NextApiRequest, response: NextApiResponse) {
  cloudinary.api.resources({
    resource_type: 'image',
    type: 'upload',
    prefix: 'war',
    max_results: 100,
  })
    .then(({ resources }: ResourceApiResponse) => response.status(200).json(resources))
    .then(console.log)
    .catch(error => {
      return response.status(500).json({ message: 'Something went wrong', error });
    });
}