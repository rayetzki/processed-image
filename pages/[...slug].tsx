import { KeyboardEvent, useCallback, useEffect, useState } from "react";
import { Gallery, Item } from 'react-photoswipe-gallery';
import { type ResourceApiResponse } from "cloudinary";
import { type GetStaticPropsContext } from "next";
import { type Img } from '../types';
import Image from 'next/image'; 
import Head from "next/head";
import css from '../layout/Gallery.module.css';
import UpwardsIcon from '../public/go-up.svg';
import Navbar from "../layout/Navbar";
import { Grid } from "../layout/Gallery";

interface BasicPageProps {
	page: string;
	error: unknown;
	images: Img[] | null;
}

export default function BasicPage({
  page = 'Животные',
	images,
	error
}: BasicPageProps) {
	const [isScrollTopShown, setScrollTopShown] = useState<boolean>(false);
	
	const toggleScrollTopShow = useCallback(() => {
		if (scrollY > 100 && isScrollTopShown) return;
		if (scrollY > 100 && !isScrollTopShown) setScrollTopShown(true)
		else setScrollTopShown(false);
	}, [isScrollTopShown]);
	
	useEffect(() => {
		document.addEventListener('scroll', toggleScrollTopShow);
		return () => document.removeEventListener('scroll', toggleScrollTopShow);
	}, [toggleScrollTopShow]);

	const handleScrollTop = useCallback(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, []);

	if (error) throw error;

	return (
		<main>
			<Head>
				<title>Пленочная I & O</title>
				<meta name="description" content={`${page} от I & O`} />
			</Head>
			
			<Navbar />
			<Gallery>
				<Grid>
					{images?.map(({ src, width, height, blurry }, index) => (
						<Item 
							key={index}
							width={width}
							original={src}
							alt={`Страница ${page} - ${index}-я картинка`}
							height={height}>
							{({ ref, open }) => (
								<article 
									ref={ref}
									className={css.ImageContainer} 
									tabIndex={0} 
									onClick={open}>
									<Image
										key={index}
										width={width}
										height={height}
										alt={`Страница ${page} - ${index}-я картинка`} 
										src={src}	
										priority={index <= 8}
										objectFit='cover'
										loading={index > 8 ? 'lazy' : undefined}
										placeholder='blur'
										blurDataURL={blurry}
									/>
								</article>
							)}
						</Item>
					))}
				</Grid>
			</Gallery>
			{isScrollTopShown && (
				<UpwardsIcon
					onClick={handleScrollTop} 
					onKeyDown={(e: KeyboardEvent<HTMLOrSVGElement>) => e.key === 'Enter' ? handleScrollTop() : null}
					className={css.GoUp}
				/>
			)}
		</main>
	);
}

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
    fallback: true
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
	const folder = context.params?.slug && context.params.slug[0];
	const API_URL = process.env.API_URL || "https://io-film.vercel.app";
	if (!folder) return;
	const images: ResourceApiResponse = await fetch(`${API_URL}/api/images?folder=${folder}`).then(response => response.json());
	return { props: { images, page: folder } };
}