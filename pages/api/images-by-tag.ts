import { NextApiRequest, NextApiResponse } from "next";
import { ResourceApiResponse, v2 as cloudinary } from 'cloudinary';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
	try {
		const desiredTag = request.query.tag as string;
		if (!desiredTag) return response.status(400).json({ message: 'Bad Request' });
		const { resources }: ResourceApiResponse = await cloudinary.api.resources_by_tag(desiredTag, { 
			resource_type: 'image', 
			keep_original: true,
			tags: true,
			max_results: 100,
		});
		return response.status(200).json(resources);
	} catch (error) {
		response.status(500).json({ message: 'Something went wrong' });
		throw error;
	}
}