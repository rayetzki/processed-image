import Head from "next/head";
import Image from 'next/image';
import Link  from 'next/link';
import cx from 'classnames';
import styles from './layout/Home.module.css';
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
				<span className={styles.TitleLogo}>
					<FilmRollIcon className={styles.Logo} />
					<h1 className={styles.Title}>Пленочная I & 0</h1>
				</span>
				<div className={styles.FirstPage}>
					<Link href='/animals'>
						<a aria-label="Ссылка на первую страницу" className={styles.Link}>
							<UpwardsIcon className={styles.FirstPageLink} />
						</a>
					</Link>
					<p className={styles.FirstPageText}>На первую</p>
				</div>
			</nav>
			<div className={styles.Authors}>
				<h2 className={styles.AuthorsTitle}>Кто мы?</h2>
				<section className={styles.AuthorsGrid}>
					<article className={styles.Author}>
						<Image
							src='/i.jpg'
							layout='responsive'
							priority
							width='1280'
							height='800'
							alt='Илья'
						/>
						<div className={styles.AuthorFooter}>
							<Link href='https://instagram.com/konfeighty'>
								<a target="_blank" rel="noopener noreferrer" className={cx(styles.Link, styles.AuthorLink)}>
									<InstagramIcon className={styles.InstagramIcon} />
									<p>@rayetzki</p>
								</a>
							</Link>
							<p className={styles.AuthorName}>Илья</p>
						</div>
					</article>
					<article className={styles.Author}>
						<Image
							src='/o.jpg'
							alt='Елена'
							priority
							width='1280'
							height='800'
							layout='responsive'
						/>
						<div className={styles.AuthorFooter}>
							<Link href='https://www.instagram.com/kurai_m'>
								<a target="_blank" rel="noopener noreferrer" className={cx(styles.Link, styles.AuthorLink)}>
									<InstagramIcon className={styles.InstagramIcon} />
									<p>@kurai_m</p>
								</a>
							</Link>
							<p className={styles.AuthorName}>Елена</p>
						</div>
					</article>
				</section>
			</div>
    </main>
  );
}
