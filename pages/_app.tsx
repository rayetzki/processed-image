import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../layout/Navbar'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
	const { pathname, asPath } = useRouter();
	const excludeNavbar = ['/', '/travel'];

  return (
    <>
      {!excludeNavbar.includes(pathname) && <Navbar />}
      <Component {...pageProps} key={asPath} />
    </>
  )
}

export default MyApp
