import Head from "next/head";
import css from '../layout/Cities.module.css';
import Link from 'next/link';
import BackArrow from '../public/upwards.svg';
import { type City as CityType } from '../types';
import { City } from "../layout/City";
import { Gallery } from "react-photoswipe-gallery";

interface CitiesProps {
	cities: CityType[];
}

export default function Cities({ cities }: CitiesProps) {	
	return (
		<main>
			<Head>
				<title>Пленочная I & O</title>
				<meta name="description" content='Пешком по нашим краям от I & O' />
			</Head>
			<section className={css.Cities}>
				<div className={css.Cities__Head}>
					<Link href='/' aria-label="На главную">
						<BackArrow className={css.Cities__Back} />
					</Link>
					<h1 className={css.Cities__Header}>Поездки</h1>
				</div>
				<Gallery>
					<ol className={css.Stepper}>
						{cities?.map(city => <City key={city.id} { ...city } />)}
					</ol>
				</Gallery>
			</section>
		</main>
	);
};

export async function getStaticProps() {
	const API_URL = process.env.API_URL || "https://io-film.vercel.app";
	const cities = await fetch(`${API_URL}/api/travel?tag=cities`).then(response => response.json());
	return { props: { cities: JSON.parse(cities) } };
};