import type { NextApiRequest, NextApiResponse } from "next";
import { ResourceApiResponse, v2 as cloudinary } from 'cloudinary';

export default function handler(request: NextApiRequest, response: NextApiResponse) {
	return cloudinary.api.resources({
		resource_type: 'image',
		type: 'upload',
		prefix: request.query.folder,
		max_results: 100,
	}).then(({ resources }: ResourceApiResponse) => {
		response.status(200).json(
			resources.map(image => ({
				src: image.secure_url,
				width: image.width,
				height: image.height,
				description: image.image_metadata,
				blurry: `data:image/${image.format};base64,${image.asset_id}`
			}))
		);
	});
}