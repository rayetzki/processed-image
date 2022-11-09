import Head from "next/head";
import Image from 'next/image';
import Link  from 'next/link';
import cx from 'classnames';
import styles from '../layout/Home.module.css';
import InstagramIcon from '../public/instagram.svg';
import FilmRollIcon from '../public/film-roll.svg';
import UpwardsIcon from '../public/upwards.svg';

export default function Home() {
  return (
    <main>
      <Head>
        <title>Пленочная I & O</title>
        <meta name="description" content="Пленочная галерея от I & O" />
      </Head>
			<nav className={styles.Navigation}>
				<Link className={styles.Link} href='/'>
					<span className={styles.TitleLogo}>
						<FilmRollIcon className={styles.Logo} />
						<h1 className={styles.Title}>Пленочная I & 0</h1>
					</span>
				</Link>
				<div className={styles.NavLinks}>
					<Link href='/animals' aria-label="Галерея" className={styles.NavLink}>
						<p className={styles.NavLinkText}>В Галерею</p>
						<UpwardsIcon className={styles.NavLinkIcon} />
					</Link>
					<Link href='/travel' aria-label="Поездки" className={styles.NavLink}>
						<p className={styles.NavLinkText}>Поездки</p>
						<UpwardsIcon className={styles.NavLinkIcon} />
					</Link>
					<Link href='/war' aria-label="Война" className={styles.NavLink}>
						<p className={styles.NavLinkText}>Война 2022</p>
						<UpwardsIcon className={styles.NavLinkIcon} />
					</Link>
				</div>
			</nav>
			<div className={styles.Authors}>
				<h2 className={styles.AuthorsTitle}>Кто мы?</h2>
				<section className={styles.AuthorsGrid}>
					<article className={styles.Author}>
						<Image
							src='/i.jpg'
							alt='Илья'
							priority
							width='1200'
							height='800'
							layout='responsive'
							objectFit='cover'
						/>
						<div className={styles.AuthorFooter}>
							<Link href='https://instagram.com/sahaydachnyi' target="_blank" rel="noopener noreferrer" className={cx(styles.Link, styles.AuthorLink)}>
								<InstagramIcon className={styles.InstagramIcon} />
								<p>@sahaydachnyi</p>
							</Link>
							<p className={styles.AuthorName}>Илья</p>
						</div>
					</article>
					<article className={styles.Author}>
						<Image
							src='/o.jpg'
							alt='Елена'
							priority
							width='1200'
							height='800'
							layout='responsive'
							objectFit='cover'
						/>
						<div className={styles.AuthorFooter}>
							<Link href='https://www.instagram.com/kurai_m' target="_blank" rel="noopener noreferrer" className={cx(styles.Link, styles.AuthorLink)}>
								<InstagramIcon className={styles.InstagramIcon} />
								<p>@kurai_m</p>
							</Link>
							<p className={styles.AuthorName}>Елена</p>
						</div>
					</article>
				</section>
			</div>
    </main>
  );
}
