import type { NextApiRequest, NextApiResponse } from "next";
import { ResourceApiResponse, v2 as cloudinary } from 'cloudinary';

export default function handler({ query: { folder: prefix } }: NextApiRequest, response: NextApiResponse) {
	cloudinary.api.resources({
		resource_type: 'image',
		type: 'upload',
		tag: prefix,
		max_results: 10,
	}).then(({ resources }: ResourceApiResponse) => {
		response.status(200).json({ prefix, resources });
	});
}