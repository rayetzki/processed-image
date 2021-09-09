import { ResourceApiResponse } from "cloudinary";
import { GetStaticPropsContext } from "next";
import Head from "next/head";

interface BasicPageProps {
	page: string;
	images: string[];
}

const BasicPage = ({
  page = 'Животные',
	images
}: BasicPageProps) => {
	console.log({ images });
	return (
			<>
			<Head>
				<title>Пленочная I & O</title>
				<meta name="description" content={`${page} от I & O`} />
			</Head>
		</>
	)
}
export default BasicPage;

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: ['animals'] } },
      { params: { slug: ['people'] } },
      { params: { slug: ['minimalism'] } },
      { params: { slug: ['plants'] } },
      { params: { slug: ['blacknwhite'] } },
      { params: { slug: ['landscapes'] } },
    ],
    fallback: true,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
	const folder = context.params?.slug && context.params.slug[0];
	if (!folder) return;
	const images: ResourceApiResponse = await fetch(`${process.env.API_URL}/api/images?folder=${folder}`).then(response => response.json());
	return { props: { images } };
}