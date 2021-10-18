import Head from "next/head";
import css from '../layout/Cities.module.css';
import Image from 'next/image';
import type { City } from '../types';

interface CitiesProps {
	cities: City[];
}


const Cities = ({ cities }: CitiesProps) => (
	<main>
		<Head>
			<title>Пленочная I & O</title>
			<meta name="description" content='Пешком по нашим краям от I & O' />
		</Head>
		<section className={css.Cities}>
			<h1 className={css.Cities__Header}>Поездки</h1>
			<ol className={css.Stepper}>
				{cities?.map(({ city, short, date, id, description, images }) => (
					<li id={`#${id}`} key={city} className={css.Stepper__Item}>
						<div className={css.Stepper__Content}>
							<h2 className={css.Stepper__Title}>{city}</h2>
							<h3 className={css.Stepper__Short}>{short}</h3>
							<p className={css.Stepper__Description}>{description}</p>
							<div className={css.Stepper__Images}>
								{images?.map((image, index) => (
									<Image
										className={css.Stepper__Image}
										key={image.secure_url}
										src={image.secure_url}
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
	</main>
);

export async function getStaticProps() {
	const API_URL = process.env.API_URL || "https://io-film.vercel.app";
	const cities: CitiesProps['cities'] = await fetch(`${API_URL}/api/travel?tag=cities`).then(response => response.json());
	return { props: { cities } };
};

export default Cities;