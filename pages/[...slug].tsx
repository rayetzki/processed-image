import React, { KeyboardEvent, useEffect, useState } from "react";
import { ResourceApiResponse } from "cloudinary";
import { GetStaticPropsContext } from "next";
import Image from 'next/image'; 
import Head from "next/head";
import css from './Gallery.module.css';
import FullImage from "./layout/FullImage";
import UpwardsIcon from '../public/go-up.svg';

interface BasicPageProps {
	page: string;
	error: unknown;
	images: {
		src: string;
		width: number;
		height: number;
		description: string;
		blurry: string;
	}[] | null;
}

const BasicPage = ({
  page = 'Животные',
	images,
	error
}: BasicPageProps) => {
	const [isFullScreen, setFullScreen] = useState<{ image: string, isOpen: boolean }>({ image: '', isOpen: false });
	const [isScrollTopShown, setScrollTopShown] = useState<boolean>(false);
	
	const toggleScrollTopShow = () => {
		if (scrollY > 100 && isScrollTopShown) return;
		if (scrollY > 100 && !isScrollTopShown) setScrollTopShown(true)
		else setScrollTopShown(false);
	};
	
	useEffect(() => {
		document.addEventListener('scroll', toggleScrollTopShow);
		return () => document.removeEventListener('scroll', toggleScrollTopShow);
	}, []);

	const handleScrollTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

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
						onClick={() => setFullScreen({ isOpen: true, image: src })}
						onKeyDown={e => e.key === 'Enter' ? setFullScreen({ isOpen: true, image: src }) : null }
						tabIndex={0}
						className={`${css.ImageContainer} ${css.ImageContainer}-${index + 1}`}
					/>
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

export async function getServerSideProps(context: GetStaticPropsContext) {
	const folder = context.params?.slug && context.params.slug[0];
	if (!folder) return;
	const images: ResourceApiResponse = await fetch(`${process.env.API_URL}/api/images?folder=${folder}`).then(response => response.json());
	return { props: { images, page: folder } };
}