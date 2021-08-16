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