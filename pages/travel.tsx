import { useState } from "react";
import Head from "next/head";
import css from '../layout/Cities.module.css';
import Link from 'next/link';
import BackArrow from '../public/upwards.svg';
import type { City as CityType, FullScreenView } from '../types';
import FullImage from "../layout/FullImage";
import { City } from "../layout/City";

interface CitiesProps {
	cities: CityType[];
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
					{cities?.map(city => (
						<City key={city.id} { ...city } setFullScreen={ setFullScreen } />
					))}
				</ol>
			</section>
			{Object.keys(isFullScreen).every(key => key.length > 0) && isFullScreen.images && isFullScreen.images.length > 0 && (
				<FullImage 
					image={ isFullScreen.image }
					images={ isFullScreen.images }
					isOpen={ isFullScreen.isOpen } 
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