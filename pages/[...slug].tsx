import { ResourceApiResponse } from "cloudinary";
import { GetStaticPropsContext } from "next";
import Head from "next/head";

const BasicPage = ({ 
  page = 'Животные'
}) => (
  <>
    <Head>
      <title>Пленочная I & O</title>
      <meta name="description" content={`${page} от I & O`} />
    </Head>
  </>
);

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
	try {
		const images: ResourceApiResponse = await fetch(`${process.env.API_URL}/api/images?folder=${folder}`).then(response => response.json());
		return { props: { data: images } };
	} catch(error) {
		return { props: { data: null } };
	}
}