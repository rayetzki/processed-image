import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Fragment } from 'react'
import Navbar from './layout/Navbar'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
	const { pathname } = useRouter();

  return (
    <Fragment>
      {pathname !== '/' && <Navbar />}
      <Component {...pageProps} />
    </Fragment>
  )
}

export default MyApp
