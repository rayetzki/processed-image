import { ResourceApiResponse } from "cloudinary";
import Head from "next/head";
import Image from "next/image";
import GalleryStyles from '../layout/Gallery.module.css';
import { Gallery, Item } from "react-photoswipe-gallery";
import { Grid } from "../layout/Gallery";
import { Img } from "../types";

interface WarPageProps {
  images: Img[];
}

export default function WarPage({
  images = []
}: WarPageProps) {
  return (
    <main>
      <Head>
        <title>Війна в Україні</title>
        <meta name="description" content='Війна 2022' />
      </Head>
      <Gallery>
        <Grid>
          {images?.map(({ src, width, height, blurry }, index) => (
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
	const images: ResourceApiResponse = await fetch(`${API_URL}/api/images?folder=war`).then(response => response.json());
	return { props: { images } };
}