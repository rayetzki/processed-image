import '../styles/globals.css'
import 'photoswipe/dist/photoswipe.css'
import { type AppProps } from 'next/app'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
	const { asPath } = useRouter();

  return (
    <Component {...pageProps} key={asPath} />
  )
}

export default MyApp
