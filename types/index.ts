import { ResourceApiResponse } from "cloudinary";

export interface City {
	city: string;
	route: string;
	id: string;
	short: string;
	date: string;
	description: string;
	images: ResourceApiResponse['resources'];
};

export interface Img {
	src: string;
	width: number;
	height: number;
	description: string;
	blurry: string;
	tags: string[];
};