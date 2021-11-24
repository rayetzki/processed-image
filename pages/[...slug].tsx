import { KeyboardEvent, useEffect, useState } from "react";
import type { ResourceApiResponse } from "cloudinary";
import type { GetStaticPropsContext } from "next";
import type { Img, FullScreenView } from '../types';
import Image from 'next/image'; 
import Head from "next/head";
import css from '../layout/Gallery.module.css';
import FullImage from "../layout/FullImage";
import UpwardsIcon from '../public/go-up.svg';

interface BasicPageProps {
	page: string;
	error: unknown;
	images: Img[] | null;
}

const BasicPage = ({
  page = 'Животные',
	images,
	error
}: BasicPageProps) => {
	const [isFullScreen, setFullScreen] = useState<FullScreenView>({ image: '', isOpen: false });
	const [isScrollTopShown, setScrollTopShown] = useState<boolean>(false);
	
	const toggleScrollTopShow = () => {
		if (scrollY > 100 && isScrollTopShown) return;
		if (scrollY > 100 && !isScrollTopShown) setScrollTopShown(true)
		else setScrollTopShown(false);
	};
	
	useEffect(() => {
		document.addEventListener('scroll', toggleScrollTopShow);
		return () => document.removeEventListener('scroll', toggleScrollTopShow);
	}, [toggleScrollTopShow]);

	const handleScrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

	if (error) throw error;

	return (
		<main>
			<Head>
				<title>Пленочная I & O</title>
				<meta name="description" content={`${page} от I & O`} />
			</Head>
			{isFullScreen.isOpen && isFullScreen.image && (
				<FullImage 
					isOpen={isFullScreen.isOpen}
					image={isFullScreen.image}
					setOpen={() => setFullScreen({ isOpen: false, image: '' })}
				/>
			)}
			<section className={css.Gallery}>
				{images?.map(({ src, width, height, blurry }, index) => (
					<article 
						key={index} 
						className={css.ImageContainer} 
						tabIndex={0} 
						onClick={() => setFullScreen({ isOpen: true, image: src })}
						onKeyDown={e => e.key === 'Enter' ? setFullScreen({ isOpen: true, image: src }) : null }>
						<Image
							key={index}
							alt={`Страница ${page} - ${index}-я картинка`} 
							src={src}	
							priority={ index <= 8 }
							width={width}
							height={height}
							objectFit='cover'
							loading={ index > 8 ? 'lazy' : undefined }
							placeholder='blur'
							blurDataURL={blurry}
						/>
					</article>
				))}
			</section>
			{isScrollTopShown && (
				<UpwardsIcon
					onClick={ handleScrollTop } 
					onKeyDown={ (e: KeyboardEvent<HTMLOrSVGElement>) => e.key === 'Enter' ? handleScrollTop() : null }
					className={css.GoUp}
				/>
			)}
		</main>
	);
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