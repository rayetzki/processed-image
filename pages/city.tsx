import Head from "next/head";
import css from './layout/Cities.module.css';

const UkrainianCities = [
	{
		city: 'Карпаты',
		route: '/carpathian',
		id: '#carpathian',
		description: 'Карпатские горы',
		date: 'Август 2020'
	},
	{
		city: 'Запорожье',
		route: '/zp',
		id: '#zp',
		description: 'Промышленный город',
		date: '2020-',
	},
	{
		city: 'Чернигов',
		route: '/chernihiv',
		id: '#chernihiv',
		description: 'Уютный город для жизни',
		date: 'Июнь 2021'
	},
	{
		city: 'Одесса',
		route: '/odessa',
		id: '#odessa',
		description: 'Контрасты',
		date: 'Июнь 2020'
	},
	{
		city: 'Харьков',
		route: '/kharkiv',
		id: '#kharkiv',
		description: 'Интеллектуальная столица',
		date: 'Июнь 2020'
	},
	{
		city: 'Киев',
		route: '/kiev',
		id: '#kiev',
		description: 'Родной город',
		date: 'Июнь 2020'
	}
];

const City = ({
	page = 'Города -> Запорожье'
}) => {
	return (
		<main>
			<Head>
        <title>Пленочная I & O</title>
        <meta name="description" content={`${page} от I & O`} />
      </Head>
			<section className={css.Cities}>
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

export default City;