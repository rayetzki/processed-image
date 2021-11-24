import { NextApiRequest, NextApiResponse } from "next";
import { ResourceApiResponse, v2 as cloudinary } from 'cloudinary';

const Dummy = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porta lacus at turpis posuere, sit amet dictum elit volutpat. Maecenas vitae tortor sed massa suscipit vehicula. Nam venenatis, eros volutpat iaculis sodales, purus neque varius tortor, quis tempor dui lectus pretium erat. Phasellus in faucibus justo. Phasellus eget gravida mauris, at egestas tellus. Vivamus convallis maximus aliquet. Etiam cursus neque lectus, porta venenatis eros consectetur eget. Sed varius arcu at porta pulvinar. Duis in vehicula metus. Donec et ullamcorper velit. Integer vel blandit odio, id pretium neque. Maecenas lacus quam, consequat sed enim quis, viverra eleifend elit. Nulla facilisi. Pellentesque porta congue ornare.';

const UkrainianCities = [
	{
		city: 'Карпаты',
		route: '/carpathian',
		id: 'carpathian',
		short: 'Горы, Воздух, Оседлость',
		date: 'Август 2020',
	},
	{
		city: 'Запорожье',
		route: '/zp',
		id: 'zp',
		short: 'Промышленность',
		date: '2020-',
	},
	{
		city: 'Чернигов',
		route: '/chernihiv',
		id: 'chernihiv',
		short: 'Уют',
		date: 'Июнь 2021',
	},
	{
		city: 'Одесса',
		route: '/odessa',
		id: 'odessa',
		short: 'Хитрый, Южный',
		date: 'Июнь 2020',
	},
	{
		city: 'Харьков',
		route: '/kharkiv',
		id: 'kharkiv',
		short: 'Чистота, Занятость',
		date: 'Июнь 2020',
	},
	{
		city: 'Киев',
		route: '/kyiv',
		id: 'kyiv',
		short: 'Весь цвет большого города',
		date: 'Июнь 2020',
	}
];

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
	const { tag } = request.query;
	
	if (!tag || Array.isArray(tag)) return response.status(400).json({ message: 'Bad Request' });

	try {
		const { resources }: ResourceApiResponse = await cloudinary.api.resources_by_tag(tag, { 
			resource_type: 'image', 
			keep_original: true,
			tags: true,
			max_results: 200,
		});

		if (resources.length > 0) {
			response.status(200).json(
				JSON.stringify(UkrainianCities.map(city => ({
					...city,
					description: Dummy,
					images: resources.filter(image => image.tags.includes(city.id)),
				}))
			));
		} else response.status(400).json({ message: 'No images found' });
	} catch (error) {
		response.status(500).json({ message: 'Something went wrong' });
		throw error;
	}
}