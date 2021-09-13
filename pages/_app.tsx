import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Fragment } from 'react'
import Navbar from './layout/Navbar'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
	const { pathname, asPath } = useRouter();

  return (
    <Fragment>
      {pathname !== '/' && <Navbar />}
      <Component {...pageProps} key={asPath} />
    </Fragment>
  )
}

export default MyApp
