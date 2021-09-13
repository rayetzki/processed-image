import Head from "next/head";
import Image from 'next/image';
import Link  from 'next/link';
import cx from 'classnames';
import { Fragment } from "react";
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Пленочная I & O</title>
        <meta name="description" content="Пленочная галерея от I & O" />
      </Head>
			<nav className={styles.Navigation}>
				<h1 className={styles.Title}>Пленочная I & 0</h1>
				<div className={styles.FirstPage}>
					<Link href='/animals'>
						<a className={styles.Link}>
							<Image 
								title='На первую страницу'
								src='/arrow.png'
								width='65'
								height='65'
								className={styles.FirstPageLink}
								alt='На первую страницу'
							/>
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
									<Image
										src='/instagram.png'
										layout='fixed'
										width='20'
										height='20'
										alt='Инстаграм Ильи'
									/>
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
									<Image
										src='/instagram.png'
										layout='fixed'
										width='20'
										height='20'
										alt='Инстаграм Елены'
									/>
									<p>@kurai_m</p>
								</a>
							</Link>
							<p className={styles.AuthorName}>Елена</p>
						</div>
					</article>
				</section>
			</div>
    </Fragment>
  );
}
