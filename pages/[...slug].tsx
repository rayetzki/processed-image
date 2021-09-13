import { ResourceApiResponse } from "cloudinary";
import { GetStaticPropsContext } from "next";
import Image from 'next/image'; 
import Head from "next/head";
import css from '../styles/Gallery.module.css';

interface BasicPageProps {
	page: string;
	error: unknown;
	images: {
		src: string;
		width: number;
		height: number;
		description: string;
		blurry: string;
	}[];
}

const BasicPage = ({
  page = 'Животные',
	images,
	error
}: BasicPageProps) => {
	if (error) throw error;
	return (
		<>
			<Head>
				<title>Пленочная I & O</title>
				<meta name="description" content={`${page} от I & O`} />
			</Head>
			<section className={css.Gallery}>
				{images?.map(({ src, width, height, blurry }, index) => (
					<Image
						key={index}
						alt={`Страница ${page} - ${index}-я картинка`} 
						src={src}
						width={`${width}`}
						priority={ index <= 8 }
						height={`${height}`}
						objectFit='cover'
						loading={ index > 8 ? 'lazy' : undefined }
						placeholder='blur'
						blurDataURL={blurry}
						tabIndex={0}
						className={`${css.ImageContainer} ${css.ImageContainer}-${index + 1}`}
					/>
				))}
			</section>
		</>
	);
}

export default BasicPage;

export async function getServerSideProps(context: GetStaticPropsContext) {
	const folder = context.params?.slug && context.params.slug[0];
	if (!folder) return;
	const images: ResourceApiResponse = await fetch(`${process.env.API_URL}/api/images?folder=${folder}`).then(response => response.json());
	return { props: { images } };
}