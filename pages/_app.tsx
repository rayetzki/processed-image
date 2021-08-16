import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Fragment } from 'react'
import Navbar from './layout/Navbar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Navbar />
      <Component {...pageProps} />
    </Fragment>
  )
}

export default MyApp
