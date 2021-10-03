import Head from "next/head";
import css from './layout/Cities.module.css';

const UkrainianCities = [
	{
		city: 'Карпаты',
		route: '/carpathian',
		id: '#carpathian',
		description: 'Горы, Воздух, Оседлость',
		date: 'Август 2020'
	},
	{
		city: 'Запорожье',
		route: '/zp',
		id: '#zp',
		description: 'Промышленность',
		date: '2020-',
	},
	{
		city: 'Чернигов',
		route: '/chernihiv',
		id: '#chernihiv',
		description: 'Уют',
		date: 'Июнь 2021'
	},
	{
		city: 'Одесса',
		route: '/odessa',
		id: '#odessa',
		description: 'Хитрый, Южный',
		date: 'Июнь 2020'
	},
	{
		city: 'Харьков',
		route: '/kharkiv',
		id: '#kharkiv',
		description: 'Чистота, Занятость',
		date: 'Июнь 2020'
	},
	{
		city: 'Киев',
		route: '/kiev',
		id: '#kiev',
		description: 'Весь цвет большого города',
		date: 'Июнь 2020'
	}
];

const Cities = () => {
	return (
		<main>
			<Head>
        <title>Пленочная I & O</title>
        <meta name="description" content='Пешком по нашим краям от I & O' />
      </Head>
			<section className={css.Cities}>
				<h1 className={css.Cities__Header}>Поездки</h1>
				<ol className={css.Stepper}>
					{UkrainianCities.map(({ city, description, date, id }) => (
						<li id={id} key={city} className={css.Stepper__Item}>
							<div className={css.Stepper__Content}>
								<h2 className={css.Stepper__Title}>{city}</h2>
								<p className={css.Stepper__Description}>{description}</p>
							</div>
							<time className={css.Stepper__Time}>{date}</time>
						</li>
					))}
				</ol>
			</section>
		</main>
	);
};

export default Cities;

export async function getStaticProps() {
	const API_URL = process.env.API_URL || "https://io-film.vercel.app";
	const images = await fetch(`${API_URL}/api/images-by-tag?tag=cities`).then(response => response.json());
	return { props: { images } };
}