import React, { useState } from "react";
import Head from "next/head";
import css from '../layout/Cities.module.css';
import Image from 'next/image';
import Link from 'next/link';
import BackArrow from '../public/upwards.svg';
import type { City, FullScreenView } from '../types';
import FullImage from "../layout/FullImage";

interface CitiesProps {
	cities: City[];
}

const Cities = ({ cities }: CitiesProps) => {
	const [isFullScreen, setFullScreen] = useState<FullScreenView>({ image: '', isOpen: false, images: [] }); 
	
	return (
		<main>
			<Head>
				<title>Пленочная I & O</title>
				<meta name="description" content='Пешком по нашим краям от I & O' />
			</Head>
			<section className={css.Cities}>
				<div className={css.Cities__Head}>
					<Link href='/'>
						<a aria-label="На главную">
							<BackArrow className={css.Cities__Back} />
						</a>
					</Link>
					<h1 className={css.Cities__Header}>Поездки</h1>
				</div>
				<ol className={css.Stepper}>
					{cities?.map(({ city, short, date, id, description, images }) => (
						<li id={`#${id}`} key={city} className={css.Stepper__Item}>
							<div className={css.Stepper__Content}>
								<h2 className={css.Stepper__Title}>{city}</h2>
								<h3 className={css.Stepper__Short}>{short}</h3>
								<p className={css.Stepper__Description}>{description}</p>
								<div className={css.Stepper__Images}>
									{images?.slice(0, 6).map((image, index) => (
										<Image
											className={css.Stepper__Image}
											key={image.secure_url}
											src={image.secure_url}
											onClick={() => setFullScreen({
												image: image.secure_url,
												images: images.map(i => i.secure_url),
												isOpen: true
											})}
											layout='intrinsic'
											width={300}
											height={300}
											objectFit='cover'
											alt={`${index}-я картинка из города ${city}`}
										/>
									))}
								</div>
							</div>
							<time className={css.Stepper__Time}>{date}</time>
						</li>
					))}
				</ol>
			</section>
			{Object.keys(isFullScreen).every(key => key.length > 0) && isFullScreen.images && isFullScreen.images.length > 0 && (
				<FullImage 
					{ ...isFullScreen }
					setOpen={() => setFullScreen({ image: '', images: [], isOpen: false })}
				/>
			)}
		</main>
	);
};

export async function getStaticProps() {
	const API_URL = process.env.API_URL || "https://io-film.vercel.app";
	const cities: CitiesProps['cities'] = await fetch(`${API_URL}/api/travel?tag=cities`).then(response => response.json());
	return { props: { cities } };
};

export default Cities;