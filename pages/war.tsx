import { ResourceApiResponse } from "cloudinary";
import { useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import Head from "next/head";
import Image from "next/legacy/image";
import WarStyles from '../layout/War.module.css';
import GalleryStyles from '../layout/Gallery.module.css';
import { Grid } from "../layout/Gallery";
import { type Img } from "../types";

interface WarPageProps {
  images: Img[];
}

enum WAR_TABS {
	GLORY = 'Війна',
	HORROR = 'Люди'
}

export default function WarPage({
  images = []
}: WarPageProps) {
	const [currentTab, setCurrentTab] = useState(WAR_TABS.GLORY);
  
	return (
    <main>
      <Head>
        <title>Війна в Україні</title>
        <meta name="description" content='Війна 2022' />
      </Head>
			<nav className={WarStyles.Nav}>
				<button 
					onClick={currentTab === WAR_TABS.HORROR ? () => setCurrentTab(WAR_TABS.GLORY) : undefined} 
					className={WarStyles.Tab} 
					role="tab" 
					autoFocus 
					aria-current={currentTab === WAR_TABS.GLORY}>
					{WAR_TABS.GLORY}
				</button>
				<button
					onClick={currentTab === WAR_TABS.GLORY ? () => setCurrentTab(WAR_TABS.HORROR) : undefined} 
					className={WarStyles.Tab} 
					role="tab"
					aria-current={currentTab === WAR_TABS.HORROR}>
					{WAR_TABS.HORROR}
				</button>
			</nav>
      <Gallery>
        <Grid>
          {images.map(({ src, width, height, blurry }, index) => (
						<Item
							key={index}
							width={width}
							original={src}
							height={height}>
							{({ ref, open }) => (
								<article 
									ref={ref}
									className={GalleryStyles.ImageContainer} 
									tabIndex={0} 
									onClick={open}>
									<Image
										key={index}
										width={width}
										height={height}
										alt={`${index}-я картинка на сторінці 'Війна'`}
										src={src}	
										priority={index <= 8}
										objectFit='cover'
										loading={index > 8 ? 'lazy' : undefined}
										placeholder='blur'
										blurDataURL={blurry}
									/>
								</article>
							)}
						</Item>
					))}
        </Grid>
      </Gallery>
    </main>
  )
}

export async function getStaticProps() {
	const API_URL = process.env.API_URL || "https://io-film.vercel.app";
	const images = await fetch(`${API_URL}/api/war`).then(response => response.json());
	return { props: { images } };
}