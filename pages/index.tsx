import Head from 'next/head';
import { Navbar } from './layout/Navbar';

export default function Home() {
  return (
    <>
      <Head>
        <title>Пленочная I & O</title>
        <meta name="description" content="Film gallery by Illia Raietskyi" />
      </Head>
      <Navbar />
    </>
  )
}
