import "styles/base.css"
import "styles/global.css"
import "styles/reset.css"
import "styles/variables.css"
import "styles/typography.css"

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}

export default MyApp
