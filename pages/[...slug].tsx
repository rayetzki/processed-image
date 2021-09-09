import { ResourceApiResponse } from "cloudinary";
import { GetStaticPropsContext } from "next";
import Image from 'next/image'; 
import Head from "next/head";
import type { Image as ImageBody } from '../types';
import css from '../styles/Gallery.module.css';

interface BasicPageProps {
	page: string;
	images: ImageBody[];
}

const BasicPage = ({
  page = 'Животные',
	images
}: BasicPageProps) => {
	return (
			<>
			<Head>
				<title>Пленочная I & O</title>
				<meta name="description" content={`${page} от I & O`} />
			</Head>
			<section className={css.Gallery}>
				{images.map(({ src, width, height }, index) => (
					<Image
						key={index}
						alt={`Страница ${page} - ${index}-я картинка`} 
						src={src}
						width={`${width}`}
						height={`${height}`}
						quality={100}
						className={css.ImageContainer}
						loading='lazy' 
					/>
				))}
			</section>
		</>
	)
}
export default BasicPage;

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: ['animals'] } },
      { params: { slug: ['people'] } },
      { params: { slug: ['minimalism'] } },
      { params: { slug: ['plants'] } },
      { params: { slug: ['blacknwhite'] } },
      { params: { slug: ['landscapes'] } },
    ],
    fallback: true,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
	const folder = context.params?.slug && context.params.slug[0];
	if (!folder) return;
	const images: ResourceApiResponse = await fetch(`${process.env.API_URL}/api/images?folder=${folder}`).then(response => response.json());
	return { props: { images } };
}