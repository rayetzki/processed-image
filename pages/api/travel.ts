import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from 'cloudinary';
import info from './cities.json';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
	const { tag } = request.query;
	
	if (!tag || Array.isArray(tag)) return response.status(400).json({ message: 'Bad Request' });

	try {
		const { resources } = await cloudinary.api.resources_by_tag(tag, { 
			resource_type: 'image',
			keep_original: true,
			tags: true,
			max_results: 200,
		});

		if (resources.length > 0) {
			response.status(200).json(
				JSON.stringify(info.cities.map(city => ({
					...city,
					images: resources.filter(image => image.tags.includes(city.id)),
				}))
			));
		} else response.status(400).json({ message: 'No images found' });
	} catch (error) {
		response.status(500).json({ message: 'Something went wrong' });
		throw error;
	}
}